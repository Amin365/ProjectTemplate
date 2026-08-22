import { Link } from "react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import ContactRequestForm from "./ContactRequestForm";

export default function BookDemoPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#0B1F3A]"
          >
            <ArrowLeft size={16} /> Back to XalTech
          </Link>

          <div className="inline-flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck size={15} className="text-[#13B8A6]" /> Secure request form
          </div>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
          <ContactRequestForm
            isSchoolDemo
            source="shared_book_demo_link"
          />
        </section>

        <p className="mx-auto mt-5 max-w-xl text-center text-xs leading-5 text-slate-400">
          This link can be shared directly with a school. The submitted request goes to the same protected XalTech contacts administration used by website Book Demo requests.
        </p>
      </div>
    </main>
  );
}
