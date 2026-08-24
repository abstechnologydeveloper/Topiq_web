"use client";

import { usePathname } from "next/navigation";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

/**
 * Renders the shared marketing chrome (NavBar / main / Footer / CookieBanner)
 * for every route EXCEPT the /dashboard app, which supplies its own shell and
 * stylesheet. This keeps the dashboard visually isolated from the marketing
 * site without touching any marketing page or component.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <NavBar />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}