
import { useState } from "react";
import Header, { Logo } from "./Header";
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Braces,
  Check,
  Code2,
  Database,
  Eye,
  FileSearch2,
  FileText,
  FlaskConical,
  GitBranch,
  Globe2,
  GraduationCap,
  Gauge,
  Handshake,
  Layers3,
  LockKeyhole,
  Mail,
  Menu,
  MessagesSquare,
  PlugZap,
  Rocket,
  ShieldCheck,
  Sparkles,
  Timer,
  Users,
  WalletCards,
  Workflow,
  X,
} from "lucide-react";

// NAV_LINKS moved to shared Header component

const SERVICE_GROUPS = [
  {
    icon: Layers3,
    title: "ERP Systems",
    lead: "One connected platform for the operations that keep your organization moving.",
    items: ["HR & payroll", "Finance", "Inventory", "CRM", "Education", "Healthcare"],
  },
  {
    icon: Code2,
    title: "Custom Software",
    lead: "Digital products designed around your process instead of a generic template.",
    items: ["Web applications", "Mobile apps", "Management platforms", "Portals", "Dashboards"],
  },
  {
    icon: Bot,
    title: "AI Solutions",
    lead: "Useful automation that saves time, improves service, and makes information easier to use.",
    items: ["Chatbots", "AI assistants", "Workflows", "Document AI", "System integrations"],
  },
];

const VALUES = [
  { icon: Sparkles, title: "Simple", description: "Clear experiences for people doing real work, often under pressure." },
  { icon: Gauge, title: "Useful", description: "Every feature should save time, reduce friction, or improve an outcome." },
  { icon: Globe2, title: "Accessible", description: "Practical technology for growing organizations, not only large enterprises." },
  { icon: ShieldCheck, title: "Reliable", description: "Responsible access, maintainable systems, and support after launch." },
  { icon: Handshake, title: "Collaborative", description: "We build with the people who understand and use the workflow every day." },
  { icon: WalletCards, title: "Sustainable", description: "Systems that can expand in stages instead of forcing a costly restart." },
];

const AI_ITEMS = [
  { icon: MessagesSquare, label: "Chatbots" },
  { icon: Workflow, label: "Workflow automation" },
  { icon: FileSearch2, label: "Document processing" },
  { icon: PlugZap, label: "System integrations" },
];

const EXPERTISE = [
  {
    icon: Layers3,
    code: "01",
    title: "ERP & Business Systems",
    description: "Connected operational platforms that bring people, finance, inventory, customers, approvals, and reporting into one clear workflow.",
    tools: ["HR & Payroll", "Finance", "Inventory", "CRM"],
  },
  {
    icon: Code2,
    code: "02",
    title: "Full-stack Applications",
    description: "Responsive web applications built from the interface through to secure server logic and reliable business APIs.",
    tools: ["React", "Node.js", "Express", "REST APIs"],
  },
  {
    icon: Database,
    code: "03",
    title: "Database Engineering",
    description: "Structured data models that keep operational records consistent, searchable, secure, and ready for useful reporting.",
    tools: ["MySQL", "Sequelize", "Data modelling", "Reporting"],
  },
  {
    icon: Globe2,
    code: "04",
    title: "Frontend & UI Systems",
    description: "Clear dashboards, portals, and responsive interfaces designed for the people who use the software every day.",
    tools: ["React UI", "Tailwind CSS", "Dashboards", "Responsive design"],
  },
  {
    icon: ShieldCheck,
    code: "05",
    title: "Security & Access Control",
    description: "Authentication, role-based permissions, protected workflows, and audit-ready access designed into the system early.",
    tools: ["RBAC", "Authentication", "Permissions", "Audit trails"],
  },
  {
    icon: Bot,
    code: "06",
    title: "AI & Workflow Automation",
    description: "Practical automation that connects systems, processes documents, answers questions, and reduces repetitive work.",
    tools: ["Chatbots", "Document AI", "Workflows", "Integrations"],
  },
];

const STANDARDS = [
  { icon: GitBranch, title: "Version-controlled code", description: "Changes are tracked, reviewed, and reversible throughout delivery." },
  { icon: FlaskConical, title: "Tested before launch", description: "Core workflows are checked against realistic scenarios before release." },
  { icon: Rocket, title: "Staged rollouts", description: "Systems launch in practical stages with a clear fallback plan." },
  { icon: FileText, title: "Documented handoffs", description: "Your team receives useful documentation for the system and its modules." },
  { icon: LockKeyhole, title: "Responsible security", description: "Access control and data protection are considered from the beginning." },
  { icon: Eye, title: "Monitored after launch", description: "Early system health and adoption are watched so issues are found quickly." },
];

const GUARANTEES = [
  { icon: Timer, value: "48h", label: "Target response time for new enquiries" },
  { icon: BadgeCheck, value: "Clear scope", label: "Responsibilities agreed before building" },
  { icon: Users, value: "Direct", label: "Communication with the delivery team" },
  { icon: ShieldCheck, value: "Included", label: "An agreed post-launch support window" },
];

