import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Logo } from "./Header";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Gift,
  GraduationCap,
  Layers3,
  MessageCircle,
  Network,
  School,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
  WalletCards,
  Workflow,
} from "lucide-react";

const BRAND = {
  navy: "#0B1F3A",
  teal: "#13B8A6",
  mint: "#5EEAD4",
  blue: "#2878FF",
};

const openBookDemo = () => {
  window.dispatchEvent(new Event("open-contact"));
};

function SectionHead({ eyebrow, title, accent, desc, centered = false }) {
  return (
    <div
      className={
        centered
          ? "mx-auto mb-14 max-w-3xl text-center"
          : "mb-14 grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16"
      }
    >
      <div>
        <div
          className={`mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0F8F83] ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-sm bg-[#13B8A6]" />
          {eyebrow}
        </div>
        <h2 className="text-[32px] font-bold leading-[1.08] tracking-tight text-[#0B1F3A] md:text-[44px]">
          {title} <span className="text-[#13B8A6]">{accent}</span>
        </h2>
      </div>
      {desc && (
        <p
          className={`text-[15px] leading-7 text-slate-500 ${
            centered ? "mx-auto mt-5 max-w-2xl" : "max-w-xl"
          }`}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

const HERO_METRICS = [
  { value: "24", label: "Connected modules", icon: Layers3 },
  { value: "1,240+", label: "Students managed", icon: Users },
  { value: "Live", label: "Production system", icon: CheckCircle2 },
];

const WORKFLOW_STEPS = [
  { label: "Admissions", icon: UserRound },
  { label: "Attendance", icon: ClipboardCheck },
  { label: "Exams & grades", icon: BookOpenCheck },
  { label: "Finance", icon: WalletCards },
  { label: "Reports", icon: BarChart3 },
];

function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:ml-auto">
      <div className="absolute -left-8 top-16 hidden h-24 w-24 rounded-full border border-[#13B8A6]/20 lg:block" />
      <div className="absolute -right-5 -top-5 h-24 w-24 rounded-3xl bg-[#2878FF]/5" />

      <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(11,31,58,0.12)]">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1F3A] text-[#5EEAD4]">
              <School size={19} />
            </div>
            <div>
              <div className="text-[13px] font-bold text-[#0B1F3A]">School operations</div>
              <div className="mt-0.5 text-[11px] text-slate-400">Everything moves through one system</div>
            </div>
          </div>
          <Badge className="border border-emerald-200 bg-emerald-50 text-[10px] font-semibold text-emerald-700 hover:bg-emerald-50">
            Live
          </Badge>
        </div>

        <div className="grid grid-cols-3 border-b border-slate-200 bg-slate-50/60">
          {HERO_METRICS.map(({ value, label, icon: Icon }, index) => (
            <div
              key={label}
              className={`px-4 py-5 sm:px-5 ${index !== HERO_METRICS.length - 1 ? "border-r border-slate-200" : ""}`}
            >
              <Icon size={15} className="mb-3 text-[#13B8A6]" />
              <div className="font-mono text-[17px] font-bold text-[#0B1F3A] sm:text-[19px]">{value}</div>
              <div className="mt-1 text-[10.5px] leading-4 text-slate-400">{label}</div>
            </div>
          ))}
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-[12px] font-semibold text-[#0B1F3A]">Connected daily workflow</div>
              <div className="mt-1 text-[11px] text-slate-400">One record continues across every department.</div>
            </div>
            <Workflow size={18} className="text-[#13B8A6]" />
          </div>

          <div className="relative">
            <div className="absolute bottom-5 left-[18px] top-5 w-px bg-slate-200" />
            <div className="space-y-2.5">
              {WORKFLOW_STEPS.map(({ label, icon: Icon }, index) => (
                <div
                  key={label}
                  className="group relative flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3 transition-all hover:border-[#13B8A6]/50 hover:shadow-sm"
                >
                  <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0B1F3A] group-hover:border-[#13B8A6] group-hover:text-[#0F8F83]">
                    <Icon size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] font-semibold text-[#0B1F3A]">{label}</div>
                    <div className="mt-0.5 text-[10.5px] text-slate-400">
                      {index === 0 ? "Create the student record" : "Uses the same connected school data"}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-slate-300">{String(index + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-7 -left-5 hidden w-[220px] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_45px_rgba(11,31,58,0.1)] sm:block">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#13B8A6]/10 text-[#0F8F83]">
            <MessageCircle size={16} />
          </div>
          <div>
            <div className="text-[11.5px] font-bold text-[#0B1F3A]">Parents stay informed</div>
            <p className="mt-1 text-[10.5px] leading-4 text-slate-400">
              Results, reminders, and school updates can follow the same workflow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-24 pt-[132px] md:pb-28 md:pt-[150px]">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden" aria-hidden="true">
        <div className="absolute left-[8%] top-[26%] h-52 w-52 rounded-full bg-[#13B8A6]/[0.045] blur-3xl" />
        <div className="absolute right-[8%] top-[18%] h-64 w-64 rounded-full bg-[#2878FF]/[0.045] blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#13B8A6]/25 bg-[#13B8A6]/5 px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.17em] text-[#0F8F83]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#13B8A6] opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#13B8A6]" />
            </span>
            XalTech School · Live in production
          </div>

          <h1 className="max-w-[720px] text-[42px] font-bold leading-[1.02] tracking-[-0.04em] text-[#0B1F3A] sm:text-[56px] lg:text-[64px]">
            Run the whole school from
            <span className="text-[#13B8A6]"> one connected system.</span>
          </h1>

          <p className="mt-7 max-w-xl text-[16px] leading-7 text-slate-500 md:text-[17px]">
            Admissions, attendance, exams, grades, finance, communication, and reporting stay connected from day one—so every role works from the same reliable school data.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              onClick={openBookDemo}
              className="h-12 rounded-full bg-[#0B1F3A] px-6 font-bold text-white shadow-[0_12px_30px_rgba(11,31,58,0.16)] hover:bg-[#12345c]"
            >
              Book a demo <ArrowRight size={16} className="ml-1" />
            </Button>
            <a
              href="#modules"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-[13px] font-semibold text-[#0B1F3A] transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              Explore the system <ArrowRight size={14} />
            </a>
          </div>

          <div className="mt-9 grid max-w-xl gap-3 border-t border-slate-200 pt-6 sm:grid-cols-3">
            {["Role-based access", "Built for real schools", "Pilot onboarding available"].map((item) => (
              <div key={item} className="flex items-start gap-2 text-[11.5px] leading-5 text-slate-500">
                <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#13B8A6]" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}

const PRODUCT_FEATURES = [
  {
    number: "01",
    icon: Workflow,
    title: "One connected school workflow",
    desc: "Admissions, student records, attendance, exams, grades, finance, and reporting work from the same source of truth.",
  },
  {
    number: "02",
    icon: GraduationCap,
    title: "Built for every school role",
    desc: "Principals, accountants, teachers, students, and administrators each get focused access to the tools they actually need.",
  },
  {
    number: "03",
    icon: BellRing,
    title: "Communication stays close to the data",
    desc: "Announcements, academic updates, and parent communication can be triggered from the same operational records your staff already uses.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Controlled, traceable access",
    desc: "Role permissions and audit history help schools protect sensitive records while keeping important actions accountable.",
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Reports without spreadsheet chasing",
    desc: "Leadership can move from daily activity to useful academic, enrollment, attendance, and finance reporting without rebuilding data manually.",
  },
  {
    number: "06",
    icon: Network,
    title: "Designed to grow as one platform",
    desc: "New school operations can be added without turning the product into disconnected tools because the modules share the same platform foundation.",
  },
];

function Features() {
  return (
    <section className="border-y border-slate-200 bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0F8F83]">
              <span className="h-1.5 w-1.5 rounded-sm bg-[#13B8A6]" />
              Why XalTech School
            </div>
            <h2 className="max-w-md text-[34px] font-bold leading-[1.08] tracking-tight text-[#0B1F3A] md:text-[46px]">
              Built around how school work
              <span className="text-[#13B8A6]"> actually moves.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-slate-500">
              Daily operations stay connected from the first student record to attendance, assessment, finance, communication, and leadership reporting.
            </p>

            <div className="mt-9 rounded-2xl border border-slate-200 bg-slate-50/60 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1F3A] text-[#5EEAD4]">
                  <CheckCircle2 size={17} />
                </span>
                <div>
                  <strong className="block text-[13px] text-[#0B1F3A]">One source of truth</strong>
                  <span className="text-[12px] text-slate-500">Every module shares the same school data.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            {PRODUCT_FEATURES.map((feature, index) => (
              <div
                key={feature.number}
                className={`group grid gap-4 p-6 transition-colors hover:bg-slate-50/70 md:grid-cols-[54px_52px_1fr] md:items-start md:p-7 ${
                  index !== PRODUCT_FEATURES.length - 1 ? "border-b border-slate-200" : ""
                }`}
              >
                <div className="font-mono text-[11px] tracking-[0.16em] text-slate-400">{feature.number}</div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0B1F3A] transition-all group-hover:border-[#13B8A6]/50 group-hover:bg-[#13B8A6]/5 group-hover:text-[#0F8F83]">
                  <feature.icon size={18} />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold tracking-tight text-[#0B1F3A] md:text-[18px]">{feature.title}</h3>
                  <p className="mt-2 max-w-2xl text-[13.5px] leading-6 text-slate-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const MODULE_GROUPS = [
  {
    label: "Administration",
    note: "Control, people, and access",
    modules: [
      { title: "Dashboard", desc: "Live school overview" },
      { title: "Users", desc: "System accounts" },
      { title: "Permissions", desc: "Role-based access" },
      { title: "Employees", desc: "Staff administration" },
    ],
  },
  {
    label: "Academics & People",
    note: "The daily academic engine",
    modules: [
      { title: "Students", desc: "Student lifecycle records" },
      { title: "Teachers", desc: "Profiles and assignments" },
      { title: "Classes", desc: "Rosters and sections" },
      { title: "Subjects", desc: "Curriculum structure" },
      { title: "Time Table", desc: "School scheduling" },
      { title: "Attendance", desc: "Daily presence tracking" },
      { title: "Behavior Records", desc: "Student conduct history" },
    ],
  },
  {
    label: "Assessment",
    note: "From exam setup to final grade",
    modules: [
      { title: "Exams", desc: "Exam planning and results" },
      { title: "Grades", desc: "Gradebooks and calculations" },
      { title: "Grading Rules", desc: "School grading policy" },
    ],
  },
  {
    label: "Enrollment & Progression",
    note: "Move learners through each stage",
    modules: [
      { title: "Admissions", desc: "Application to enrollment" },
      { title: "Academic Years", desc: "Terms and calendars" },
      { title: "Promotions", desc: "Grade-level progression" },
      { title: "Graduation", desc: "Completion and cohorts" },
    ],
  },
  {
    label: "Operations",
    note: "Communication, finance, and oversight",
    modules: [
      { title: "Announcements", desc: "School-wide communication" },
      { title: "Audit Log", desc: "Action history" },
      { title: "System Health", desc: "Platform monitoring" },
      { title: "Finance Overview", desc: "Fees and reporting" },
      { title: "Reports", desc: "Cross-module insights" },
      { title: "School Store", desc: "Inventory and sales" },
    ],
  },
];

function Modules() {
  let moduleNumber = 0;

  return (
    <section id="modules" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="System map"
          title="24 modules,"
          accent="one connected school."
          desc="Not a pile of separate tools. Each module solves a specific workflow while sharing the same users, records, permissions, reporting, and platform foundation."
        />

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(11,31,58,0.06)]">
          {MODULE_GROUPS.map((group, groupIndex) => (
            <div
              key={group.label}
              className={`grid gap-6 p-6 md:grid-cols-[220px_1fr] md:gap-8 md:p-8 ${
                groupIndex !== MODULE_GROUPS.length - 1 ? "border-b border-slate-200" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0B1F3A] font-mono text-[11px] font-bold text-[#5EEAD4]">
                  {String(groupIndex + 1).padStart(2, "0")}
                </div>
                <div className="pt-0.5">
                  <h3 className="text-[15px] font-bold leading-tight text-[#0B1F3A]">{group.label}</h3>
                  <p className="mt-1.5 text-[11.5px] leading-5 text-slate-400">{group.note}</p>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                {group.modules.map((module) => {
                  moduleNumber += 1;
                  const currentNumber = String(moduleNumber).padStart(2, "0");

                  return (
                    <div
                      key={module.title}
                      className="group flex min-h-[82px] items-start gap-3 rounded-xl border border-transparent bg-slate-50/70 px-4 py-3.5 transition-all hover:border-[#13B8A6]/35 hover:bg-white hover:shadow-sm"
                    >
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white font-mono text-[9.5px] font-semibold text-slate-400 transition-colors group-hover:border-[#13B8A6] group-hover:text-[#0F8F83]">
                        {currentNumber}
                      </div>
                      <div>
                        <h4 className="text-[13px] font-bold text-[#0B1F3A]">{module.title}</h4>
                        <p className="mt-1 text-[11.5px] leading-5 text-slate-500">{module.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OperationalProof() {
  const stats = [
    { value: "24", label: "Modules shipped", icon: Layers3 },
    { value: "1,240+", label: "Students managed", icon: Users },
    { value: "100%", label: "Production use", icon: CheckCircle2 },
    { value: "3 mo", label: "Pilot access", icon: CalendarDays },
  ];

  return (
    <section className="border-y border-slate-200 bg-slate-50/60 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0F8F83]">
              <Sparkles size={13} /> Built beyond the prototype stage
            </div>
            <h2 className="max-w-md text-[32px] font-bold leading-tight tracking-tight text-[#0B1F3A] md:text-[40px]">
              A working product, not a presentation.
            </h2>
            <p className="mt-4 max-w-lg text-[14px] leading-7 text-slate-500">
              The platform is designed around real school operations and a reusable XalTech foundation, so schools can start with the workflows they need and expand over time.
            </p>
          </div>

          <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm md:grid-cols-4">
            {stats.map(({ value, label, icon: Icon }, index) => (
              <div
                key={label}
                className={`p-5 md:p-6 ${
                  index % 2 === 0 ? "border-r border-slate-200" : ""
                } ${index < 2 ? "border-b border-slate-200 md:border-b-0" : ""} md:border-r md:last:border-r-0`}
              >
                <Icon size={16} className="mb-5 text-[#13B8A6]" />
                <div className="font-mono text-[23px] font-bold text-[#0B1F3A]">{value}</div>
                <div className="mt-1.5 text-[10.5px] uppercase tracking-wide text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "Is XalTech School live, or just a demo?",
      a: "It is a working production platform designed for real day-to-day school operations, not a static prototype.",
    },
    {
      q: "Can it match our grading system, terms, and academic calendar?",
      a: "Yes. Grading rules, academic years, terms, class structures, and other school settings can be configured around the school's operating model.",
    },
    {
      q: "How long does onboarding take?",
      a: "Timing depends on school size, data migration, and the modules being launched. During the demo we map your current workflow and give you a realistic onboarding plan.",
    },
    {
      q: "Can parents receive school updates?",
      a: "Yes. The platform is designed so academic and operational data can support parent communication such as results, reminders, and announcements through configured integrations.",
    },
  ];

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#0F8F83]">
              FAQ
            </div>
            <h2 className="text-[32px] font-bold leading-tight tracking-tight text-[#0B1F3A] md:text-[40px]">
              Questions schools usually ask before a demo.
            </h2>
            <p className="mt-4 max-w-md text-[14px] leading-7 text-slate-500">
              The demo is focused on your school's actual process, so you can judge the product against the way your team already works.
            </p>
          </div>

          <Accordion type="single" collapsible className="overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 sm:px-6">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`item-${index}`} className="border-slate-200">
                <AccordionTrigger className="py-5 text-left text-[14.5px] font-semibold text-[#0B1F3A] hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[13.5px] leading-6 text-slate-500">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section className="bg-white px-6 pb-24 pt-4">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[30px] bg-[#0B1F3A] p-8 sm:p-10 md:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full border border-[#5EEAD4]/20" />

          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#5EEAD4]">
                <Gift size={13} /> Pilot onboarding available
              </div>
              <h2 className="max-w-2xl text-[30px] font-bold leading-tight tracking-tight text-white md:text-[40px]">
                See how XalTech School would work inside your school.
              </h2>
              <p className="mt-4 max-w-xl text-[14px] leading-6 text-white/55">
                Tell us about your school and the workflows you want to improve. We will prepare the demo around those priorities.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 md:items-end">
              <Button
                size="lg"
                onClick={openBookDemo}
                className="h-12 rounded-full bg-[#13B8A6] px-6 font-bold text-[#0B1F3A] hover:bg-[#5EEAD4]"
              >
                Book a demo <ArrowRight size={16} className="ml-1" />
              </Button>
              <div className="flex items-center gap-2 text-[10.5px] text-white/40">
                <Clock3 size={12} /> Short discovery call · focused product walkthrough
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0B1F3A] px-6 pb-8 pt-16 text-white/60">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-sm text-[13px] leading-6 text-white/45">
              XalTech builds connected ERP systems and practical software for organizations that need clearer, faster daily operations.
            </p>
          </div>
          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">Product</div>
            <div className="space-y-2 text-[13px]">
              <a href="#modules" className="block hover:text-[#5EEAD4]">School modules</a>
              <button type="button" onClick={openBookDemo} className="block hover:text-[#5EEAD4]">Book a demo</button>
            </div>
          </div>
          <div>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">Contact</div>
            <div className="space-y-2 text-[13px] text-white/55">
              <div>info@xaltech.com</div>
              <div>+251 914644449</div>
              <div>Jigjiga, Ethiopia</div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-[11.5px] text-white/35">
          <span>© {new Date().getFullYear()} XalTech. All rights reserved.</span>
          <span>Smart Solutions for Everyday Progress.</span>
        </div>
      </div>
    </footer>
  );
}

export default function SchoolManagementPage() {
  return (
    <main className="bg-white font-sans text-[#0B1F3A]">
      <Hero />
      <Features />
      <Modules />
      <OperationalProof />
      <FAQ />
      <CTABand />
      <Footer />
    </main>
  );
}