
"use client";
/* eslint-disable @next/next/no-html-link-for-pages */

import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Boxes,
  Building2,
  Check,
  ChevronDown,
  ClipboardCheck,
  CloudCog,
  Code2,
  Database,
  FileSearch2,
  GraduationCap,
  HeartPulse,
  Hotel,
  Layers3,
  LifeBuoy,
  Mail,
  Menu,
  MessageSquareText,
  MonitorSmartphone,
  Network,
  Rocket,
  Search,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Store,
  Users,
  WalletCards,
  Workflow,
  X,
} from "lucide-react";

// NAV_LINKS moved to shared Header component

const SERVICE_INDEX = [
  { number: "01", label: "ERP Systems", href: "#erp" },
  { number: "02", label: "Sector Solutions", href: "#sectors" },
  { number: "03", label: "Custom Software", href: "#custom" },
  { number: "04", label: "AI Solutions", href: "#ai" },
];

const ERP_MODULES = [
  {
    icon: Users,
    code: "M01",
    title: "HR & Payroll",
    description: "Employee records, attendance, leave, contracts, payroll, and staff self-service.",
    features: ["Employee profiles", "Attendance & leave", "Payroll processing", "Staff reports"],
  },
  {
    icon: WalletCards,
    code: "M02",
    title: "Finance & Accounting",
    description: "Income, expenses, budgets, invoicing, ledgers, approvals, and financial reporting.",
    features: ["Invoices & receipts", "Expense controls", "Budget tracking", "Financial reports"],
  },
  {
    icon: Boxes,
    code: "M03",
    title: "Inventory & Procurement",
    description: "Stock visibility, purchasing requests, suppliers, receiving, and item movement.",
    features: ["Stock management", "Purchase requests", "Supplier records", "Low-stock alerts"],
  },
  {
    icon: MessageSquareText,
    code: "M04",
    title: "CRM & Service",
    description: "Customer records, opportunities, communication, requests, and service follow-up.",
    features: ["Customer profiles", "Sales pipeline", "Service requests", "Communication history"],
  },
  {
    icon: ClipboardCheck,
    code: "M05",
    title: "Operations & Approvals",
    description: "Requests, reviews, decisions, tasks, notifications, and accountable audit trails.",
    features: ["Custom workflows", "Role approvals", "Notifications", "Audit history"],
  },
  {
    icon: BarChart3,
    code: "M06",
    title: "Reports & Dashboards",
    description: "Useful operational views that turn connected records into clearer decisions.",
    features: ["Live indicators", "Role-based dashboards", "Custom reports", "Data exports"],
  },
];

const SECTORS = [
  {
    icon: GraduationCap,
    title: "Schools & Education",
    description: "Admissions, student records, attendance, exams, fees, timetables, and parent communication.",
    tags: ["Student records", "Exams", "Fees"],
    tone: "mint",
  },
  {
    icon: HeartPulse,
    title: "Clinics & Hospitals",
    description: "Patient registration, appointments, billing, medical records, pharmacy stock, and reporting.",
    tags: ["Patients", "Billing", "Inventory"],
    tone: "blue",
  },
  {
    icon: Hotel,
    title: "Hotels & Restaurants",
    description: "Reservations, rooms, orders, purchasing, inventory, customers, and daily financial control.",
    tags: ["Reservations", "POS", "Stock"],
    tone: "amber",
  },
  {
    icon: Building2,
    title: "Government Offices",
    description: "HR, revenue, permits, cases, records, approvals, and transparent operational reporting.",
    tags: ["Revenue", "Permits", "Records"],
    tone: "violet",
  },
  {
    icon: Store,
    title: "Retail & Distribution",
    description: "Sales, customers, warehouses, purchasing, stock movement, payments, and branch reporting.",
    tags: ["Sales", "Warehouses", "Branches"],
    tone: "coral",
  },
  {
    icon: Network,
    title: "Growing Organizations",
    description: "A tailored operational system for teams whose process no longer fits spreadsheets or generic tools.",
    tags: ["Custom modules", "Integrations", "Reports"],
    tone: "navy",
  },
];

const CUSTOM_SOLUTIONS = [
  {
    icon: MonitorSmartphone,
    title: "Web Platforms",
    description: "Secure browser-based applications for internal teams, customers, or public services.",
  },
  {
    icon: Smartphone,
    title: "Mobile Applications",
    description: "Focused mobile experiences for customers, field teams, collectors, and everyday services.",
  },
  {
    icon: Database,
    title: "Management Systems",
    description: "Purpose-built platforms for a specific workflow, department, program, or service.",
  },
  {
    icon: CloudCog,
    title: "Integrations & Modernization",
    description: "Connect existing tools, improve older processes, and move data into a clearer system.",
  },
];

const AI_SOLUTIONS = [
  {
    icon: Bot,
    number: "01",
    title: "Chatbots & Assistants",
    description: "Answer common questions, guide users, and hand complex requests to the right person.",
  },
  {
    icon: Workflow,
    number: "02",
    title: "Workflow Automation",
    description: "Reduce repetitive entry, routing, reminders, approvals, and status updates.",
  },
  {
    icon: FileSearch2,
    number: "03",
    title: "Document AI",
    description: "Extract, classify, summarize, and route useful information from business documents.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Reporting Support",
    description: "Help teams search their information and prepare useful operational summaries faster.",
  },
];

