const COLLECT_LIST = [
  <>
    <strong>Account information:</strong> name, email or phone number, school/class
    (if provided), and role (student, teacher, or admin).
  </>,
  <>
    <strong>Learning activity:</strong> questions asked, practice attempts,
    mastery and progress data, streaks, and time spent studying — used to power
    the product itself.
  </>,
  <>
    <strong>Sabi AI conversations:</strong> the questions you ask and the answers
    given, so we can improve grounding accuracy and show your own history back
    to you.
  </>,
  <>
    <strong>Payment information:</strong> for paid plans, billing details are
    processed by our payment partners (Paystack, Flutterwave) — we do not store
    full card numbers ourselves.
  </>,
  <>
    <strong>Device &amp; usage data:</strong> basic technical information (device
    type, app version, rough connection quality) used to keep the app working on
    lower-end devices and slower connections.
  </>,
];

export default function PrivacyContentSection() {
  return (
    <section>
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="legal-block">
          <h3>1. Who this applies to</h3>
          <p>
            This policy covers everyone who uses AbSTopiq: individual students,
            parents managing a child&apos;s account, teachers, and school or
            district administrators. Where a school or district has enrolled
            students under an institutional plan, that institution&apos;s own
            data-sharing agreement with us also applies, and is available on
            request.
          </p>

          <h3>2. What we collect</h3>
          <ul className="legal-list">
            {COLLECT_LIST.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h3>3. How we use it</h3>
          <p>
            We use this information to run the product (showing your progress,
            grading practice, powering Sabi AI&apos;s answers), to communicate
            with you about your account, and to improve the syllabus-grounding
            accuracy of lessons and answers over time. We do not use student
            learning data to build advertising profiles, and we do not sell
            student data to third parties.
          </p>

          <h3>4. Students and minors</h3>
          <p>
            Many AbSTopiq users are secondary school students, some of whom are
            minors. Where a student is enrolled through a school or district
            (such as our partnership with Lagos State&apos;s Education District
            IV), the school or district is responsible for obtaining any parental
            consent required under its own policies, and we process student data
            under that institutional relationship. Individual students who sign
            up directly are encouraged to do so with a parent or guardian&apos;s
            awareness. We do not knowingly collect more information from a
            student than is needed to provide the learning features described in
            this policy.
          </p>

          <h3>5. Who we share data with</h3>
          <p>
            We share data only where necessary to run the service: payment
            processors (Paystack, Flutterwave) for billing; infrastructure
            providers who host the app and its data; and, for
            institutionally-enrolled students, the relevant school or district
            administrator (for example, a teacher can see their own class&apos;s
            progress, and a school admin can see school-wide performance). We do
            not sell personal data, and we do not share Sabi AI conversation
            content publicly.
          </p>

          <h3>6. Data security</h3>
          <p>
            We use industry-standard measures — encrypted connections, access
            controls, and regular review of who can access what — to protect your
            data. No system is perfectly secure, and we&apos;ll notify affected
            users and relevant authorities if we become aware of a breach that
            puts personal data at risk, in line with applicable law.
          </p>

          <h3>7. Your rights</h3>
          <p>
            Under Nigeria&apos;s data protection framework (the Nigeria Data
            Protection Act, 2023), you have the right to know what data we hold
            about you, to ask us to correct inaccurate data, and to request
            deletion of your account and associated data, subject to any legal or
            contractual retention requirements (for example, a school&apos;s own
            record-keeping obligations for enrolled students). To exercise any of
            these rights, contact us using the details on our Contact page.
          </p>

          <h3>8. Data retention</h3>
          <p>
            We keep account and learning data for as long as your account is
            active, plus a limited period afterward in case you return or need to
            export it. Institutional data (school/district accounts) is retained
            according to the terms of that institution&apos;s agreement with us.
          </p>

          <h3>9. Changes to this policy</h3>
          <p>
            We&apos;ll update the date at the top of this page whenever this
            policy changes, and will highlight material changes to registered
            users where required by law.
          </p>

          <h3>10. Contact</h3>
          <p>
            Questions about this policy or your data can be sent through our
            Contact page, or directly to <strong>hello@abstopiq.com</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}