import { lazy } from "react";

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
  import("./Schoolprofilepage")
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
];