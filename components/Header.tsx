"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company, gstRegistrations } from "@/lib/content";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/working-activity", label: "Status" },
  { href: "/compliance-documents", label: "Compliance" },
  { href: "/clients", label: "Clients" },
  { href: "/vendor-registration", label: "Vendors" },
  { href: "/download-center", label: "Downloads" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileMenuOpen]);

  const gstLine = gstRegistrations
    .map((item) => `${item.state}: ${item.gstin}`)
    .join(" | ");
  const primaryPhoneRaw = company.phones[0] || "";
  const primaryPhoneDigits = primaryPhoneRaw.replace(/\D/g, "");
  const primaryPhoneLabel = primaryPhoneDigits
    ? `+91 ${primaryPhoneDigits}`
    : primaryPhoneRaw;
  const primaryEmail = "anil@ssengineers.in";
  const navGroups = [
    {
      title: "Company",
      links: navLinks.filter((item) =>
        ["/", "/services", "/projects", "/clients", "/career", "/contact"].includes(
          item.href
        )
      ),
    },
    {
      title: "Execution",
      links: navLinks.filter((item) =>
        [
          "/working-activity",
          "/compliance-documents",
          "/download-center",
        ].includes(item.href)
      ),
    },
    {
      title: "Business",
      links: navLinks.filter((item) => ["/vendor-registration"].includes(item.href)),
    },
  ];

  return (
    <header className="site-header">
      <div className="gst-top-strip">
        <div className="container gst-strip-inner">
          <p className="gst-item">
            <strong>GST:</strong> {gstLine}
            {primaryPhoneDigits ? (
              <>
                <span className="gst-sep">|</span>
                <strong>Call:</strong>{" "}
                <a className="gst-inline-link" href={`tel:${primaryPhoneDigits}`}>
                  {primaryPhoneLabel}
                </a>
              </>
            ) : null}
            {primaryEmail ? (
              <>
                <span className="gst-sep">|</span>
                <strong>Email:</strong>{" "}
                <a className="gst-inline-link" href={`mailto:${primaryEmail}`}>
                  {primaryEmail}
                </a>
              </>
            ) : null}
          </p>
        </div>
      </div>
      <div className="container header-inner">
        <div className="brand">
          <div className="brand-mark">
            <Image
              src="/ssenglogo.jpeg"
              alt="S.S. Engineers logo"
              className="brand-logo"
              width={48}
              height={48}
              priority
            />
          </div>
          <div>
            <p className="brand-name">S.S. Engineers & Consultants</p>
            <p className="brand-sub">Fire Protection & MEP Specialists</p>
          </div>
        </div>
        <nav className="nav desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link className="cta" href="/contact">
            Request a Survey
          </Link>
          <button
            type="button"
            className="mobile-nav-trigger"
            aria-label="Open mobile navigation"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="mobile-nav-shell" role="dialog" aria-modal="true">
          <button
            type="button"
            className="mobile-nav-backdrop"
            aria-label="Close navigation"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="mobile-nav-drawer">
            <div className="mobile-nav-head">
              <p>Quick Navigation</p>
              <button
                type="button"
                className="mobile-nav-close"
                aria-label="Close navigation"
                onClick={closeMobileMenu}
              >
                ×
              </button>
            </div>
            {navGroups.map((group) => (
              <section key={group.title} className="mobile-nav-group">
                <p className="mobile-nav-group-title">{group.title}</p>
                <div className="mobile-nav-links">
                  {group.links.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={`mobile-nav-link ${
                        pathname === item.href ? "active" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
            <div className="mobile-nav-meta">
              <a href={`tel:${primaryPhoneDigits || primaryPhoneRaw}`}>
                Call: {primaryPhoneLabel}
              </a>
              <a href={`mailto:${primaryEmail}`}>Email: {primaryEmail}</a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
