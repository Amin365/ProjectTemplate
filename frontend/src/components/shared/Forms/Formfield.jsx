import React, { useMemo, useState } from "react";
import { useWatch } from "react-hook-form";

const baseInputClasses = (hasError) => `
  w-full px-3 py-2.5 rounded-xl text-sm md:text-base
  border ${hasError ? "border-red-500 ring-1 ring-red-300" : "border-slate-200 dark:border-gray-700"}
  bg-white/80 dark:bg-gray-900/70
  text-slate-800 dark:text-gray-100
  shadow-sm
  focus:outline-none focus:ring-2 focus:ring-orange-400/60 focus:border-orange-500
  transition-all duration-200
`;

const defaultT = (key, fallback, vars) => {
  if (!vars) return fallback;
  return Object.entries(vars).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, String(v)), fallback);
};

/**
 * ── FIELD SHAPE 
 * {
 *   name, label,
 *   type: "text" | "email" | "tel" | "number" | "date" | "textarea"
 *       | "select" | "radio" | "file" | "checkbox" | "readonly",
 *
 *   validation?: RHF rules | (depValues) => RHF rules
 *     // Function form enables conditional required-ness, e.g.
 *     // { name: "reason", dependsOn: ["status"],
 *     //   validation: (v) => ({ required: v.status === "Retired" ? "Reason is required." : false }) }
 *
 *   options?: [{ value, label }] | (depValues) => [{ value, label }]
 *     // Function form enables dependent selects, e.g. City options
 *     // computed from a chosen Region — declare `dependsOn: ["region"]`.
 *
 *   dependsOn?: string[]
 *     // Names of OTHER fields this field's `visible` / `disabled` /
 *     // function-form `options` / function-form `validation` read. Only
 *     // these fields are subscribed to (via useWatch) — not the whole
 *     // form — so typing in an unrelated field never re-renders this one.
 *     // If you use `values` inside those functions without declaring the
 *     // field here, it won't be reactive (evaluated once, using stale data).
 *
 *   colSpan?: 2, placeholder?, helperText?, rows?,
 *   accept?: "image/*",              // file
 *   multiple?: true,                 // file — allow selecting more than one
 *   previewFrom?: (depValues) => url,// file — preview an already-uploaded file on edit
 *   previewClassName?: string,
 *   value?: string,                  // readonly type — the displayed value
 *   visible?: (depValues) => boolean,
 *   disabled?: (depValues) => boolean,
 *   render?: (form, depValues) => JSX, // fully custom field, bypasses `type`
 * }
 *
 * `readOnly` (component prop, not field prop): when true, every field
 * renders as a static label/value pair instead of an editable control —
 * used for review steps and print/summary views.
 */
