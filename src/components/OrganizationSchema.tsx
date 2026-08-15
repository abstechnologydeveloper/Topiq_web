export default function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "AbSTopiq",
    url: "https://www.abstopiq.com",
    description:
      "Every subject, grounded in your syllabus. Lessons, practice and Sabi AI that cites its sources.",
    sameAs: [
      "https://www.abstopiq.com",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}