const STACK = ["React", "Node.js", "Express", "MySQL", "Sequelize ORM", "Tailwind CSS", "REST APIs", "Role-based access", "AI integrations"];

// Temporary Unsplash portraits. Replace only the `image` values when the real team photos are ready.
const TEAM_MEMBERS = [
  {
    code: "01",
    name: "Eng. Amin Bashir",
    role: "Software Engineer",
    image: "Amin.jpg",
    description: "Full-stack engineer focused on ERP platforms, business applications, APIs, databases, and clear user experiences from architecture to launch.",
    focus: ["ERP architecture", "Full-stack systems", "Product delivery"],
  },
  {
    code: "02",
    name: "Eng. Abdinasir Bashir",
    role: "Software Engineer",
    image: "share.jpg",
    source: "https://unsplash.com/s/photos/professional-black-man",
    description: "Software engineer contributing to analysis, system design, implementation, testing, and the delivery of reliable solutions for real operational needs.",
    focus: ["System analysis", "Software design","Full-stack systems", "Quality delivery"],
  },
];

// Header and Logo moved to shared Header component

function AboutHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className={`about-heading ${light ? "about-heading--light" : ""}`}>
      <div><p className="eyebrow"><i /> {eyebrow}</p><h2>{title}</h2></div>
      {description && <p>{description}</p>}
    </div>
  );
}

function AboutHero() {
  return (
    <section className="about-hero">
      <div className="about-hero__grid" />
      <div className="shell about-hero__layout">
        <div>
          <p className="eyebrow"><i /> About XalTech</p>
          <h1>Technology that solves <span>real business problems.</span></h1>
          <p className="about-hero__lead">XalTech builds intelligent, practical, and reliable software for businesses, institutions, and services people use every day.</p>
          <div className="about-hero__actions">
            <a className="button button--mint" href="#story">Our story <ArrowRight size={16} /></a>
            <a className="button button--ghost" href="/services">Explore services</a>
          </div>
        </div>
        <aside className="about-origin-card" aria-label="The meaning of XalTech">
          <div className="about-origin-card__top"><Logo /><span>Our name</span></div>
          <div className="about-origin-card__word">Xal</div>
          <p>Meaning <strong>solution</strong> — a reminder that technology should begin with a real problem and end with a useful result.</p>
          <div className="about-origin-card__mark"><Braces size={18} /><span>Connected systems</span><ArrowRight size={17} /></div>
        </aside>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="about-section about-story">
      <div className="shell">
        <div className="about-story__statement">
          <p className="eyebrow"><i /> Our mission</p>
          <p>We design and develop <strong>ERP systems, custom applications, and AI automation</strong> that help organizations manage work from clear, connected platforms.</p>
        </div>
        <div className="about-story__cards">
          <article><span>NAME</span><h3>What “Xal” means</h3><p>Xal is the word for solution. The name keeps our work focused on practical outcomes rather than software for its own sake.</p></article>
          <article><span>MARK</span><h3>What the logo represents</h3><p>Four connected modules form an X, while the rising arrow represents integration, momentum, and steady progress.</p></article>
        </div>
      </div>
    </section>
  );
}

