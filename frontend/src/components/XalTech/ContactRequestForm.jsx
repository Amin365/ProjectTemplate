import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import api from "@/app/api/apislice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const TEAL = "#13B8A6";
const BLUE = "#2878FF";

const createEmptyForm = () => ({
  name: "",
  email: "",
  phone: "",
  message: "",
  schoolName: "",
  schoolRole: "",
  schoolLocation: "",
  studentCount: "",
  preferredDemoTime: "",
  website: "",
});

function Field({ label, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-mono tracking-wide uppercase text-slate-400">
        {label}
      </label>
      {children}
      {error && <span className="text-[12px] text-rose-500">{error}</span>}
    </div>
  );
}

export default function ContactRequestForm({
  isSchoolDemo = false,
  onCancel,
  onSuccess,
  source = "xaltech_web",
}) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState(createEmptyForm);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Please enter your full name";

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email";
    }

    if (isSchoolDemo && !form.schoolName.trim()) {
      nextErrors.schoolName = "Please enter the school name";
    }

    if (form.studentCount && Number(form.studentCount) < 1) {
      nextErrors.studentCount = "Student count must be greater than zero";
    }

    return nextErrors;
  };

  const handleChange = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;

    setSubmitting(true);

    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
        requestType: isSchoolDemo ? "school_demo" : "general",
        website: form.website,
        source,
        ...(isSchoolDemo
          ? {
              schoolName: form.schoolName,
              schoolRole: form.schoolRole,
              schoolLocation: form.schoolLocation,
              studentCount: form.studentCount || null,
              preferredDemoTime: form.preferredDemoTime,
            }
          : {}),
      };

      const response = await api.post("/xaltech/contacts", payload);
      const message =
        response?.data?.message ||
        (isSchoolDemo
          ? "Your school demo request has been received."
          : "Thanks — we will respond within 24 hours.");

      toast.success(message);
      setForm(createEmptyForm());
      setErrors({});

      if (onSuccess) {
        onSuccess();
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Submission failed. Please try again later.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white px-7 py-12 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 size={28} />
        </div>
        <h2 className="mt-5 text-2xl font-bold text-[#0B1F3A]">Request received</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          {isSchoolDemo
            ? "Thank you. The XalTech team will contact you to arrange your school management system demo."
            : "Thank you. The XalTech team will contact you shortly."}
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="relative overflow-hidden bg-[#0B1F3A] px-7 pb-6 pt-7">
        <div
          className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: `${TEAL}33` }}
        />

        <div className="relative mb-5 flex items-center gap-2.5">
          <svg width="26" height="26" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="12" height="12" rx="3" fill={TEAL} />
            <rect x="25" y="25" width="12" height="12" rx="3" fill={TEAL} opacity="0.55" />
            <rect x="25" y="3" width="12" height="12" rx="3" fill={BLUE} />
            <rect x="3" y="25" width="12" height="12" rx="3" fill={BLUE} opacity="0.55" />
            <path d="M15 15 L25 25 M25 15 L15 25" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <span className="text-[15px] font-bold tracking-tight text-white">
            Xal<span className="text-[#5EEAD4]">Tech</span>
          </span>
        </div>

        <h2 className="relative mb-2 text-[22px] font-bold leading-snug text-white">
          {isSchoolDemo ? "Book a school demo" : "Let's discuss your project"}
        </h2>
        <p className="relative mb-4 max-w-md text-[13.5px] leading-relaxed text-white/60">
          {isSchoolDemo
            ? "Tell us about your school so we can prepare a focused walkthrough for your team."
            : "Tell us the problem you want solved and how to reach you — an engineer will follow up directly."}
        </p>

        <div className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 font-mono text-[12px] text-white/75">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5EEAD4]" />
          We'll respond within 24 hours
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white px-7 py-6">
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange("website")}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <Field label="Full name" error={errors.name}>
          <Input
            value={form.name}
            onChange={handleChange("name")}
            placeholder="Your name"
            maxLength={120}
            disabled={submitting}
            className={`h-11 ${errors.name ? "border-rose-400 focus-visible:ring-rose-300" : "focus-visible:ring-[#13B8A6]"}`}
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Email" error={errors.email}>
            <Input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="you@company.com"
              maxLength={254}
              disabled={submitting}
              className={`h-11 ${errors.email ? "border-rose-400 focus-visible:ring-rose-300" : "focus-visible:ring-[#13B8A6]"}`}
            />
          </Field>

          <Field label="Phone (optional)">
            <Input
              value={form.phone}
              onChange={handleChange("phone")}
              placeholder="+251…"
              maxLength={32}
              disabled={submitting}
              className="h-11 focus-visible:ring-[#13B8A6]"
            />
          </Field>
        </div>

        {isSchoolDemo && (
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div>
              <div className="text-[12px] font-semibold text-[#0B1F3A]">School details</div>
              <p className="mt-1 text-[11.5px] text-slate-500">
                Used only to prepare your demo and follow-up.
              </p>
            </div>

            <Field label="School name" error={errors.schoolName}>
              <Input
                value={form.schoolName}
                onChange={handleChange("schoolName")}
                placeholder="Your school name"
                maxLength={255}
                disabled={submitting}
                className={errors.schoolName ? "border-rose-400" : ""}
              />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Your role">
                <Input
                  value={form.schoolRole}
                  onChange={handleChange("schoolRole")}
                  placeholder="Principal, owner, ICT…"
                  maxLength={120}
                  disabled={submitting}
                />
              </Field>

              <Field label="Approx. students" error={errors.studentCount}>
                <Input
                  type="number"
                  min="1"
                  max="1000000"
                  value={form.studentCount}
                  onChange={handleChange("studentCount")}
                  placeholder="e.g. 850"
                  disabled={submitting}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="School location">
                <Input
                  value={form.schoolLocation}
                  onChange={handleChange("schoolLocation")}
                  placeholder="City / region"
                  maxLength={255}
                  disabled={submitting}
                />
              </Field>

              <Field label="Preferred demo time">
                <Input
                  value={form.preferredDemoTime}
                  onChange={handleChange("preferredDemoTime")}
                  placeholder="e.g. Mon morning"
                  maxLength={120}
                  disabled={submitting}
                />
              </Field>
            </div>
          </div>
        )}

        <Field label={isSchoolDemo ? "What would you like to see?" : "Brief message"}>
          <Textarea
            value={form.message}
            onChange={handleChange("message")}
            placeholder={
              isSchoolDemo
                ? "Tell us the modules or problems you want the demo to focus on."
                : "What's slowing your team down right now?"
            }
            maxLength={2000}
            rows={4}
            disabled={submitting}
            className="resize-none focus-visible:ring-[#13B8A6]"
          />
        </Field>

        <div className={`flex items-center gap-3 pt-1 ${onCancel ? "justify-between" : "justify-end"}`}>
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={submitting}
              className="text-slate-500 hover:text-slate-700"
            >
              Cancel
            </Button>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="gap-2 rounded-full bg-[#13B8A6] px-6 font-bold text-[#0B1F3A] hover:bg-[#5EEAD4]"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                {isSchoolDemo ? "Book demo" : "Send message"} <ArrowRight size={16} />
              </>
            )}
          </Button>
        </div>

        <div className="flex items-center gap-2 border-t border-slate-100 pt-3 text-[11.5px] text-slate-400">
          <Sparkles size={12} className="text-[#13B8A6]" />
          Your details are only used to respond to this request.
        </div>
      </form>
    </>
  );
}
