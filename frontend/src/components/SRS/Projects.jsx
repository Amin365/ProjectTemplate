import { NavLink } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Compass,
  Gem,
  Handshake,
  Landmark,
  Layers3,
  Map,
  Pickaxe,
} from "lucide-react";

import {
  Container,
  Eyebrow,
  Badge,
} from "@/components/ui/primitives";

import { Button } from "@/components/ui/button";
import { projects } from "@/data/content";

/* =========================================================
   PROJECT PROCESS
   ========================================================= */

const projectProcess = [
  {
    number: "01",
    icon: Compass,
    title: "Identify",
    text: "Understand the geological opportunity, available information and the potential case for further investigation.",
  },
  {
    number: "02",
    icon: Pickaxe,
    title: "Evaluate",
    text: "Advance promising opportunities through technical investigation, resource evaluation and project definition.",
  },
  {
    number: "03",
    icon: Layers3,
    title: "Develop",
    text: "Move viable projects toward responsible development, processing, infrastructure and operational readiness.",
  },
  {
    number: "04",
    icon: Handshake,
    title: "Partner",
    text: "Connect projects with appropriate investors, operators, institutions and technical partners.",
  },
];

/* =========================================================
   HERO VISUAL
   ========================================================= */

function ProjectsVisual() {
  return (
    <div className="relative hidden min-h-[500px] lg:block">
      {/* basin rings */}
      <div className="absolute right-0 top-10 h-[420px] w-[420px] rounded-full border border-[var(--color-basalt)]/[0.06]" />

      <div className="absolute right-[55px] top-[65px] h-[320px] w-[320px] rounded-full border border-[var(--color-basalt)]/[0.06]" />

      <div className="absolute right-[120px] top-[125px] h-[205px] w-[205px] rounded-full border border-[var(--color-sandstone-deep)]/[0.14]" />

      {/* contour map */}
      <svg
        viewBox="0 0 700 430"
        className="absolute bottom-5 right-0 w-full max-w-[700px]"
        fill="none"
      >
        <path
          d="M25 300C110 220 187 277 260 201C334 126 402 177 470 112C530 55 597 77 675 29"
          stroke="var(--color-basalt)"
          strokeWidth="1.5"
          opacity="0.11"
        />

        <path
          d="M10 342C103 257 199 326 282 246C361 169 427 223 506 153C568 99 623 111 694 70"
          stroke="var(--color-sandstone-deep)"
          strokeWidth="1.8"
          opacity="0.24"
        />

        <path
          d="M44 378C142 309 219 365 311 293C402 221 470 273 551 215C610 174 655 177 699 147"
          stroke="var(--color-basalt)"
          strokeWidth="1.5"
          opacity="0.08"
        />
      </svg>

      {/* project marker 1 */}
      <div className="absolute right-[265px] top-[210px]">
        <span className="absolute -inset-5 rounded-full border border-[var(--color-sandstone-deep)]/15" />
        <span className="absolute -inset-2 rounded-full border border-[var(--color-sandstone-deep)]/25" />

        <span className="relative block h-3 w-3 rounded-full bg-[var(--color-sandstone-deep)]" />
      </div>

      {/* project marker 2 */}
      <div className="absolute right-[105px] top-[145px]">
        <span className="absolute -inset-3 rounded-full border border-[var(--color-basalt)]/12" />

        <span className="relative block h-2.5 w-2.5 rounded-full bg-[var(--color-basalt)]/55" />
      </div>

      {/* label */}
      <div className="absolute bottom-22 left-0 border-l-2 border-[var(--color-sandstone-deep)] bg-white py-3 pl-5">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--color-sandstone-deep)]">
          Regional project landscape
        </span>

        <strong className="mt-2 block font-display text-xl font-medium text-[var(--color-basalt)]">
          From prospect to project
        </strong>

        <span className="mt-1 block text-xs text-[var(--color-ink-soft)]">
          Explore · Evaluate · Develop
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   HERO
   ========================================================= */

