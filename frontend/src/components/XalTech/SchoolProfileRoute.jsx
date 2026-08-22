import Header from "./Header";
import SchoolManagementPage from "./Schoolprofilepage";

export default function SchoolProfileRoute() {
  return (
    <>
      <Header ctaLabel="Book a demo" />

      <div className="school-profile-route">
        <style>{`
          /* The legacy school page ships its own navbar. Keep it mounted for now,
             but hide it so the shared XalTech header is the single visible header. */
          .school-profile-route > div > header:first-child {
            display: none !important;
          }

          /* Keep the school product page focused on the Book a demo conversion. */
          .school-profile-route a[href="#modules"] {
            display: none !important;
          }

          .school-profile-route section.px-6.py-20 .relative.flex.flex-col.gap-3 > button:nth-child(2) {
            display: none !important;
          }
        `}</style>
        <SchoolManagementPage />
      </div>
    </>
  );
}