export default function FormField({ form, field, readOnly = false, t = defaultT }) {
  const { register, formState: { errors }, control } = form;

  // Scoped subscriptions: only this field's own value, and only the
  // specific other fields it declared via `dependsOn` — never the whole form.
  const ownValue = useWatch({ control, name: field.name });
  const depArray = useWatch({ control, name: field.dependsOn ?? [] });
  const depValues = useMemo(() => {
    if (!field.dependsOn) return {};
    const arr = Array.isArray(depArray) ? depArray : [depArray];
    return Object.fromEntries(field.dependsOn.map((n, i) => [n, arr[i]]));
  }, [depArray, field.dependsOn]);

  if (field.visible && !field.visible(depValues)) return null;

  if (field.render) {
    return <div className={field.colSpan === 2 ? "sm:col-span-2" : ""}>{field.render(form, depValues)}</div>;
  }

  const resolvedOptions = typeof field.options === "function" ? field.options(depValues) : field.options;
  const resolvedValidation = typeof field.validation === "function" ? field.validation(depValues) : field.validation;

  const error = errors[field.name];
  const isDisabled = typeof field.disabled === "function" ? field.disabled(depValues) : field.disabled;
  const wrapperClass = `relative w-full mb-6 group ${field.colSpan === 2 ? "sm:col-span-2" : ""}`;

  if (readOnly) {
    return (
      <ReadOnlyField field={field} value={ownValue} options={resolvedOptions} wrapperClass={wrapperClass} />
    );
  }

  const labelEl = field.type !== "checkbox" && field.label && (
    <label
      htmlFor={field.name}
      className={`block text-sm font-semibold tracking-wide mb-1 ${
        error ? "text-red-500" : "text-slate-600 dark:text-slate-300"
      }`}
    >
      {field.label} {resolvedValidation?.required && <span className="text-red-500">*</span>}
    </label>
  );
  const helper = field.helperText && !error && (
    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{field.helperText}</p>
  );
  const errorEl = error && <p className="mt-1 text-xs text-red-500" role="alert">{error.message}</p>;
  const ariaInvalid = error ? { "aria-invalid": "true" } : {};

  if (field.type === "select") {
    return (
      <div className={wrapperClass}>
        {labelEl}
        <div className="relative">
          <select
            id={field.name}
            {...register(field.name, resolvedValidation)}
            disabled={isDisabled}
            {...ariaInvalid}
            className={`${baseInputClasses(error)} appearance-none cursor-pointer ${isDisabled ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <option value="" disabled hidden>{t("selectPlaceholder", "Select {label}...", { label: field.label })}</option>
            {(resolvedOptions || []).map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▼</span>
        </div>
        {helper}{errorEl}
      </div>
    );
  }

  if (field.type === "radio") {
    return (
      <div className={wrapperClass} role="radiogroup" aria-label={field.label}>
        {labelEl}
        <div className="flex flex-wrap gap-4">
          {(resolvedOptions || []).map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-xl border border-slate-200 dark:border-gray-700 hover:bg-slate-100/80 dark:hover:bg-gray-800/80 transition-colors"
            >
              <input
                type="radio"
                value={opt.value}
                {...register(field.name, resolvedValidation)}
                className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-500"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{opt.label}</span>
            </label>
          ))}
        </div>
        {helper}{errorEl}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className={wrapperClass}>
        {labelEl}
        <textarea
          id={field.name}
          {...register(field.name, resolvedValidation)}
          placeholder={field.placeholder}
          rows={field.rows || 4}
          {...ariaInvalid}
          className={baseInputClasses(error)}
        />
        {helper}{errorEl}
      </div>
    );
  }

  if (field.type === "file") {
    return (
      <FileField
        form={form}
        field={field}
        ownValue={ownValue}
        depValues={depValues}
        resolvedValidation={resolvedValidation}
        wrapperClass={wrapperClass}
        labelEl={labelEl}
        helper={helper}
        errorEl={errorEl}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className={`${wrapperClass} flex items-center gap-3`}>
        <input
          type="checkbox"
          id={field.name}
          {...register(field.name, resolvedValidation)}
          className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
        />
        <label htmlFor={field.name} className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {field.label}
        </label>
      </div>
    );
  }

  if (field.type === "readonly") {
    return (
      <div className={wrapperClass}>
        {labelEl}
        <input
          value={field.value ?? ""}
          readOnly
          className={`${baseInputClasses(false)} bg-slate-50/80 dark:bg-gray-900/70`}
        />
        {helper}
      </div>
    );
  }

  // text, email, tel, number, date (default)
  return (
    <div className={wrapperClass}>
      {labelEl}
      <input
        id={field.name}
        type={field.type || "text"}
        {...register(field.name, resolvedValidation)}
        placeholder={field.placeholder}
        disabled={isDisabled}
        {...ariaInvalid}
        className={baseInputClasses(error)}
      />
      {helper}{errorEl}
    </div>
  );
}

/* ── File field: drag-and-drop, multi-file, filename list ── */
function FileField({ form, field, ownValue, depValues, resolvedValidation, wrapperClass, labelEl, helper, errorEl }) {
  const { register, setValue } = form;
  const [isDragging, setIsDragging] = useState(false);
  const { onChange, ...regRest } = register(field.name, resolvedValidation);

  const files = ownValue && ownValue.length > 0 ? Array.from(ownValue) : [];
  const isImagePreviewable = files.length === 1 && files[0].type?.startsWith("image/");
  const previewSrc = isImagePreviewable ? URL.createObjectURL(files[0]) : field.previewFrom?.(depValues);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files;
    if (!dropped || dropped.length === 0) return;
    setValue(field.name, field.multiple ? dropped : [dropped[0]], { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className={wrapperClass}>
      {labelEl}
      <label
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        htmlFor={field.name}
        className={`flex flex-col items-center justify-center gap-1 w-full px-4 py-6 rounded-xl border-2 border-dashed text-center cursor-pointer transition-colors ${
          isDragging ? "border-orange-500 bg-orange-50/60 dark:bg-orange-950/20" : "border-slate-300 dark:border-gray-700 hover:border-orange-400"
        }`}
      >
        <span className="text-sm text-slate-600 dark:text-slate-300">
          {files.length > 0
            ? field.multiple ? `${files.length} file(s) selected` : files[0].name
            : "Drag & drop, or click to browse"}
        </span>
        <span className="text-xs text-slate-400">{field.multiple ? "Multiple files allowed" : "Single file"}</span>
        <input
          id={field.name}
          type="file"
          accept={field.accept || "image/*"}
          multiple={field.multiple}
          className="sr-only"
          onChange={onChange}
          {...regRest}
        />
      </label>

      {files.length > 1 && (
        <ul className="mt-2 text-xs text-slate-500 list-disc list-inside">
          {files.map((f, i) => (
            <li key={i}>{f.name}</li>
          ))}
        </ul>
      )}

      {previewSrc && (
        <img
          src={previewSrc}
          alt={`${field.label || field.name} preview`}
          className={field.previewClassName || "mt-3 w-28 h-28 object-cover rounded-full border border-slate-200"}
        />
      )}
      {helper}{errorEl}
    </div>
  );
}

/* ── Read-only display: review steps, print/summary views ── */
function ReadOnlyField({ field, value, options, wrapperClass }) {
  if (field.type === "checkbox") {
    return (
      <div className={wrapperClass}>
        <span className="text-xs text-slate-400">{field.label}</span>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{value ? "Yes" : "No"}</p>
      </div>
    );
  }
  if (field.type === "file") {
    const files = value && value.length > 0 ? Array.from(value) : [];
    return (
      <div className={wrapperClass}>
        <span className="text-xs text-slate-400">{field.label}</span>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
          {files.length > 0 ? files.map((f) => f.name).join(", ") : field.previewFrom ? "Uploaded" : "—"}
        </p>
      </div>
    );
  }

  let display = value;
  if (value === undefined || value === null || value === "") display = "—";
  else if (field.type === "select" || field.type === "radio") {
    display = (options || []).find((o) => String(o.value) === String(value))?.label ?? value;
  } else if (field.type === "date" && value) {
    display = new Date(value).toLocaleDateString();
  }

  return (
    <div className={wrapperClass}>
      <span className="text-xs text-slate-400">{field.label}</span>
      <p className="text-sm font-medium text-slate-800 dark:text-slate-100 break-words">{display}</p>
    </div>
  );
}