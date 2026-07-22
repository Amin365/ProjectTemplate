import React, { useState, useEffect, useRef, useId } from "react";
import { useFormState } from "react-hook-form";
import { CheckCircle, ChevronLeft, ChevronRight, Loader, Save, X, RotateCcw } from "lucide-react";
import FormField from "./FormField";
import useEntityForm from "./useEntityForm";
import useUnsavedChangesGuard from "./useUnsavedChangesGuard";
import useDraftPersistence from "./useDraftPersistence";
import useFocusTrap from "./useFocusTrap";
import { cn } from "@/lib/utils";

const GlassCard = ({ children, className = "" }) => (
  <div className={`backdrop-blur-md bg-white/80 dark:bg-gray-900/80 p-8 rounded-2xl shadow-2xl border border-slate-200/70 dark:border-gray-700/80 ${className}`}>
    {children}
  </div>
);

const defaultT = (key, fallback, vars) => {
  if (!vars) return fallback;
  return Object.entries(vars).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, String(v)), fallback);
};

/**
 * ─────────────────────────────────────────────────────────────────────────
 * Generic FormGenerator
 * ─────────────────────────────────────────────────────────────────────────
 * Four prepared modes (chrome): "wizard" | "panel" | "dialog" | "drawer".
 * Content (steps vs flat fields) is independent of chrome — pass either
 * `steps` or `fields`/`sections` in any mode. See normalizeSteps() below.
 *
 * ── THIS VERSION ADDS ───────────────────────────────────────────────────
 * - No global form-wide watch anywhere in this file. Each FormField
 *   subscribes only to its own value plus whatever it declares via
 *   `dependsOn` (see FormField.jsx) — typing in field A never re-renders
 *   field B unless B declared a dependency on A. Step navigation reads
 *   `form.getValues()` (a non-reactive snapshot) instead of watching.
 * - Step click-to-jump: click any step in either stepper to go straight
 *   there (no forced linear Next-by-Next navigation).
 * - Step error indicators: a step with an invalid field shows a red dot,
 *   via `useFormState` (a proper scoped RHF subscription, not a poll).
 * - Upload progress: pass `onUploadProgress` through from your
 *   createFn/updateFn to axios and a progress bar renders automatically
 *   (see useEntityForm.js).
 * - `confirmSubmit`: true, or (values, ctx) => true|string|false — shows a
 *   confirm() before a destructive-feeling save (see useEntityForm.js).
 * - `readOnly`: renders the same field schema as a static summary — a
 *   review step before final submit, or a printable/read view. Can also be
 *   set per-step via `step.readOnly = true` (e.g. a "Review" step at the
 *   end of an otherwise-editable wizard, reusing earlier steps' field defs
 *   so it shows live values with zero data duplication).
 * - `t(key, fallback, vars)`: every built-in string routes through this,
 *   so a module can localize without forking the component.
 * - `onStepChange(stepIndex, step)` and `onAbandon({ step, values })`:
 *   lightweight hooks for analytics (which step people reach / leave from).
 * ─────────────────────────────────────────────────────────────────────────
 */
