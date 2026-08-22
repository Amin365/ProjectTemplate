import { useLocation } from "react-router";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ContactRequestForm from "./ContactRequestForm";

export default function ContactDialog({ open, onClose }) {
  const location = useLocation();
  const isSchoolDemo =
    location.pathname === "/school" || location.pathname.startsWith("/school/");

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-[520px] overflow-y-auto rounded-2xl border-none p-0 shadow-2xl">
        <ContactRequestForm
          isSchoolDemo={isSchoolDemo}
          onCancel={onClose}
          onSuccess={onClose}
          source={isSchoolDemo ? "school_page_dialog" : "xaltech_dialog"}
        />
      </DialogContent>
    </Dialog>
  );
}
