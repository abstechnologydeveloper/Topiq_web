import PersonaHeaderSection from "./PersonaHeaderSection";
import DailyDashboardSection from "./DailyDashboardSection";
import AssignmentsSection from "./AssignmentsSection";
import LiveClassSection from "./LiveClassSection";
import LessonPrepSection from "./LessonPrepSection";
import MasterySection from "./MasterySection";
import SchoolCoveredSection from "./SchoolCoveredSection";
import TeacherPricingSection from "./TeacherPricingSection";
import TestimonialSection from "./TestimonialSection";
import TeacherFinalCtaSection from "./TeacherFinalCtaSection";

export default function TeachersPage() {
  return (
    <>
      <PersonaHeaderSection />
      <DailyDashboardSection />
      <AssignmentsSection />
      <LiveClassSection />
      <LessonPrepSection />
      <MasterySection />
      <SchoolCoveredSection />
      <TeacherPricingSection />
      <TestimonialSection />
      <TeacherFinalCtaSection />
    </>
  );
}