const PROCESS = [
  { icon: Search, number: "01", title: "Understand", description: "We learn the users, records, rules, pain points, and desired outcome." },
  { icon: Layers3, number: "02", title: "Shape the solution", description: "We define the right modules, experience, integrations, and delivery stages." },
  { icon: Code2, number: "03", title: "Build & validate", description: "We develop in clear milestones and test against real workflows." },
  { icon: Rocket, number: "04", title: "Launch & improve", description: "We deploy, train users, support adoption, and plan future improvements." },
];

const FAQS = [
  {
    question: "Do you sell one ready-made ERP to every organization?",
    answer: "No. We can reuse proven foundations, but the final system is shaped around your sector, users, workflows, and priorities.",
  },
  {
    question: "Can we start with only one module?",
    answer: "Yes. Many projects begin with the highest-priority module and expand in planned stages as the organization becomes ready.",
  },
  {
    question: "Can you build for a school, hospital, hotel, or government office?",
    answer: "Yes. These organizations share some core needs, but each has different records and rules. We adapt the solution to the sector instead of forcing one generic setup.",
  },
  {
    question: "Can the system run on our local server?",
    answer: "Yes. Depending on the project, we can design for cloud hosting, an on-premise server, or a suitable hybrid approach.",
  },
  {
    question: "Do you provide training and support?",
    answer: "Yes. Launch planning can include user training, documentation, data migration support, and an agreed ongoing support arrangement.",
  },
];

// Header moved to shared Header component

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className={`services-section-heading ${light ? "services-section-heading--light" : ""}`}>
      <div>
        <p className="eyebrow"><i /> {eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}

function ServicesHero() {
  return (
    <section className="services-hero">
      <div className="services-hero__grid" />
      <div className="shell services-hero__layout">
        <div className="services-hero__copy">
          <p className="eyebrow"><i /> XalTech services</p>
          <h1>Systems built for the way your organization <span>really works.</span></h1>
          <p className="services-hero__lead">
            From ERP platforms and sector-specific systems to custom applications and useful AI automation,
            we turn daily operational problems into reliable software.
          </p>
          <div className="services-hero__actions">
            <a className="button button--mint" href="#services-index">Explore services <ArrowRight size={17} /></a>
            <button className="button button--outline" type="button" onClick={() => window.dispatchEvent(new Event('open-contact'))}>Talk about your project</button>
          </div>
          <div className="services-proof-row">
            <span><Check size={14} /> Tailored to your workflow</span>
            <span><Check size={14} /> Delivered in practical stages</span>
            <span><Check size={14} /> Training and support</span>
          </div>
        </div>

        <div className="services-blueprint" aria-label="XalTech service architecture">
          <div className="services-blueprint__bar"><span>Solution architecture</span><small>Designed around the need</small></div>
          <div className="services-blueprint__body">
            <div className="services-blueprint__core"><Layers3 size={22} /><span><strong>Your operation</strong><small>Users · records · workflows</small></span></div>
            <div className="services-blueprint__line" />
            <div className="services-blueprint__modules">
              <span><Database size={17} /><b>ERP</b><small>Connected operations</small></span>
              <span><Code2 size={17} /><b>Software</b><small>Custom experience</small></span>
              <span><Bot size={17} /><b>AI</b><small>Useful automation</small></span>
            </div>
          </div>
          <div className="services-blueprint__footer"><span><ShieldCheck size={13} /> Responsible access</span><span><ServerCog size={13} /> Flexible deployment</span></div>
        </div>
      </div>
    </section>
  );
}

function ServiceIndex() {
  return (
    <section id="services-index" className="service-index">
      <div className="shell service-index__grid">
        {SERVICE_INDEX.map((item) => (
          <a href={item.href} key={item.number}>
            <span>{item.number}</span><strong>{item.label}</strong><ArrowRight size={15} />
          </a>
        ))}
      </div>
    </section>
  );
}

