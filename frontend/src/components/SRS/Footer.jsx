import { Link, NavLink } from "react-router";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Newspaper,
} from "lucide-react";
import { SrsLogo } from "./Header";

const exploreLinks = [
  { label: "Home", to: "/srs" },
  { label: "About the enterprise", to: "/srs/about" },
  { label: "Services", to: "/srs/services" },
  { label: "Projects", to: "/srs/projects" },
];

const publicLinks = [
  { label: "News & announcements", to: "/srs/news", icon: Newspaper },
  { label: "Careers", to: "/srs/careers", icon: BriefcaseBusiness },
  { label: "Contact", to: "/srs/contact", icon: Mail },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[var(--color-basalt)] text-white">
      {/* Geological strata signature */}
      <div aria-hidden="true">
        <div className="h-[3px] bg-[var(--color-sandstone-deep)]" />
        <div className="h-[2px] bg-[var(--color-sandstone-deep)]/45" />
      </div>

      {/* restrained contour decoration */}
      <div className="pointer-events-none absolute -right-40 top-12 h-[520px] w-[520px] rounded-full border border-white/[0.045]" />
      <div className="pointer-events-none absolute -right-8 top-36 h-[330px] w-[330px] rounded-full border border-white/[0.045]" />

      <div className="relative mx-auto max-w-[1480px] px-5 lg:px-8">
        {/* Main footer */}
        <div className="grid gap-14 py-16 md:py-20 lg:grid-cols-[1.25fr_.65fr_.75fr_1fr] lg:gap-16">
          {/* Brand */}
          <div className="max-w-[430px]">
            <Link to="/srs" aria-label="SRS Mining Enterprise home">
              <SrsLogo inverse />
            </Link>

            <p className="mt-7 max-w-[390px] text-sm leading-7 text-white/48">
              Supporting responsible exploration, mineral development and
              strategic partnerships that turn the Somali Regional State&apos;s
              resource potential into long-term regional value.
            </p>

            <div className="mt-8 flex items-start gap-3 border-l-2 border-[var(--color-sandstone-deep)] pl-4">
              <MapPin
                size={16}
                className="mt-0.5 shrink-0 text-[var(--color-sandstone-deep)]"
              />
              <div>
                <span className="block font-mono text-[8px] uppercase tracking-[0.14em] text-white/30">
                  Head office
                </span>
                <span className="mt-1 block text-xs leading-5 text-white/58">
                  Jigjiga, Somali Regional State
                  <br />
                  Ethiopia
                </span>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
              Explore
            </p>

            <nav className="mt-6 grid gap-4" aria-label="Footer explore navigation">
              {exploreLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="w-fit text-sm text-white/52 transition hover:text-white"
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Public */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
              Public information
            </p>

            <nav className="mt-6 grid gap-4" aria-label="Footer public information navigation">
              {publicLinks.map(({ icon: Icon, ...link }) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="group flex w-fit items-center gap-2 text-sm text-white/52 transition hover:text-white"
                >
                  <Icon size={13} className="text-[var(--color-sandstone-deep)]/75" />
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.17em] text-[var(--color-sandstone-deep)]">
              Connect with us
            </p>

            <p className="mt-6 max-w-[300px] text-sm leading-6 text-white/48">
              For project enquiries, technical information, institutional
              communication and strategic partnerships.
            </p>

            <a
              href="mailto:info@srsmining.gov.et"
              className="mt-6 flex w-fit items-center gap-2 text-sm font-medium text-white transition hover:text-[var(--color-sandstone-deep)]"
            >
              <Mail size={15} className="text-[var(--color-sandstone-deep)]" />
              info@srsmining.gov.et
            </a>

            <NavLink
              to="/srs/contact"
              className="mt-7 inline-flex items-center gap-2 border-b border-white/25 pb-1 text-xs font-semibold text-white transition hover:border-[var(--color-sandstone-deep)] hover:text-[var(--color-sandstone-deep)]"
            >
              Contact the enterprise
              <ArrowUpRight size={13} />
            </NavLink>
          </div>
        </div>

        {/* Institutional footer line */}
        <div className="grid gap-5 border-t border-white/10 py-6 text-[10px] text-white/32 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© {year} SRS Mining Enterprise.</span>
            <span className="hidden h-3 w-px bg-white/15 sm:block" />
            <span>Somali Regional State Government Enterprise</span>
          </div>

          <div className="flex items-center gap-2 font-mono uppercase tracking-[0.12em]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-sandstone-deep)]" />
            Responsible resource development
          </div>
        </div>
      </div>
    </footer>
  );
}
