
/**
 * Builds a multipart FormData payload from react-hook-form values.
 * Used by any module's `buildPayload` so every form doesn't reinvent this.
 *
 * - `fileFields`: names of fields whose value is a FileList (from a `<input type="file">`
 *   registered via react-hook-form). Only the first file is appended.
 * - `skipEmpty`: drop empty-string fields entirely (matches the common
 *   "don't overwrite server value with blank" pattern for edit forms).
 * - `transform`: optional per-field value transformer, e.g. to ISO-format a date
 *   before sending: `{ join_date: (v) => new Date(v).toISOString() }`.
 */
export function buildMultipartFormData(values, { fileFields = [], skipEmpty = true, transform = {} } = {}) {
  const formData = new FormData();

  Object.entries(values).forEach(([key, rawValue]) => {
    if (key.endsWith("_display") || key.endsWith("_preview")) return; // UI-only fields
    const value = transform[key] ? transform[key](rawValue) : rawValue;

    if (value === undefined || value === null) return;
    if (skipEmpty && typeof value === "string" && value.trim() === "") return;

    if (fileFields.includes(key)) {
      if (value && value.length > 0) {
        formData.append(key, value[0], value[0].name);
      }
      return;
    }

    formData.append(key, value);
  });

  return formData;
}

/** Same idea, but for endpoints that expect plain JSON instead of multipart. */
export function buildJsonPayload(values, { skipEmpty = true, transform = {} } = {}) {
  const payload = {};
  Object.entries(values).forEach(([key, rawValue]) => {
    if (key.endsWith("_display") || key.endsWith("_preview")) return;
    const value = transform[key] ? transform[key](rawValue) : rawValue;
    if (value === undefined || value === null) return;
    if (skipEmpty && typeof value === "string" && value.trim() === "") return;
    payload[key] = value;
  });
  return payload;
}