function ProjectsHero() {
  return (
    <section className="overflow-hidden border-b border-[var(--color-basalt)]/[0.07] bg-white">
      <Container className="max-w-[1480px]">
        <div
          className="
            grid
            min-h-[630px]
            items-center
            gap-20
            py-20
            lg:grid-cols-[minmax(0,680px)_minmax(0,620px)]
            lg:gap-36
            lg:py-24
          "
        >
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 border border-[var(--color-basalt)]/[0.10] px-3 py-2">
              <Landmark
                size={13}
                className="text-[var(--color-sandstone-deep)]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-basalt)]/55">
                SRS Mining Enterprise · Projects
              </span>
            </div>

            <h1
              className="
                mt-8
                max-w-[720px]
                font-display
                text-[2.8rem]
                leading-[1.03]
                tracking-[-0.045em]
                text-[var(--color-basalt)]
                md:text-[3.65rem]
              "
            >
              Projects that turn
              <span className="block text-[var(--color-sandstone-deep)]">
                potential into progress.
              </span>
            </h1>

            <p className="mt-7 max-w-[630px] text-[17px] leading-8 text-[var(--color-ink-soft)]">
              Explore mineral and resource initiatives connected to the Somali
              Regional State&apos;s geological potential — from early-stage
              investigation to project development and strategic partnership.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Button
                as={NavLink}
                to="/srs/contacts"
                variant="dark"
                className="min-h-12 px-6"
              >
                Discuss a project
                <ArrowRight size={16} />
              </Button>

              <Button
                as={NavLink}
                to="/resources"
                variant="outline"
                className="min-h-12 border-[var(--color-basalt)]/15 bg-white px-6 text-[var(--color-basalt)]"
              >
                Explore resources
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <ProjectsVisual />
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   PROJECT PORTFOLIO
   One featured project + editorial index
   ========================================================= */

function ProjectPortfolio() {
  if (!projects?.length) {
    return null;
  }

  const featured = projects[0];
  const remaining = projects.slice(1);

  return (
    <section className="bg-white py-24 md:py-32">
      <Container className="max-w-[1400px]">
        {/* SECTION HEADER */}
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end lg:gap-24">
          <div>
            <Eyebrow>Project portfolio</Eyebrow>

            <h2
              className="
                mt-5
                max-w-[560px]
                font-display
                text-3xl
                leading-[1.1]
                tracking-[-0.03em]
                text-[var(--color-basalt)]
                md:text-[2.55rem]
              "
            >
              Active opportunities across
              <span className="block">
                the region.
              </span>
            </h2>
          </div>

          <p className="max-w-[600px] justify-self-end text-sm leading-7 text-[var(--color-ink-soft)]">
            Each project represents a different stage of the mineral development
            journey. The portfolio brings together resource potential, technical
            work, development opportunity and partnership.
          </p>
        </div>

        {/* PORTFOLIO */}
        <div className="mt-16 grid gap-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
          {/* FEATURED PROJECT */}
          <article className="relative min-h-[500px] overflow-hidden bg-[var(--color-basalt)] px-8 py-10 text-white md:px-11 md:py-12">
            {/* decorative circles */}
            <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/[0.07]" />

            <div className="absolute right-8 top-16 h-52 w-52 rounded-full border border-white/[0.06]" />

            {/* geology */}
            <svg
              viewBox="0 0 800 300"
              className="absolute inset-x-0 bottom-[60px] w-full text-white/[0.07]"
              fill="currentColor"
              preserveAspectRatio="none"
            >
              <path d="M0 300V235L93 195L155 214L242 126L305 181L370 142L431 194L520 102L594 185L658 142L800 216V300H0Z" />
            </svg>

            {/* strata */}
            <div className="absolute inset-x-0 bottom-0">
              <div className="h-6 bg-[var(--color-sandstone-deep)]/55" />
              <div className="h-5 bg-[var(--color-sandstone-deep)]/30" />
              <div className="h-7 bg-white/[0.06]" />
            </div>

            <div className="relative z-10 flex h-full flex-col">
              {/* TOP */}
              <div className="flex items-start justify-between gap-5">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
                    Featured project
                  </span>

                  <div className="mt-4">
                    <Badge>{featured.tag}</Badge>
                  </div>
                </div>

                <Gem
                  size={22}
                  className="text-[var(--color-sandstone-deep)]"
                />
              </div>

              {/* PROJECT */}
              <div className="mt-auto max-w-[560px] pb-16">
                <h3 className="font-display text-4xl leading-[1.05] tracking-[-0.035em] text-white md:text-[2.8rem]">
                  {featured.name}
                </h3>

                <p className="mt-6 max-w-[540px] text-sm leading-7 text-white/58">
                  {featured.text}
                </p>

                <NavLink
                  to="/srs/contacts"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white"
                >
                  Discuss this project
                  <ArrowUpRight
                    size={15}
                    className="text-[var(--color-sandstone-deep)]"
                  />
                </NavLink>
              </div>
            </div>
          </article>

          {/* PROJECT INDEX */}
          <div>
            <div className="border-t border-[var(--color-basalt)]/[0.13]">
              {remaining.map((project, index) => (
                <article
                  key={project.name}
                  className="
                    group
                    border-b
                    border-[var(--color-basalt)]/[0.13]
                    py-8
                    md:py-9
                  "
                >
                  <div className="flex items-start justify-between gap-8">
                    <div className="max-w-xl">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-[9px] text-[var(--color-sandstone-deep)]">
                          0{index + 2}
                        </span>

                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-ink-soft)]/45">
                          {project.tag}
                        </span>
                      </div>

                      <h3 className="mt-4 font-display text-[1.55rem] leading-tight text-[var(--color-basalt)]">
                        {project.name}
                      </h3>

                      <p className="mt-4 max-w-lg text-sm leading-7 text-[var(--color-ink-soft)]">
                        {project.text}
                      </p>

                      <NavLink
                        to="/srs/contacts"
                        className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-basalt)]"
                      >
                        Project enquiry
                        <ArrowRight
                          size={13}
                          className="text-[var(--color-sandstone-deep)]"
                        />
                      </NavLink>
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="mt-1 shrink-0 text-[var(--color-ink-soft)]/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-sandstone-deep)]"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   PROJECT DEVELOPMENT JOURNEY
   ========================================================= */

function ProjectJourney() {
  return (
    <section className="bg-[var(--color-basalt)] py-24 text-white md:py-32">
      <Container className="max-w-[1400px]">
        {/* HEADING */}
        <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr] lg:gap-28">
          <div>
            <Eyebrow tone="mica">Project development</Eyebrow>

            <h2
              className="
                mt-5
                max-w-[500px]
                font-display
                text-3xl
                leading-[1.1]
                tracking-[-0.03em]
                md:text-[2.6rem]
              "
            >
              A project evolves through
              <span className="block">
                evidence and partnership.
              </span>
            </h2>

            <p className="mt-6 max-w-[420px] text-sm leading-7 text-white/50">
              Resource opportunities become stronger as geological certainty,
              technical understanding and project readiness improve.
            </p>
          </div>

          {/* TIMELINE */}
          <div className="relative">
            <div className="absolute left-[25px] top-0 hidden h-full w-px bg-white/15 md:block" />

            <div className="space-y-0">
              {projectProcess.map(({ icon: Icon, ...step }) => (
                <div
                  key={step.number}
                  className="
                    relative
                    grid
                    gap-6
                    border-b
                    border-white/15
                    py-8
                    first:border-t
                    md:grid-cols-[64px_200px_1fr]
                    md:gap-8
                  "
                >
                  <div className="relative z-10">
                    <span className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-white/15 bg-[var(--color-basalt)]">
                      <Icon
                        size={18}
                        className="text-[var(--color-sandstone-deep)]"
                      />
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[9px] text-[var(--color-sandstone-deep)]">
                      {step.number}
                    </span>

                    <h3 className="mt-2 font-display text-xl text-white">
                      {step.title}
                    </h3>
                  </div>

                  <p className="max-w-xl text-sm leading-7 text-white/50">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   PROJECT PRINCIPLES
   ========================================================= */

function ProjectPrinciples() {
  const principles = [
    {
      title: "Technical evidence",
      text: "Project decisions should be grounded in progressively stronger geological and technical information.",
    },
    {
      title: "Responsible development",
      text: "Viability must be considered alongside environmental, institutional and community responsibilities.",
    },
    {
      title: "Regional value",
      text: "Projects should create opportunities for investment, employment, skills and productive economic activity.",
    },
  ];

  return (
    <section className="bg-white py-24 md:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[.65fr_1.35fr] lg:gap-28">
          {/* LEFT */}
          <div>
            <Eyebrow>How projects are viewed</Eyebrow>

            <h2
              className="
                mt-5
                max-w-[480px]
                font-display
                text-3xl
                leading-[1.1]
                tracking-[-0.03em]
                text-[var(--color-basalt)]
                md:text-[2.55rem]
              "
            >
              More than a mineral
              <span className="block">
                occurrence.
              </span>
            </h2>

            <p className="mt-6 max-w-[400px] text-sm leading-7 text-[var(--color-ink-soft)]">
              A promising resource only becomes a meaningful project when
              technical, economic and development considerations come together.
            </p>
          </div>

          {/* RIGHT */}
          <div className="grid gap-x-12 gap-y-10 md:grid-cols-3">
            {principles.map((item, index) => (
              <div
                key={item.title}
                className="border-t border-[var(--color-basalt)]/[0.13] pt-7"
              >
                <span className="font-mono text-[9px] text-[var(--color-sandstone-deep)]">
                  0{index + 1}
                </span>

                <h3 className="mt-6 font-display text-xl leading-tight text-[var(--color-basalt)]">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[var(--color-ink-soft)]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   CTA
   ========================================================= */

function ProjectsCTA() {
  return (
    <section className="border-t border-[var(--color-basalt)]/[0.07] bg-white py-24 md:py-28">
      <Container>
        <div className="relative overflow-hidden bg-[var(--color-sandstone-deep)] px-8 py-12 text-white md:px-14 md:py-16 lg:px-16">
          {/* subtle decoration */}
          <div className="absolute -right-24 -top-28 h-96 w-96 rounded-full border border-white/10" />

          <div className="absolute right-14 top-12 h-56 w-56 rounded-full border border-white/10" />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-[720px]">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                Project partnership
              </span>

              <h2
                className="
                  mt-5
                  max-w-[700px]
                  font-display
                  text-3xl
                  leading-[1.09]
                  tracking-[-0.03em]
                  md:text-[2.75rem]
                "
              >
                Interested in one of the
                <span className="block">
                  region&apos;s resource opportunities?
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/70">
                Connect with SRS Mining Enterprise regarding project
                information, technical cooperation, investment or strategic
                partnership.
              </p>
            </div>

            <Button
              as={NavLink}
              to="/contact"
              variant="outline"
              className="min-h-12 border-white bg-white px-6 text-[var(--color-sandstone-deep)] hover:bg-white/90"
            >
              Discuss a project
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   PROJECTS PAGE
   ========================================================= */

export default function Projects() {
  return (
    <>
      <ProjectsHero />
      <ProjectPortfolio />
      <ProjectJourney />
      <ProjectPrinciples />
      <ProjectsCTA />
    </>
  );
}