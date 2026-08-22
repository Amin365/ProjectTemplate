import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import ContactDialog from "./ContactDialog";
import {
  ArrowRight,
  Menu,
  X,
  BarChart3,
  BellRing,
  CheckCircle2,
  Gift,
  GraduationCap,
  Network,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Shared bits — mirrors Home.jsx / About.jsx / Projects.jsx           */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Services", href: "#" },
  { label: "Projects", href: "#" },
  { label: "Contact", href: "#contact" },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
        <rect x="3" y="3" width="12" height="12" rx="3.5" fill="#13B8A6" />
        <rect x="25" y="25" width="12" height="12" rx="3.5" fill="#13B8A6" opacity="0.55" />
        <rect x="25" y="3" width="12" height="12" rx="3.5" fill="#2878FF" />
        <rect x="3" y="25" width="12" height="12" rx="3.5" fill="#2878FF" opacity="0.55" />
        <path d="M15 15 L25 25 M25 15 L15 25" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M25 9 L31 3 M31 3 H26 M31 3 V8" stroke="#5EEAD4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-bold text-[19px] tracking-tight text-white">
        Xal<span className="text-[#5EEAD4]">Tech</span>
      </span>
    </div>
  );
}

function Navbar({ onBookDemo }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1F3A]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-[74px] flex items-center justify-between">
        <a href="#"><Logo /></a>
        <nav className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-[14.5px] font-medium text-white/70 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
          <Button onClick={onBookDemo} className="bg-[#13B8A6] hover:bg-[#5EEAD4] text-[#0B1F3A] font-bold rounded-full px-5 gap-2">
            Book a demo <ArrowRight size={15} />
          </Button>
        </nav>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0B1F3A] border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-white/80 text-[17px] font-medium" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <Button onClick={onBookDemo} className="bg-[#13B8A6] text-[#0B1F3A] font-bold rounded-full w-full">Book a demo</Button>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-[#0B1F3A] text-white/60 pt-20 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10 pb-12 border-b border-white/10">
          <div>
            <Logo />
            <p className="text-[13.5px] leading-relaxed mt-4 max-w-xs text-white/45">
              Xal — meaning solution. We build the ERP systems, school management platforms, and
              custom software that help organizations run on clarity.
            </p>
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-widest uppercase text-white/35 mb-4">Navigate</h5>
            <div className="flex flex-col gap-3 text-[14px]">
              <a href="#" className="hover:text-[#5EEAD4] transition-colors">Home</a>
              <a href="#" className="hover:text-[#5EEAD4] transition-colors">About</a>
              <a href="#" className="hover:text-[#5EEAD4] transition-colors">Services</a>
              <a href="#" className="hover:text-[#5EEAD4] transition-colors">Projects</a>
              <a href="#contact" className="hover:text-[#5EEAD4] transition-colors">Contact</a>
            </div>
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-widest uppercase text-white/35 mb-4">Contact</h5>
            <div className="flex flex-col gap-3 text-[14px] text-white/68">
              <span>info@xaltech.com</span>
              <span>+251 914644449</span>
              <span>jigiga, Ethiopia</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-[12.5px]">
          <span>© {new Date().getFullYear()} XalTech. All rights reserved.</span>
          <span className="text-white/35">Smart Solutions for Everyday Progress.</span>
        </div>
      </div>
    </footer>
  );
}

