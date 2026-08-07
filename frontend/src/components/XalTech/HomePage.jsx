
import { useState } from "react";
import Header, { Logo } from "./Header";
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  ChevronDown,
  CloudCog,
  Code2,
  Database,
  GraduationCap,
  HeartPulse,
  Hotel,
  LifeBuoy,
  Layers3,
  Mail,
  Menu,
  MessageSquareText,
  MonitorSmartphone,
  Network,
  Rocket,
  Search,
  ServerCog,
  Settings2,
  ShieldCheck,
  Sparkles,
  Store,
  Workflow,
  X,
} from "lucide-react";

// NAV_LINKS moved to shared Header component

const SERVICES = [
  {
    icon: Layers3,
    number: "01",
    title: "ERP Systems",
    description:
      "Connected platforms for HR, payroll, finance, inventory, CRM, education, and healthcare operations.",
    items: ["HR & Payroll", "Finance", "Inventory", "CRM"],
  },
  {
    icon: Code2,
    number: "02",
    title: "Custom Software",
    description:
      "Web applications, mobile apps, and management platforms built around how your team actually works.",
    items: ["Web Apps", "Mobile Apps", "Dashboards", "Portals"],
  },
  {
    icon: Bot,
    number: "03",
    title: "AI Solutions",
    description:
      "Automation that handles repetitive work, supports customers, and helps teams decide faster.",
    items: ["Chatbots", "Automation", "Document AI", "AI Assistants"],
  },
];

const INDUSTRIES = [
  { icon: GraduationCap, label: "Education" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: Building2, label: "Government" },
  { icon: Store, label: "Retail" },
  { icon: Hotel, label: "Hotels & restaurants" },
  { icon: Network, label: "Growing businesses" },
];

const SOLUTIONS = [
  {
    icon: GraduationCap,
    category: "Education",
    title: "School & learning systems",
    description: "Student records, fees, attendance, examinations, communication, and reporting in one tailored environment.",
    tone: "mint",
  },
  {
    icon: HeartPulse,
    category: "Healthcare",
    title: "Clinic & hospital systems",
    description: "Patient registration, appointments, billing, records, inventory, and operational reporting designed for care teams.",
    tone: "blue",
  },
  {
    icon: Building2,
    category: "Public service",
    title: "Government workflows",
    description: "Secure internal platforms for HR, revenue, permits, requests, approvals, records, and accountable reporting.",
    tone: "violet",
  },
  {
    icon: Hotel,
    category: "Hospitality & commerce",
    title: "Business management systems",
    description: "Operations, sales, stock, finance, customers, and service workflows for hotels, restaurants, retailers, and growing teams.",
    tone: "amber",
  },
];

const PROCESS = [
  { icon: Search, number: "01", title: "Discover", text: "We study the current workflow, users, bottlenecks, and desired outcome." },
  { icon: Settings2, number: "02", title: "Plan & design", text: "We define the scope, architecture, user experience, delivery stages, and responsibilities." },
  { icon: Code2, number: "03", title: "Build & test", text: "We develop in clear milestones and test the system against the agreed requirements." },
  { icon: Rocket, number: "04", title: "Launch & support", text: "We deploy, help your team adopt the system, and support its continued improvement." },
];

const FAQS = [
  {
    question: "Do you sell one ready-made ERP to every organization?",
    answer: "No. XalTech can reuse proven foundations, but each engagement is shaped around the client's sector, workflows, users, and priorities.",
  },
  {
    question: "Can we begin with only one module?",
    answer: "Yes. A project can begin with the highest-priority module and expand in planned stages as your team and requirements grow.",
  },
  {
    question: "Can a system work on our local server?",
    answer: "Yes. Depending on the project, we can design for cloud hosting, an on-premise server, or a suitable hybrid approach.",
  },
  {
    question: "What kind of AI solutions do you build?",
    answer: "We focus on useful applications such as support chatbots, internal knowledge assistants, document processing, reporting support, and workflow automation.",
  },
  {
    question: "How long will our project take?",
    answer: "The timeline depends on scope, integrations, data migration, and approval speed. After discovery, we provide a clear delivery plan instead of promising an unrealistic fixed timeline.",
  },
];

