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

const ContactsAdmin = lazy(() =>
  import("./ContactsAdmin")
);

const protectedContactsAdmin = (
  <ProtectedRoute>
    <ContactsAdmin />
  </ProtectedRoute>
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
    path: "admin_contacts",
    element: protectedContactsAdmin,
  },
  {
    path: "contacts/admin",
    element: protectedContactsAdmin,
  },
];
