import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <span className="not-found-code">404</span>
        <p className="eyebrow"><i /> Page not found</p>
        <h1>This page doesn’t exist.</h1>
        <p>The page may have moved, or the address may be incorrect.</p>
        <div className="hero-actions">
          <Link className="button button--mint" to="/">
            <Home size={16} /> Back home
          </Link>
          <Link className="button button--ghost" to="/services">
            <ArrowLeft size={16} /> View services
          </Link>
        </div>
      </div>
    </main>
  );
}
