import { NavLink } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Compass,
  FileText,
  Gem,
  Globe2,
  Handshake,
  Landmark,
  Layers3,
  Map,
  MapPinned,
  Pickaxe,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

import {
  Container,
  Eyebrow,
} from "@/components/ui/primitives";

import { Button } from "@/components/ui/button";
import { stats, resources, services } from "@/data/content";

/* =========================================================
   CONTENT
   ========================================================= */

const exploreLinks = [
  {
    icon: Map,
    title: "Mineral resources",
    text: "Explore the region's mineral potential and resource portfolio.",
    to: "/resources",
  },
  {
    icon: Building2,
    title: "Enterprise services",
    text: "Understand our mandate, technical services and areas of operation.",
    to: "/services",
  },
  {
    icon: Handshake,
    title: "Investment & partnership",
    text: "Discover opportunities to work with SRS Mining Enterprise.",
    to: "/contact",
  },
  {
    icon: FileText,
    title: "Reports & publications",
    text: "Access enterprise information, reports and public documents.",
    to: "/publications",
  },
];

const focusAreas = [
  {
    icon: Compass,
    number: "01",
    title: "Explore",
    text: "Identify and understand mineral potential through geological knowledge, surveys and field investigation.",
  },
  {
    icon: Pickaxe,
    number: "02",
    title: "Develop",
    text: "Advance viable resources through responsible planning, technical capability and project development.",
  },
  {
    icon: Handshake,
    number: "03",
    title: "Partner",
    text: "Build effective pathways for investors, operators, institutions and strategic partners.",
  },
];

const priorities = [
  {
    icon: ShieldCheck,
    number: "01",
    title: "Responsible development",
    text: "Resource development should protect long-term environmental, community and regional interests.",
  },
  {
    icon: TrendingUp,
    number: "02",
    title: "Economic opportunity",
    text: "Mineral potential should translate into investment, jobs, enterprise activity and sustainable growth.",
  },
  {
    icon: Globe2,
    number: "03",
    title: "Strategic partnerships",
    text: "Strong partnerships connect regional opportunity with technical capability and investment.",
  },
  {
    icon: Layers3,
    number: "04",
    title: "Resource intelligence",
    text: "Better geological information enables better planning, investment and resource decisions.",
  },
];

/* =========================================================
   GEOLOGICAL HERO VISUAL
   No dashboard / no card-inside-card
   ========================================================= */

