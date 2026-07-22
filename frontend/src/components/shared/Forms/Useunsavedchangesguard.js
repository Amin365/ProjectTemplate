import { useEffect, useCallback } from "react";

/**
 * Guards against losing unsaved form data.
 *  - Browser refresh/close/tab-close: native `beforeunload` prompt.
 *  - In-app close/cancel (dialog backdrop, drawer close, "Back to List"):
 *    call the returned `confirmDiscard()` before actually closing/navigating;
 *    it shows a confirm() only if the form is dirty, and returns whether
 *    it's safe to proceed.
 *
 * Not wired to react-router's data-router `useBlocker` on purpose — that
 * API requires a data router setup this codebase may not use everywhere.
 * Explicit confirmDiscard() calls at each exit point work regardless of
 * router mode and keep the guard's behavior predictable.
 */
export default function useUnsavedChangesGuard(isDirty, { enabled = true, message = "You have unsaved changes. Leave anyway?" } = {}) {
  useEffect(() => {
    if (!enabled) return;
    const handler = (e) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty, enabled]);

  const confirmDiscard = useCallback(() => {
    if (!enabled || !isDirty) return true;
    return window.confirm(message);
  }, [enabled, isDirty, message]);

  return { confirmDiscard };
}




