import Header from "./Header";
import SchoolManagementPage from "./Schoolprofilepage";

export default function SchoolProfileRoute() {
  return (
    <>
      <Header ctaLabel="Book a demo" />

      <div className="school-profile-route">
        <style>{`
          .school-profile-route > div > header:first-child {
            display: none !important;
          }
        `}</style>
        <SchoolManagementPage />
      </div>
    </>
  );
}