function ERPSection() {
  const [open, setOpen] = useState("M01");
  return (
    <section id="erp" className="services-detail-section services-detail-section--grid">
      <div className="shell">
        <SectionHeading
          eyebrow="ERP systems"
          title="Connect the operations that matter most."
          description="An ERP does not need to begin as one enormous platform. Start with the highest-priority modules, then connect more workflows when the organization is ready."
        />
        <div className="erp-capability-grid">
          {ERP_MODULES.map(({ icon: Icon, ...module }) => {
            const isOpen = open === module.code;
            return (
              <article className={isOpen ? "erp-capability is-open" : "erp-capability"} key={module.code}>
                <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? "" : module.code)}>
                  <div className="erp-capability__top"><span><Icon size={20} /></span><small>{module.code}</small></div>
                  <h3>{module.title}</h3>
                  <p>{module.description}</p>
                  <span className="erp-capability__toggle">{isOpen ? "Hide capabilities" : "View capabilities"}<ChevronDown size={16} /></span>
                </button>
                {isOpen && (
                  <ul>{module.features.map((feature) => <li key={feature}><Check size={14} /> {feature}</li>)}</ul>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectorSection() {
  return (
    <section id="sectors" className="services-detail-section sector-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Sector solutions"
          title="Different organizations need different systems."
          description="A school, clinic, hotel, government office, and retailer do not operate the same way. We adapt the records, roles, rules, and experience to each environment."
        />
        <div className="sector-card-grid">
          {SECTORS.map(({ icon: Icon, ...sector }) => (
            <article className={`sector-service-card sector-service-card--${sector.tone}`} key={sector.title}>
              <span className="sector-service-card__icon"><Icon size={21} /></span>
              <h3>{sector.title}</h3>
              <p>{sector.description}</p>
              <div>{sector.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CustomSection() {
  return (
    <section id="custom" className="services-detail-section custom-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Custom software"
          title="When a generic tool does not fit the workflow."
          description="We design web, mobile, and management applications around the specific problem—without forcing your team to work around a template."
        />
        <div className="custom-service-grid">
          {CUSTOM_SOLUTIONS.map(({ icon: Icon, ...solution }, index) => (
            <article key={solution.title}>
              <div><span><Icon size={21} /></span><small>0{index + 1}</small></div>
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AISection() {
  return (
    <section id="ai" className="services-detail-section ai-services-section">
      <div className="ai-services-section__grid" />
      <div className="shell ai-services-section__content">
        <SectionHeading
          light
          eyebrow="AI solutions"
          title="Automation should remove real friction."
          description="We apply AI where it can save time, improve response, or make information easier to use—not simply because it sounds impressive."
        />
        <div className="ai-service-grid">
          {AI_SOLUTIONS.map(({ icon: Icon, ...solution }) => (
            <article key={solution.number}>
              <div><span>{solution.number}</span><Icon size={20} /></div>
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="services-detail-section services-process-section">
      <div className="shell">
        <SectionHeading
          eyebrow="How we deliver"
          title="A clear path from problem to working software."
          description="Each project is different, but the work stays understandable, staged, and focused on real users."
        />
        <div className="services-process-grid">
          {PROCESS.map(({ icon: Icon, ...step }) => (
            <article key={step.number}>
              <div><span><Icon size={19} /></span><small>{step.number}</small></div>
              <h3>{step.title}</h3><p>{step.description}</p>
            </article>
          ))}
        </div>
        <div className="service-assurances">
          <span><ShieldCheck size={18} /><strong>Security considered early</strong><small>Roles, access, backups, and auditability.</small></span>
          <span><ServerCog size={18} /><strong>Flexible deployment</strong><small>Cloud, local server, or a suitable hybrid.</small></span>
          <span><LifeBuoy size={18} /><strong>Adoption support</strong><small>Training, documentation, and agreed support.</small></span>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [active, setActive] = useState(0);
  return (
    <section className="services-detail-section services-faq-section">
      <div className="shell services-faq-layout">
        <div><p className="eyebrow"><i /> Common questions</p><h2>Understand the service before you begin.</h2><p>Clear expectations are part of building a trustworthy project.</p></div>
        <div className="services-faq-list">
          {FAQS.map((item, index) => {
            const isOpen = active === index;
            return (
              <article className={isOpen ? "is-open" : ""} key={item.question}>
                <button type="button" aria-expanded={isOpen} onClick={() => setActive(isOpen ? -1 : index)}><span>{item.question}</span><ChevronDown size={19} /></button>
                {isOpen && <p>{item.answer}</p>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="services-contact-section">
      <div className="shell services-contact-card">
        <div>
          <p className="eyebrow"><i /> Start with the problem</p>
          <h2>Tell us what your current process is making difficult.</h2>
          <p>We’ll help identify the right starting point—whether that is one module, a complete sector system, a custom application, or automation.</p>
        </div>
        <a className="button button--mint" href="mailto:hello@xaltech.com"><Mail size={17} /> Email XalTech</a>
      </div>
    </section>
  );
}

function ServicesFooter() {
  return (
    <footer className="footer services-footer">
      <div className="shell footer-main">
        <div className="footer-brand"><p>ERP systems, sector platforms, custom software, and useful AI automation built around real operations.</p></div>
        <div className="footer-links"><strong>Explore</strong><Link to="/">Home</Link><Link to="/services">Services</Link><Link to="/">Solutions</Link><Link to="/about">About</Link></div>
        <div className="footer-links"><strong>Capabilities</strong><a href="#erp">ERP systems</a><a href="#sectors">Sector solutions</a><a href="#custom">Custom software</a><a href="#ai">AI solutions</a></div>
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} XalTech. All rights reserved.</span><span>Smart solutions for everyday progress.</span></div>
    </footer>
  );
}

export default function ServicesPage() {
  return (
    <main className="services-page">
      <Header />
      <ServicesHero />
      <ServiceIndex />
      <ERPSection />
      <SectorSection />
      <CustomSection />
      <AISection />
      <ProcessSection />
      <FAQSection />
      <ContactSection />
      <ServicesFooter />
    </main>
  );
}