function ResourceVisual() {
  return (
    <div className="relative hidden min-h-[500px] w-full lg:block">
      {/* topographic circles */}
      <div className="absolute right-0 top-6 h-[440px] w-[440px] rounded-full border border-[var(--color-basalt)]/[0.06]" />
      <div className="absolute right-[66px] top-[72px] h-[330px] w-[330px] rounded-full border border-[var(--color-basalt)]/[0.06]" />
      <div className="absolute right-[132px] top-[140px] h-[196px] w-[196px] rounded-full border border-[var(--color-basalt)]/[0.07]" />

      {/* section label */}
      <div className="absolute left-0 top-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--color-sandstone-deep)]">
          Regional mineral potential
        </span>

        <h3 className="mt-3 whitespace-nowrap font-display text-[1.45rem] tracking-[-0.025em] text-[var(--color-basalt)]">
          Mapping opportunity beneath the landscape.
        </h3>
      </div>

      {/* geological landscape */}
      <div className="absolute inset-x-0 bottom-10 h-[330px]">
        <svg
          viewBox="0 0 780 310"
          className="absolute inset-x-0 bottom-0 w-full"
          preserveAspectRatio="none"
        >
          {/* mountain mass */}
          <path
            d="M0 235L80 198L145 215L238 118L300 176L360 141L428 192L515 92L588 174L650 136L780 201V310H0Z"
            fill="var(--color-basalt)"
            opacity="0.07"
          />

          {/* contours */}
          <path
            d="M0 214C100 173 185 239 292 177C410 109 481 196 595 140C660 109 714 128 780 100"
            fill="none"
            stroke="var(--color-sandstone-deep)"
            strokeWidth="2"
            opacity="0.22"
          />

          <path
            d="M0 244C110 202 202 264 316 204C420 151 505 220 625 172C688 147 728 149 780 132"
            fill="none"
            stroke="var(--color-sandstone-deep)"
            strokeWidth="2"
            opacity="0.13"
          />

          {/* underground layers */}
          <rect
            x="0"
            y="248"
            width="780"
            height="18"
            fill="var(--color-sandstone-deep)"
            opacity="0.45"
          />

          <rect
            x="0"
            y="266"
            width="780"
            height="17"
            fill="var(--color-sandstone-deep)"
            opacity="0.25"
          />

          <rect
            x="0"
            y="283"
            width="780"
            height="27"
            fill="var(--color-basalt)"
            opacity="0.12"
          />
        </svg>

        {/* location marker */}
        <div className="absolute left-[30%] top-[38%]">
          <span className="absolute -inset-3 rounded-full border border-[var(--color-sandstone-deep)]/25" />
          <span className="relative block h-3 w-3 rounded-full bg-[var(--color-sandstone-deep)]" />
        </div>

        <div className="absolute right-[23%] top-[29%]">
          <span className="absolute -inset-3 rounded-full border border-[var(--color-basalt)]/15" />
          <span className="relative block h-3 w-3 rounded-full bg-[var(--color-basalt)]/65" />
        </div>

        {/* minimal data label */}
        <div className="absolute bottom-7 left-5 flex items-center gap-3 bg-white/90 px-4 py-3 shadow-[0_10px_35px_rgba(20,40,35,0.08)] backdrop-blur">
          <MapPinned
            size={17}
            className="text-[var(--color-sandstone-deep)]"
          />

          <div>
            <strong className="block text-xs font-semibold text-[var(--color-basalt)]">
              Resource intelligence
            </strong>

            <span className="text-[10px] text-[var(--color-ink-soft)]">
              Explore · Map · Develop
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HERO
   ========================================================= */

function Hero() {
  return (
    <section className="overflow-hidden bg-white">
      <Container className="max-w-[1520px]">
        <div
          className="
            grid
            min-h-[730px]
            items-center
            py-20

            lg:grid-cols-[minmax(0,620px)_minmax(0,650px)]
            lg:gap-36
            lg:py-24

            xl:grid-cols-[620px_680px]
            xl:gap-44
          "
        >
          {/* COPY */}
          <div>
            <div className="inline-flex items-center gap-2 border border-[var(--color-basalt)]/[0.10] px-3 py-2">
              <Landmark
                size={13}
                className="text-[var(--color-sandstone-deep)]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--color-basalt)]/60">
                Somali Regional State · Government Enterprise
              </span>
            </div>

            <h1
              className="
                mt-8
                font-display
                text-[2.7rem]
                font-medium
                leading-[1.03]
                tracking-[-0.05em]
                text-[var(--color-basalt)]
                sm:text-[3.2rem]
                xl:text-[3.6rem]
              "
            >
              <span className="block lg:whitespace-nowrap">
                Resources beneath the land.
              </span>

              <span className="mt-2 block text-[var(--color-sandstone-deep)] lg:whitespace-nowrap">
                Opportunity for the region.
              </span>
            </h1>

            <p className="mt-7 max-w-[580px] text-[17px] leading-8 text-[var(--color-ink-soft)]">
              SRS Mining Enterprise supports responsible exploration, mineral
              development and strategic partnerships that transform regional
              resource potential into sustainable economic value.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                as={NavLink}
                to="/resources"
                variant="dark"
                className="min-h-12 px-6"
              >
                Explore our resources
                <ArrowRight size={16} />
              </Button>

              <Button
                as={NavLink}
                to="/about"
                variant="outline"
                className="min-h-12 border-[var(--color-basalt)]/15 bg-white px-6 text-[var(--color-basalt)]"
              >
                About the enterprise
              </Button>
            </div>

            {/* subtle capability strip */}
            <div className="mt-11 flex flex-wrap gap-x-8 gap-y-4 border-t border-[var(--color-basalt)]/[0.08] pt-6">
              {[
                "Mineral exploration",
                "Resource development",
                "Strategic partnership",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-xs text-[var(--color-ink-soft)]"
                >
                  <Check
                    size={14}
                    className="text-[var(--color-sandstone-deep)]"
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <ResourceVisual />
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   EXPLORE ENTERPRISE
   Directional navigation — NO CARDS
   ========================================================= */

function ExploreEnterprise() {
  return (
    <section className="border-t border-[var(--color-basalt)]/[0.07] bg-white py-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-28">
          {/* section intro */}
          <div>
            <Eyebrow>Explore the enterprise</Eyebrow>

            <h2 className="mt-5 max-w-[440px] font-display text-3xl leading-[1.12] tracking-[-0.03em] text-[var(--color-basalt)] md:text-[2.55rem]">
              Access the information that matters.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--color-ink-soft)]">
              From regional mineral resources to partnerships, services and
              public information.
            </p>
          </div>

          {/* editorial navigation */}
          <div className="border-t border-[var(--color-basalt)]/[0.12]">
            {exploreLinks.map(({ icon: Icon, ...item }, index) => (
              <NavLink
                key={item.title}
                to={item.to}
                className="
                  group
                  grid
                  gap-4
                  border-b
                  border-[var(--color-basalt)]/[0.12]
                  py-7
                  md:grid-cols-[46px_1fr_auto]
                  md:items-center
                "
              >
                <span className="flex h-10 w-10 items-center justify-center text-[var(--color-sandstone-deep)]">
                  <Icon size={20} />
                </span>

                <div className="md:grid md:grid-cols-[220px_1fr] md:items-center md:gap-8">
                  <div>
                    <span className="mr-3 font-mono text-[9px] text-[var(--color-ink-soft)]/40">
                      0{index + 1}
                    </span>

                    <strong className="font-display text-lg font-medium text-[var(--color-basalt)]">
                      {item.title}
                    </strong>
                  </div>

                  <p className="mt-2 max-w-md text-sm leading-6 text-[var(--color-ink-soft)] md:mt-0">
                    {item.text}
                  </p>
                </div>

                <ArrowUpRight
                  size={17}
                  className="text-[var(--color-ink-soft)]/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-sandstone-deep)]"
                />
              </NavLink>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   MANDATE + DATA
   Editorial + typography instead of cards
   ========================================================= */

function MandateAndData() {
  return (
    <section className="border-t border-[var(--color-basalt)]/[0.07] bg-white py-24 md:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr] lg:gap-28">
          <div>
            <Eyebrow>Our mandate</Eyebrow>

            <h2 className="mt-5 max-w-[520px] font-display text-3xl leading-[1.12] tracking-[-0.03em] text-[var(--color-basalt)] md:text-[2.7rem]">
              Developing resources with purpose and responsibility.
            </h2>
          </div>

          <div>
            <p className="max-w-[700px] text-[18px] leading-8 text-[var(--color-ink-soft)]">
              The enterprise works to unlock the Somali Regional State&apos;s
              mineral potential through responsible exploration, informed
              development and partnerships that create long-term economic value.
            </p>

            <NavLink
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-sandstone-deep)]"
            >
              Learn about our mandate
              <ArrowRight size={15} />
            </NavLink>
          </div>
        </div>

        {/* TYPOGRAPHIC DATA BAND */}
        <div className="mt-20 grid border-y border-[var(--color-basalt)]/[0.12] sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`
                py-9
                sm:px-7
                lg:px-8
                ${
                  index !== 0
                    ? "sm:border-l sm:border-[var(--color-basalt)]/[0.10]"
                    : ""
                }
              `}
            >
              <div className="font-display text-[2.7rem] tracking-[-0.045em] text-[var(--color-basalt)]">
                {stat.value}
              </div>

              <p className="mt-3 max-w-[220px] text-xs leading-5 text-[var(--color-ink-soft)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   VALUE PROCESS
   Timeline — NO CARDS
   ========================================================= */

function ValueProcess() {
  return (
    <section className="border-t border-[var(--color-basalt)]/[0.07] bg-white py-24 md:py-28">
      <Container>
        <div className="max-w-2xl">
          <Eyebrow>How we create value</Eyebrow>

          <h2 className="mt-5 font-display text-3xl leading-[1.12] tracking-[-0.03em] text-[var(--color-basalt)] md:text-[2.65rem]">
            From geological potential to economic opportunity.
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--color-ink-soft)]">
            A clear path connects exploration, responsible development and
            strategic partnership.
          </p>
        </div>

        <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-[var(--color-basalt)]/[0.12] md:block" />

          {focusAreas.map(({ icon: Icon, ...item }) => (
            <div key={item.number} className="relative">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-[var(--color-basalt)]/[0.16]">
                <Icon
                  size={19}
                  className="text-[var(--color-sandstone-deep)]"
                />
              </div>

              <span className="mt-7 block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--color-sandstone-deep)]">
                {item.number}
              </span>

              <h3 className="mt-3 font-display text-2xl text-[var(--color-basalt)]">
                {item.title}
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--color-ink-soft)]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   RESOURCE PORTFOLIO
   FEATURE + INDEX — NOT A GRID OF CARDS
   ========================================================= */

function Resources() {
  const featured = resources[0];
  const resourceList = resources.slice(1, 4);

  if (!featured) return null;

  return (
    <section className="border-t border-[var(--color-basalt)]/[0.07] bg-white py-24 md:py-28">
      <Container>
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Resource portfolio</Eyebrow>

            <h2 className="mt-5 font-display text-3xl leading-[1.12] tracking-[-0.03em] text-[var(--color-basalt)] md:text-[2.65rem]">
              The resources shaping the region&apos;s next chapter.
            </h2>
          </div>

          <NavLink
            to="/resources"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-sandstone-deep)]"
          >
            Explore all resources
            <ArrowUpRight size={16} />
          </NavLink>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-24">
          {/* FEATURED RESOURCE */}
          <div>
            <div className="relative min-h-[390px] overflow-hidden bg-[var(--color-basalt)] px-8 py-9 text-white md:px-10 md:py-10">
              {/* mineral strata */}
              <div className="absolute inset-x-0 bottom-0">
                <div className="h-12 bg-[var(--color-sandstone-deep)]/60" />
                <div className="h-9 bg-[var(--color-sandstone-deep)]/35" />
                <div className="h-12 bg-white/[0.06]" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
                    Featured resource
                  </span>

                  <Gem
                    size={20}
                    className="text-[var(--color-sandstone-deep)]"
                  />
                </div>

                <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                  {featured.zone}
                </p>

                <h3 className="mt-3 font-display text-4xl tracking-[-0.03em]">
                  {featured.name}
                </h3>

                <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">
                  {featured.detail}
                </p>

                <NavLink
                  to="/resources"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white"
                >
                  Explore resource
                  <ArrowUpRight size={15} />
                </NavLink>
              </div>
            </div>
          </div>

          {/* RESOURCE INDEX */}
          <div className="border-t border-[var(--color-basalt)]/[0.12]">
            {resourceList.map((resource, index) => (
              <NavLink
                to="/resources"
                key={resource.name}
                className="group block border-b border-[var(--color-basalt)]/[0.12] py-8"
              >
                <div className="flex items-start justify-between gap-8">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-sandstone-deep)]">
                      0{index + 2} · {resource.zone}
                    </span>

                    <h3 className="mt-3 font-display text-2xl text-[var(--color-basalt)]">
                      {resource.name}
                    </h3>

                    <p className="mt-3 max-w-lg text-sm leading-6 text-[var(--color-ink-soft)]">
                      {resource.detail}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={17}
                    className="mt-1 shrink-0 text-[var(--color-ink-soft)]/35 transition group-hover:text-[var(--color-sandstone-deep)]"
                  />
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   SERVICES
   ONLY FULL DARK SECTION
   NO SERVICE CARDS
   ========================================================= */

function Services() {
  return (
    <section className="bg-[var(--color-basalt)] py-24 text-white md:py-32">
      <Container>
        <div className="grid gap-20 lg:grid-cols-[.65fr_1.35fr] lg:gap-36">
          <div>
            <Eyebrow tone="mica">What we do</Eyebrow>

            <h2 className="mt-5 max-w-[470px] font-display text-3xl leading-[1.12] tracking-[-0.03em] md:text-[2.7rem]">
              Enterprise capability for responsible mineral development.
            </h2>

            <p className="mt-6 max-w-[410px] text-sm leading-7 text-white/55">
              Technical capability, institutional responsibility and strategic
              partnership come together under one enterprise mandate.
            </p>

            <NavLink
              to="/services"
              className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-sandstone-deep)]"
            >
              Explore all services
              <ArrowRight size={15} />
            </NavLink>
          </div>

          {/* SERVICE INDEX */}
          <div className="border-t border-white/15">
            {services.slice(0, 4).map((service, index) => (
              <NavLink
                key={service.title}
                to="/services"
                className="group grid gap-5 border-b border-white/15 py-8 md:grid-cols-[60px_230px_1fr_auto] md:items-start"
              >
                <span className="font-mono text-[10px] text-[var(--color-sandstone-deep)]">
                  0{index + 1}
                </span>

                <h3 className="font-display text-xl text-white">
                  {service.title}
                </h3>

                <p className="max-w-xl text-sm leading-6 text-white/50">
                  {service.text}
                </p>

                <ArrowUpRight
                  size={17}
                  className="text-white/30 transition group-hover:text-[var(--color-sandstone-deep)]"
                />
              </NavLink>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   PRIORITIES
   EDITORIAL LIST — NO CARDS
   ========================================================= */

function Priorities() {
  return (
    <section className="bg-white py-24 md:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[.75fr_1.25fr] lg:gap-28">
          <div>
            <Eyebrow>Our priorities</Eyebrow>

            <h2 className="mt-5 max-w-[430px] font-display text-3xl leading-[1.12] tracking-[-0.03em] text-[var(--color-basalt)] md:text-[2.55rem]">
              Building value beyond extraction.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--color-ink-soft)]">
              Resource development should create lasting value for the region,
              its communities and future generations.
            </p>
          </div>

          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {priorities.map(({ icon: Icon, ...item }) => (
              <div
                key={item.title}
                className="border-t border-[var(--color-basalt)]/[0.12] pt-6"
              >
                <div className="flex items-center justify-between">
                  <Icon
                    size={18}
                    className="text-[var(--color-sandstone-deep)]"
                  />

                  <span className="font-mono text-[9px] text-[var(--color-ink-soft)]/35">
                    {item.number}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl text-[var(--color-basalt)]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[var(--color-ink-soft)]">
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
   INVESTMENT CTA
   ONE MEANINGFUL PANEL
   ========================================================= */

function InvestmentCTA() {
  return (
    <section className="border-t border-[var(--color-basalt)]/[0.07] bg-white py-24 md:py-28">
      <Container>
        <div className="relative overflow-hidden bg-[var(--color-sandstone-deep)] px-8 py-12 text-white md:px-14 md:py-16 lg:px-16">
          {/* decoration */}
          <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute right-16 top-12 h-56 w-56 rounded-full border border-white/10" />

          <div className="relative grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                Investment & strategic partnership
              </span>

              <h2 className="mt-5 font-display text-3xl leading-[1.1] tracking-[-0.03em] md:text-[2.8rem]">
                Be part of the Somali Regional State&apos;s mineral future.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
                Engage with SRS Mining Enterprise on exploration, development,
                technical cooperation and long-term investment opportunities.
              </p>
            </div>

            <Button
              as={NavLink}
              to="/contact"
              variant="outline"
              className="min-h-12 border-white bg-white px-6 text-[var(--color-sandstone-deep)] hover:bg-white/90"
            >
              Talk to our team
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   HOME
   ========================================================= */

export default function Home() {
  return (
    <>
      <Hero />
      <ExploreEnterprise />
      <MandateAndData />
      <ValueProcess />
      <Resources />
      <Services />
      <Priorities />
      <InvestmentCTA />
    </>
  );
}