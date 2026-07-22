const cacheStore = new Map();

const toInt = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const MAX_ENTRIES = toInt(process.env.API_CACHE_MAX_ENTRIES, 500);

const now = () => Date.now();

const compactCache = () => {
  const current = now();

  for (const [key, entry] of cacheStore.entries()) {
    if (!entry || entry.expiresAt <= current) {
      cacheStore.delete(key);
    }
  }

  if (cacheStore.size <= MAX_ENTRIES) return;

  const overflow = cacheStore.size - MAX_ENTRIES;
  const oldest = [...cacheStore.entries()]
    .sort((a, b) => (a[1]?.createdAt || 0) - (b[1]?.createdAt || 0))
    .slice(0, overflow);

  for (const [key] of oldest) {
    cacheStore.delete(key);
  }
};

setInterval(compactCache, 60_000).unref();

const buildCacheKey = (req) => {
  const role = req.user?.role?.role || req.user?.role || "anonymous";
  const identity = req.user?.id || "anon";
  const query = JSON.stringify(req.query || {});
  return `${req.method}|${req.baseUrl}${req.path}|${identity}|${String(role)}|${query}`;
};

export const responseCache = (ttlMs = 30_000) => (req, res, next) => {
  if (req.method !== "GET") return next();

  const requestNoCache = String(req.headers["cache-control"] || "").toLowerCase();
  if (requestNoCache.includes("no-cache") || requestNoCache.includes("no-store")) {
    return next();
  }

  const key = buildCacheKey(req);
  const existing = cacheStore.get(key);
  const current = now();

  if (existing && existing.expiresAt > current) {
    res.setHeader("X-Cache", "HIT");
    return res.status(existing.statusCode).json(existing.body);
  }

  if (existing) {
    cacheStore.delete(key);
  }

  res.setHeader("X-Cache", "MISS");
  const originalJson = res.json.bind(res);

  res.json = (payload) => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      cacheStore.set(key, {
        statusCode: res.statusCode,
        body: payload,
        createdAt: current,
        expiresAt: current + Math.max(1_000, Number(ttlMs) || 30_000),
      });
      if (cacheStore.size > MAX_ENTRIES) {
        compactCache();
      }
    }

    return originalJson(payload);
  };

  return next();
};
