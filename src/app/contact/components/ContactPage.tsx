import ContactHeaderSection from "./ContactHeaderSection";
import ContactFormSection from "./ContactFormSection";
import SetupSchoolSection from "./SetupSchoolSection";
import TeacherClassSection from "./TeacherClassSection";
import SupportSection from "./SupportSection";
import LocationSection from "./LocationSection";
import FaqLinkSection from "./FaqLinkSection";
import EmailSection from "./EmailSection";
import ContactFinalCtaSection from "./ContactFinalCtaSection";

export default function ContactPage() {
  return (
    <>
      <ContactHeaderSection />
      <ContactFormSection />
      <SetupSchoolSection />
      <TeacherClassSection />
      <SupportSection />
      <LocationSection />
      <FaqLinkSection />
      <EmailSection />
      <ContactFinalCtaSection />
    </>
  );
}