import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab focus inside `containerRef` while `active`, closes on Escape,
 * and restores focus to whatever was focused before the dialog/drawer
 * opened (typically the button that triggered it).
 */
export default function useFocusTrap(active, containerRef, onEscape) {
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!active) return;
    previouslyFocused.current = document.activeElement;

    const getFocusable = () => Array.from(containerRef.current?.querySelectorAll(FOCUSABLE_SELECTOR) ?? []);

    // Focus the first focusable element once the container has painted.
    const raf = requestAnimationFrame(() => getFocusable()[0]?.focus());

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onEscape?.();
        return;
      }
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);
}