// Header and Logo moved to shared Header component

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="Connected business system illustration">
      <div className="visual-glow visual-glow--one" />
      <div className="visual-glow visual-glow--two" />
      <div className="system-window">
        <div className="window-bar">
          <div className="window-dots"><i /><i /><i /></div>
          <span>Connected operations</span>
          <span className="live-pill"><i /> Ready to scale</span>
        </div>
        <div className="system-body">
          <div className="system-core">
            <span className="core-icon"><Layers3 size={23} /></span>
            <div>
              <strong>One connected system</strong>
              <small>Built around your workflow</small>
            </div>
          </div>

          <div className="module-grid">
            <div className="module-card module-card--blue">
              <span><Database size={18} /></span>
              <div><strong>ERP</strong><small>Core operations</small></div>
              <i className="status-dot" />
            </div>
            <div className="module-card module-card--mint">
              <span><Workflow size={18} /></span>
              <div><strong>Automation</strong><small>Less manual work</small></div>
              <i className="status-dot" />
            </div>
            <div className="module-card module-card--violet">
              <span><MessageSquareText size={18} /></span>
              <div><strong>AI assistant</strong><small>Faster support</small></div>
              <i className="status-dot" />
            </div>
          </div>

          <div className="system-footer">
            <span><ShieldCheck size={15} /> Role-based access</span>
            <span><CloudCog size={15} /> Cloud or on-premise</span>
          </div>
        </div>
      </div>
      <div className="floating-card floating-card--top"><Sparkles size={16} /> Designed for your organization</div>
      <div className="floating-card floating-card--bottom"><Check size={16} /> Clear process. Practical result.</div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="hero-grid-pattern" />
      <div className="shell hero-layout">
        <div className="hero-copy">
          <p className="eyebrow"><i /> Software for real operations</p>
          <h4>
            Turn complex work into a <span>clear digital system.</span>
          </h4>
          <p className="hero-lead">
            XalTech builds ERP platforms, custom applications, and AI automation that help
            organizations work faster, serve people better, and make informed decisions.
          </p>
          <div className="hero-actions">
            <button className="button button--mint" type="button" onClick={() => window.dispatchEvent(new Event('open-contact'))}>
                Discuss your project <ArrowRight size={17} />
              </button>
            <a className="button button--ghost" href="#services">
              Explore our capabilities
            </a>
          </div>
          <div className="capability-list" aria-label="XalTech capabilities">
            <span><Check size={14} /> ERP & custom systems</span>
            <span><Check size={14} /> Web & mobile</span>
            <span><Check size={14} /> AI automation</span>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}

