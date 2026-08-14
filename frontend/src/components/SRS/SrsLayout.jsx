import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function SrsLayout() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-screen bg-white text-[var(--color-basalt)]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
