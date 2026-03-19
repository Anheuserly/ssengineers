import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContactBar from "@/components/StickyContactBar";
import CookieConsentManager from "@/components/CookieConsentManager";

export const metadata: Metadata = {
  title: "S.S. Engineers & Consultants | Fire Protection & MEP",
  description:
    "ISO 9001:2008 certified fire protection, electrical, plumbing, and security services. Design, supply, installation, and AMC since 1997.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="page">
          <Header />
          {children}
          <Footer />
          <StickyContactBar />
          <CookieConsentManager />
        </div>
      </body>
    </html>
  );
}
