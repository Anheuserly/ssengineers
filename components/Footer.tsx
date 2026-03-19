import { company } from "@/lib/content";
import Link from "next/link";
import Image from "next/image";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";

const quickLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/career", label: "Career" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/clients", label: "Clients" },
  { href: "/compliance-documents", label: "Compliance Documents" },
  { href: "/download-center", label: "Download Center" },
];

const policyLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/cookie-policy", label: "Cookie Policy" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/hse-policy", label: "Health & Safety (HSE)" },
  { href: "/quality-policy", label: "Quality Policy" },
];

const businessLinks = [
  { href: "/vendor-registration", label: "Vendor Registration" },
  { href: "/sitemap", label: "Sitemap" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-title">{company.name}</p>
          <p className="muted">{company.tagline}</p>
          <p className="muted">
            {company.associated}{" "}
            <a href={`https://${company.partnerSite}`} target="_blank" rel="noreferrer">
              ({company.partnerSite})
            </a>
          </p>
        </div>
        <div>
          <p className="footer-label">Head Office</p>
          <p className="muted">{company.address}</p>
          <p className="footer-label">Branch Offices</p>
          <p className="muted">{company.branchOffices.join(" | ")}</p>
        </div>
        <div>
          <p className="footer-label">Contact</p>
          <p className="muted">{company.phones.join(" | ")}</p>
          <p className="muted">{company.footerEmails.join(" | ")}</p>
        </div>
        <div>
          <p className="footer-label">Quick Links</p>
          <div className="footer-link-grid">
            {quickLinks.map((item) => (
              <p key={item.href} className="muted">
                <Link href={item.href}>{item.label}</Link>
              </p>
            ))}
          </div>

          <p className="footer-label">Policies</p>
          <div className="footer-link-grid">
            {policyLinks.map((item) => (
              <p key={item.href} className="muted">
                <Link href={item.href}>{item.label}</Link>
              </p>
            ))}
            <p className="muted">
              <CookiePreferencesButton />
            </p>
          </div>

          <p className="footer-label">Business</p>
          <div className="footer-link-grid">
            {businessLinks.map((item) => (
              <p key={item.href} className="muted">
                <Link href={item.href}>{item.label}</Link>
              </p>
            ))}
          </div>

          <p className="footer-label">Website</p>
          <p className="muted">{company.website}</p>
          <p className="footer-label">{company.appName}</p>
          <div className="store-badges">
            <a
              className="store-badge"
              href={company.appLinks.playStore || "#"}
              target="_blank"
              rel="noreferrer"
              aria-label="Download app from Google Play"
            >
              <Image
                src={company.appBadges.playStore}
                alt="Google Play badge"
                width={180}
                height={54}
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              className="store-badge"
              href={company.appLinks.appStore || "#"}
              target="_blank"
              rel="noreferrer"
              aria-label="Download app from Apple App Store"
            >
              <Image
                src={company.appBadges.appStore}
                alt="App Store badge"
                width={180}
                height={54}
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
