import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ArrowRight, Menu, X } from "lucide-react";
import ContactDialog from "../XalTech/ContactDialog";

const NAV_LINKS = [
  { label: "Home", to: "/srs" },

  { label: "About", to: "/srs/about" },
    { label: "Services", to: "/srs/services" },
      { label: "Projects", to: "/srs/projects" },
      { label: "Contacts", to: "/srs/contacts" },
      { label: "Carear", to: "/srs/carear" },
];

export function Logo({ light = false }) {
  return (
    <span className="logo-lockup" aria-label="XalTech home">
      <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="12" height="12" rx="3.5" fill="#13B8A6" />
        <rect x="25" y="25" width="12" height="12" rx="3.5" fill="#13B8A6" opacity="0.55" />
        <rect x="25" y="3" width="12" height="12" rx="3.5" fill="#2878FF" />
        <rect x="3" y="25" width="12" height="12" rx="3.5" fill="#2878FF" opacity="0.55" />
        <path d="M15 15 L25 25 M25 15 L15 25" stroke={light ? "white" : "#0B1F3A"} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M25 9 L31 3 M31 3 H26 M31 3 V8" stroke="#5EEAD4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`logo-name ${light ? "logo-name--light" : ""}`}>
        SRS<span></span>
      </span>
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handler = () => setContactOpen(true);
    window.addEventListener("open-contact", handler);
    return () => window.removeEventListener("open-contact", handler);
  }, []);
  const location = useLocation();

  const preloadRoute = (to) => {
    if (!to) return;
    if (to === "/services") import("../XalTech/ServicesPage");
    if (to === "/about") import("../XalTech/AboutPage");
    if (to === "/") import("../XalTech/HomePage");
  };

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link to="/" className="brand-link">
          <Logo light={false} />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onMouseEnter={() => preloadRoute(link.to)}
              onFocus={() => preloadRoute(link.to)}
              onClick={(e) => {
                if (location.pathname === link.to) e.preventDefault();
              }}
              end
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button className="button button--small button--mint desktop-cta" type="button" onClick={() => setContactOpen(true)}>
          Discuss your project <ArrowRight size={15} />
        </button>

        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) => (isActive ? "active" : undefined)}
              onMouseEnter={() => preloadRoute(link.to)}
              onFocus={() => preloadRoute(link.to)}
              onClick={(e) => {
                setOpen(false);
                if (location.pathname === link.to) e.preventDefault();
              }}
              end
            >
              {link.label}
            </NavLink>
          ))}
          <button className="button button--mint" type="button" onClick={() => { setOpen(false); setContactOpen(true); }}>
            Discuss your project <ArrowRight size={16} />
          </button>
        </nav>
      )}
      <ContactDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </header>
  );
}

export default Header;
// export { Logo };
