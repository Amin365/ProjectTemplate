import { NavLink } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Beaker,
  Building2,
  Check,
  Compass,
  Database,
  Drill,
  Factory,
  FileCheck2,
  Gem,
  Handshake,
  HardHat,
  Leaf,
  Map,
  Microscope,
  Mountain,
  Pickaxe,
  ScanSearch,
  Users,
} from "lucide-react";

import {
  Container,
  Eyebrow,
} from "@/components/ui/primitives";

import { Button } from "@/components/ui/button";

/* =========================================================
   SERVICE CONTENT
   ========================================================= */

const coreServices = [
  {
    icon: Compass,
    number: "01",
    category: "Geoscience",
    title: "Geological exploration & field investigation",
    text: "Support the identification and evaluation of mineral potential through geological field work, mapping, sampling and structured exploration programs.",
    points: [
      "Geological field mapping",
      "Mineral prospect investigation",
      "Field sampling",
      "Exploration planning",
    ],
  },
  {
    icon: Drill,
    number: "02",
    category: "Exploration",
    title: "Drilling & resource evaluation",
    text: "Support advanced exploration through drilling programs, subsurface investigation and technical work required to better understand promising mineral occurrences.",
    points: [
      "Exploration drilling coordination",
      "Subsurface investigation",
      "Target evaluation",
      "Resource assessment support",
    ],
  },
  {
    icon: Microscope,
    number: "03",
    category: "Technical services",
    title: "Mineral testing & laboratory coordination",
    text: "Facilitate mineral characterization, sample preparation and appropriate analytical testing to support exploration, quality assessment and project decisions.",
    points: [
      "Sample preparation",
      "Mineral characterization",
      "Geochemical analysis support",
      "Quality assessment",
    ],
  },
  {
    icon: Database,
    number: "04",
    category: "Resource intelligence",
    title: "Geological data & resource information",
    text: "Organize and provide useful geological, mineral and project information that supports planning, technical evaluation, investment discussions and resource development.",
    points: [
      "Resource information",
      "Geological records",
      "Project data",
      "Technical information support",
    ],
  },
  {
    icon: Pickaxe,
    number: "05",
    category: "Development",
    title: "Mining project development",
    text: "Support promising mineral opportunities as they progress from exploration toward technically responsible and economically viable mining projects.",
    points: [
      "Project concept development",
      "Technical coordination",
      "Development planning",
      "Operational readiness support",
    ],
  },
  {
    icon: Factory,
    number: "06",
    category: "Industry",
    title: "Mineral processing & value addition",
    text: "Promote opportunities that move mineral resources beyond raw extraction toward processing, industrial inputs and higher-value regional production.",
    points: [
      "Mineral beneficiation opportunities",
      "Processing project support",
      "Industrial mineral development",
      "Local value addition",
    ],
  },
  {
    icon: Handshake,
    number: "07",
    category: "Investment",
    title: "Investment & joint-venture facilitation",
    text: "Connect viable mineral opportunities with investors, operators, technical partners and institutions interested in responsible resource development.",
    points: [
      "Investment information",
      "Project introductions",
      "Joint-venture discussions",
      "Strategic partnership support",
    ],
  },
  {
    icon: FileCheck2,
    number: "08",
    category: "Coordination",
    title: "Licensing & regulatory coordination",
    text: "Help project proponents understand relevant institutional processes and coordinate with the appropriate authorities responsible for mining and investment approvals.",
    points: [
      "Process guidance",
      "Institutional coordination",
      "Documentation support",
      "Regulatory pathway information",
    ],
  },
  {
    icon: HardHat,
    number: "09",
    category: "Local mining",
    title: "Artisanal & small-scale mining support",
    text: "Support efforts to improve the organization, safety, productivity and formal participation of local and small-scale mineral operators.",
    points: [
      "Technical guidance",
      "Safer mining practices",
      "Formalization support",
      "Local capacity development",
    ],
  },
  {
    icon: Leaf,
    number: "10",
    category: "Sustainability",
    title: "Environmental & community coordination",
    text: "Promote mineral development approaches that recognize environmental safeguards, affected communities and the importance of creating lasting local value.",
    points: [
      "Environmental awareness",
      "Community engagement",
      "Responsible development",
      "Local benefit considerations",
    ],
  },
];

