import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import api from '@/app/api/apislice';
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  website: "", // honeypot; real users never see/fill this
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

export default function ContactDialog({ open, onClose }) {
  const location = useLocation();
  const isSchoolDemo = location.pathname === "/school" || location.pathname.startsWith("/school/");
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(createEmptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) setErrors({});
  }, [open]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your full name";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email";
    }
    if (isSchoolDemo && !form.schoolName.trim()) {
      e.schoolName = "Please enter the school name";
    }
    if (form.studentCount && Number(form.studentCount) < 1) {
      e.studentCount = "Student count must be greater than zero";
    }
    return e;
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

      const response = await api.post('/xaltech/contacts', payload);
      toast.success(
        response?.data?.message ||
          (isSchoolDemo
            ? "Your school demo request has been received."
            : "Thanks — we will respond within 24 hours.")
      );
      setForm(createEmptyForm());
      onClose();
    } catch (err) {
      const message = err?.response?.data?.message || "Submission failed. Please try again later.";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="p-0 gap-0 max-w-[520px] max-h-[92vh] overflow-y-auto rounded-2xl border-none shadow-2xl">
        <div className="relative bg-[#0B1F3A] px-7 pt-7 pb-6 overflow-hidden">
          <div
            className="absolute w-64 h-64 rounded-full blur-3xl -top-24 -right-16 pointer-events-none"
            style={{ background: `${TEAL}33` }}
          />
          <div className="relative flex items-center gap-2.5 mb-5">
            <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
              <rect x="3" y="3" width="12" height="12" rx="3" fill={TEAL} />
              <rect x="25" y="25" width="12" height="12" rx="3" fill={TEAL} opacity="0.55" />
              <rect x="25" y="3" width="12" height="12" rx="3" fill={BLUE} />
              <rect x="3" y="25" width="12" height="12" rx="3" fill={BLUE} opacity="0.55" />
              <path d="M15 15 L25 25 M25 15 L15 25" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <span className="font-bold text-[15px] tracking-tight text-white">
              Xal<span className="text-[#5EEAD4]">Tech</span>
            </span>
          </div>

          <h3 className="relative text-[22px] font-bold text-white leading-snug mb-2">
            {isSchoolDemo ? "Book a school demo" : "Let's discuss your project"}
          </h3>
          <p className="relative text-[13.5px] text-white/60 leading-relaxed mb-4 max-w-md">
            {isSchoolDemo
              ? "Tell us about your school so we can prepare a focused walkthrough for your team."
              : "Tell us the problem you want solved and how to reach you — an engineer will follow up directly."}
          </p>

          <div className="relative inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-[12px] font-mono text-white/75">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4] animate-pulse" />
            We'll respond within 24 hours
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-7 py-6 flex flex-col gap-5 bg-white">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 flex flex-col gap-4">
              <div>
                <div className="text-[12px] font-semibold text-[#0B1F3A]">School details</div>
                <p className="mt-1 text-[11.5px] text-slate-500">Used only to prepare your demo and follow-up.</p>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <div className="flex items-center justify-between gap-3 pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={submitting}
              className="text-slate-500 hover:text-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="bg-[#13B8A6] hover:bg-[#5EEAD4] text-[#0B1F3A] font-bold rounded-full gap-2 px-6"
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

          <div className="flex items-center gap-2 pt-3 border-t border-slate-100 text-[11.5px] text-slate-400">
            <Sparkles size={12} className="text-[#13B8A6]" />
            Your details are only used to respond to this request.
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
