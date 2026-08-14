import { NavLink } from "react-router";
import {
  ArrowRight,
  Building2,
  Compass,
  Gem,
  Globe2,
  Handshake,
  Landmark,
  Leaf,
  Map,
  Pickaxe,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";

import {
  Container,
  Eyebrow,
  SectionHeading,
} from "@/components/ui/primitives";

import { Button } from "@/components/ui/button";

/* 
   REGIONAL MINERAL HISTORY
    */

const miningHistory = [
  {
    era: "Regional heritage",
    title: "Minerals have long formed part of the region's economic landscape.",
    text: "Long before modern geological institutions and large-scale exploration programs, communities across the Somali Regional State lived alongside mineral-rich landscapes. Salt became one of the region's most visible mineral resources, particularly across Afder and surrounding areas, while traditional and small-scale mineral activity connected natural resources with local trade and livelihoods.",
  },
  {
    era: "Mineral identification",
    title: "Geological work began revealing a far more diverse resource base.",
    text: "Successive geological investigations identified significant occurrences of salt, gold, feldspar, mica and natural gas, together with graphite, kaolin, magnetite, talc, phosphate, gemstones and construction materials. These discoveries gradually changed the understanding of the region from a largely pastoral landscape to one with substantial mineral and industrial potential.",
  },
  {
    era: "Gold potential",
    title: "The Moyale area emerged as an important gold exploration zone.",
    text: "Geological conditions around Moyale attracted attention because of indications of primary gold mineralization together with eluvial, deluvial and alluvial placer deposits. Gold occurrences reported along stream beds and surrounding areas strengthened interest in the southern part of the region as a mineral exploration corridor.",
  },
  {
    era: "Industrial minerals",
    title: "Salt, feldspar, stone and industrial minerals broadened the opportunity.",
    text: "Major salt occurrences were documented in areas including Afder, Boji-dol and El-dere. Feldspar and mica occurrences were identified around the Shebelle area and near Babile, while limestone, sandstone, gypsum, clay, marble and other construction materials created opportunities linked to construction, manufacturing and mineral processing.",
  },
  {
    era: "Oil & gas exploration",
    title: "The Ogaden Basin became central to Ethiopia's petroleum exploration story.",
    text: "The Somali Regional State contains the large Ogaden sedimentary basin, which has attracted petroleum exploration for decades. Exploration and development work around Calub and other areas demonstrated the region's natural-gas potential and placed energy resources alongside minerals as a major part of the region's long-term economic opportunity.",
  },
  {
    era: "Modern resource development",
    title: "The focus is shifting from identifying resources to creating lasting value.",
    text: "Today, the opportunity extends beyond extraction. Geological information, responsible exploration, mineral processing, infrastructure, investment partnerships, environmental safeguards and local economic participation all form part of the wider challenge of turning resource potential into sustainable regional development.",
  },
];

/* 
   MANDATE AREAS
    */

const mandateAreas = [
  {
    icon: Compass,
    number: "01",
    title: "Resource exploration",
    text: "Support geological understanding, field investigation and the identification of commercially relevant mineral opportunities.",
  },
  {
    icon: Map,
    number: "02",
    title: "Resource information",
    text: "Strengthen access to reliable geological, project and resource information for planning and informed decision-making.",
  },
  {
    icon: Building2,
    number: "03",
    title: "Project development",
    text: "Support the transition from identified potential toward technically responsible and economically viable resource projects.",
  },
  {
    icon: Handshake,
    number: "04",
    title: "Investment partnership",
    text: "Create constructive relationships with investors, technical institutions, operators and development partners.",
  },
  {
    icon: Leaf,
    number: "05",
    title: "Responsible development",
    text: "Promote approaches that consider environmental safeguards, community interests and the long-term use of regional resources.",
  },
  {
    icon: Users,
    number: "06",
    title: "Regional benefit",
    text: "Encourage mineral development that contributes to employment, local enterprise, skills development and wider economic growth.",
  },
];

/* 
   VALUES
    */

const values = [
  {
    icon: Scale,
    title: "Integrity",
    text: "We value responsible decisions, clear processes and accountability in the stewardship of public resources.",
  },
  {
    icon: ShieldCheck,
    title: "Responsibility",
    text: "Development decisions should consider safety, communities, environmental impact and long-term regional interests.",
  },
  {
    icon: Users,
    title: "Public value",
    text: "The region's resources should contribute to opportunity, livelihoods, enterprise development and shared prosperity.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    text: "Sustainable development requires cooperation between government, communities, investors and technical institutions.",
  },
];

/* 
   LEADERSHIP
   Replace names when official names are confirmed.
    */

const leadership = [
  {
    initials: "DR",
    name: "Director name",
    role: "Director",
    department: "SRS Mining Enterprise",
    text: "Provides strategic leadership for the enterprise, coordinates institutional priorities and oversees the responsible development of regional mineral opportunities.",
  },
  {
    initials: "DD",
    name: "Deputy Director name",
    role: "Deputy Director",
    department: "SRS Mining Enterprise",
    text: "Supports enterprise leadership, program coordination, operational delivery and collaboration across technical and administrative functions.",
  },
];

/* 
   PAGE HERO
    */

function AboutHero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-basalt)]/[0.08] bg-white">
      <Container className="max-w-[1380px]">
        <div className="grid min-h-[560px] items-center gap-16 py-20 lg:grid-cols-[1fr_.72fr] lg:gap-28">
          {/* LEFT */}
          <div className="max-w-[780px]">
            <div className="inline-flex items-center gap-2 border border-[var(--color-basalt)]/[0.10] px-3 py-2">
              <Landmark
                size={13}
                className="text-[var(--color-sandstone-deep)]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-basalt)]/55">
                About SRS Mining Enterprise
              </span>
            </div>

            <h1 className="mt-8 max-w-[760px] font-display text-[2.8rem] leading-[1.03] tracking-[-0.045em] text-[var(--color-basalt)] md:text-[3.7rem]">
              A regional mineral story built across{" "}
              <span className="text-[var(--color-sandstone-deep)]">
                generations.
              </span>
            </h1>

            <p className="mt-7 max-w-[680px] text-[17px] leading-8 text-[var(--color-ink-soft)]">
              The Somali Regional State&apos;s resource story stretches from
              salt-rich landscapes and gold occurrences to industrial minerals
              and the petroleum potential of the Ogaden Basin. SRS Mining
              Enterprise exists within that larger story — helping connect
              geological opportunity with responsible development, investment
              and long-term regional value.
            </p>
          </div>

          {/* RIGHT — EDITORIAL RESOURCE INDEX */}
          <div className="border-t border-[var(--color-basalt)]/[0.12]">
            <div className="border-b border-[var(--color-basalt)]/[0.12] py-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
                Resource landscape
              </span>

              <div className="mt-4 flex items-end justify-between gap-6">
                <strong className="font-display text-2xl font-medium text-[var(--color-basalt)]">
                  Diverse geology
                </strong>

                <Gem
                  size={19}
                  className="text-[var(--color-sandstone-deep)]"
                />
              </div>
            </div>

            {[
              "Gold & precious minerals",
              "Salt & industrial minerals",
              "Construction materials",
              "Natural gas & energy resources",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-5 border-b border-[var(--color-basalt)]/[0.12] py-5"
              >
                <span className="font-mono text-[9px] text-[var(--color-ink-soft)]/35">
                  0{index + 1}
                </span>

                <span className="text-sm font-medium text-[var(--color-basalt)]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 
   HISTORY
    */

function History() {
  return (
    <section className="bg-white py-24 md:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[.62fr_1.38fr] lg:gap-28">
          {/* Sticky intro */}
          <div>
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Our history</Eyebrow>

              <h2 className="mt-5 max-w-[430px] font-display text-3xl leading-[1.12] tracking-[-0.03em] text-[var(--color-basalt)] md:text-[2.6rem]">
                The mineral story of the Somali Regional State.
              </h2>

              <p className="mt-5 max-w-[390px] text-sm leading-7 text-[var(--color-ink-soft)]">
                The region&apos;s modern resource sector did not begin with a
                single project. It developed through successive periods of
                local use, geological investigation, exploration and growing
                institutional attention.
              </p>
            </div>
          </div>

          {/* chronology */}
          <div className="border-t border-[var(--color-basalt)]/[0.12]">
            {miningHistory.map((item, index) => (
              <article
                key={item.title}
                className="grid gap-5 border-b border-[var(--color-basalt)]/[0.12] py-9 md:grid-cols-[120px_1fr]"
              >
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-sandstone-deep)]">
                    0{index + 1}
                  </span>

                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-soft)]/55">
                    {item.era}
                  </p>
                </div>

                <div>
                  <h3 className="max-w-2xl font-display text-[1.55rem] leading-tight text-[var(--color-basalt)]">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-[760px] text-sm leading-7 text-[var(--color-ink-soft)] md:text-[15px]">
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

/* 
   MANDATE
    */

function Mandate() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-basalt)] py-24 text-white md:py-32">
      {/* subtle geology */}
      <div className="pointer-events-none absolute -right-36 -top-48 h-[520px] w-[520px] rounded-full border border-white/[0.06]" />

      <div className="pointer-events-none absolute -right-5 -top-20 h-[340px] w-[340px] rounded-full border border-white/[0.06]" />

      <Container className="relative">
        <div className="grid gap-20 lg:grid-cols-[.65fr_1.35fr] lg:gap-32">
          {/* LEFT */}
          <div>
            <Eyebrow tone="mica">Our mandate</Eyebrow>

            <h2 className="mt-5 max-w-[480px] font-display text-3xl leading-[1.12] tracking-[-0.03em] text-white md:text-[2.7rem]">
              Turning resource potential into responsible regional value.
            </h2>

            <p className="mt-6 max-w-[440px] text-sm leading-7 text-white/55">
              Our role extends beyond identifying minerals. The enterprise
              supports the wider journey from geological opportunity to
              responsible development, institutional coordination and
              long-term economic participation.
            </p>
          </div>

          {/* RIGHT — no cards */}
          <div className="border-t border-white/15">
            {mandateAreas.map(({ icon: Icon, ...item }) => (
              <div
                key={item.number}
                className="grid gap-5 border-b border-white/15 py-7 md:grid-cols-[50px_220px_1fr]"
              >
                <div className="flex items-start gap-3">
                  <Icon
                    size={18}
                    className="text-[var(--color-sandstone-deep)]"
                  />

                  <span className="font-mono text-[9px] text-white/30 md:hidden">
                    {item.number}
                  </span>
                </div>

                <div>
                  <span className="hidden font-mono text-[9px] text-[var(--color-sandstone-deep)] md:block">
                    {item.number}
                  </span>

                  <h3 className="mt-2 font-display text-xl text-white">
                    {item.title}
                  </h3>
                </div>

                <p className="max-w-xl text-sm leading-6 text-white/50">
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

/* 
   MISSION + VISION
    */

function MissionVision() {
  return (
    <section className="bg-white py-24 md:py-28">
      <Container>
        <div className="grid gap-20 lg:grid-cols-[.9fr_1.1fr] lg:gap-28">
          {/* MISSION */}
          <div className="border-t-2 border-[var(--color-sandstone-deep)] pt-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
              Our mission
            </span>

            <h2 className="mt-6 max-w-[570px] font-display text-3xl leading-[1.15] tracking-[-0.03em] text-[var(--color-basalt)] md:text-[2.45rem]">
              To responsibly transform geological potential into economic,
              institutional and community value.
            </h2>

            <p className="mt-6 max-w-[580px] text-sm leading-7 text-[var(--color-ink-soft)]">
              We work to strengthen resource knowledge, support responsible
              exploration and development, facilitate productive partnerships
              and encourage mineral projects that contribute to employment,
              investment, skills, local enterprise and sustainable regional
              growth.
            </p>
          </div>

          {/* VISION */}
          <div className="border-t-2 border-[var(--color-basalt)] pt-7">
            <span className="font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--color-basalt)]/55">
              Our vision
            </span>

            <h2 className="mt-6 max-w-[570px] font-display text-3xl leading-[1.15] tracking-[-0.03em] text-[var(--color-basalt)] md:text-[2.45rem]">
              A competitive, responsible and knowledge-driven mineral sector
              serving generations.
            </h2>

            <p className="mt-6 max-w-[580px] text-sm leading-7 text-[var(--color-ink-soft)]">
              We envision a Somali Regional State where mineral and energy
              resources are understood through quality geological information,
              developed responsibly, connected to productive industry and used
              to create lasting prosperity for communities across the region.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 
   VALUES
    */

function Values() {
  return (
    <section className="border-y border-[var(--color-basalt)]/[0.08] bg-white py-24">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[.65fr_1.35fr] lg:gap-28">
          <div>
            <Eyebrow>How we work</Eyebrow>

            <h2 className="mt-5 max-w-[420px] font-display text-3xl leading-[1.12] tracking-[-0.03em] text-[var(--color-basalt)] md:text-[2.55rem]">
              Principles that guide our decisions.
            </h2>
          </div>

          <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
            {values.map(({ icon: Icon, ...item }) => (
              <div
                key={item.title}
                className="border-t border-[var(--color-basalt)]/[0.12] pt-6"
              >
                <Icon
                  size={19}
                  className="text-[var(--color-sandstone-deep)]"
                />

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

/* 
   LEADERSHIP
    */

function Leadership() {
  return (
    <section className="bg-white py-24 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
          {/* heading */}
          <div>
            <Eyebrow>Leadership</Eyebrow>

            <h2 className="mt-5 max-w-[450px] font-display text-3xl leading-[1.12] tracking-[-0.03em] text-[var(--color-basalt)] md:text-[2.55rem]">
              Leadership responsible for the enterprise&apos;s direction.
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-[var(--color-ink-soft)]">
              Strategic leadership connects public responsibility, technical
              priorities, institutional coordination and the long-term
              development of the region&apos;s mineral sector.
            </p>
          </div>

          {/* leadership profiles — cards make sense here */}
          <div className="grid gap-6 md:grid-cols-2">
            {leadership.map((person) => (
              <article
                key={person.role}
                className="overflow-hidden border border-[var(--color-basalt)]/[0.10]"
              >
                {/* portrait placeholder */}
                <div className="relative flex aspect-[5/4] items-end overflow-hidden bg-[var(--color-basalt)]">
                  <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/[0.07]" />

                  <div className="absolute right-10 top-10 h-40 w-40 rounded-full border border-white/[0.06]" />

                  <span className="relative p-7 font-display text-6xl tracking-[-0.06em] text-white/[0.14]">
                    {person.initials}
                  </span>
                </div>

                <div className="p-7">
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-[var(--color-sandstone-deep)]">
                    {person.department}
                  </p>

                  <h3 className="mt-3 font-display text-2xl text-[var(--color-basalt)]">
                    {person.name}
                  </h3>

                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.10em] text-[var(--color-ink-soft)]">
                    {person.role}
                  </p>

                  <p className="mt-5 text-sm leading-7 text-[var(--color-ink-soft)]">
                    {person.text}
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

/* 
   INSTITUTIONAL CTA
    */

function AboutCTA() {
  return (
    <section className="border-t border-[var(--color-basalt)]/[0.08] bg-white py-24">
      <Container>
        <div className="grid gap-10 border-l-4 border-[var(--color-sandstone-deep)] py-4 pl-7 md:grid-cols-[1fr_auto] md:items-center md:pl-10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
              Work with the enterprise
            </span>

            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight tracking-[-0.03em] text-[var(--color-basalt)]">
              Building responsible mineral opportunities requires strong
              partnerships.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-ink-soft)]">
              Connect with SRS Mining Enterprise regarding resource
              information, technical collaboration, investment and strategic
              partnership.
            </p>
          </div>

          <Button
            as={NavLink}
            to="/contact"
            variant="dark"
            className="min-h-12 px-6"
          >
            Contact the enterprise
            <ArrowRight size={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
}

/* 
   ABOUT PAGE
    */

export default function About() {
  return (
    <>
      <AboutHero />
      <History />
      <Mandate />
      <MissionVision />
      <Values />
      <Leadership />
      <AboutCTA />
    </>
  );
}