import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

/**
 * 
 * useEntityForm
 * 
 * The data/mutation half of FormGenerator. Handles:
 *  - detecting create vs. edit (from a URL param, or an explicit id for
 *    forms opened as dialogs rather than routed pages)
 *  - fetching the existing record when editing
 *  - react-hook-form instance + reset-on-fetch
 *  - create/update mutations with toast + cache invalidation
 *  - post-success redirect (routed forms) or callback (dialogs)
 *  - cross-field/async validation, confirm-before-submit, upload progress
 *
 * Kept separate from FormGenerator's rendering so a module can use it
 * directly if it ever needs a fully custom layout.
 * 
 */
export default function useEntityForm({
  queryKey,
  idParam = "id",
  explicitId, // pass this for dialog forms instead of relying on the URL
  fetchOne,
  createFn,
  updateFn,
  defaultValues = {},
  mapDataToForm,
  buildPayload,
  successMessage,
  successRedirect, // string | (data) => string — routed forms only
  onSuccess, // (data, wasEdit) => void — always called, use for dialogs to close
  extraInvalidateKeys = [],
  formOptions = {},
  // [{ fields: ["start_date","end_date"], attachTo: "end_date",
  //    validate: (values, ctx) => true | "error message" }]
  // `validate` can be async — e.g. an API uniqueness check. Runs after
  // normal per-field RHF validation passes, before the payload is built.
  crossFieldRules = [],
  // true, or (values, ctx) => true | string | false. A truthy result shows
  // a native confirm() (the string becomes the message) before the mutation
  // fires — e.g. confirming a status change to "Retired".
  confirmSubmit,
}) {
  const navigate = useNavigate();
  const params = useParams();
  const activeId = explicitId ?? params[idParam] ?? null;
  const isEditMode = Boolean(activeId);
  const qc = useQueryClient();
  const [uploadProgress, setUploadProgress] = useState(0);

  const { data: fetchedData, isLoading: isFetchingEntity } = useQuery({
    queryKey: [queryKey, activeId],
    enabled: isEditMode && Boolean(fetchOne),
    queryFn: () => fetchOne(activeId),
    staleTime: 30_000,
  });

  const form = useForm({ mode: "onBlur", defaultValues, ...formOptions });

  useEffect(() => {
    if (isEditMode && fetchedData) {
      form.reset(mapDataToForm ? mapDataToForm(fetchedData) : fetchedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchedData, isEditMode]);

  const handleError = (err) => {
    const msg = err?.response?.data?.message || err?.message || "Something went wrong.";
    toast.error(msg);
  };

  const afterSuccess = (data, wasEdit) => {
    setUploadProgress(0);
    toast.success(
      typeof successMessage === "function"
        ? successMessage(data, wasEdit)
        : successMessage ?? (wasEdit ? "Updated successfully." : "Created successfully.")
    );
    qc.invalidateQueries({ queryKey: [queryKey] });
    if (wasEdit) qc.invalidateQueries({ queryKey: [queryKey, activeId] });
    extraInvalidateKeys.forEach((k) => qc.invalidateQueries({ queryKey: [k] }));
    onSuccess?.(data, wasEdit);
    if (successRedirect) {
      form.reset();
      setTimeout(() => navigate(typeof successRedirect === "function" ? successRedirect(data) : successRedirect), 800);
    }
  };

  // Passed through to createFn/updateFn as a second argument so a module
  // can forward it to axios as `{ onUploadProgress }` for a real progress
  // bar on file-heavy submissions. Ignored by functions that don't use it.
  const progressMeta = {
    onUploadProgress: (e) => {
      if (!e.total) return;
      setUploadProgress(Math.round((e.loaded * 100) / e.total));
    },
  };

  const createMutation = useMutation({
    mutationFn: (payload) => createFn(payload, progressMeta),
    onSuccess: (data) => afterSuccess(data, false),
    onError: (err) => {
      setUploadProgress(0);
      handleError(err);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload) => updateFn(activeId, payload, progressMeta),
    onSuccess: (data) => afterSuccess(data, true),
    onError: (err) => {
      setUploadProgress(0);
      handleError(err);
    },
  });

  const isProcessing = createMutation.isLoading || updateMutation.isLoading;

  const submit = form.handleSubmit(async (values) => {
    if (crossFieldRules.length > 0) {
      let hasError = false;
      for (const rule of crossFieldRules) {
        const result = await rule.validate(values, { isEditMode, activeId });
        if (result !== true) {
          form.setError(rule.attachTo ?? rule.fields?.[0], { type: "cross-field", message: result || "Invalid value." });
          hasError = true;
        }
      }
      if (hasError) return;
    }

    if (confirmSubmit) {
      const result = typeof confirmSubmit === "function" ? confirmSubmit(values, { isEditMode }) : confirmSubmit;
      if (result) {
        const message = typeof result === "string" ? result : "Are you sure you want to save these changes?";
        if (!window.confirm(message)) return;
      }
    }

    const payload = buildPayload ? buildPayload(values, { isEditMode }) : values;
    if (isEditMode) await updateMutation.mutateAsync(payload);
    else await createMutation.mutateAsync(payload);
  });

  return { form, isEditMode, activeId, isFetchingEntity, isProcessing, uploadProgress, submit, navigate };
}