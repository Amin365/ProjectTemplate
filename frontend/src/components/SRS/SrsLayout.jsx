import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import "./srs-responsive-polish.css";

export default function SrsLayout() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname, location.hash]);

  const routeSegment = location.pathname
    .replace(/^\/srs\/?/, "")
    .split("/")[0];

  const routeKey = routeSegment || "home";

  return (
    <div
      className={`srs-site srs-route-${routeKey} min-h-screen bg-white text-[var(--color-basalt)]`}
    >
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
