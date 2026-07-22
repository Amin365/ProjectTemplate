const routeMetrics = new Map();

const toInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const MAX_SAMPLES_PER_ROUTE = Math.max(20, toInt(process.env.PERF_MAX_SAMPLES_PER_ROUTE, 300));
const SLOW_REQUEST_MS = Math.max(100, toInt(process.env.PERF_SLOW_REQUEST_MS, 800));

const normalizeRoute = (req) => {
  const base = req.baseUrl || "";
  const routePath = req.route?.path;
  if (routePath) {
    return `${base}${routePath}`;
  }
  return req.path || req.originalUrl || "unknown";
};

const getRouteKey = (req) => `${req.method} ${normalizeRoute(req)}`;

const percentile = (values, pct) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil((pct / 100) * sorted.length) - 1));
  return Math.round(sorted[index]);
};

export const recordApiTiming = (req, durationMs, statusCode) => {
  const routeKey = getRouteKey(req);
  const existing = routeMetrics.get(routeKey) || {
    route: routeKey,
    count: 0,
    success: 0,
    error: 0,
    durations: [],
    lastStatusCode: 0,
    lastDurationMs: 0,
    lastSeenAt: null,
  };

  existing.count += 1;
  if (statusCode >= 200 && statusCode < 400) {
    existing.success += 1;
  } else {
    existing.error += 1;
  }
  existing.lastStatusCode = statusCode;
  existing.lastDurationMs = durationMs;
  existing.lastSeenAt = new Date().toISOString();
  existing.durations.push(durationMs);
  if (existing.durations.length > MAX_SAMPLES_PER_ROUTE) {
    existing.durations.shift();
  }

  routeMetrics.set(routeKey, existing);

  if (durationMs >= SLOW_REQUEST_MS) {
    console.warn(`[Perf][slow] ${routeKey} ${durationMs}ms status=${statusCode}`);
  }
};

export const getApiPerformanceSnapshot = () => {
  const routes = [...routeMetrics.values()].map((item) => {
    const durations = item.durations || [];
    const total = durations.reduce((sum, value) => sum + value, 0);
    const avg = durations.length ? Math.round(total / durations.length) : 0;

    return {
      route: item.route,
      count: item.count,
      success: item.success,
      error: item.error,
      avgMs: avg,
      p50Ms: percentile(durations, 50),
      p95Ms: percentile(durations, 95),
      maxMs: durations.length ? Math.max(...durations) : 0,
      minMs: durations.length ? Math.min(...durations) : 0,
      lastDurationMs: item.lastDurationMs,
      lastStatusCode: item.lastStatusCode,
      lastSeenAt: item.lastSeenAt,
      sampleSize: durations.length,
    };
  });

  routes.sort((a, b) => b.p95Ms - a.p95Ms || b.avgMs - a.avgMs || b.count - a.count);

  return {
    generatedAt: new Date().toISOString(),
    totalRoutes: routes.length,
    slowThresholdMs: SLOW_REQUEST_MS,
    sampleCapPerRoute: MAX_SAMPLES_PER_ROUTE,
    routes,
  };
};

export const apiPerformanceMonitor = () => (req, res, next) => {
  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const durationMs = Number(end - start) / 1_000_000;
    const rounded = Math.max(0, Math.round(durationMs));

    recordApiTiming(req, rounded, res.statusCode);
  });

  next();
};
