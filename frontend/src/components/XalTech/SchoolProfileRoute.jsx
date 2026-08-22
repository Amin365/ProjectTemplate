import Header from "./Header";
import SchoolManagementPage from "./Schoolprofilepage";

export default function SchoolProfileRoute() {
  return (
    <>
      <Header ctaLabel="Book a demo" />

      <div className="school-profile-route">
        <style>{`
          @media (max-width: 639px) {
            .school-profile-route main > section:first-child > div:nth-child(2) > div:first-child > div:nth-child(4) {
              display: flex !important;
              flex-wrap: nowrap !important;
              align-items: center !important;
              gap: 0.5rem !important;
            }

            .school-profile-route main > section:first-child > div:nth-child(2) > div:first-child > div:nth-child(4) > button {
              min-width: 0 !important;
              flex: 0.85 1 0 !important;
              justify-content: center !important;
              white-space: nowrap !important;
              padding-left: 0.75rem !important;
              padding-right: 0.75rem !important;
              font-size: 11px !important;
            }

            .school-profile-route main > section:first-child > div:nth-child(2) > div:first-child > div:nth-child(4) > a {
              min-width: 0 !important;
              flex: 1.15 1 0 !important;
              justify-content: center !important;
              white-space: nowrap !important;
              gap: 0.375rem !important;
              padding-left: 0.75rem !important;
              padding-right: 0.75rem !important;
              font-size: 11px !important;
            }
          }
        `}</style>

        <SchoolManagementPage />
      </div>
    </>
  );
}
