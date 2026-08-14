import { NavLink } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  FileText,
  Landmark,
  Megaphone,
  Newspaper,
} from "lucide-react";

import { Container, Eyebrow } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { newsItems } from "@/data/content";

/* =========================================================
   FEATURED VISUAL
   ========================================================= */

function FeaturedVisual() {
  return (
    <div className="relative min-h-[440px] overflow-hidden bg-[var(--color-basalt)]">
      {/* large contour circles */}
      <div className="absolute -right-20 -top-24 h-[400px] w-[400px] rounded-full border border-white/[0.07]" />
      <div className="absolute right-10 top-10 h-[270px] w-[270px] rounded-full border border-white/[0.07]" />
      <div className="absolute right-24 top-24 h-[165px] w-[165px] rounded-full border border-[var(--color-sandstone-deep)]/20" />

      {/* map / terrain */}
      <svg
        viewBox="0 0 900 430"
        className="absolute inset-x-0 bottom-0 h-[78%] w-full"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 350C95 300 165 329 243 254C320 180 390 230 471 164C558 93 622 137 710 82C776 41 830 45 900 17"
          stroke="var(--color-sandstone-deep)"
          strokeWidth="2"
          opacity="0.28"
        />

        <path
          d="M0 388C104 337 195 369 275 299C363 222 437 274 520 209C601 146 677 182 758 131C815 95 861 96 900 75"
          stroke="white"
          strokeWidth="1.4"
          opacity="0.08"
        />

        <path
          d="M0 425V337L103 289L174 312L282 198L354 261L430 218L501 278L607 157L697 257L771 211L900 282V425H0Z"
          fill="white"
          opacity="0.04"
        />
      </svg>

      {/* geological layers */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="h-5 bg-[var(--color-sandstone-deep)]/50" />
        <div className="h-4 bg-[var(--color-sandstone-deep)]/25" />
        <div className="h-5 bg-white/[0.05]" />
      </div>

      {/* marker */}
      <div className="absolute right-[31%] top-[45%]">
        <span className="absolute -inset-6 rounded-full border border-[var(--color-sandstone-deep)]/15" />
        <span className="absolute -inset-3 rounded-full border border-[var(--color-sandstone-deep)]/25" />
        <span className="relative block h-3 w-3 rounded-full bg-[var(--color-sandstone-deep)]" />
      </div>

      {/* label */}
      <div className="absolute left-8 top-8">
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--color-sandstone-deep)]">
          SRS Mining Enterprise
        </span>

        <p className="mt-2 text-xs text-white/40">
          Newsroom · Jigjiga
        </p>
      </div>

      <div className="absolute bottom-9 left-8">
        <div className="flex items-center gap-3 border-t border-white/15 pt-4">
          <Newspaper
            size={17}
            className="text-[var(--color-sandstone-deep)]"
          />

          <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">
            Enterprise news & public information
          </span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   HERO
   ========================================================= */

function NewsHero() {
  return (
    <section className="overflow-hidden bg-white">
      <Container className="max-w-[1480px]">
        <div
          className="
            grid
            min-h-[590px]
            items-end
            gap-16
            py-20
            lg:grid-cols-[1fr_.55fr]
            lg:gap-28
            lg:py-24
          "
        >
          <div>
            <div className="inline-flex items-center gap-2 border border-[var(--color-basalt)]/[0.10] px-3 py-2">
              <Newspaper
                size={13}
                className="text-[var(--color-sandstone-deep)]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[var(--color-basalt)]/55">
                Newsroom
              </span>
            </div>

            <h1
              className="
                mt-8
                max-w-[850px]
                font-display
                text-[3rem]
                leading-[1.01]
                tracking-[-0.05em]
                text-[var(--color-basalt)]
                md:text-[4.2rem]
              "
            >
              News, progress and
              <span className="block text-[var(--color-sandstone-deep)]">
                public announcements.
              </span>
            </h1>

            <p className="mt-8 max-w-[630px] text-[17px] leading-8 text-[var(--color-ink-soft)]">
              Follow developments from SRS Mining Enterprise, including
              projects, partnerships, institutional activities and important
              public information.
            </p>
          </div>

          <div className="pb-2 lg:justify-self-end">
            <div className="max-w-[330px] border-t border-[var(--color-basalt)]/[0.12] pt-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[var(--color-sandstone-deep)]">
                Official newsroom
              </span>

              <p className="mt-4 text-sm leading-7 text-[var(--color-ink-soft)]">
                Enterprise updates published for stakeholders, partners and the
                public.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <div className="h-px bg-[var(--color-basalt)]/[0.08]" />
    </section>
  );
}

/* =========================================================
   TOP STORIES
   ========================================================= */

function TopStories() {
  if (!newsItems?.length) return null;

  const featured = newsItems[0];
  const secondary = newsItems.slice(1, 3);

  return (
    <section className="bg-white py-24 md:py-28">
      <Container className="max-w-[1420px]">
        <div className="mb-14 flex items-end justify-between gap-8">
          <div>
            <Eyebrow>Latest</Eyebrow>

            <h2
              className="
                mt-5
                max-w-[650px]
                font-display
                text-3xl
                leading-[1.08]
                tracking-[-0.03em]
                text-[var(--color-basalt)]
                md:text-[2.65rem]
              "
            >
              The latest from
              <span className="block">
                SRS Mining Enterprise.
              </span>
            </h2>
          </div>

          <span className="hidden font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--color-ink-soft)]/40 md:block">
            Enterprise newsroom
          </span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_.65fr] lg:gap-12">
          {/* FEATURED */}
          <article>
            <FeaturedVisual />

            <div className="pt-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
                  Featured story
                </span>

                <span className="h-px w-10 bg-[var(--color-basalt)]/[0.12]" />

                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-ink-soft)]/45">
                  {featured.date}
                </span>
              </div>

              <h3
                className="
                  mt-5
                  max-w-[820px]
                  font-display
                  text-[2rem]
                  leading-[1.08]
                  tracking-[-0.03em]
                  text-[var(--color-basalt)]
                  md:text-[2.7rem]
                "
              >
                {featured.title}
              </h3>

              <p className="mt-5 max-w-[760px] text-sm leading-7 text-[var(--color-ink-soft)] md:text-[15px]">
                {featured.text}
              </p>

              <button className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-basalt)]">
                Read full update
                <ArrowRight
                  size={15}
                  className="text-[var(--color-sandstone-deep)]"
                />
              </button>
            </div>
          </article>

          {/* SECONDARY */}
          <div className="border-t border-[var(--color-basalt)]/[0.13]">
            {secondary.map((story, index) => (
              <article
                key={story.title}
                className="border-b border-[var(--color-basalt)]/[0.13] py-8 first:pt-0 lg:first:pt-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[9px] text-[var(--color-sandstone-deep)]">
                    0{index + 2}
                  </span>

                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--color-ink-soft)]/40">
                    {story.date}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-[1.65rem] leading-[1.13] tracking-[-0.02em] text-[var(--color-basalt)]">
                  {story.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[var(--color-ink-soft)]">
                  {story.text}
                </p>

                <button className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-basalt)]">
                  Read update
                  <ArrowUpRight
                    size={13}
                    className="text-[var(--color-sandstone-deep)]"
                  />
                </button>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   ANNOUNCEMENT BAND
   ========================================================= */

