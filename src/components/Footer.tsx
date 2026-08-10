import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="brand" href="/">
              <Image src="/logo.png" alt="AbSTopiq" width={32} height={32} />
              <span className="brand-word">AbSTopiq</span>
            </Link>
            <p>
              Learn it. Practice it. Sabi it. Every subject, grounded — for
              students, teachers and schools.
            </p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <Link href="/#pillars">How it works</Link>
            <Link href="/#subjects">Subjects</Link>
            <Link href="/teachers">Teachers</Link>
            <Link href="/schools">Schools</Link>
            <Link href="/pricing">Pricing</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/about">About us</Link>
            <Link href="/contact">School partnerships</Link>
            <Link href="/contact">Contact</Link>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/terms">Terms of service</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 AbSTopiq. All rights reserved.</span>
          <span>WAEC · NECO · JAMB · GCE · IGCSE · SAT</span>
        </div>
        <p className="footer-disclaimer">
          AbSTopiq is an independent learning platform. It is not affiliated
          with, endorsed by, or operated by WAEC, NECO, JAMB, GCE, IGCSE, SAT or
          any examination body — board names above are used only to describe
          which syllabuses Practice is aligned to.
        </p>
      </div>
    </footer>
  );
}