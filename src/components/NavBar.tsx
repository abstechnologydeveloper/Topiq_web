"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "@/components/icons";

const LINKS = [
  { href: "/teachers", label: "Teachers" },
  { href: "/schools", label: "Schools" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact us" },
  { href: "/pricing", label: "Pricing" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link className="brand" href="/">
          <Image src="/logo.png" alt="AbSTopiq" width={32} height={32} />
          <span className="brand-word">AbSTopiq</span>
        </Link>
        <div className="nav-links">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "active" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="nav-cta">
          <Link className="btn btn-ember" href="/pricing">
            Start free
          </Link>
        </div>
        <button
          className="nav-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <MenuIcon />
        </button>
      </div>
      {menuOpen && (
        <div className="mobile-nav-links" id="mobile-navigation">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
