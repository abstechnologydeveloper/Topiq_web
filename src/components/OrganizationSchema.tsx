export default function OrganizationSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://www.abstopiq.com/#organization",
    name: "AbSTopiq",
    url: "https://www.abstopiq.com",
    description:
      "Every subject, grounded in your syllabus. Lessons, practice and Sabi AI that cites its sources.",
    parentOrganization: {
      "@type": "Organization",
      "@id": "https://www.abstechconnect.com/#organization",
      name: "AbS Technology",
      url: "https://www.abstechconnect.com/",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  );
}
