import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";

import "./globals.css";
import AppShell from "@/components/AppShell";
import OrganizationSchema from "@/components/OrganizationSchema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abstopiq.com"),
  title: {
    default: "AbSTopiq — Learn It. Practice It. Sabi It.",
    template: "%s | AbSTopiq",
  },
  description:
    "Every subject, grounded in your syllabus. Lessons, practice and Sabi AI that cites its sources.",
  keywords: [
    "AbSTopiq",
    "Nigerian education",
    "Sabi AI",
    "exam practice",
    "WAEC",
    "JAMB",
    "online learning",
    "school management",
    "teacher tools",
  ],
  authors: [{ name: "AbSTopiq" }],
  creator: "AbSTopiq",
  publisher: "AbSTopiq",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.abstopiq.com",
    siteName: "AbSTopiq",
    title: "AbSTopiq — Learn It. Practice It. Sabi It.",
    description:
      "Every subject, grounded in your syllabus. Lessons, practice and Sabi AI that cites its sources.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "AbSTopiq — Learn It. Practice It. Sabi It.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AbSTopiq — Learn It. Practice It. Sabi It.",
    description:
      "Every subject, grounded in your syllabus. Lessons, practice and Sabi AI that cites its sources.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
    other: [
      { rel: "icon", url: "/icon-192.png", sizes: "192x192" },
      { rel: "icon", url: "/icon-512.png", sizes: "512x512" },
    ],
  },
  alternates: {
    canonical: "https://www.abstopiq.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <OrganizationSchema />
      </head>
      <body
        className={`${inter.variable} ${fraunces.variable} ${ibmPlexMono.variable}`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}