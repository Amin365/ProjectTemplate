import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header, { Logo } from "./Header";
import {
  ArrowRight,
  BarChart3,
  BellRing,
  Building2,
  CheckCircle2,
  GraduationCap,
  Layers3,
  Network,
  School,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

const SCHOOL_MODULES = [
  "Admissions",
  "Students",
  "Attendance",
  "Exams",
  "Grades",
  "Finance",
  "Reports",
  "School Store",
];

const SCHOOL_HIGHLIGHTS = [
  {
    icon: Workflow,
    title: "Connected operations",
    text: "Academic, finance, communication, and administration workflows share one school data foundation.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based access",
    text: "Principals, teachers, accountants, students, and administrators see the tools and records relevant to them.",
  },
  {
    icon: BellRing,
    title: "Parent communication",
    text: "School activity can feed parent-facing communication such as academic updates and reminders.",
  },
  {
    icon: BarChart3,
    title: "Operational reporting",
    text: "Leadership can move from daily transactions to academic, enrollment, attendance, and finance reporting.",
  },
];

const PIPELINE = [
  {
    icon: Building2,
    title: "Business ERP",
    text: "Reusable finance, inventory, HR, workflow, and reporting foundations for growing organizations.",
    status: "In development",
  },
  {
    icon: Layers3,
    title: "Vertical ERP products",
    text: "Focused systems for sectors that need better day-to-day operations without heavyweight enterprise software.",
    status: "Expanding",
  },
  {
    icon: Sparkles,
    title: "AI-enabled workflows",
    text: "Automation added where it removes repetitive work, improves communication, or helps teams act on their data.",
    status: "Planned",
  },
];

function Footer() {
  return (
    <footer className="bg-[#0B1F3A] px-6 pb-8 pt-16 text-white/60">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-white/45">
              XalTech builds practical software systems that connect everyday operations, people, and data.
            </p>
          </div>
          <div>
            <h5 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-white/35">Navigate</h5>
            <div className="flex flex-col gap-3 text-[14px]">
              <Link to="/" className="transition-colors hover:text-[#5EEAD4]">Home</Link>
              <Link to="/about" className="transition-colors hover:text-[#5EEAD4]">About</Link>
              <Link to="/services" className="transition-colors hover:text-[#5EEAD4]">Services</Link>
              <Link to="/projects" className="transition-colors hover:text-[#5EEAD4]">Projects</Link>
            </div>
          </div>
          <div>
            <h5 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-white/35">Contact</h5>
            <div className="flex flex-col gap-3 text-[14px] text-white/68">
              <span>info@xaltech.com</span>
              <span>+251 914644449</span>
              <span>Jigjiga, Ethiopia</span>
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

function Hero() {
  return (
    <section className="border-b border-slate-200 bg-white px-6 pb-20 pt-[142px] md:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#13B8A6]/25 bg-[#13B8A6]/5 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#0F8F83]">
            <span className="h-2 w-2 rounded-full bg-[#13B8A6]" />
            XalTech projects
          </div>

          <h1 className="max-w-2xl text-[42px] font-bold leading-[1.04] tracking-[-0.035em] text-[#0B1F3A] sm:text-[54px] lg:text-[64px]">
            Software we are
            <span className="text-[#13B8A6]"> putting into real use.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[16px] leading-7 text-slate-600 md:text-[17px]">
            This is no longer a coming-soon portfolio. Our school management platform is live, and this page now grows around work that has actually been built, deployed, and used.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/school"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0B1F3A] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#12345c]"
            >
              Explore XalTech School <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-contact"))}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-[#0B1F3A] transition-colors hover:border-[#13B8A6] hover:bg-[#13B8A6]/5"
            >
              Start a project
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-[#F8FAFC] shadow-[0_24px_70px_rgba(11,31,58,0.08)]">
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B1F3A] text-[#5EEAD4]">
                  <School size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#0B1F3A]">XalTech School</div>
                  <div className="text-xs text-slate-500">School management platform</div>
                </div>
              </div>
              <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                Live
              </Badge>
            </div>

            <div className="grid gap-px bg-slate-200 sm:grid-cols-3">
              {[
                ["24", "connected modules"],
                ["1,240+", "students managed"],
                ["1", "shared platform"],
              ].map(([value, label]) => (
                <div key={label} className="bg-white px-5 py-5">
                  <div className="font-mono text-2xl font-bold text-[#0B1F3A]">{value}</div>
                  <div className="mt-1 text-xs text-slate-500">{label}</div>
                </div>
              ))}
            </div>

            <div className="p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Connected workflow</div>
                  <div className="mt-1 text-sm font-semibold text-[#0B1F3A]">One school, one operating system</div>
                </div>
                <Network size={20} className="text-[#13B8A6]" />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {SCHOOL_MODULES.map((module, index) => (
                  <div key={module} className="rounded-xl border border-slate-200 bg-white p-3">
                    <div className="font-mono text-[10px] text-slate-400">{String(index + 1).padStart(2, "0")}</div>
                    <div className="mt-2 text-[12.5px] font-semibold text-[#0B1F3A]">{module}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#13B8A6]/20 bg-[#13B8A6]/5 p-4">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#0F8F83]" />
                <p className="text-[12.5px] leading-5 text-slate-600">
                  Built as a connected platform instead of separate tools, so academic, finance, reporting, and communication workflows can share the same records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProject() {
  return (
    <section className="bg-white px-6 py-24" id="projects">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#13B8A6]">Featured project</div>
            <h2 className="text-[34px] font-bold leading-tight tracking-tight text-[#0B1F3A] md:text-[44px]">
              XalTech School Management System
            </h2>
          </div>
          <p className="max-w-2xl text-[15px] leading-7 text-slate-500 lg:justify-self-end">
            A complete operational platform built around how a school actually works—from admissions and attendance to exams, grades, finance, reporting, communication, and administration.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[28px] border border-slate-200 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="bg-[#0B1F3A] p-8 text-white md:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border border-[#5EEAD4]/25 bg-[#5EEAD4]/10 text-[#5EEAD4] hover:bg-[#5EEAD4]/10">Live in production</Badge>
              <Badge className="border border-white/15 bg-white/5 text-white/70 hover:bg-white/5">Education ERP</Badge>
            </div>

            <h3 className="mt-8 text-[30px] font-bold leading-tight tracking-tight md:text-[38px]">
              From fragmented school work to one connected workflow.
            </h3>
            <p className="mt-5 max-w-lg text-[14.5px] leading-7 text-white/60">
              The product brings the school’s operational records into one platform so staff do not have to rebuild the same data across separate spreadsheets and disconnected tools.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                [GraduationCap, "Academic operations"],
                [Users, "Role-specific access"],
                [BarChart3, "School reporting"],
                [BellRing, "Communication workflows"],
              ].map(([Icon, label]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <Icon size={18} className="text-[#5EEAD4]" />
                  <div className="mt-3 text-[12.5px] font-medium text-white/80">{label}</div>
                </div>
              ))}
            </div>

            <Link
              to="/school"
              className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-[#13B8A6] px-6 text-sm font-bold text-[#0B1F3A] transition-colors hover:bg-[#5EEAD4]"
            >
              View project details <ArrowRight size={16} />
            </Link>
          </div>

          <div className="bg-[#F8FAFC] p-7 md:p-10 lg:p-12">
            <div className="space-y-1">
              {SCHOOL_HIGHLIGHTS.map((item, index) => (
                <div key={item.title} className="grid gap-4 border-b border-slate-200 py-5 last:border-b-0 sm:grid-cols-[48px_1fr]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0B1F3A]">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] text-slate-400">0{index + 1}</span>
                      <h4 className="text-[16px] font-bold text-[#0B1F3A]">{item.title}</h4>
                    </div>
                    <p className="mt-2 max-w-xl text-[13.5px] leading-6 text-slate-500">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PortfolioDirection() {
  return (
    <section className="border-y border-slate-200 bg-[#F8FAFC] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-2xl">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#13B8A6]">Growing portfolio</div>
          <h2 className="text-[34px] font-bold leading-tight tracking-tight text-[#0B1F3A] md:text-[44px]">
            One live product today. More vertical systems next.
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-slate-500">
            We keep planned work clearly separated from shipped work. As products move into real deployments, they will appear here as full project entries rather than placeholders.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {PIPELINE.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1F3A] text-[#5EEAD4]">
                  <item.icon size={18} />
                </div>
                <Badge variant="outline" className="border-slate-200 bg-slate-50 font-mono text-[10px] font-normal text-slate-500">
                  {item.status}
                </Badge>
              </div>
              <h3 className="mt-6 text-[17px] font-bold text-[#0B1F3A]">{item.title}</h3>
              <p className="mt-3 text-[13.5px] leading-6 text-slate-500">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 rounded-[28px] bg-[#0B1F3A] p-8 md:p-12 lg:grid-cols-[1fr_auto] lg:p-14">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#5EEAD4]">
              <Sparkles size={13} /> Build with XalTech
            </div>
            <h2 className="max-w-2xl text-[30px] font-bold leading-tight tracking-tight text-white md:text-[38px]">
              Have an operational problem that deserves its own system?
            </h2>
            <p className="mt-4 max-w-xl text-[14.5px] leading-7 text-white/55">
              Tell us how the work happens today. We can help turn that workflow into a focused product rather than another disconnected tool.
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => window.dispatchEvent(new Event("open-contact"))}
            className="rounded-full bg-[#13B8A6] font-bold text-[#0B1F3A] hover:bg-[#5EEAD4]"
          >
            Discuss your project <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#0B1F3A]">
      <Header ctaLabel="Start a project" />
      <Hero />
      <FeaturedProject />
      <PortfolioDirection />
      <CTA />
      <Footer />
    </div>
  );
}