function WhatWeDo() {
  return (
    <section className="about-section about-services">
      <div className="shell">
        <AboutHeading eyebrow="What we do" title="A full digital partner beyond ERP." description="From the system that runs an operation to the automation that removes repetitive work around it." />
        <div className="about-service-grid">
          {SERVICE_GROUPS.map(({ icon: Icon, ...group }) => (
            <article key={group.title}>
              <span className="about-card-icon"><Icon size={22} /></span>
              <h3>{group.title}</h3><p>{group.lead}</p>
              <ul>{group.items.map((item) => <li key={item}><Check size={13} /> {item}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section className="about-section about-expertise">
      <div className="shell">
        <AboutHeading eyebrow="Our expertise" title="Software capabilities built around real operations." description="We combine business-system thinking, full-stack engineering, and practical automation to deliver software from idea to launch." />
        <div className="expertise-grid">
          {EXPERTISE.map(({ icon: Icon, ...skill }) => (
            <article className="expertise-card" key={skill.code}>
              <div className="expertise-card__top"><span><Icon size={21} /></span><small>{skill.code}</small></div>
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
              <div className="expertise-card__tags">{skill.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Beliefs() {
  return (
    <section className="about-section about-beliefs">
      <div className="shell">
        <AboutHeading eyebrow="What we believe" title="Technology should be simple and useful." description="Our goal is to turn complexity into digital tools that save time, reduce cost, and support sustainable growth." />
        <div className="belief-grid">
          {VALUES.map(({ icon: Icon, ...value }) => <article key={value.title}><span><Icon size={18} /></span><h3>{value.title}</h3><p>{value.description}</p></article>)}
        </div>
      </div>
    </section>
  );
}

function AICallout() {
  return (
    <section className="about-ai-strip">
      <div className="about-ai-strip__grid" />
      <div className="shell about-ai-strip__content">
        <div><p className="eyebrow eyebrow--light"><i /> AI, applied</p><h2>Automation should remove real friction.</h2><p>We use AI to reduce repetitive work, improve customer service, and help teams find useful information faster.</p></div>
        <div>{AI_ITEMS.map(({ icon: Icon, label }) => <span key={label}><Icon size={15} /> {label}</span>)}</div>
      </div>
    </section>
  );
}

function EngineeringStandards() {
  return (
    <section className="about-section about-standards">
      <div className="about-standards__grid" />
      <div className="shell about-standards__content">
        <AboutHeading light eyebrow="Engineering standards" title="How we protect what you build." description="Trust is built through clear practices applied throughout planning, development, launch, and support." />
        <div className="standard-grid">{STANDARDS.map(({ icon: Icon, ...item }) => <article key={item.title}><span><Icon size={20} /></span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section id="team" className="about-section about-team">
      <div className="shell">
        <AboutHeading eyebrow="The team" title="Two software engineers. One shared mission." description="XalTech is built by two Jigjiga University Software Engineering graduates who stay close to every problem, decision, and line of code." />
        <div className="team-grid">
          {TEAM_MEMBERS.map((member, index) => (
            <article className={`team-card ${index === 1 ? "team-card--blue" : ""}`} key={member.name}>
              <div className="team-card__photo">
                <img src={member.image} alt={`Temporary portrait placeholder for ${member.name}`} loading="lazy" referrerPolicy="no-referrer" />
                {/* <span className="team-card__placeholder">Temporary portrait</span> */}
                <small>{member.code}</small>
                <div className="team-card__photo-label"><i /> XalTech engineering</div>
              </div>
              <div className="team-card__body">
                <span className="team-card__role">{member.role}</span>
                <h3>{member.name}</h3>
                <p>{member.description}</p>
                <div className="team-card__focus">{member.focus.map((item) => <span key={item}>{item}</span>)}</div>
                <div className="team-card__education"><GraduationCap size={18} /><span><strong>Jigjiga University</strong><small>BSc · Software Engineering</small></span></div>
                {/* <a className="team-card__source" href={member.source} target="_blank" rel="noreferrer">Temporary photo from Unsplash</a> */}
              </div>
            </article>
          ))}
        </div>
        {/* <div className="team-foundation"><BadgeCheck size={19} /><span><strong>Shared foundation</strong> Both engineers graduated from Jigjiga University’s Department of Software Engineering.</span></div> */}
      </div>
    </section>
  );
}

function TechStack() {
  return (
    <section className="about-section about-stack">
      <div className="shell">
        <AboutHeading eyebrow="Built with" title="A modern, proven foundation." description="Widely used, well-documented technology keeps systems maintainable and ready to evolve." />
        <div className="stack-list">{STACK.map((item) => <span key={item}><i /> {item}</span>)}</div>
      </div>
    </section>
  );
}

function Guarantees() {
  return (
    <section className="about-guarantees"><div className="shell guarantee-grid">{GUARANTEES.map(({ icon: Icon, ...item }) => <article key={item.label}><Icon size={18} /><strong>{item.value}</strong><span>{item.label}</span></article>)}</div></section>
  );
}

function Contact() {
  return (
    <section id="contact" className="about-contact">
      <div className="shell about-contact__card">
        <div><p className="eyebrow"><i /> Work with us</p><h2>Have a system worth building?</h2><p>Tell us what is slowing your team down. We’ll help identify a practical place to begin.</p></div>
        <div><a className="button button--mint" href="mailto:hello@xaltech.com"><Mail size={17} /> Email XalTech</a><a className="button button--ghost" href="/services">See our services</a></div>
      </div>
    </section>
  );
}

function AboutFooter() {
  return (
    <footer className="footer">
      <div className="shell footer-main">
        <div className="footer-brand"><Logo light /><p>ERP systems, custom software, and useful AI automation built around real operations.</p></div>
        <div className="footer-links"><strong>Explore</strong><a href="/">Home</a><a href="/services">Services</a><a href="/about">About</a><a href="/#process">Process</a></div>
        {/* <div className="footer-links"><strong>Contact</strong><a href="mailto:hello@xaltech.com">hello@xaltech.com</a><span>Addis Ababa, Ethiopia</span></div> */}
      </div>
      <div className="shell footer-bottom"><span>© {new Date().getFullYear()} XalTech. All rights reserved.</span><span>Smart solutions for everyday progress.</span></div>
    </footer>
  );
}

export default function AboutPage() {
  return (
    <main className="about-page">
      <Header />
      <AboutHero />
      <Story />
      <WhatWeDo />
      <Expertise />
      <Beliefs />
      <AICallout />
      <EngineeringStandards />
      <Team />
      <TechStack />
      <Guarantees />
      <Contact />
      <AboutFooter />
    </main>
  );
}
