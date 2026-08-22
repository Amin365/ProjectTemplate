import { lazy } from "react";
import ProtectedRoute from "@/pages/ProtectedRoute";

const HomePage = lazy(() =>
  import("./HomePage")
);

const AboutPage = lazy(() =>
  import("./AboutPage")
);

const ServicesPage = lazy(() =>
  import("./ServicesPage")
);

const ProjectPage = lazy(() =>
  import("./ProjectPage")
);

const SchoolPage = lazy(() =>
  import("./SchoolProfileRoute")
);

const BookDemoPage = lazy(() =>
  import("./BookDemoPage")
);

const ContactsAdmin = lazy(() =>
  import("./ContactsAdmin")
);

export const XalTechRouter = [
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
    element: <ProjectPage />,
  },
  {
    path: "school",
    element: <SchoolPage />,
  },
  {
    path: "book-demo",
    element: <BookDemoPage />,
  },
  {
    path: "admin_contacts",
    element: (
      <ProtectedRoute>
        <ContactsAdmin />
      </ProtectedRoute>
    ),
  },
];
