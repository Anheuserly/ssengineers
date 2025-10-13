import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/next";
import "../app/globals.css";
import SEO from "../components/SEO";

export const metadata = {
  title: "SHREE GANESHE ENTERPRISES - Fire Safety Systems & Electrical Solutions",
  description:
    "SHREE GANESHE ENTERPRISES provides comprehensive fire fighting systems, detection systems, electrical work, plumbing solutions, and AMC services across Delhi NCR.",
  keywords: [
    "fire fighting systems Delhi",
    "detection systems",
    "electrical work",
    "plumbing solutions",
    "AMC services",
    "fire safety equipment",
    "security systems",
    "IT solutions",
    "AutoCAD services",
  ],
  authors: [{ name: "SHREE GANESHE ENTERPRISES", url: "https://www.sge.org.in" }],
  alternates: { canonical: "https://www.sge.org.in" },
  openGraph: {
    title: "SHREE GANESHE ENTERPRISES - Fire Safety Systems & Electrical Solutions",
    description:
      "Comprehensive fire fighting systems, detection systems, electrical work, and maintenance services across Delhi NCR.",
    url: "https://www.sge.org.in",
    siteName: "SHREE GANESHE ENTERPRISES",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SHREE GANESHE ENTERPRISES Services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHREE GANESHE ENTERPRISES - Fire Safety Systems & Electrical Solutions",
    description:
      "Comprehensive fire safety and electrical solutions across Delhi NCR.",
    images: ["/og-image.png"],
    creator: "@shreeganesheenterprises",
  },
  icons: {
    icon: "/shreegaeshenterprises.svg",
    shortcut: "/shreeganeshenterprises.svg",
    apple: "/shreeganeshenterprises.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code&family=Inter:opsz,wght@14..32,100..900&family=Poppins:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-amcmep-bg font-inter text-sm text-amcmep-text antialiased">
        <Navigation />
        <main className="flex-grow p-4">{children}</main>
        <Footer />

        {/* SEO JSON-LD */}
        <SEO />
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}