function SectionHead({ eyebrow, title, accent, desc, dark = false }) {
  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-10 mb-14">
      <div>
        <div className={`inline-flex items-center gap-2 text-[12px] font-mono tracking-widest uppercase mb-4 ${dark ? "text-[#5EEAD4]" : "text-[#13B8A6]"}`}>
          <span className={`w-1.5 h-1.5 rounded-sm ${dark ? "bg-[#5EEAD4]" : "bg-[#13B8A6]"}`} /> {eyebrow}
        </div>
        <h2 className={`text-[30px] md:text-[38px] font-bold leading-tight tracking-tight ${dark ? "text-white" : "text-[#0B1F3A]"}`}>
          {title} <span className={dark ? "text-[#5EEAD4]" : "text-[#13B8A6]"}>{accent}</span>
        </h2>
      </div>
      {desc && <p className={`text-[15px] leading-relaxed self-end max-w-md ${dark ? "text-white/60" : "text-slate-500"}`}>{desc}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero({ onBookDemo }) {
  return (
    <header className="relative bg-[#0B1F3A] pt-[150px] pb-20 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(70% 60% at 30% 30%, black, transparent)",
        }}
      />
      <div className="relative max-w-4xl mx-auto text-center">
        <Badge className="bg-[#13B8A6]/10 text-[#5EEAD4] border border-[#13B8A6]/30 font-mono font-normal text-[11.5px] tracking-widest uppercase gap-2 py-2 px-3.5 mb-6 hover:bg-[#13B8A6]/10">
          <CheckCircle2 size={13} /> Live in production
        </Badge>
        <h1 className="text-[36px] sm:text-[50px] font-bold leading-[1.08] tracking-tight text-white mb-6">
          Xal{" "}
          <span className="bg-gradient-to-r from-[#5EEAD4] to-[#2878FF] bg-clip-text text-transparent">
            school management, done right.
          </span>
        </h1>
        <p className="text-white/65 text-[17px] leading-relaxed max-w-2xl mx-auto mb-10">
          A complete platform for running a school — admissions, attendance, grading, exams, finance,
          and communication, all in one connected system. Built by XalTech, running a real school today.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" onClick={onBookDemo} className="bg-[#13B8A6] hover:bg-[#5EEAD4] text-[#0B1F3A] font-bold rounded-full gap-2">
            Book a demo <ArrowRight size={16} />
          </Button>
          <a href="#modules">
            <Button size="lg" variant="outline" className="rounded-full border-white/20 text-white bg-transparent hover:bg-white/10">
              See all modules
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Product features — replaces screenshot showcase                    */
/* ------------------------------------------------------------------ */

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
    desc: "New school operations can be added without turning the product into disconnected tools, because the modules share the same platform foundation.",
  },
];

function Features() {
  return (
    <section className="relative bg-white px-6 py-20 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="mb-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#13B8A6]">
              <span className="h-1.5 w-1.5 rounded-sm bg-[#13B8A6]" />
              Why XalTech
            </div>
            <h2 className="max-w-md text-[34px] font-bold leading-[1.08] tracking-tight text-[#0B1F3A] md:text-[46px]">
              A school system built around
              <span className="text-[#13B8A6]"> how work actually moves.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-7 text-slate-500">
              Daily school work stays connected from the first admission record to attendance, assessment, finance, communication, and leadership reporting.
            </p>
            <div className="mt-9 flex items-center gap-3 border-t border-slate-200 pt-6 text-[13px] text-slate-500">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1F3A] text-[#5EEAD4]">
                <CheckCircle2 size={16} />
              </span>
              <span>
                <strong className="block text-[#0B1F3A]">One source of truth</strong>
                Every module shares the same school data.
              </span>
            </div>
          </div>

          <div className="border-t border-slate-200">
            {PRODUCT_FEATURES.map((feature) => (
              <div
                key={feature.number}
                className="group grid gap-5 border-b border-slate-200 py-7 transition-colors md:grid-cols-[64px_56px_1fr] md:items-start md:py-8"
              >
                <div className="font-mono text-[12px] tracking-[0.18em] text-slate-400">
                  {feature.number}
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0B1F3A] transition-all group-hover:border-[#13B8A6] group-hover:bg-[#13B8A6]/5 group-hover:text-[#0F8F83]">
                  <feature.icon size={18} />
                </div>
                <div>
                  <h3 className="text-[17px] font-bold tracking-tight text-[#0B1F3A] md:text-[19px]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[14px] leading-6 text-slate-500">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Module map — numbered connected tree                               */
/* ------------------------------------------------------------------ */

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
    <section id="modules" className="overflow-hidden bg-[#F4F7FB] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow="System map"
          title="24 modules,"
          accent="connected like one tree."
          desc="Each branch solves a different school workflow, while every branch connects back to the same platform and the same data."
        />

        <div className="relative mt-4">
          <div className="absolute bottom-10 left-[23px] top-10 hidden w-px bg-slate-300 md:block" />

          <div className="space-y-4 md:space-y-0">
            {MODULE_GROUPS.map((group, groupIndex) => (
              <div
                key={group.label}
                className="relative grid gap-6 border-b border-slate-200 py-9 last:border-b-0 md:grid-cols-[210px_1fr] md:gap-10 md:py-11"
              >
                <div className="relative flex items-start gap-4 md:gap-5">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-[#F4F7FB] bg-[#0B1F3A] font-mono text-[12px] font-bold text-[#5EEAD4] shadow-sm">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-[16px] font-bold leading-tight text-[#0B1F3A]">
                      {group.label}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-5 text-slate-500">
                      {group.note}
                    </p>
                  </div>
                </div>

                <div className="relative md:pl-10">
                  <div className="absolute -left-10 top-6 hidden h-px w-10 bg-slate-300 md:block" />
                  <div className="absolute bottom-4 left-[13px] top-4 hidden w-px bg-slate-300 md:block" />

                  <div className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
                    {group.modules.map((module) => {
                      moduleNumber += 1;
                      const currentNumber = String(moduleNumber).padStart(2, "0");

                      return (
                        <div
                          key={module.title}
                          className="group relative flex min-h-[84px] gap-4 border-b border-slate-200 py-4 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 xl:[&:nth-last-child(-n+3)]:border-b-0"
                        >
                          <div className="relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-[#F4F7FB] font-mono text-[10px] font-semibold text-slate-500 transition-all group-hover:border-[#13B8A6] group-hover:bg-[#13B8A6] group-hover:text-[#0B1F3A]">
                            {currentNumber}
                          </div>
                          <div>
                            <h4 className="text-[14px] font-bold text-[#0B1F3A] transition-colors group-hover:text-[#0F8F83]">
                              {module.title}
                            </h4>
                            <p className="mt-1 text-[12.5px] leading-5 text-slate-500">
                              {module.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Stats + tech stack                                                  */
/* ------------------------------------------------------------------ */

function TrustStrip() {
  const stats = [
    { value: "24", label: "MODULES SHIPPED" },
    { value: "1,240+", label: "STUDENTS MANAGED" },
    { value: "100%", label: "IN PRODUCTION USE" },
    { value: "3 MO", label: "FREE FOR PILOT SCHOOLS" },
  ];
  return (
    <section className="py-20 px-6 bg-[#0B1F3A]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl border border-white/10 overflow-hidden mb-12">
          {stats.map((s, i) => (
            <div key={s.label} className={`p-6 ${i !== stats.length - 1 ? "border-r border-white/10" : ""}`}>
              <div className="text-[26px] font-bold text-[#5EEAD4] font-mono mb-1">{s.value}</div>
              <div className="text-[11px] font-mono tracking-wide text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {["React", "Node.js", "Express.js", "MySQL", "Sequelize ORM", "Tailwind CSS"].map((t) => (
            <Badge key={t} className="bg-white/5 text-white/70 border border-white/10 font-mono font-normal text-[11.5px] gap-1.5 hover:bg-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5EEAD4]" /> {t}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                  */
/* ------------------------------------------------------------------ */

function FAQ() {
  const faqs = [
    { q: "Is xalSchool really live, or a demo?", a: "It's live — actively used to run a real school's day-to-day operations, not a prototype." },
    { q: "Can it be customized for our school's grading system or terms?", a: "Yes — grading scale, term structure, and academic calendar are all configurable per school." },
    { q: "How long does setup take?", a: "A typical school is fully onboarded, with data migrated, in 4–6 weeks." },
    { q: "Do you offer a trial?", a: "Yes — pilot schools get full access free for three months. See the pilot program for details." },
  ];
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHead eyebrow="FAQ" title="Common questions" accent="about Xode Academy." />
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-slate-200">
              <AccordionTrigger className="text-[15.5px] font-semibold text-[#0B1F3A] hover:no-underline text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-[14px] text-slate-500 leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                  */
/* ------------------------------------------------------------------ */

function CTABand({ onBookDemo }) {
  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0B1F3A] to-[#103257] p-10 md:p-16 overflow-hidden grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="absolute w-[420px] h-[420px] rounded-full bg-[#13B8A6]/20 blur-3xl -top-40 -right-28 pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 text-[12px] font-mono tracking-widest uppercase text-[#5EEAD4] mb-4">
              <Gift size={13} /> 3 months free for pilot schools
            </div>
            <h2 className="text-[28px] md:text-[36px] font-bold text-white leading-tight mb-3">
              Want this running<br />at your school?
            </h2>
            <p className="text-white/60 max-w-md text-[15px] leading-relaxed">
              Book a short demo and see the full system — no pressure, no obligation.
            </p>
          </div>
          <div className="relative flex flex-col gap-3">
            <Button size="lg" onClick={onBookDemo} className="bg-[#13B8A6] hover:bg-[#5EEAD4] text-[#0B1F3A] font-bold rounded-full gap-2">
              Book a demo <ArrowRight size={16} />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-white/20 text-white bg-transparent hover:bg-white/10">
              <Sparkles size={15} className="mr-2" /> Explore the pilot program
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                 */
/* ------------------------------------------------------------------ */

export default function SchoolManagementPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="bg-white text-[#0B1F3A] font-sans">
      <Navbar onBookDemo={() => setDialogOpen(true)} />
      <Hero onBookDemo={() => setDialogOpen(true)} />
      <Features />
      <Modules />
      <TrustStrip />
      <FAQ />
      <CTABand onBookDemo={() => setDialogOpen(true)} />
      <Footer />
      <ContactDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </div>
  );
}