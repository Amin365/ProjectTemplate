
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header, { Logo } from "./Header";
import {
  ArrowRight,
  Menu,
  X,
  Layers,
  GraduationCap,
  AppWindow,
  Bot,
  Clock,
  Hammer,
  Rocket,
  Archive,
  Mail,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Shared bits (Logo / Navbar / Footer / SectionHead)                  */
/*  — mirrors Home.jsx / About.jsx so this feels like the same site     */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Services", href: "#" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// function Logo() {
//   return (
//     <div className="flex items-center gap-2.5">
//       <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
//         <rect x="3" y="3" width="12" height="12" rx="3.5" fill="#13B8A6" />
//         <rect x="25" y="25" width="12" height="12" rx="3.5" fill="#13B8A6" opacity="0.55" />
//         <rect x="25" y="3" width="12" height="12" rx="3.5" fill="#2878FF" />
//         <rect x="3" y="25" width="12" height="12" rx="3.5" fill="#2878FF" opacity="0.55" />
//         <path d="M15 15 L25 25 M25 15 L15 25" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
//         <path d="M25 9 L31 3 M31 3 H26 M31 3 V8" stroke="#5EEAD4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//       <span className="font-bold text-[19px] tracking-tight text-white">
//         Xal<span className="text-[#5EEAD4]">Tech</span>
//       </span>
//     </div>
//   );
// }

// function Navbar() {
//   const [open, setOpen] = useState(false);
//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B1F3A]/80 backdrop-blur-md border-b border-white/10">
//       <div className="max-w-7xl mx-auto px-6 h-[74px] flex items-center justify-between">
//         <a href="#"><Logo /></a>
//         <nav className="hidden md:flex items-center gap-9">
//           {NAV_LINKS.map((l) => (
//             <a
//               key={l.label}
//               href={l.href}
//               className={`text-[14.5px] font-medium transition-colors ${
//                 l.label === "Projects" ? "text-white" : "text-white/70 hover:text-white"
//               }`}
//             >
//               {l.label}
//             </a>
//           ))}
//           <Button className="bg-[#13B8A6] hover:bg-[#5EEAD4] text-[#0B1F3A] font-bold rounded-full px-5 gap-2">
//             Book a demo <ArrowRight size={15} />
//           </Button>
//         </nav>
//         <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
//           {open ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>
//       {open && (
//         <div className="md:hidden bg-[#0B1F3A] border-t border-white/10 px-6 py-6 flex flex-col gap-5">
//           {NAV_LINKS.map((l) => (
//             <a key={l.label} href={l.href} className="text-white/80 text-[17px] font-medium" onClick={() => setOpen(false)}>
//               {l.label}
//             </a>
//           ))}
//           <Button className="bg-[#13B8A6] text-[#0B1F3A] font-bold rounded-full w-full">Book a demo</Button>
//         </div>
//       )}
//     </header>
//   );
// }

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
              <a href="#projects" className="hover:text-[#5EEAD4] transition-colors">Projects</a>
              <a href="#contact" className="hover:text-[#5EEAD4] transition-colors">Contact</a>
            </div>
          </div>
          <div>
            <h5 className="font-mono text-[11px] tracking-widest uppercase text-white/35 mb-4">Contact</h5>
            <div className="flex flex-col gap-3 text-[14px] text-white/68">
              <span>hello@xaltech.com</span>
              <span>+251 XXX XXX XXX</span>
              <span>Addis Ababa, Ethiopia</span>
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
/*  Hero — "coming soon" constellation, dimmed / in-progress            */
/* ------------------------------------------------------------------ */

function ComingSoonMark() {
  return (
    <svg viewBox="0 0 480 360" className="w-full h-auto" role="img" aria-label="Project modules under construction">
      <defs>
        <style>{`
          .dash { stroke-dasharray: 7 6; animation: crawl 1.8s linear infinite; }
          @keyframes crawl { to { stroke-dashoffset: -52; } }
        `}</style>
      </defs>

      <rect x="70" y="60" width="90" height="66" rx="12" fill="#2878FF" fillOpacity="0.06" />
      <rect x="200" y="150" width="90" height="66" rx="12" fill="#13B8A6" fillOpacity="0.07" />
      <rect x="330" y="60" width="90" height="66" rx="12" fill="#2878FF" fillOpacity="0.06" />
      <rect x="70" y="240" width="90" height="66" rx="12" fill="#13B8A6" fillOpacity="0.07" />
      <rect x="330" y="240" width="90" height="66" rx="12" fill="#2878FF" fillOpacity="0.06" />

      <rect x="70" y="60" width="90" height="66" rx="12" fill="none" stroke="#2878FF" strokeWidth="2.5" className="dash" />
      <rect x="200" y="150" width="90" height="66" rx="12" fill="none" stroke="#13B8A6" strokeWidth="2.5" className="dash" />
      <rect x="330" y="60" width="90" height="66" rx="12" fill="none" stroke="#2878FF" strokeWidth="2.5" className="dash" />
      <rect x="70" y="240" width="90" height="66" rx="12" fill="none" stroke="#13B8A6" strokeWidth="2.5" className="dash" />
      <rect x="330" y="240" width="90" height="66" rx="12" fill="none" stroke="#2878FF" strokeWidth="2.5" className="dash" />

      <line x1="160" y1="93" x2="200" y2="170" stroke="#0B1F3A" strokeWidth="2" strokeOpacity="0.25" />
      <line x1="290" y1="170" x2="330" y2="93" stroke="#0B1F3A" strokeWidth="2" strokeOpacity="0.25" />
      <line x1="160" y1="273" x2="200" y2="200" stroke="#0B1F3A" strokeWidth="2" strokeOpacity="0.25" />
      <line x1="290" y1="200" x2="330" y2="273" stroke="#0B1F3A" strokeWidth="2" strokeOpacity="0.25" />

      <circle cx="160" cy="93" r="3" fill="#2878FF" />
      <circle cx="200" cy="170" r="3" fill="#13B8A6" />
      <circle cx="290" cy="170" r="3" fill="#13B8A6" />
      <circle cx="330" cy="93" r="3" fill="#2878FF" />
      <circle cx="160" cy="273" r="3" fill="#13B8A6" />
      <circle cx="200" cy="200" r="3" fill="#13B8A6" />
      <circle cx="290" cy="200" r="3" fill="#13B8A6" />
      <circle cx="330" cy="273" r="3" fill="#2878FF" />

      <circle cx="245" cy="183" r="24" fill="#13B8A6" />
      <path d="M233 183h24M245 171v24" stroke="#0B1F3A" strokeWidth="3" strokeLinecap="round" />

      <text x="240" y="335" textAnchor="middle" fontFamily="monospace" fontSize="12" fontWeight="600" letterSpacing="2.5" fill="#0B1F3A" fillOpacity="0.55">
        UNDER CONSTRUCTION
      </text>
    </svg>
  );
}
function ProjectsHero() {
  return (
    <header className="relative bg-white pt-[150px] pb-20 px-6 overflow-hidden">
      {/* XalTech grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(19,184,166,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(40,120,255,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(75% 75% at 30% 35%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(75% 75% at 30% 35%, black, transparent)",
        }}
      />

      {/* Teal glow */}
      <div
        className="
          absolute -top-32 -left-32
          w-[500px] h-[500px]
          bg-[#13B8A6]/10
          rounded-full
          blur-[120px]
          pointer-events-none
        "
      />

      {/* Blue glow */}
      <div
        className="
          absolute top-10 right-[-180px]
          w-[520px] h-[520px]
          bg-[#2878FF]/10
          rounded-full
          blur-[130px]
          pointer-events-none
        "
      />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div>
          <Badge
            className="
              bg-[#13B8A6]/8
              text-[#0F8F83]
              border border-[#13B8A6]/25
              font-mono font-normal
              text-[11.5px]
              tracking-widest
              uppercase
              gap-2
              py-2 px-3.5
              mb-6
              hover:bg-[#13B8A6]/10
            "
          >
            <Hammer size={13} />
            Coming soon
          </Badge>

          <h1
            className="
              text-[38px]
              sm:text-[50px]
              lg:text-[56px]
              font-bold
              leading-[1.05]
              tracking-tight
              text-[#0B1F3A]
              mb-6
            "
          >
            Our projects are{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#13B8A6]
                to-[#2878FF]
                bg-clip-text
                text-transparent
              "
            >
              in progress.
            </span>
          </h1>

          <p className="text-slate-600 text-[17px] leading-relaxed max-w-lg mb-8">
            We're currently building our first wave of ERP systems, school
            management platforms, and custom software for real clients. Case
            studies land here as each one goes live.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              className="
                bg-[#13B8A6]
                hover:bg-[#0fa594]
                text-white
                font-semibold
                rounded-full
                gap-2
                shadow-[0_8px_30px_rgba(19,184,166,0.20)]
              "
            >
              Be one of our first projects
              <ArrowRight size={16} />
            </Button>

            <a href="mailto:hello@xaltech.com">
              <Button
                size="lg"
                variant="outline"
                className="
                  rounded-full
                  border-slate-200
                  text-[#0B1F3A]
                  bg-white/70
                  hover:bg-slate-50
                  hover:border-[#13B8A6]/40
                  gap-2
                  shadow-sm
                "
              >
                <Mail size={16} />
                Get notified at launch
              </Button>
            </a>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <ComingSoonMark />
      </div>

      {/* Bottom subtle brand line */}
      <div
        className="
          absolute bottom-0 left-1/2 -translate-x-1/2
          w-[80%] h-px
          bg-gradient-to-r
          from-transparent
          via-[#13B8A6]/25
          to-transparent
        "
      />
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  What's coming — categories, honestly labeled as not-yet-published  */
/* ------------------------------------------------------------------ */

function WhatsComing() {
  const categories = [
    { icon: Layers, title: "ERP Systems", desc: "Finance, HR, inventory, and CRM deployments for growing businesses.", status: "In development" },
    { icon: GraduationCap, title: "School Management", desc: "Enrollment, attendance, grading, and fee systems for schools.", status: "In development" },
    { icon: AppWindow, title: "Custom Software", desc: "Web and mobile applications built around specific client workflows.", status: "Planned" },
    { icon: Bot, title: "AI Automation", desc: "Chatbots, document processing, and workflow automation add-ons.", status: "Planned" },
  ];
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHead
          eyebrow="What's coming"
          title="The work we're"
          accent="building right now."
          desc="Every category below maps to a real engagement in progress — we publish the case study once it's live with the client's approval."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((c) => (
            <Card key={c.title} className="border-dashed border-slate-300 rounded-2xl bg-[#F4F7FB]/60">
              <CardContent className="p-7 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0B1F3A]">
                    <c.icon size={19} />
                  </div>
                  <Badge variant="outline" className="font-mono text-[10px] font-normal text-slate-500 border-slate-300 gap-1.5">
                    <Clock size={10} /> {c.status}
                  </Badge>
                </div>
                <h4 className="text-[15px] font-bold text-[#0B1F3A]">{c.title}</h4>
                <p className="text-[13px] text-slate-500 leading-relaxed">{c.desc}</p>
                <div className="pt-3 border-t border-dashed border-slate-300 text-[12px] font-mono text-slate-400">
                  Case study — coming soon
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Roadmap                                                             */
/* ------------------------------------------------------------------ */

function Roadmap() {
  const steps = [
    { icon: Hammer, title: "Foundation", desc: "Core ERP, school management, and platform architecture built and tested.", state: "done" },
    { icon: Rocket, title: "First deployments", desc: "Early client systems going live — currently underway.", state: "active" },
    { icon: Archive, title: "Case studies published", desc: "Real project write-ups added here as each client signs off.", state: "upcoming" },
    { icon: Sparkles, title: "Full portfolio", desc: "A growing library of ERP, school, and custom software work.", state: "upcoming" },
  ];
  return (
    <section className="py-24 px-6 bg-[#0B1F3A]">
      <div className="max-w-7xl mx-auto">
        <SectionHead dark eyebrow="Our roadmap" title="Honest about" accent="where we are." desc="XalTech is a young company — here's exactly where we stand, with nothing overstated." />
        <div className="relative">
          <div className="absolute left-7 top-2 bottom-2 w-px bg-gradient-to-b from-[#13B8A6] to-[#2878FF] opacity-30" />
          {steps.map((s) => (
            <div key={s.title} className="grid grid-cols-[56px_1fr] gap-6 py-6">
              <div
                className={`w-14 h-14 rounded-2xl border flex items-center justify-center relative z-10 ${
                  s.state === "done"
                    ? "bg-[#13B8A6] border-[#13B8A6] text-[#0B1F3A]"
                    : s.state === "active"
                    ? "bg-[#0F2647] border-[#5EEAD4] text-[#5EEAD4]"
                    : "bg-[#0F2647] border-white/15 text-white/40"
                }`}
              >
                <s.icon size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <h4 className="text-[17px] font-bold text-white">{s.title}</h4>
                  {s.state === "active" && (
                    <Badge className="bg-[#5EEAD4]/15 text-[#5EEAD4] border border-[#5EEAD4]/30 font-mono text-[10px] font-normal hover:bg-[#5EEAD4]/15">
                      In progress
                    </Badge>
                  )}
                </div>
                <p className="text-[14px] text-white/55 leading-relaxed max-w-lg">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                  */
/* ------------------------------------------------------------------ */

function CTABand() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0B1F3A] to-[#103257] p-10 md:p-16 overflow-hidden grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="absolute w-[420px] h-[420px] rounded-full bg-[#13B8A6]/20 blur-3xl -top-40 -right-28 pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 text-[12px] font-mono tracking-widest uppercase text-[#5EEAD4] mb-4">
              <Sparkles size={13} /> Be part of it early
            </div>
            <h2 className="text-[28px] md:text-[36px] font-bold text-white leading-tight mb-3">
              Want your project to be<br />one of our first case studies?
            </h2>
            <p className="text-white/60 max-w-md text-[15px] leading-relaxed">
              Early clients get closer attention and a direct line to the engineer building their system.
            </p>
          </div>
          <div className="relative flex flex-col gap-3">
            <Button size="lg" className="bg-[#13B8A6] hover:bg-[#5EEAD4] text-[#0B1F3A] font-bold rounded-full gap-2">
              Book a consultation <ArrowRight size={16} />
            </Button>
            <a href="mailto:hello@xaltech.com">
              <Button size="lg" variant="outline" className="rounded-full border-white/20 text-white bg-transparent hover:bg-white/10 w-full">
                Email us instead
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                 */
/* ------------------------------------------------------------------ */

export default function ProjectsPage() {
  return (
    <div className="bg-white text-[#0B1F3A] font-sans">
      <Header />
      <ProjectsHero />
      <WhatsComing />
      <Roadmap />
      <CTABand />
      <Footer />
    </div>
  );
}