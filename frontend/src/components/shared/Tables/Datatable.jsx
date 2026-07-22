
import React, { useState, useEffect, useMemo, useRef } from "react";
import * as XLSX from "xlsx";
import {
  Search as SearchIcon,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Filter,
  X,
  FileSpreadsheet,
  AlertCircle,
  RotateCcw,
  SlidersHorizontal,
  Bookmark,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * Generic DataTable  (v2)
 * ─────────────────────────────────────────────────────────────────────────
 * Must be rendered inside a Router (uses useSearchParams for shareable,
 * refresh-safe URLs — page, search, sort, filters, and page size all live
 * in the URL under a per-table prefix so multiple tables can coexist on
 * one page without clobbering each other's params).
 *
 * ── NEW IN v2 ───────────────────────────────────────────────────────────
 * - Debounced search (400ms) — types feel instant, requests don't spam.
 * - Error state with retry, instead of silently showing nothing.
 * - URL-synced state: page, q, sort, dir, limit, and every filter.
 * - Server-side sorting: mark a column `sortable: true`; DataTable sends
 *   { key, dir } via `sort` in fetchFn params.
 * - Row selection + bulk actions: `selectable` + `bulkActions`.
 * - Column visibility & reordering, persisted to localStorage per table.
 * - Saved views (filters + sort + columns + page size), persisted to
 *   localStorage per table.
 * - Page size selector (10/25/50/100 by default).
 * - Row-level permissions via `canView` (gates row click) and `rowActions`
 *   (each action takes its own `show(row)` predicate — wire it to your
 *   own canEdit/canDelete checks).
 *
 * ── COLUMN SHAPE ────────────────────────────────────────────────────────
 * {
 *   key: "member",
 *   header: "Member",
 *   render: (row) => <JSX/>,        // required
 *   sortable?: true,
 *   sortKey?: "last_name",          // defaults to `key` if omitted
 *   headerClassName?, cellClassName?,
 *   excludeFromExport?: true,
 *   exportHeader?: "FullName",
 *   exportValue?: (row) => string,  // provide to include in Excel export
 * }
 *
 * ── FILTER SHAPE ────────────────────────────────────────────────────────
 * {
 *   key: "region", label: "Region", allLabel?: "All Regions",
 *   options: "derive" | [ "Active", ... ] | [{ value, label }, ...],
 *   deriveField?: "region",         // required when options === "derive"
 * }
 *
 * ── ROW ACTION SHAPE ────────────────────────────────────────────────────
 * { icon: LucideIcon, label: "Edit", onClick: (row) => void, show?: (row) => bool }
 *
 * ── BULK ACTION SHAPE ───────────────────────────────────────────────────
 * { label: "Mark Active", icon?, variant?,
 *   onClick: (selectedRows, { clearSelection }) => void }
 *
 * ── fetchFn SHAPE ───────────────────────────────────────────────────────
 * async ({ page, limit, searchTerm, filters, sort, extraParams }) => ({
 *   data: [...], total: number, totalPages: number,
 * })
 * ─────────────────────────────────────────────────────────────────────────
 */

const DEFAULT_PAGE_SIZES = [10, 25, 50, 100];

function readStoredJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function writeStoredJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore quota/serialization errors — not critical */
  }
}

