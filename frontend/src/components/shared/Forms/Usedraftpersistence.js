import { useEffect, useRef, useState } from "react";

function safeGet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — draft saving just silently no-ops */
  }
}
function safeRemove(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

/**
 * Autosaves the form to localStorage (debounced) while it's dirty, so a
 * crashed tab or accidental refresh doesn't lose a half-filled form.
 *
 * Only meaningful for CREATE forms — for edit forms the "source of truth"
 * on mount is the fetched record, and blindly restoring a stale draft over
 * that would silently reintroduce old edits. Pass `enabled: !isEditMode`.
 *
 * File fields can't survive JSON serialization (a FileList has no
 * enumerable own properties), so a restored draft will not bring back a
 * previously-selected file — that's expected, not a bug.
 */
export default function useDraftPersistence({ storageKey, form, enabled = true, debounceMs = 600 }) {
  const key = storageKey ? `formdraft:${storageKey}` : null;
  const [hasDraft, setHasDraft] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!enabled || !key) return;
    setHasDraft(Boolean(safeGet(key)));
  }, [enabled, key]);

  useEffect(() => {
    if (!enabled || !key) return undefined;
    const subscription = form.watch((values) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (form.formState.isDirty) safeSet(key, values);
      }, debounceMs);
    });
    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, key, debounceMs]);

  const restoreDraft = () => {
    if (!key) return;
    const draft = safeGet(key);
    if (draft) form.reset(draft);
    setHasDraft(false);
  };
  const discardDraft = () => {
    if (!key) return;
    safeRemove(key);
    setHasDraft(false);
  };

  return { hasDraft: enabled && hasDraft, restoreDraft, discardDraft, clearDraft: discardDraft };
}