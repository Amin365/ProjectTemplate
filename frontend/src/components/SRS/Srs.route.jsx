import { lazy } from "react";
import { Navigate } from "react-router";

const HomePage = lazy(() => import("./Home"));
const AboutPage = lazy(() => import("./About"));
const ServicesPage = lazy(() => import("./Services"));
const ContactPage = lazy(() => import("./Contact"));
const ProjectsPage = lazy(() => import("./Projects"));
const NewsPage = lazy(() => import("./News"));
const CareersPage = lazy(() => import("./Careers"));

export const SrsRouter = [
  {
    index: true,
    element: <HomePage />,
  },
  {
    path: "about",
    element: <AboutPage />,
  },
  {
    path: "services",
    element: <ServicesPage />,
  },
  {
    path: "projects",
    element: <ProjectsPage />,
  },
  {
    path: "news",
    element: <NewsPage />,
  },
  {
    path: "careers",
    element: <CareersPage />,
  },
  {
    path: "contacts",
    element: <ContactPage />,
  },

  // Backward-compatible aliases for the earlier SRS URLs.
  {
    path: "contacts",
    element: <Navigate to="/srs/contacts" replace />,
  },
  {
    path: "career",
    element: <Navigate to="/srs/careers" replace />,
  },
  {
    path: "carear",
    element: <Navigate to="/srs/careers" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/srs" replace />,
  },
];