export default function FormGenerator({
  mode = "panel",

  title,
  editTitle,
  description,

  // Data layer — see useEntityForm.js
  queryKey,
  idParam = "id",
  explicitId,
  fetchOne,
  createFn,
  updateFn,
  defaultValues = {},
  mapDataToForm,
  buildPayload,
  successMessage,
  successRedirect,
  onSuccess,
  extraInvalidateKeys = [],
  crossFieldRules = [],
  confirmSubmit,

  // Content
  steps,
  fields = [],
  sections,
  submitLabel = "Save",

  // dialog / drawer only
  open = true,
  onClose,

  // wizard / panel only
  backTo,

  // Safety
  unsavedChangesGuard = true,
  persistDraft = false,

  // Display
  readOnly = false,

  // i18n
  t = defaultT,

  // Analytics
  onStepChange,
  onAbandon,

  onReady,
}) {
  const submittedRef = useRef(false);
  const lastStepRef = useRef(1);

  const entityForm = useEntityForm({
    queryKey, idParam, explicitId, fetchOne, createFn, updateFn, defaultValues,
    mapDataToForm, buildPayload, successMessage, successRedirect, extraInvalidateKeys,
    crossFieldRules, confirmSubmit,
    onSuccess: (data, wasEdit) => {
      submittedRef.current = true;
      draft.clearDraft();
      onSuccess?.(data, wasEdit);
    },
  });

  useEffect(() => {
    onReady?.(entityForm.form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Analytics: report someone leaving with unsaved, unsubmitted changes.
  useEffect(() => {
    return () => {
      if (onAbandon && entityForm.form.formState.isDirty && !submittedRef.current) {
        onAbandon({ step: lastStepRef.current, values: entityForm.form.getValues() });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStepChange = (n, step) => {
    lastStepRef.current = n;
    onStepChange?.(n, step);
  };

  const draftKey = persistDraft ? (typeof persistDraft === "string" ? persistDraft : `${queryKey ?? "form"}:${mode}`) : null;
  const draft = useDraftPersistence({
    storageKey: draftKey,
    form: entityForm.form,
    enabled: Boolean(persistDraft) && !entityForm.isEditMode,
  });

  const { confirmDiscard } = useUnsavedChangesGuard(entityForm.form.formState.isDirty, { enabled: unsavedChangesGuard });

  const resolvedSteps = normalizeSteps({ steps, fields, sections, title });
  const shared = { title, editTitle, description, ...entityForm, steps: resolvedSteps, submitLabel, confirmDiscard, draft, readOnly, t, onStepChange: handleStepChange };

  if (mode === "wizard") return <WizardShell {...shared} backTo={backTo} />;
  if (mode === "dialog") return <DialogShell {...shared} open={open} onClose={onClose} />;
  if (mode === "drawer") return <DrawerShell {...shared} open={open} onClose={onClose} />;
  return <PanelShell {...shared} backTo={backTo} />;
}

/* ─────────────────────────────────────────────────────────────────────────
 * Shared content model — used by all four shells
 * ───────────────────────────────────────────────────────────────────────*/

function normalizeSteps({ steps, fields, sections, title }) {
  if (steps && steps.length > 0) return steps;
  return [{ key: "single", name: title ?? null, fields, sections }];
}

function stepFieldNames(step) {
  return (step.sections ? step.sections.flatMap((g) => g.fields) : step.fields ?? []).map((f) => f.name);
}

function useStepNav(steps, form, onStepChange) {
  const [step, setStep] = useState(1);
  const total = steps.length;
  const current = steps[step - 1];
  const isFirst = step === 1;
  const isLast = step === total;

  // Scoped, proper RHF subscription — re-renders only this component when
  // errors change, regardless of which component originally called useForm().
  const { errors } = useFormState({ control: form.control });
  const stepHasError = (s) => stepFieldNames(s).some((n) => errors[n]);

  useEffect(() => {
    onStepChange?.(step, current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const next = async (e) => {
    e?.preventDefault();
    const values = form.getValues(); // non-reactive snapshot — no watch needed
    const names = (current.sections ? current.sections.flatMap((g) => g.fields) : current.fields ?? [])
      .filter((f) => !f.visible || f.visible(values))
      .map((f) => f.name);
    const isValid = await form.trigger(names);
    if (isValid) setStep((s) => Math.min(total, s + 1));
  };
  const prev = (e) => {
    e?.preventDefault();
    setStep((s) => Math.max(1, s - 1));
  };
  const goTo = (n) => setStep(Math.max(1, Math.min(total, n)));

  return { step, current, total, isFirst, isLast, next, prev, goTo, stepHasError };
}

function StepFields({ step, form, readOnly, t }) {
  const stepReadOnly = step.readOnly ?? readOnly;
  const groups = step.sections ?? [{ title: null, fields: step.fields ?? [] }];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
      {groups.map((g, gi) => (
        <React.Fragment key={gi}>
          {g.title && (
            <div className="sm:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-1 pb-2 border-b border-slate-200/70 dark:border-gray-700/60">
                {g.title}
              </h3>
            </div>
          )}
          {(g.fields ?? []).map((f) => (
            <FormField key={f.name} form={form} field={f} readOnly={stepReadOnly} t={t} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

// Big icon-circle stepper — mode="wizard" only. Click any step to jump.
function FullStepper({ steps, step, onJump, stepHasError }) {
  return (
    <div
      className="flex justify-between items-center mb-10"
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-label={`Step ${step} of ${steps.length}`}
    >
      {steps.map((s, i) => {
        const n = i + 1;
        const Icon = s.icon || Save;
        const state = step === n ? "current" : step > n ? "complete" : "upcoming";
        const hasError = stepHasError(s);
        return (
          <button
            key={s.key ?? n}
            type="button"
            onClick={() => onJump(n)}
            className="flex flex-col items-center flex-1 group"
            aria-current={state === "current" ? "step" : undefined}
            aria-label={`${s.name}${hasError ? " (has errors)" : state === "complete" ? " (completed)" : state === "current" ? " (current step)" : ""}`}
          >
            <div className="relative">
              <div
                className={cn(
                  "flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full border transition-all duration-300 group-hover:scale-105",
                  state === "current"
                    ? "bg-orange-600 text-white border-orange-500 shadow-xl scale-105"
                    : state === "complete"
                    ? "bg-emerald-50 text-emerald-600 border-emerald-300"
                    : "bg-slate-200 text-slate-500 border-slate-300"
                )}
              >
                {state === "complete" ? <CheckCircle size={18} aria-hidden="true" /> : <Icon size={18} aria-hidden="true" />}
              </div>
              {hasError && (
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-red-500 border-2 border-white dark:border-gray-900" aria-hidden="true" />
              )}
            </div>
            <p className={cn("mt-2 text-xs md:text-sm text-center font-medium", state === "current" ? "text-orange-600" : "text-slate-500")}>
              {s.name}
            </p>
          </button>
        );
      })}
    </div>
  );
}

// Compact bar-segment stepper — mode="panel"/"dialog"/"drawer" when steps.length > 1.
function CompactStepper({ steps, step, onJump, stepHasError }) {
  const current = steps[step - 1];
  return (
    <div
      className="mb-5"
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={steps.length}
      aria-label={`Step ${step} of ${steps.length}${current?.name ? `: ${current.name}` : ""}`}
    >
      <div className="flex gap-1.5 mb-2">
        {steps.map((s, i) => {
          const n = i + 1;
          const hasError = stepHasError(s);
          return (
            <button
              key={s.key ?? i}
              type="button"
              onClick={() => onJump(n)}
              aria-current={n === step ? "step" : undefined}
              aria-label={`${s.name ?? `Step ${n}`}${hasError ? " (has errors)" : ""}`}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                hasError ? "bg-red-400" : n <= step ? "bg-orange-500" : "bg-slate-200 dark:bg-gray-700"
              )}
            />
          );
        })}
      </div>
      <p className="text-xs text-slate-500 flex items-center gap-1">
        Step {step} of {steps.length}{current?.name ? ` — ${current.name}` : ""}
      </p>
    </div>
  );
}

function LoadingBlock({ compact = false }) {
  return (
    <div className={cn("flex flex-col gap-3 justify-center items-center", compact ? "h-32" : "h-40")} role="status" aria-live="polite">
      <Loader className="animate-spin text-orange-600" size={compact ? 28 : 36} aria-hidden="true" />
      {!compact && <p className="text-sm text-slate-500">Loading details...</p>}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function DraftBanner({ draft }) {
  if (!draft?.hasDraft) return null;
  return (
    <div className="flex items-center justify-between gap-3 mb-5 px-4 py-3 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900 text-sm">
      <div className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
        <RotateCcw size={15} /> A previous draft was found.
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={draft.restoreDraft} className="font-semibold text-orange-700 dark:text-orange-300 hover:underline">Restore</button>
        <button type="button" onClick={draft.discardDraft} className="text-slate-500 hover:underline">Discard</button>
      </div>
    </div>
  );
}

function UploadProgressBar({ isProcessing, uploadProgress }) {
  if (!isProcessing || !uploadProgress) return null;
  return (
    <div className="mb-4">
      <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-gray-700 overflow-hidden">
        <div className="h-full bg-orange-500 transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
      </div>
      <p className="text-xs text-slate-400 mt-1">Uploading... {uploadProgress}%</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Wizard shell — full page, big stepper
 * ───────────────────────────────────────────────────────────────────────*/
function WizardShell({ form, isEditMode, isFetchingEntity, isProcessing, uploadProgress, submit, navigate, steps, title, editTitle, description, backTo, submitLabel, confirmDiscard, draft, readOnly, t, onStepChange }) {
  const { step, current, total, isFirst, isLast, next, prev, goTo, stepHasError } = useStepNav(steps, form, onStepChange);

  const handleBack = () => {
    if (!confirmDiscard()) return;
    navigate(backTo);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <div className="flex justify-between items-start mb-10 gap-4">
          <div>
            <h1 className="text-xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
              {isEditMode ? editTitle ?? title : title}
            </h1>
            {description && <p className="mt-2 text-sm text-slate-500 max-w-xl">{description}</p>}
          </div>
          {backTo && (
            <button type="button" onClick={handleBack} className="flex items-center gap-2 px-4 py-2.5 bg-white/80 text-slate-600 shadow-lg hover:bg-slate-100 rounded-xl border border-slate-200/70 transition-all text-xs md:text-sm font-semibold whitespace-nowrap">
              <ChevronLeft size={18} /> <span>{t("back", "Back to List")}</span>
            </button>
          )}
        </div>

        {total > 1 && <FullStepper steps={steps} step={step} onJump={goTo} stepHasError={stepHasError} />}

        <GlassCard className="min-h-[420px]">
          {isEditMode && isFetchingEntity ? (
            <LoadingBlock />
          ) : (
            <form onSubmit={submit}>
              <DraftBanner draft={draft} />
              {total > 1 && (
                <div className="flex items-baseline justify-between mb-6">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                    {t("stepLabel", "Step {step}", { step })} <span className="text-sm md:text-base font-normal text-slate-500">{current.name}</span>
                  </h2>
                  <span className="text-xs md:text-sm text-slate-400">{step} / {total}</span>
                </div>
              )}

              <StepFields step={current} form={form} readOnly={readOnly} t={t} />

              {!readOnly && (
                <div className="mt-10 pt-6 border-t border-slate-200/70">
                  <UploadProgressBar isProcessing={isProcessing} uploadProgress={uploadProgress} />
                  <div className="flex justify-between">
                    {!isFirst ? (
                      <button type="button" onClick={prev} disabled={isProcessing} className="px-5 py-2.5 border border-slate-300 text-slate-700 text-sm md:text-base font-semibold rounded-xl hover:bg-slate-100/80 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-60 whitespace-nowrap">
                        <ChevronLeft size={18} /> {t("previous", "Previous")}
                      </button>
                    ) : <div />}

                    {!isLast ? (
                      <button type="button" onClick={next} disabled={isProcessing} className="px-6 py-2.5 bg-orange-600 text-white text-sm md:text-base font-semibold rounded-xl hover:bg-orange-700 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-60 whitespace-nowrap">
                        {t("next", "Next Step")} <ChevronRight size={18} />
                      </button>
                    ) : (
                      <button type="submit" disabled={isProcessing} className="px-7 py-2.5 bg-emerald-600 text-white text-sm md:text-base font-semibold rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-300/60 disabled:opacity-60 whitespace-nowrap">
                        {isProcessing ? (<><Loader size={18} className="animate-spin" /> {t("processing", "Processing...")}</>) : (<><Save size={18} /> {t("save", isEditMode ? "Update" : "Finalize & Save")}</>)}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Panel shell — full page, single card, optional compact stepper
 * ───────────────────────────────────────────────────────────────────────*/
function PanelShell({ form, isEditMode, isFetchingEntity, isProcessing, uploadProgress, submit, navigate, steps, title, editTitle, description, backTo, submitLabel, confirmDiscard, draft, readOnly, t, onStepChange }) {
  const { step, current, total, isFirst, isLast, next, prev, goTo, stepHasError } = useStepNav(steps, form, onStepChange);

  const handleExit = () => {
    if (!confirmDiscard()) return;
    navigate(backTo);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto animate-in fade-in duration-500">
        <div className="flex justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {isEditMode ? editTitle ?? title : title}
            </h1>
            {description && <p className="mt-2 text-sm text-slate-500 max-w-xl">{description}</p>}
          </div>
          {backTo && (
            <button type="button" onClick={handleExit} className="flex items-center gap-2 px-4 py-2.5 bg-white/80 text-slate-600 shadow-lg hover:bg-slate-100 rounded-xl border border-slate-200/70 transition-all text-xs md:text-sm font-semibold whitespace-nowrap">
              <ChevronLeft size={18} /> <span>{t("back", "Back")}</span>
            </button>
          )}
        </div>

        <GlassCard>
          {isEditMode && isFetchingEntity ? (
            <LoadingBlock />
          ) : (
            <form onSubmit={submit} className="space-y-6">
              <DraftBanner draft={draft} />
              {total > 1 && <CompactStepper steps={steps} step={step} onJump={goTo} stepHasError={stepHasError} />}
              <StepFields step={current} form={form} readOnly={readOnly} t={t} />

              {!readOnly && (
                <div className="pt-6 border-t border-slate-200/70">
                  <UploadProgressBar isProcessing={isProcessing} uploadProgress={uploadProgress} />
                  <div className="flex justify-end gap-3">
                    {!isFirst && (
                      <button type="button" onClick={prev} disabled={isProcessing} className="px-5 py-2.5 border border-slate-300 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100/80 transition-colors disabled:opacity-60">
                        {t("previous", "Previous")}
                      </button>
                    )}
                    {isFirst && backTo && (
                      <button type="button" onClick={handleExit} disabled={isProcessing} className="px-5 py-2.5 border border-slate-300 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100/80 transition-colors disabled:opacity-60">
                        {t("cancel", "Cancel")}
                      </button>
                    )}
                    {!isLast ? (
                      <button type="button" onClick={next} disabled={isProcessing} className="px-6 py-2.5 bg-orange-600 text-white text-sm font-semibold rounded-xl hover:bg-orange-700 transition-colors disabled:opacity-60">
                        {t("next", "Next")}
                      </button>
                    ) : (
                      <button type="submit" disabled={isProcessing} className="px-7 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-lg disabled:opacity-60">
                        {isProcessing ? (<><Loader size={16} className="animate-spin" /> {t("saving", "Saving...")}</>) : (<><Save size={16} /> {submitLabel}</>)}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </form>
          )}
        </GlassCard>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Dialog shell — centered modal. Escape-to-close, focus trap, focus restore.
 * ───────────────────────────────────────────────────────────────────────*/
function DialogShell({ form, isEditMode, isFetchingEntity, isProcessing, uploadProgress, submit, steps, title, editTitle, description, open, onClose, submitLabel, confirmDiscard, draft, readOnly, t, onStepChange }) {
  const { step, current, total, isFirst, isLast, next, prev, goTo, stepHasError } = useStepNav(steps, form, onStepChange);
  const containerRef = useRef(null);
  const titleId = useId();

  const handleClose = () => {
    if (isProcessing) return;
    if (!confirmDiscard()) return;
    onClose?.();
  };

  useFocusTrap(open, containerRef, handleClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div ref={containerRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-slate-200/70 dark:border-gray-700/80 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 id={titleId} className="text-lg font-bold text-slate-900 dark:text-white">{isEditMode ? editTitle ?? title : title}</h2>
            {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
          </div>
          <button type="button" onClick={handleClose} disabled={isProcessing} aria-label="Close dialog" className="text-slate-400 hover:text-slate-600 disabled:opacity-50">
            <X size={20} />
          </button>
        </div>

        {isEditMode && isFetchingEntity ? (
          <LoadingBlock compact />
        ) : (
          <form onSubmit={submit} className="space-y-5">
            <DraftBanner draft={draft} />
            {total > 1 && <CompactStepper steps={steps} step={step} onJump={goTo} stepHasError={stepHasError} />}
            <StepFields step={current} form={form} readOnly={readOnly} t={t} />

            {!readOnly && (
              <>
                <UploadProgressBar isProcessing={isProcessing} uploadProgress={uploadProgress} />
                <div className="flex justify-between gap-2 pt-2">
                  {!isFirst ? (
                    <button type="button" onClick={prev} disabled={isProcessing} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100/80 disabled:opacity-60">
                      {t("previous", "Previous")}
                    </button>
                  ) : (
                    <button type="button" onClick={handleClose} disabled={isProcessing} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100/80 disabled:opacity-60">
                      {t("cancel", "Cancel")}
                    </button>
                  )}
                  {!isLast ? (
                    <button type="button" onClick={next} disabled={isProcessing} className="px-5 py-2 bg-orange-600 text-white text-sm font-semibold rounded-xl hover:bg-orange-700 flex items-center gap-2 disabled:opacity-60">
                      {t("next", "Next")} <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button type="submit" disabled={isProcessing} className="px-5 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 flex items-center gap-2 disabled:opacity-60">
                      {isProcessing ? (<><Loader size={14} className="animate-spin" /> {t("saving", "Saving...")}</>) : (<><Save size={14} /> {submitLabel}</>)}
                    </button>
                  )}
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
 * Drawer shell — slide-over from the right. Escape-to-close, focus trap,
 * focus restore.
 * ───────────────────────────────────────────────────────────────────────*/
function DrawerShell({ form, isEditMode, isFetchingEntity, isProcessing, uploadProgress, submit, steps, title, editTitle, description, open, onClose, submitLabel, confirmDiscard, draft, readOnly, t, onStepChange }) {
  const { step, current, total, isFirst, isLast, next, prev, goTo, stepHasError } = useStepNav(steps, form, onStepChange);
  const formId = useId();
  const titleId = useId();
  const containerRef = useRef(null);

  const handleClose = () => {
    if (isProcessing) return;
    if (!confirmDiscard()) return;
    onClose?.();
  };

  useFocusTrap(open, containerRef, handleClose);

  if (!open) return null;

  const isLoadingEntity = isEditMode && isFetchingEntity;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
      <div ref={containerRef} role="dialog" aria-modal="true" aria-labelledby={titleId} className="relative h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl border-l border-slate-200/70 dark:border-gray-700/80 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-start justify-between p-6 border-b border-slate-200/70 dark:border-gray-700/60">
          <div>
            <h2 id={titleId} className="text-lg font-bold text-slate-900 dark:text-white">{isEditMode ? editTitle ?? title : title}</h2>
            {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
          </div>
          <button type="button" onClick={handleClose} disabled={isProcessing} aria-label="Close panel" className="text-slate-400 hover:text-slate-600 disabled:opacity-50">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoadingEntity ? (
            <LoadingBlock compact />
          ) : (
            <form id={formId} onSubmit={submit}>
              <DraftBanner draft={draft} />
              {total > 1 && <CompactStepper steps={steps} step={step} onJump={goTo} stepHasError={stepHasError} />}
              <StepFields step={current} form={form} readOnly={readOnly} t={t} />
            </form>
          )}
        </div>

        {!isLoadingEntity && !readOnly && (
          <div className="p-4 border-t border-slate-200/70 dark:border-gray-700/60">
            <UploadProgressBar isProcessing={isProcessing} uploadProgress={uploadProgress} />
            <div className="flex justify-between gap-2">
              {!isFirst ? (
                <button type="button" onClick={prev} disabled={isProcessing} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100/80 disabled:opacity-60">
                  {t("previous", "Previous")}
                </button>
              ) : (
                <button type="button" onClick={handleClose} disabled={isProcessing} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-semibold rounded-xl hover:bg-slate-100/80 disabled:opacity-60">
                  {t("cancel", "Cancel")}
                </button>
              )}
              {!isLast ? (
                <button type="button" onClick={next} disabled={isProcessing} className="px-5 py-2 bg-orange-600 text-white text-sm font-semibold rounded-xl hover:bg-orange-700 flex items-center gap-2 disabled:opacity-60">
                  {t("next", "Next")} <ChevronRight size={16} />
                </button>
              ) : (
                <button type="submit" form={formId} disabled={isProcessing} className="px-5 py-2 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 flex items-center gap-2 disabled:opacity-60">
                  {isProcessing ? (<><Loader size={14} className="animate-spin" /> {t("saving", "Saving...")}</>) : (<><Save size={14} /> {submitLabel}</>)}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}