function IndustryBar() {
  return (
    <section className="industry-bar" aria-label="Industries we design for">
      <div className="shell">
        <p>Solutions designed for different ways of working</p>
        <div className="industry-list">
          {INDUSTRIES.map(({ icon: Icon, label }) => (
            <span key={label}><Icon size={16} /> {label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className={`section-heading ${light ? "section-heading--light" : ""}`}>
      <div>
        <p className="eyebrow"><i /> {eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}

function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="shell">
        <SectionHeading
          eyebrow="What we do"
          title="Three ways we solve problems."
          description="Every engagement starts with a real workflow, not a template — then we build the right combination of these three."
        />
        <div className="service-grid">
          {SERVICES.map(({ icon: Icon, ...service }) => (
            <article className="service-card" key={service.title}>
              <div className="service-card-top">
                <span className="service-icon"><Icon size={22} /></span>
                <span className="service-number">{service.number}</span>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="tag-list">
                {service.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solutions() {
  return (
    <section id="solutions" className="section solutions-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Solutions by sector"
          title="Not one system for everyone. The right system for each organization."
          description="Every sector has different records, rules, approvals, and users. We adapt the solution to that reality."
        />
        <div className="solutions-grid">
          {SOLUTIONS.map(({ icon: Icon, ...solution }) => (
            <article className={`solution-card solution-card--${solution.tone}`} key={solution.title}>
              <div className="solution-meta">
                <span className="solution-icon"><Icon size={20} /></span>
                <span>{solution.category}</span>
              </div>
              <h3>{solution.title}</h3>
              <p>{solution.description}</p>
              <button type="button" className="button-link" onClick={() => window.dispatchEvent(new Event('open-contact'))}>Discuss this solution <ArrowRight size={15} /></button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section">
      <div className="shell about-layout">
        <div className="about-copy">
          <p className="eyebrow"><i /> About XalTech</p>
          <h2>We turn real operational challenges into useful software.</h2>
          <p>
            XalTech is a software company building ERP systems, custom digital platforms, and
            AI-powered automation for businesses, institutions, and everyday services.
          </p>
          <p>
            Our work starts by understanding how people currently operate. We then design a
            solution that reduces unnecessary steps, connects information, and supports better decisions.
          </p>
          <div className="about-principles">
            <span><Check size={15} /> Practical before impressive</span>
            <span><Check size={15} /> Clear scope and communication</span>
            <span><Check size={15} /> Designed for real users</span>
          </div>
        </div>

        <div className="about-panel">
          <div className="about-panel-head">
            <span>Our approach</span>
            <Logo light={false} />
          </div>
          <div className="approach-item">
            <span><MonitorSmartphone size={19} /></span>
            <div><strong>Useful</strong><p>Every feature should solve a real task or improve a clear outcome.</p></div>
          </div>
          <div className="approach-item">
            <span><ShieldCheck size={19} /></span>
            <div><strong>Responsible</strong><p>Access, privacy, reliability, and maintainability are considered from the start.</p></div>
          </div>
          <div className="approach-item">
            <span><ServerCog size={19} /></span>
            <div><strong>Adaptable</strong><p>Systems can evolve as users, departments, and service needs change.</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustCommitments() {
  const commitments = [
    { icon: ShieldCheck, title: "Security considered early", text: "Role-based access, auditability, backups, and deployment risks are addressed during planning." },
    { icon: ServerCog, title: "Flexible deployment", text: "We select cloud, on-premise, or hybrid infrastructure according to operational needs." },
    { icon: LifeBuoy, title: "Training & support", text: "A successful launch includes user guidance, documentation, and an agreed support plan." },
    { icon: Network, title: "Integration-ready", text: "Where practical, systems can connect with existing tools, devices, and services through secure interfaces." },
  ];

  return (
    <section className="commitments-section">
      <div className="shell commitments-layout">
        <div className="commitments-intro">
          <p className="eyebrow"><i /> Built for confidence</p>
          <h2>Trust comes from how the work is done.</h2>
          <p>We avoid impressive-sounding promises without evidence. Instead, every project begins with clear requirements, responsibilities, and realistic delivery stages.</p>
        </div>
        <div className="commitment-grid">
          {commitments.map(({ icon: Icon, ...item }) => (
            <article key={item.title}>
              <span><Icon size={18} /></span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="section process-section">
      <div className="shell">
        <SectionHeading
          eyebrow="How we work"
          title="A clear path from idea to working system."
          description="The exact stages adapt to the project, while communication and validation remain continuous."
        />
        <div className="process-grid">
          {PROCESS.map(({ icon: Icon, ...step }) => (
            <article className="process-card" key={step.number}>
              <div className="process-top"><span><Icon size={18} /></span><small>{step.number}</small></div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section className="section faq-section">
      <div className="shell faq-layout">
        <div className="faq-intro">
          <p className="eyebrow"><i /> Questions</p>
          <h2>What clients usually want to know.</h2>
          <p>Clear answers before a project begins are part of building trust.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((item, index) => {
            const isOpen = active === index;
            return (
              <article className={isOpen ? "faq-item faq-item--open" : "faq-item"} key={item.question}>
                <button type="button" aria-expanded={isOpen} onClick={() => setActive(isOpen ? -1 : index)}>
                  <span>{item.question}</span>
                  <ChevronDown size={19} />
                </button>
                {isOpen && <p>{item.answer}</p>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="shell contact-card">
        <div className="contact-copy">
          <p className="eyebrow"><i /> Start with a conversation</p>
          <h2>What problem should your next system solve?</h2>
          <p>Tell us about the current process, who uses it, and what you want to improve. We’ll begin by understanding the need.</p>
        </div>
        <div className="contact-actions">
          <a className="button button--mint" href="mailto:hello@xaltech.com">
            <Mail size={17} /> Email XalTech
          </a>
          <span>hello@xaltech.com</span>
          <small>Addis Ababa, Ethiopia</small>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Logo />
          <p>ERP systems, custom software, and useful AI automation built around real operations.</p>
        </div>
        <div className="footer-links">
          <strong>Explore</strong>
          <a href="#services">Services</a>
          <a href="#solutions">Solutions</a>
          <a href="#about">About</a>
          <a href="#process">Process</a>
        </div>
        <div className="footer-links">
          <strong>Capabilities</strong>
          <span>ERP systems</span>
          <span>Web & mobile apps</span>
          <span>AI chatbots</span>
          <span>Workflow automation</span>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} XalTech. All rights reserved.</span>
        <span>Smart solutions for everyday progress.</span>
      </div>
    </footer>
  );
}

export default function XalTechHomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <IndustryBar />
      <Services />
      <Solutions />
      <About />
      <TrustCommitments />
      <Process />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
