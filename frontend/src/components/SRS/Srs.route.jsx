import { lazy } from "react";

const HomePage = lazy(() =>
  import("./Home")
);

const AboutPage = lazy(() =>
  import("./About")
);

const ServicesPage = lazy(() =>
  import("./Services")
);
const ContactsPage = lazy(() =>
  import("./Contact")
);
const ProjectPage = lazy(() =>
  import("./Projects")
);
const NewsPage = lazy(() =>
  import("./News")
);
const CarearPage = lazy(() =>
  import("./Careers")
);

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
    path: "contacts",
    element: <ContactsPage />,
  },
  {
    path: "projects",
    element: <ProjectPage />,
  },
  {
    path: "news",
    element: <NewsPage />,
  },
  {
    path: "career",
    element: <CarearPage />,
  },
];