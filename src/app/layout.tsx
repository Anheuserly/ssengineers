import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/next";
import "../app/globals.css";
import SEO from "../components/SEO";

// ===============================================
// UPDATED METADATA FOR SS ENGINEERS & CONSULTANTS
// ===============================================
export const metadata = {
  title: "SS Engineers & Consultants – MEP, Fire Safety & Industrial Engineering Solutions",
  description:
    "SS Engineers & Consultants provides professional MEP consulting, fire safety systems, electrical contracting, plumbing, HVAC, AMC services, industrial automation, and engineering solutions across Delhi NCR and North India.",
  keywords: [
    "MEP consultants",
    "fire fighting system",
    "HVAC solutions",
    "electrical contractors",
    "industrial engineering",
    "AMC maintenance",
    "plumbing contractors",
    "engineering consultants",
    "fire safety services",
    "Gurgaon engineering company",
    "SS Engineers and Consultants",
  ],
  authors: [{ name: "SS Engineers & Consultants", url: "https://www.ssengineers.in" }],
  alternates: { canonical: "https://www.ssengineers.in" },

  openGraph: {
    title: "SS Engineers & Consultants – MEP & Industrial Engineering Experts",
    description:
      "Delivering MEP consulting, fire safety systems, electrical contracting, HVAC solutions, and industrial engineering with precision and reliability.",
    url: "https://www.ssengineers.in",
    siteName: "SS Engineers & Consultants",
    images: [
      {
        url: "/og-image.png", // Update if you have a custom OG image
        width: 1200,
        height: 630,
        alt: "SS Engineers & Consultants – Engineering Solutions",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "SS Engineers & Consultants – MEP & Fire Safety Experts",
    description:
      "Professional MEP, fire safety, electrical contracting, and maintenance solutions serving Delhi NCR and industrial sectors.",
    images: ["/og-image.png"],
    creator: "@ssengineers", // update if you create a Twitter handle
  },

  icons: {
    icon: "/ssengineers.svg", 
    shortcut: "/ssengineers.svg",
    apple: "/ssengineers.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ssengineers.svg" />
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

        {/* JSON-LD SEO */}
        <SEO />

        {/* Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