function AnnouncementBand() {
  return (
    <section className="bg-[var(--color-basalt)] text-white">
      <Container className="max-w-[1420px]">
        <div className="grid gap-8 py-10 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15">
            <Megaphone
              size={18}
              className="text-[var(--color-sandstone-deep)]"
            />
          </div>

          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
              Official announcements
            </span>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-white/55">
              Important notices, institutional announcements and public
              information from SRS Mining Enterprise are published through the
              newsroom.
            </p>
          </div>

          <NavLink
            to="/publications"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white"
          >
            Public documents
            <ArrowUpRight
              size={15}
              className="text-[var(--color-sandstone-deep)]"
            />
          </NavLink>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   NEWS FEED
   ========================================================= */

function NewsFeed() {
  const items = newsItems?.slice(3) || [];

  if (!items.length) return null;

  return (
    <section className="bg-white py-24 md:py-32">
      <Container className="max-w-[1400px]">
        <div
          className="
            grid
            gap-20
            lg:grid-cols-[360px_minmax(0,1fr)]
            lg:gap-32
          "
        >
          {/* LEFT */}
          <div>
            <div className="lg:sticky lg:top-28">
              <Eyebrow>More updates</Eyebrow>

              <h2
                className="
                  mt-5
                  max-w-[360px]
                  font-display
                  text-3xl
                  leading-[1.08]
                  tracking-[-0.03em]
                  text-[var(--color-basalt)]
                  md:text-[2.55rem]
                "
              >
                News from across
                <span className="block">
                  the enterprise.
                </span>
              </h2>

              <p className="mt-6 max-w-[340px] text-sm leading-7 text-[var(--color-ink-soft)]">
                Project milestones, institutional developments and public
                information from across our work.
              </p>
            </div>
          </div>

          {/* FEED */}
          <div>
            {items.map((item, index) => (
              <article
                key={item.title}
                className="
                  group
                  grid
                  gap-6
                  border-t
                  border-[var(--color-basalt)]/[0.13]
                  py-10
                  md:grid-cols-[120px_1fr_auto]
                  md:gap-10
                "
              >
                {/* DATE */}
                <div>
                  <span className="font-mono text-[9px] text-[var(--color-sandstone-deep)]">
                    {String(index + 4).padStart(2, "0")}
                  </span>

                  <div className="mt-5 flex items-start gap-2">
                    <CalendarDays
                      size={13}
                      className="mt-0.5 shrink-0 text-[var(--color-ink-soft)]/35"
                    />

                    <span className="font-mono text-[9px] uppercase leading-5 tracking-[0.11em] text-[var(--color-ink-soft)]/45">
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* BODY */}
                <div>
                  <h3
                    className="
                      max-w-[680px]
                      font-display
                      text-[1.7rem]
                      leading-[1.15]
                      tracking-[-0.025em]
                      text-[var(--color-basalt)]
                      transition-colors
                      group-hover:text-[var(--color-sandstone-deep)]
                    "
                  >
                    {item.title}
                  </h3>

                  <p className="mt-5 max-w-[680px] text-sm leading-7 text-[var(--color-ink-soft)]">
                    {item.text}
                  </p>

                  <button className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-basalt)]">
                    Continue reading
                    <ArrowRight
                      size={13}
                      className="text-[var(--color-sandstone-deep)] transition-transform group-hover:translate-x-1"
                    />
                  </button>
                </div>

                <ArrowUpRight
                  size={17}
                  className="hidden text-[var(--color-ink-soft)]/25 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-sandstone-deep)] md:block"
                />
              </article>
            ))}

            <div className="border-t border-[var(--color-basalt)]/[0.13]" />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   NEWSROOM LINKS
   ========================================================= */

function NewsroomLinks() {
  const links = [
    {
      icon: FileText,
      label: "Reports & publications",
      text: "Enterprise reports, public documents and technical publications.",
      to: "/publications",
    },
    {
      icon: Landmark,
      label: "About the enterprise",
      text: "Our mandate, leadership, history and institutional direction.",
      to: "/about",
    },
  ];

  return (
    <section className="border-t border-[var(--color-basalt)]/[0.07] bg-white py-24">
      <Container className="max-w-[1400px]">
        <div className="grid gap-14 lg:grid-cols-[.6fr_1.4fr] lg:gap-28">
          <div>
            <Eyebrow>Explore further</Eyebrow>

            <h2 className="mt-5 max-w-[400px] font-display text-3xl leading-[1.1] tracking-[-0.03em] text-[var(--color-basalt)]">
              More public
              <span className="block">
                information.
              </span>
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {links.map(({ icon: Icon, ...item }) => (
              <NavLink
                key={item.label}
                to={item.to}
                className="group border-t-2 border-[var(--color-basalt)] pt-6"
              >
                <div className="flex items-start justify-between gap-6">
                  <Icon
                    size={19}
                    className="text-[var(--color-sandstone-deep)]"
                  />

                  <ArrowUpRight
                    size={16}
                    className="text-[var(--color-ink-soft)]/30 transition group-hover:text-[var(--color-sandstone-deep)]"
                  />
                </div>

                <h3 className="mt-8 font-display text-xl text-[var(--color-basalt)]">
                  {item.label}
                </h3>

                <p className="mt-3 max-w-md text-sm leading-7 text-[var(--color-ink-soft)]">
                  {item.text}
                </p>
              </NavLink>
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

function NewsCTA() {
  return (
    <section className="bg-white pb-28 pt-10">
      <Container>
        <div
          className="
            relative
            overflow-hidden
            bg-[var(--color-sandstone-deep)]
            px-8
            py-12
            text-white
            md:px-14
            md:py-16
          "
        >
          <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border border-white/10" />

          <div className="absolute right-16 top-12 h-48 w-48 rounded-full border border-white/10" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-[720px]">
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/60">
                Media & public enquiries
              </span>

              <h2
                className="
                  mt-5
                  max-w-[690px]
                  font-display
                  text-3xl
                  leading-[1.08]
                  tracking-[-0.03em]
                  md:text-[2.7rem]
                "
              >
                Need information from
                <span className="block">
                  SRS Mining Enterprise?
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/70">
                Contact the enterprise for media enquiries, institutional
                information, project communication or public documentation.
              </p>
            </div>

            <Button
              as={NavLink}
              to="/contact"
              variant="outline"
              className="min-h-12 border-white bg-white px-6 text-[var(--color-sandstone-deep)] hover:bg-white/90"
            >
              Contact the enterprise
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   NEWS PAGE
   ========================================================= */

export default function News() {
  return (
    <>
      <NewsHero />
      <TopStories />
      <AnnouncementBand />
      <NewsFeed />
      <NewsroomLinks />
      <NewsCTA />
    </>
  );
}