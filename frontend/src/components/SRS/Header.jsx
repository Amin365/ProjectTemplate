import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Mail,
  MapPin,
  Menu,
  X,
} from "lucide-react";

const NAV_LINKS = [
  { label: "Home", to: "/srs", end: true },
  { label: "About", to: "/srs/about" },
  { label: "Services", to: "/srs/services" },
  { label: "Projects", to: "/srs/projects" },
  { label: "News", to: "/srs/news" },
  { label: "Careers", to: "/srs/careers" },
];

export function SrsLogo({ inverse = false, compact = false }) {
  const primary = inverse ? "#FFFFFF" : "#142823";
  const copper = "#B77A45";

  return (
    <span className="flex min-w-0 items-center gap-3" aria-label="SRS Mining Enterprise home">
      <svg
        width={compact ? 38 : 44}
        height={compact ? 38 : 44}
        viewBox="0 0 44 44"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="1" y="1" width="42" height="42" rx="5" stroke={primary} strokeOpacity="0.18" />
        <path
          d="M7 29.5 14.5 21l5 4 6.3-10 4.7 6.2 6.5-4.7"
          stroke={primary}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M7 32h30" stroke={copper} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M10 35h24" stroke={copper} strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="29.5" cy="13" r="2.5" fill={copper} />
      </svg>

      <span className="min-w-0">
        <strong
          className={`block truncate font-display font-medium tracking-[-0.02em] ${
            compact ? "text-[15px]" : "text-[17px]"
          } ${inverse ? "text-white" : "text-[var(--color-basalt)]"}`}
        >
          SRS Mining Enterprise
        </strong>
        <span
          className={`mt-0.5 block truncate font-mono text-[8px] uppercase tracking-[0.15em] ${
            inverse ? "text-white/45" : "text-[var(--color-ink-soft)]/55"
          }`}
        >
          Somali Regional State
        </span>
      </span>
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const navClassName = ({ isActive }) =>
    [
      "relative inline-flex min-h-11 items-center text-[13px] font-semibold transition-colors",
      isActive
        ? "text-[var(--color-basalt)] after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:bg-[var(--color-sandstone-deep)]"
        : "text-[var(--color-ink-soft)] hover:text-[var(--color-basalt)]",
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-basalt)]/[0.08] bg-white/95 backdrop-blur-xl">
      {/* Government utility bar */}
      <div className="hidden bg-[var(--color-basalt)] text-white md:block">
        <div className="mx-auto flex h-9 max-w-[1480px] items-center justify-between px-5 lg:px-8">
          <div className="flex items-center gap-5 font-mono text-[8px] uppercase tracking-[0.14em] text-white/55">
            <span>Somali Regional State · Government Enterprise</span>
            <span className="h-3 w-px bg-white/15" />
            <span className="flex items-center gap-1.5 normal-case tracking-normal text-white/45">
              <MapPin size={11} className="text-[var(--color-sandstone-deep)]" />
              Jigjiga, Ethiopia
            </span>
          </div>

          <a
            href="mailto:info@srsmining.gov.et"
            className="flex items-center gap-2 text-[10px] text-white/55 transition hover:text-white"
          >
            <Mail size={11} className="text-[var(--color-sandstone-deep)]" />
            info@srsmining.gov.et
          </a>
        </div>
      </div>

      {/* Main navigation */}
      <div className="mx-auto flex h-[78px] max-w-[1480px] items-center gap-8 px-5 lg:px-8">
        <Link to="/srs" className="mr-auto min-w-0" aria-label="SRS Mining Enterprise home">
          <SrsLogo />
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="SRS Mining Enterprise main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={navClassName}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink
          to="/srs/contact"
          className="hidden min-h-11 items-center gap-2 bg-[var(--color-basalt)] px-5 text-[12px] font-semibold text-white transition hover:bg-[var(--color-basalt-soft)] xl:inline-flex"
        >
          Contact the enterprise
          <ArrowUpRight size={14} className="text-[var(--color-sandstone-deep)]" />
        </NavLink>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center border border-[var(--color-basalt)]/[0.12] text-[var(--color-basalt)] xl:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="srs-mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile / tablet navigation */}
      {open && (
        <div
          id="srs-mobile-navigation"
          className="border-t border-[var(--color-basalt)]/[0.08] bg-white xl:hidden"
        >
          <nav
            className="mx-auto grid max-w-[1480px] gap-0 px-5 pb-6 pt-2 lg:px-8"
            aria-label="SRS Mining Enterprise mobile navigation"
          >
            {NAV_LINKS.map((link, index) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  [
                    "flex items-center justify-between border-b border-[var(--color-basalt)]/[0.08] py-4 text-sm font-semibold",
                    isActive
                      ? "text-[var(--color-sandstone-deep)]"
                      : "text-[var(--color-basalt)]",
                  ].join(" ")
                }
              >
                <span className="flex items-center gap-4">
                  <span className="font-mono text-[9px] text-[var(--color-ink-soft)]/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {link.label}
                </span>
                <ArrowUpRight size={14} className="text-[var(--color-ink-soft)]/35" />
              </NavLink>
            ))}

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <NavLink
                to="/srs/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-[var(--color-basalt)] px-5 text-sm font-semibold text-white"
              >
                Contact the enterprise
                <ArrowUpRight size={15} className="text-[var(--color-sandstone-deep)]" />
              </NavLink>

              <NavLink
                to="/srs/careers"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-[var(--color-basalt)]/[0.12] px-5 text-sm font-semibold text-[var(--color-basalt)]"
              >
                <BriefcaseBusiness size={15} className="text-[var(--color-sandstone-deep)]" />
                View careers
              </NavLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;