export default function DataTable({
  // Header
  title,
  subtitle,
  actions = [], // [{ label, icon, onClick, variant? }]
  onAddNew,
  addNewLabel = "Add New",
  addNewIcon: AddNewIcon,

  // Data
  queryKey,
  fetchFn,
  extraParams = {},
  limit = 10,
  pageSizeOptions = DEFAULT_PAGE_SIZES,

  // Columns / rows
  columns,
  rowKey = (row) => row.id,
  onRowClick,

  // Search
  searchPlaceholder = "Search...",
  searchable = true,
  searchDebounceMs = 400,

  // Sorting
  defaultSort, // { key, dir: 'asc'|'desc' }

  // Filters
  filters = [],

  // Selection / bulk actions
  selectable = false,
  canSelect = () => true,
  bulkActions = [],

  // Row-level permissions
  canView = () => true,
  rowActions = [],

  // Column visibility / reordering / saved views (persisted)
  columnPrefsEnabled = true,
  savedViewsEnabled = true,
  storageNamespace, // defaults to queryKey — set this if two tables share a queryKey

  // URL sync
  syncToUrl = true,
  urlParamPrefix, // defaults to queryKey

  // Export
  exportable = false,
  exportFileName = "export.xlsx",
  exportSheetName = "Sheet1",

  // Empty / loading copy
  emptyMessage = "No results found.",
  loadingMessage = "Loading...",
}) {
  const namespace = storageNamespace ?? queryKey;
  const prefix = urlParamPrefix ?? queryKey;
  const columnKeys = useMemo(() => columns.map((c) => c.key), [columns]);

  const [searchParams, setSearchParams] = useSearchParams();
  const getUrlParam = (name, fallback) =>
    syncToUrl ? searchParams.get(`${prefix}_${name}`) ?? fallback : fallback;

  const toolbarRef = useRef(null);

  /* ── Core query state (URL-seeded) ── */
  const [currentPage, setCurrentPage] = useState(() => parseInt(getUrlParam("page", "1"), 10) || 1);
  const [pageSize, setPageSize] = useState(() => parseInt(getUrlParam("limit", String(limit)), 10) || limit);
  const [searchInput, setSearchInput] = useState(() => getUrlParam("q", ""));
  const [searchTerm, setSearchTerm] = useState(() => getUrlParam("q", ""));
  const [sortState, setSortState] = useState(() => {
    const key = getUrlParam("sort", defaultSort?.key ?? "");
    const dir = getUrlParam("dir", defaultSort?.dir ?? "asc");
    return key ? { key, dir } : null;
  });
  const [filterValues, setFilterValues] = useState(() =>
    Object.fromEntries(filters.map((f) => [f.key, getUrlParam(`f_${f.key}`, "All")]))
  );
  const [showFilters, setShowFilters] = useState(false);

  /* ── Debounce search input → searchTerm ── */
  useEffect(() => {
    const t = setTimeout(() => setSearchTerm(searchInput), searchDebounceMs);
    return () => clearTimeout(t);
  }, [searchInput, searchDebounceMs]);

  /* ── Reset to page 1 whenever the query itself changes ── */
  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds(new Set());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, JSON.stringify(filterValues), JSON.stringify(sortState), JSON.stringify(extraParams), pageSize]);

  /* ── Sync state → URL ── */
  useEffect(() => {
    if (!syncToUrl) return;
    const next = new URLSearchParams(searchParams);
    const setOrDelete = (name, val, fallback) => {
      const k = `${prefix}_${name}`;
      if (val === undefined || val === null || val === "" || val === fallback) next.delete(k);
      else next.set(k, String(val));
    };
    setOrDelete("page", currentPage, 1);
    setOrDelete("limit", pageSize, limit);
    setOrDelete("q", searchTerm, "");
    setOrDelete("sort", sortState?.key, undefined);
    setOrDelete("dir", sortState?.dir, "asc");
    filters.forEach((f) => setOrDelete(`f_${f.key}`, filterValues[f.key], "All"));
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, searchTerm, sortState, filterValues]);

  /* ── Column visibility & order (persisted) ── */
  const columnPrefsKey = `datatable:columns:${namespace}`;
  const [columnOrder, setColumnOrder] = useState(() => {
    const stored = columnPrefsEnabled ? readStoredJSON(columnPrefsKey, null) : null;
    const storedOrder = stored?.order?.filter((k) => columnKeys.includes(k)) ?? [];
    const missing = columnKeys.filter((k) => !storedOrder.includes(k));
    return [...storedOrder, ...missing];
  });
  const [hiddenKeys, setHiddenKeys] = useState(() => {
    const stored = columnPrefsEnabled ? readStoredJSON(columnPrefsKey, null) : null;
    return new Set((stored?.hidden ?? []).filter((k) => columnKeys.includes(k)));
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  useEffect(() => {
    if (!columnPrefsEnabled) return;
    writeStoredJSON(columnPrefsKey, { order: columnOrder, hidden: Array.from(hiddenKeys) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnOrder, hiddenKeys]);

  const visibleColumns = useMemo(
    () =>
      columnOrder
        .filter((k) => !hiddenKeys.has(k))
        .map((k) => columns.find((c) => c.key === k))
        .filter(Boolean),
    [columnOrder, hiddenKeys, columns]
  );

  const moveColumn = (key, direction) => {
    setColumnOrder((prev) => {
      const idx = prev.indexOf(key);
      const swapWith = idx + direction;
      if (swapWith < 0 || swapWith >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[swapWith]] = [next[swapWith], next[idx]];
      return next;
    });
  };
  const toggleColumnVisibility = (key) => {
    setHiddenKeys((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  /* ── Saved views (persisted) ── */
  const savedViewsKey = `datatable:views:${namespace}`;
  const [savedViews, setSavedViews] = useState(() =>
    savedViewsEnabled ? readStoredJSON(savedViewsKey, []) : []
  );
  const [showViewsMenu, setShowViewsMenu] = useState(false);
  const [newViewName, setNewViewName] = useState("");

  /* ── Close Filters/Columns/Views panels on outside click ── */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target)) {
        setShowFilters(false);
        setShowColumnMenu(false);
        setShowViewsMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveCurrentView = () => {
    const name = newViewName.trim();
    if (!name) return;
    const view = {
      name,
      searchTerm,
      filterValues,
      sortState,
      pageSize,
      hiddenKeys: Array.from(hiddenKeys),
      columnOrder,
    };
    const next = [...savedViews.filter((v) => v.name !== name), view];
    setSavedViews(next);
    writeStoredJSON(savedViewsKey, next);
    setNewViewName("");
  };
  const applyView = (view) => {
    setSearchInput(view.searchTerm ?? "");
    setSearchTerm(view.searchTerm ?? "");
    setFilterValues(view.filterValues ?? {});
    setSortState(view.sortState ?? null);
    setPageSize(view.pageSize ?? limit);
    if (columnPrefsEnabled) {
      setHiddenKeys(new Set(view.hiddenKeys ?? []));
      if (view.columnOrder?.length) setColumnOrder(view.columnOrder);
    }
    setShowViewsMenu(false);
  };
  const deleteView = (name) => {
    const next = savedViews.filter((v) => v.name !== name);
    setSavedViews(next);
    writeStoredJSON(savedViewsKey, next);
  };

  /* ── Row selection ── */
  const [selectedIds, setSelectedIds] = useState(() => new Set());
  const toggleRowSelected = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* ── Query ── */
  const hasActiveFilters = filters.some((f) => filterValues[f.key] !== "All");
  const clearFilters = () =>
    setFilterValues(Object.fromEntries(filters.map((f) => [f.key, "All"])));

  const getFilterOptionLabel = (f, value) => {
    if (f.options === "derive") return value; // derived options are raw field values
    const match = f.options.find((opt) => (typeof opt === "object" ? opt.value : opt) === value);
    if (!match) return value;
    return typeof match === "object" ? match.label : match;
  };

  const queryParams = {
    page: currentPage,
    limit: pageSize,
    searchTerm,
    filters: filterValues,
    sort: sortState,
    extraParams,
  };

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: [queryKey, queryParams],
    queryFn: () => fetchFn(queryParams),
    keepPreviousData: true,
    staleTime: 30_000,
  });

  const rows = data?.data ?? [];
  const totalItems = data?.total ?? 0;
  const totalPages =
    data?.totalPages ?? (totalItems > 0 ? Math.ceil(totalItems / pageSize) : 1);

  const handlePageChange = (newPage) => {
    if (!isLoading && !isFetching && newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const toggleSort = (col) => {
    if (!col.sortable) return;
    const key = col.sortKey ?? col.key;
    setSortState((prev) => {
      if (!prev || prev.key !== key) return { key, dir: "asc" };
      if (prev.dir === "asc") return { key, dir: "desc" };
      return null;
    });
  };

  const handleExport = () => {
    const exportCols = columns.filter(
      (c) => !c.excludeFromExport && typeof c.exportValue === "function"
    );
    const exportRows = rows.map((row) =>
      Object.fromEntries(exportCols.map((c) => [c.exportHeader ?? c.header, c.exportValue(row)]))
    );
    const ws = XLSX.utils.json_to_sheet(exportRows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, exportSheetName);
    XLSX.writeFile(wb, exportFileName);
  };

  const selectableRows = rows.filter((r) => canSelect(r));
  const allSelected = selectableRows.length > 0 && selectableRows.every((r) => selectedIds.has(rowKey(r)));
  const someSelected = !allSelected && selectableRows.some((r) => selectedIds.has(rowKey(r)));
  const toggleSelectAll = () => {
    setSelectedIds((prev) => {
      if (allSelected) return new Set();
      return new Set(selectableRows.map((r) => rowKey(r)));
    });
  };
  const selectAllRef = useRef(null);
  useEffect(() => {
    if (selectAllRef.current) selectAllRef.current.indeterminate = someSelected;
  }, [someSelected]);

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = totalItems === 0 ? 0 : Math.min(currentPage * pageSize, totalItems);

  const emptyStateActions = (
    <div className="flex flex-col items-center gap-3 py-2">
      <p className="text-muted-foreground">{emptyMessage}</p>
      <div className="flex gap-2">
        {hasActiveFilters ? (
          <Button size="sm" variant="outline" onClick={clearFilters}>Clear filters</Button>
        ) : (
          onAddNew && (
            <Button size="sm" className="dark:bg-orange-600" onClick={onAddNew}>
              {AddNewIcon && <AddNewIcon size={14} />}
              <span className={AddNewIcon ? "ml-1" : ""}>{addNewLabel}</span>
            </Button>
          )
        )}
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in duration-500 p-4 bg-background text-foreground">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {title && <h1 className="text-3xl font-bold tracking-tight">{title}</h1>}
          {subtitle && <p className="text-sm mt-1 text-muted-foreground">{subtitle}</p>}
        </div>

        {(actions.length > 0 || onAddNew || exportable) && (
          <div className="grid grid-cols-2 gap-3 md:flex">
            {actions.map((action, i) => {
              const Icon = action.icon;
              return (
                <Button key={i} variant={action.variant ?? "default"} className="dark:bg-orange-600" onClick={action.onClick}>
                  {Icon && <Icon size={16} />}
                  <span className="ml-2">{action.label}</span>
                </Button>
              );
            })}
            {exportable && (
              <Button variant="default" className="dark:bg-orange-600" onClick={handleExport}>
                <FileSpreadsheet size={16} /> <span className="ml-2">Export Excel</span>
              </Button>
            )}
            {onAddNew && (
              <Button onClick={onAddNew} className="dark:bg-orange-600">
                {AddNewIcon && <AddNewIcon size={16} />}
                <span className="ml-2">{addNewLabel}</span>
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Search + Filter toggle + Columns + Views */}
      {(searchable || filters.length > 0 || columnPrefsEnabled || savedViewsEnabled) && (
        <Card ref={toolbarRef}>
          <CardContent className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {searchable && (
              <div className="md:col-span-5 relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input className="pl-10" placeholder={searchPlaceholder} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
              </div>
            )}

            <div className="md:col-span-5 flex flex-wrap gap-2">
              {filters.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters((v) => !v)}
                  className={cn("gap-1", hasActiveFilters && "border-orange-400 text-orange-600")}
                >
                  <Filter size={14} />
                  Filters
                  {hasActiveFilters && (
                    <span className="ml-1 bg-orange-500 text-white rounded-full text-[10px] px-1.5 py-0.5">ON</span>
                  )}
                </Button>
              )}
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-slate-500">
                  <X size={13} /> Clear
                </Button>
              )}

              {columnPrefsEnabled && (
                <div className="relative">
                  <Button variant="outline" size="sm" onClick={() => setShowColumnMenu((v) => !v)} className="gap-1">
                    <SlidersHorizontal size={14} /> Columns
                  </Button>
                  {showColumnMenu && (
                    <div className="absolute z-20 mt-2 w-64 rounded-md border border-border bg-popover shadow-lg p-2">
                      {columnOrder.map((key, idx) => {
                        const col = columns.find((c) => c.key === key);
                        if (!col) return null;
                        const isHidden = hiddenKeys.has(key);
                        return (
                          <div key={key} className="flex items-center justify-between gap-2 py-1 px-1 rounded hover:bg-muted">
                            <label className="flex items-center gap-2 text-sm flex-1 cursor-pointer">
                              <input type="checkbox" checked={!isHidden} onChange={() => toggleColumnVisibility(key)} />
                              <span className={cn(isHidden && "text-muted-foreground line-through")}>{col.header}</span>
                            </label>
                            <div className="flex gap-0.5">
                              <button disabled={idx === 0} onClick={() => moveColumn(key, -1)} className="p-0.5 disabled:opacity-30 text-muted-foreground hover:text-foreground">
                                <ChevronUp size={14} />
                              </button>
                              <button disabled={idx === columnOrder.length - 1} onClick={() => moveColumn(key, 1)} className="p-0.5 disabled:opacity-30 text-muted-foreground hover:text-foreground">
                                <ChevronDown size={14} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {savedViewsEnabled && (
                <div className="relative">
                  <Button variant="outline" size="sm" onClick={() => setShowViewsMenu((v) => !v)} className="gap-1">
                    <Bookmark size={14} /> Views
                  </Button>
                  {showViewsMenu && (
                    <div className="absolute z-20 mt-2 w-72 rounded-md border border-border bg-popover shadow-lg p-2">
                      {savedViews.length === 0 && (
                        <p className="text-xs text-muted-foreground px-1 py-1">No saved views yet.</p>
                      )}
                      {savedViews.map((v) => (
                        <div key={v.name} className="flex items-center justify-between gap-2 py-1 px-1 rounded hover:bg-muted">
                          <button className="text-sm text-left flex-1" onClick={() => applyView(v)}>{v.name}</button>
                          <button onClick={() => deleteView(v.name)} className="text-muted-foreground hover:text-destructive">
                            <X size={13} />
                          </button>
                        </div>
                      ))}
                      <div className="flex gap-1 mt-2 pt-2 border-t border-border">
                        <Input
                          className="h-8 text-xs"
                          placeholder="Name this view..."
                          value={newViewName}
                          onChange={(e) => setNewViewName(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && saveCurrentView()}
                        />
                        <Button size="sm" className="h-8 dark:bg-orange-600" onClick={saveCurrentView}>Save</Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="md:col-span-2 flex justify-end">
              <span className="text-xs font-medium px-2 py-1 rounded-md bg-muted text-foreground">{totalItems}</span>
            </div>
          </CardContent>

          {showFilters && filters.length > 0 && (
            <CardContent className="pt-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 border-t">
              {filters.map((f) => {
                const rawOptions =
                  f.options === "derive"
                    ? Array.from(new Set(rows.map((r) => r[f.deriveField]).filter(Boolean)))
                    : f.options;
                const options = [
                  { value: "All", label: f.allLabel ?? `All ${f.label}s` },
                  ...rawOptions.map((opt) => (typeof opt === "object" ? opt : { value: opt, label: opt })),
                ];
                return (
                  <div key={f.key}>
                    <label className="text-xs text-muted-foreground mb-1 block">{f.label}</label>
                    <Select onValueChange={(v) => setFilterValues((prev) => ({ ...prev, [f.key]: v }))} value={filterValues[f.key]}>
                      <SelectTrigger><SelectValue placeholder="All" /></SelectTrigger>
                      <SelectContent>
                        {options.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                );
              })}
            </CardContent>
          )}
        </Card>
      )}

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 -mt-3">
          {filters
            .filter((f) => filterValues[f.key] !== "All")
            .map((f) => (
              <span
                key={f.key}
                className="inline-flex items-center gap-1.5 text-xs bg-muted border border-border px-2.5 py-1 rounded-full"
              >
                <span className="text-muted-foreground">{f.label}:</span>
                <span className="font-medium">{getFilterOptionLabel(f, filterValues[f.key])}</span>
                <button
                  onClick={() => setFilterValues((prev) => ({ ...prev, [f.key]: "All" }))}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X size={11} />
                </button>
              </span>
            ))}
        </div>
      )}

      {/* Bulk action bar */}
      {selectable && selectedIds.size > 0 && (
        <div className="flex items-center justify-between px-4 py-2.5 rounded-md bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900">
          <span className="text-sm font-medium">{selectedIds.size} selected</span>
          <div className="flex items-center gap-2">
            {bulkActions.map((a, i) => {
              const Icon = a.icon;
              return (
                <Button
                  key={i}
                  size="sm"
                  variant={a.variant ?? "outline"}
                  onClick={() => a.onClick(rows.filter((r) => selectedIds.has(rowKey(r))), { clearSelection: () => setSelectedIds(new Set()) })}
                >
                  {Icon && <Icon size={14} />} <span className={Icon ? "ml-1" : ""}>{a.label}</span>
                </Button>
              );
            })}
            <Button size="sm" variant="ghost" onClick={() => setSelectedIds(new Set())}>Clear</Button>
          </div>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-center">
            <AlertCircle className="text-destructive" size={28} />
            <div>
              <p className="font-medium">Couldn't load data.</p>
              <p className="text-sm text-muted-foreground mt-1">{error?.message ?? "Something went wrong."}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => refetch()} className="gap-1">
              <RotateCcw size={14} /> Retry
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Table (desktop) */}
      {!isError && (
        <Card className="flex-1 overflow-hidden">
          <div className="overflow-x-auto hidden md:block">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 border-b z-10 bg-muted/60 border-border">
                <tr>
                  {selectable && (
                    <th className="p-4 w-10">
                      <input ref={selectAllRef} type="checkbox" checked={allSelected} onChange={toggleSelectAll} />
                    </th>
                  )}
                  {visibleColumns.map((c) => {
                    const key = c.sortKey ?? c.key;
                    const isSorted = sortState?.key === key;
                    return (
                      <th
                        key={c.key}
                        onClick={() => toggleSort(c)}
                        className={cn(
                          "p-4 font-semibold text-muted-foreground",
                          c.sortable && "cursor-pointer select-none hover:text-foreground",
                          c.headerClassName
                        )}
                      >
                        <span className="inline-flex items-center gap-1">
                          {c.header}
                          {c.sortable &&
                            (isSorted ? (
                              sortState.dir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />
                            ) : (
                              <ArrowUpDown size={12} className="opacity-30" />
                            ))}
                        </span>
                      </th>
                    );
                  })}
                  {(onRowClick || rowActions.length > 0) && (
                    <th className="p-4 font-semibold text-muted-foreground text-right">Actions</th>
                  )}
                </tr>
              </thead>

              <tbody className={cn("divide-y divide-border", isFetching && !isLoading && "opacity-60 transition-opacity")}>
                {rows.map((row) => {
                  const id = rowKey(row);
                  const rowClickable = Boolean(onRowClick) && canView(row);
                  const visibleRowActions = rowActions.filter((a) => !a.show || a.show(row));
                  return (
                    <tr
                      key={id}
                      onClick={() => rowClickable && onRowClick(row)}
                      className={cn(
                        "group transition-colors",
                        rowClickable && "cursor-pointer hover:bg-muted/50",
                        onRowClick && !rowClickable && "opacity-60"
                      )}
                    >
                      {selectable && (
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          {canSelect(row) && (
                            <input type="checkbox" checked={selectedIds.has(id)} onChange={() => toggleRowSelected(id)} />
                          )}
                        </td>
                      )}
                      {visibleColumns.map((c) => (
                        <td key={c.key} className={cn("p-4", c.cellClassName)}>{c.render(row)}</td>
                      ))}
                      {(onRowClick || rowActions.length > 0) && (
                        <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-2">
                            {visibleRowActions.map((a, i) => {
                              const Icon = a.icon;
                              return (
                                <button
                                  key={i}
                                  title={a.label}
                                  onClick={() => a.onClick(row)}
                                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                                >
                                  {Icon && <Icon size={14} />}
                                </button>
                              );
                            })}
                            {rowClickable && (
                              <>
                                <span className="text-xs text-muted-foreground font-medium px-2 hidden md:inline">View Details</span>
                                <ArrowLeft className="rotate-180 text-muted-foreground" size={16} />
                              </>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}

                {isLoading &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={`skeleton-${i}`}>
                      {selectable && (
                        <td className="p-4"><div className="h-4 w-4 rounded bg-muted animate-pulse" /></td>
                      )}
                      {visibleColumns.map((c) => (
                        <td key={c.key} className="p-4">
                          <div className="h-4 rounded bg-muted animate-pulse" style={{ width: `${45 + ((i * 13 + c.key.length * 7) % 40)}%` }} />
                        </td>
                      ))}
                      {(onRowClick || rowActions.length > 0) && (
                        <td className="p-4"><div className="h-4 w-16 rounded bg-muted animate-pulse ml-auto" /></td>
                      )}
                    </tr>
                  ))}

                {!isLoading && rows.length === 0 && (
                  <tr>
                    <td colSpan={visibleColumns.length + 2} className="p-12">
                      <div className="flex justify-center">{emptyStateActions}</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cards (mobile) */}
          <div className="md:hidden divide-y divide-border">
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <div key={`m-skeleton-${i}`} className="p-4 flex flex-col gap-2">
                  <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
                  <div className="h-3 w-1/2 rounded bg-muted animate-pulse" />
                  <div className="h-3 w-1/3 rounded bg-muted animate-pulse" />
                </div>
              ))}

            {!isLoading && rows.length === 0 && (
              <div className="p-8">{emptyStateActions}</div>
            )}

            {!isLoading &&
              rows.map((row) => {
                const id = rowKey(row);
                const rowClickable = Boolean(onRowClick) && canView(row);
                const visibleRowActions = rowActions.filter((a) => !a.show || a.show(row));
                return (
                  <div
                    key={id}
                    onClick={() => rowClickable && onRowClick(row)}
                    className={cn(
                      "p-4 flex flex-col gap-2.5",
                      rowClickable && "cursor-pointer active:bg-muted/50",
                      onRowClick && !rowClickable && "opacity-60"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      {selectable && canSelect(row) && (
                        <input
                          type="checkbox"
                          checked={selectedIds.has(id)}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => toggleRowSelected(id)}
                          className="mt-1 shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                        {visibleColumns.map((c, idx) =>
                          idx === 0 ? (
                            <div key={c.key} className="font-medium">{c.render(row)}</div>
                          ) : (
                            <div key={c.key} className="flex items-center justify-between gap-2 text-sm">
                              <span className="text-xs text-muted-foreground">{c.header}</span>
                              <span className="text-right">{c.render(row)}</span>
                            </div>
                          )
                        )}
                      </div>
                      {rowClickable && <ArrowLeft className="rotate-180 text-muted-foreground shrink-0 mt-1" size={16} />}
                    </div>
                    {visibleRowActions.length > 0 && (
                      <div className="flex gap-2 justify-end pt-1" onClick={(e) => e.stopPropagation()}>
                        {visibleRowActions.map((a, i) => {
                          const Icon = a.icon;
                          return (
                            <button
                              key={i}
                              onClick={() => a.onClick(row)}
                              className="flex items-center gap-1 text-xs px-2 py-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                            >
                              {Icon && <Icon size={13} />} {a.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>

          {/* Pagination + page size */}
          <div className="flex flex-col md:flex-row justify-between items-center p-4 border-t border-border bg-card gap-3">
            <div className="flex items-center gap-3">
              <p className="text-sm text-muted-foreground whitespace-nowrap">
                {totalItems === 0 ? "Showing 0 results" : `Showing ${startItem} to ${endItem} of ${totalItems} results`}
              </p>
              <Select value={String(pageSize)} onValueChange={(v) => setPageSize(parseInt(v, 10))}>
                <SelectTrigger className="h-8 w-[90px] text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {pageSizeOptions.map((n) => (
                    <SelectItem key={n} value={String(n)}>{n} / page</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 whitespace-nowrap">
              <Button size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || isLoading || isFetching} className="flex items-center dark:bg-orange-600 gap-1">
                <ChevronLeft size={16} /> Previous
              </Button>
              <span className="px-3 py-2 rounded-lg text-sm font-semibold bg-muted text-foreground">{currentPage} / {totalPages}</span>
              <Button size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0 || isLoading || isFetching} className="flex items-center dark:bg-orange-600 gap-1">
                Next <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}