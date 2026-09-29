import { company } from "@/lib/content";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Building2, LogIn, MapPin, Phone, ShieldCheck } from "lucide-react";
import CookiePreferencesButton from "@/components/CookiePreferencesButton";

const quickLinks = [
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
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

export default function Footer() {
  const primaryPhone = company.phones[0];
  return (
    <footer className="site-footer">
      <div className="container footer-intro">
        <div className="footer-brand-lockup">
          <Image src="/ssenglogo.jpeg" alt="S.S. Engineers & Consultants" width={54} height={54} />
          <div>
            <p className="footer-kicker">Engineering partner since {company.founded.replace("July ", "")}</p>
            <p className="footer-title">{company.name}</p>
          </div>
        </div>
        <p className="footer-intro-copy">Fire protection and MEP delivery for facilities that need accountable, compliance-ready execution.</p>
        <div className="footer-intro-actions">
          <a className="footer-primary-action" href={`tel:${primaryPhone}`}><Phone aria-hidden="true" size={16} /> Call engineering desk</a>
          <Link className="footer-secondary-action" href="/services">Build a request</Link>
        </div>
      </div>
      <div className="container footer-grid">
        <div className="footer-company-column">
          <p className="footer-label">Company</p>
          <p className="footer-copy">{company.tagline}. {company.overview.slice(0, 155)}...</p>
          <a className="footer-partner-link" href={`https://${company.partnerSite}`} target="_blank" rel="noreferrer">
            <Building2 aria-hidden="true" size={15} /> {company.associated} <ArrowUpRight aria-hidden="true" size={14} />
          </a>
        </div>
        <div>
          <p className="footer-label">Navigate</p>
          <div className="footer-link-grid">
            {quickLinks.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="footer-label">Contact</p>
          <div className="footer-contact-list">
            <a href={`tel:${primaryPhone}`}><Phone aria-hidden="true" size={15} /><span>{primaryPhone}</span></a>
            <a href={`mailto:${company.footerEmails[0]}`}><span>{company.footerEmails[0]}</span></a>
            <p><MapPin aria-hidden="true" size={15} /><span>{company.address}</span></p>
          </div>
          <p className="footer-label footer-label-spaced">Compliance</p>
          <Link className="footer-inline-link" href="/compliance-documents"><ShieldCheck aria-hidden="true" size={15} /> View company documents</Link>
        </div>
        <div className="footer-app-column">
          <div className="footer-app-card">
            <div className="footer-app-icon"><Image src="/amcmep-one-logo.png" alt="AMC MEP 24x7 One App" width={42} height={42} /></div>
            <p className="footer-label">Connected platform</p>
            <h3>{company.appName}</h3>
            <p>{company.appTagline}</p>
            <a className="footer-app-login" href={company.appLinks.login} target="_blank" rel="noreferrer"><LogIn aria-hidden="true" size={16} /> Log in to One App <ArrowUpRight aria-hidden="true" size={14} /></a>
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
          <p className="footer-label footer-label-spaced">Policies</p>
          <div className="footer-link-grid policy-grid">
            {policyLinks.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p>{company.website}</p>
        </div>
      </div>
    </footer>
  );
}