const serviceAreas = [
  {
    number: "01",
    title: "Explore",
    text: "Understand the geology, identify mineral occurrences and evaluate promising targets.",
  },
  {
    number: "02",
    title: "Evaluate",
    text: "Gather the technical information required to understand quality, scale and development potential.",
  },
  {
    number: "03",
    title: "Develop",
    text: "Move viable opportunities toward responsible projects, processing and production.",
  },
  {
    number: "04",
    title: "Partner",
    text: "Connect viable opportunities with investors, technical institutions and long-term development partners.",
  },
];

/* =========================================================
   HERO
   ========================================================= */

function ServicesHero() {
  return (
    <section className="overflow-hidden border-b border-[var(--color-basalt)]/[0.07] bg-white">
      <Container className="max-w-[1450px]">
        <div
          className="
            grid
            min-h-[610px]
            items-center
            gap-20
            py-20
            lg:grid-cols-[minmax(0,700px)_minmax(0,1fr)]
            lg:gap-32
            lg:py-24
          "
        >
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 border border-[var(--color-basalt)]/[0.10] px-3 py-2">
              <Building2
                size={13}
                className="text-[var(--color-sandstone-deep)]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-basalt)]/55">
                SRS Mining Enterprise · Services
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
                md:text-[3.7rem]
              "
            >
              From geological knowledge to{" "}
              <span className="text-[var(--color-sandstone-deep)]">
                responsible development.
              </span>
            </h1>

            <p className="mt-7 max-w-[640px] text-[17px] leading-8 text-[var(--color-ink-soft)]">
              SRS Mining Enterprise supports the mineral development journey
              from early exploration and resource information to project
              development, investment partnerships and responsible regional
              value creation.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                as={NavLink}
                to="/contact"
                variant="dark"
                className="min-h-12 px-6"
              >
                Discuss a mineral project
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

          {/* RIGHT — service scope, not cards */}
          <div className="border-t border-[var(--color-basalt)]/[0.12]">
            <div className="py-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
                Service scope
              </span>
            </div>

            {[
              {
                icon: ScanSearch,
                text: "Exploration & resource evaluation",
              },
              {
                icon: Beaker,
                text: "Technical & analytical support",
              },
              {
                icon: Factory,
                text: "Project development & value addition",
              },
              {
                icon: Handshake,
                text: "Investment & institutional coordination",
              },
            ].map(({ icon: Icon, text }, index) => (
              <div
                key={text}
                className="
                  grid
                  grid-cols-[42px_1fr_auto]
                  items-center
                  gap-5
                  border-t
                  border-[var(--color-basalt)]/[0.10]
                  py-5
                "
              >
                <Icon
                  size={18}
                  className="text-[var(--color-sandstone-deep)]"
                />

                <span className="text-sm font-medium text-[var(--color-basalt)]">
                  {text}
                </span>

                <span className="font-mono text-[9px] text-[var(--color-ink-soft)]/35">
                  0{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   SERVICE JOURNEY
   ========================================================= */

function ServiceJourney() {
  return (
    <section className="bg-white py-24 md:py-32">
      <Container className="max-w-[1400px]">
        {/* HEADING */}
        <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-24">
          <div>
            <Eyebrow>How we support development</Eyebrow>

            <h2
              className="
                mt-5
                max-w-[620px]
                font-display
                text-3xl
                leading-[1.1]
                tracking-[-0.03em]
                text-[var(--color-basalt)]
                md:text-[2.55rem]
              "
            >
              One mineral opportunity.
              <span className="block">
                Four stages of support.
              </span>
            </h2>
          </div>

          <p className="max-w-[600px] self-end text-[15px] leading-7 text-[var(--color-ink-soft)]">
            Different projects enter the development cycle at different stages.
            Our role is to connect geological understanding, technical
            evaluation, responsible project development and productive
            partnerships.
          </p>
        </div>

        {/* PROCESS */}
        <div className="relative mt-20">
          {/* desktop connection */}
          <div className="absolute left-0 right-0 top-[25px] hidden h-px bg-[var(--color-basalt)]/[0.13] lg:block" />

          <div className="grid gap-x-14 gap-y-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
            {serviceAreas.map((item) => (
              <article
                key={item.number}
                className="
                  relative
                  border-t
                  border-[var(--color-basalt)]/[0.10]
                  pt-8
                  lg:border-t-0
                  lg:pt-0
                "
              >
                {/* NUMBER */}
                <span
                  className="
                    relative
                    z-10
                    flex
                    h-[50px]
                    w-[50px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[var(--color-basalt)]/[0.15]
                    bg-white
                    font-mono
                    text-[10px]
                    text-[var(--color-sandstone-deep)]
                  "
                >
                  {item.number}
                </span>

                {/* TEXT */}
                <div className="mt-9 pr-4">
                  <h3 className="font-display text-[1.7rem] leading-tight text-[var(--color-basalt)]">
                    {item.title}
                  </h3>

                  <p className="mt-5 max-w-[280px] text-[14px] leading-7 text-[var(--color-ink-soft)]">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   CORE TECHNICAL SERVICES
   ========================================================= */

function CoreServices() {
  return (
    <section className="border-t border-[var(--color-basalt)]/[0.07] bg-white py-24 md:py-32">
      <Container className="max-w-[1420px]">
        <div
          className="
            grid
            gap-20
            lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)]
            lg:gap-28
            xl:gap-36
          "
        >
          {/* LEFT */}
          <div>
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Our services</Eyebrow>

              <h2
                className="
                  mt-5
                  max-w-[600px]
                  font-display
                  text-3xl
                  leading-[1.09]
                  tracking-[-0.03em]
                  text-[var(--color-basalt)]
                  md:text-[2.55rem]
                  lg:text-[2.65rem]
                "
              >
                Technical capability across the
                <span className="block">
                  mineral development cycle.
                </span>
              </h2>

              <p className="mt-7 max-w-[500px] text-[15px] leading-7 text-[var(--color-ink-soft)]">
                Our service areas connect geoscience, technical development,
                investment and institutional coordination instead of treating
                mineral development as a single transaction.
              </p>

              <div className="mt-10 flex items-center gap-3 text-xs text-[var(--color-ink-soft)]">
                <span className="h-2 w-2 rounded-full bg-[var(--color-sandstone-deep)]" />
                Exploration to development
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="border-t border-[var(--color-basalt)]/[0.13]">
            {coreServices.map(({ icon: Icon, ...service }) => (
              <article
                key={service.number}
                className="
                  group
                  border-b
                  border-[var(--color-basalt)]/[0.13]
                  py-10
                  md:py-11
                "
              >
                <div
                  className="
                    grid
                    gap-7
                    md:grid-cols-[64px_230px_minmax(0,1fr)]
                    md:gap-8
                    xl:grid-cols-[64px_250px_minmax(0,1fr)]
                    xl:gap-10
                  "
                >
                  {/* NUMBER + ICON */}
                  <div>
                    <span className="font-mono text-[9px] text-[var(--color-sandstone-deep)]">
                      {service.number}
                    </span>

                    <Icon
                      size={20}
                      className="mt-6 text-[var(--color-sandstone-deep)]"
                    />
                  </div>

                  {/* TITLE */}
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-ink-soft)]/45">
                      {service.category}
                    </span>

                    <h3 className="mt-4 font-display text-[1.45rem] leading-[1.18] text-[var(--color-basalt)]">
                      {service.title}
                    </h3>
                  </div>

                  {/* BODY */}
                  <div>
                    <p className="max-w-[650px] text-[14px] leading-7 text-[var(--color-ink-soft)]">
                      {service.text}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                      {service.points.map((point) => (
                        <span
                          key={point}
                          className="flex items-center gap-2 text-[11px] text-[var(--color-basalt)]/65"
                        >
                          <span className="h-1 w-1 rounded-full bg-[var(--color-sandstone-deep)]" />
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   FEATURED EXPLORATION SECTION
   ========================================================= */

function ExplorationFeature() {
  return (
    <section className="bg-white py-24 md:py-28">
      <Container className="max-w-[1380px]">
        <div
          className="
            grid
            overflow-hidden
            bg-[var(--color-basalt)]
            text-white
            lg:grid-cols-[1fr_.95fr]
          "
        >
          {/* LEFT */}
          <div className="px-8 py-14 md:px-12 md:py-16 lg:px-14 lg:py-20">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-sandstone-deep)]">
              Exploration services
            </span>

            <h2
              className="
                mt-6
                max-w-[590px]
                font-display
                text-3xl
                leading-[1.09]
                tracking-[-0.03em]
                md:text-[2.6rem]
              "
            >
              Better mineral decisions begin
              <span className="block">
                with better geological information.
              </span>
            </h2>

            <p className="mt-7 max-w-[570px] text-sm leading-7 text-white/55">
              Exploration work can combine geological mapping, field sampling,
              geochemical investigation, drilling, mineral characterization and
              technical interpretation to progressively reduce uncertainty
              around a mineral prospect.
            </p>

            <div className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {[
                "Field mapping",
                "Sampling programs",
                "Exploration drilling",
                "Mineral analysis",
                "Resource evaluation",
                "Technical reporting",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-3 border-t border-white/10 pt-4 text-xs text-white/65"
                >
                  <Check
                    size={13}
                    className="text-[var(--color-sandstone-deep)]"
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative min-h-[460px] overflow-hidden border-t border-white/10 lg:border-l lg:border-t-0">
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            <svg
              viewBox="0 0 700 360"
              className="absolute bottom-[105px] left-0 w-full text-white/[0.07]"
              fill="currentColor"
              preserveAspectRatio="none"
            >
              <path d="M0 360V270L78 223L145 250L232 143L310 214L370 171L430 223L512 108L582 211L642 164L700 204V360H0Z" />
            </svg>

            <div className="absolute inset-x-0 bottom-0">
              <div className="h-10 bg-[var(--color-sandstone-deep)]/55" />
              <div className="h-9 bg-[var(--color-sandstone-deep)]/30" />
              <div className="h-9 bg-white/[0.07]" />
              <div className="h-8 bg-black/15" />
            </div>

            <div className="absolute left-[58%] top-[115px] h-[230px] w-px bg-[var(--color-sandstone-deep)]/60">
              <span className="absolute -left-[4px] top-0 h-2 w-2 rounded-full bg-[var(--color-sandstone-deep)]" />
            </div>

            <div className="absolute bottom-7 left-8 right-8">
              <div className="flex items-center gap-3 border-t border-white/15 pt-5">
                <Mountain
                  size={18}
                  className="text-[var(--color-sandstone-deep)]"
                />

                <div>
                  <strong className="block text-xs font-medium">
                    Geological understanding
                  </strong>

                  <span className="text-[10px] text-white/40">
                    Surface → subsurface → resource
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   DEVELOPMENT SCOPE
   ========================================================= */

function DevelopmentScope() {
  return (
    <section className="border-t border-[var(--color-basalt)]/[0.07] bg-white py-24 md:py-32">
      <Container>
        <div className="grid gap-20 lg:grid-cols-[.78fr_1.22fr] lg:gap-32">
          {/* LEFT */}
          <div>
            <Eyebrow>Beyond exploration</Eyebrow>

            <h2
              className="
                mt-5
                max-w-[580px]
                font-display
                text-3xl
                leading-[1.1]
                tracking-[-0.03em]
                text-[var(--color-basalt)]
                md:text-[2.55rem]
              "
            >
              Resource development does not
              <span className="block">
                stop at extraction.
              </span>
            </h2>

            <p className="mt-7 max-w-[470px] text-sm leading-7 text-[var(--color-ink-soft)]">
              Long-term regional value can come from processing, local supply
              chains, technical skills, infrastructure and mineral-based
              industry as well as mining itself.
            </p>
          </div>

          {/* RIGHT */}
          <div className="grid gap-x-14 gap-y-12 md:grid-cols-2">
            {[
              {
                icon: Factory,
                title: "Processing & beneficiation",
                text: "Identify opportunities to improve mineral quality or prepare raw materials for downstream industrial use.",
              },
              {
                icon: Gem,
                title: "Industrial mineral development",
                text: "Support opportunities linked to salt, gypsum, limestone, feldspar, gemstones and other regional resources.",
              },
              {
                icon: Users,
                title: "Local participation",
                text: "Encourage local employment, skills, supplier participation and enterprise development around viable projects.",
              },
              {
                icon: Handshake,
                title: "Strategic investment",
                text: "Connect resource opportunities with the capital, expertise and partnerships required to develop them responsibly.",
              },
            ].map(({ icon: Icon, ...item }) => (
              <div
                key={item.title}
                className="border-t border-[var(--color-basalt)]/[0.13] pt-7"
              >
                <Icon
                  size={20}
                  className="text-[var(--color-sandstone-deep)]"
                />

                <h3 className="mt-7 max-w-[280px] font-display text-xl leading-tight text-[var(--color-basalt)]">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-[350px] text-sm leading-7 text-[var(--color-ink-soft)]">
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
   REGULATORY SUPPORT
   ========================================================= */

function RegulatorySupport() {
  return (
    <section className="border-t border-[var(--color-basalt)]/[0.07] bg-white py-24 md:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[.72fr_1.28fr] lg:gap-28">
          <div>
            <Eyebrow>Institutional coordination</Eyebrow>

            <h2
              className="
                mt-5
                max-w-[560px]
                font-display
                text-3xl
                leading-[1.1]
                tracking-[-0.03em]
                text-[var(--color-basalt)]
                md:text-[2.5rem]
              "
            >
              Clearer pathways through a
              <span className="block">
                multi-institutional sector.
              </span>
            </h2>
          </div>

          <div className="border-l-2 border-[var(--color-sandstone-deep)] pl-8 md:pl-10">
            <p className="max-w-[720px] text-[17px] leading-8 text-[var(--color-ink-soft)]">
              Mineral projects can involve technical, mining, investment,
              environmental and other approvals. SRS Mining Enterprise can
              support project proponents with information and coordination
              while the relevant statutory authorities retain responsibility
              for permits and regulatory decisions.
            </p>

            <div className="mt-9 flex flex-wrap gap-x-9 gap-y-4">
              {[
                "Mining process guidance",
                "Investment coordination",
                "Technical information",
                "Institutional referrals",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-xs text-[var(--color-basalt)]/65"
                >
                  <Check
                    size={13}
                    className="text-[var(--color-sandstone-deep)]"
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   CTA
   ========================================================= */

function ServicesCTA() {
  return (
    <section className="border-t border-[var(--color-basalt)]/[0.07] bg-white py-24 md:py-28">
      <Container>
        <div className="relative overflow-hidden bg-[var(--color-sandstone-deep)] px-8 py-14 text-white md:px-14 md:py-16">
          <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" />

          <div className="pointer-events-none absolute right-16 top-10 h-56 w-56 rounded-full border border-white/10" />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-[750px]">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                Start a conversation
              </span>

              <h2
                className="
                  mt-5
                  max-w-[720px]
                  font-display
                  text-3xl
                  leading-[1.09]
                  tracking-[-0.03em]
                  md:text-[2.75rem]
                "
              >
                Exploring a mineral opportunity
                <span className="block">
                  in the Somali Regional State?
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/70">
                Talk to SRS Mining Enterprise about geological information,
                project development, technical collaboration, investment or
                strategic partnership.
              </p>
            </div>

            <Button
              as={NavLink}
              to="/contact"
              variant="outline"
              className="min-h-12 border-white bg-white px-6 text-[var(--color-sandstone-deep)] hover:bg-white/90"
            >
              Contact the enterprise
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   SERVICES PAGE
   ========================================================= */

export default function Services() {
  return (
    <>
      <ServicesHero />
      <ServiceJourney />
      <CoreServices />
      <ExplorationFeature />
      <DevelopmentScope />
      <RegulatorySupport />
      <ServicesCTA />
    </>
  );
}


