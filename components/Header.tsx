"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { company, gstRegistrations } from "@/lib/content";

type NavLink = {
  href: string;
  label: string;
};

type NavGroup = {
  title: string;
  links: NavLink[];
};

const primaryLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/clients", label: "Clients" },
  { href: "/contact", label: "Contact" },
];

const exploreGroups: NavGroup[] = [
  {
    title: "Execution",
    links: [
      { href: "/working-activity", label: "Working Activity" },
      { href: "/work-in-progress", label: "Work In Progress" },
      { href: "/work-done", label: "Work Done" },
    ],
  },
  {
    title: "Documents",
    links: [
      { href: "/compliance-documents", label: "Compliance Documents" },
      { href: "/download-center", label: "Download Center" },
      { href: "/sitemap", label: "Sitemap" },
    ],
  },
  {
    title: "Business",
    links: [
      { href: "/vendor-registration", label: "Vendor Registration" },
      { href: "/portal-login", label: "Vendor/Customer Login" },
      { href: "/portal-login?mode=register", label: "Create Account" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/team", label: "Team" },
      { href: "/career", label: "Career" },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/terms-conditions", label: "Terms & Conditions" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopExploreOpen, setDesktopExploreOpen] = useState(false);
  const closeMobileMenu = () => setMobileMenuOpen(false);
  const closeAllNav = () => {
    setMobileMenuOpen(false);
    setDesktopExploreOpen(false);
  };
  const desktopExploreRef = useRef<HTMLDivElement | null>(null);
  const desktopExploreTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!mobileMenuOpen && !desktopExploreOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileMenuOpen, desktopExploreOpen]);

  useEffect(() => {
    if (!desktopExploreOpen) return;

    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (desktopExploreRef.current?.contains(target)) return;
      if (desktopExploreTriggerRef.current?.contains(target)) return;
      setDesktopExploreOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopExploreOpen(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [desktopExploreOpen]);

  const gstLine = gstRegistrations
    .map((item) => `${item.state}: ${item.gstin}`)
    .join(" | ");
  const primaryPhoneRaw = company.phones[0] || "";
  const primaryPhoneDigits = primaryPhoneRaw.replace(/\D/g, "");
  const primaryPhoneLabel = primaryPhoneDigits
    ? `+91 ${primaryPhoneDigits}`
    : primaryPhoneRaw;
  const primaryEmail = "anil@ssengineers.in";

  const mobileNavGroups: NavGroup[] = [
    { title: "Main", links: primaryLinks },
    ...exploreGroups,
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
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? "active" : ""}`}
              onClick={closeAllNav}
            >
              {link.label}
            </Link>
          ))}

          <button
            ref={desktopExploreTriggerRef}
            type="button"
            className={`nav-link nav-more-trigger ${desktopExploreOpen ? "active" : ""}`}
            onClick={() => setDesktopExploreOpen((value) => !value)}
            aria-expanded={desktopExploreOpen}
            aria-controls="desktop-explore-panel"
          >
            Explore
          </button>
        </nav>

        <div className="header-actions">
          <Link className="cta cta-secondary" href="/portal-login?mode=register">
            Create Portal
          </Link>
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

      {desktopExploreOpen ? (
        <div className="desktop-explore-shell">
          <button
            type="button"
            className="desktop-explore-backdrop"
            aria-label="Close explore navigation"
            onClick={() => setDesktopExploreOpen(false)}
          />
          <div
            ref={desktopExploreRef}
            id="desktop-explore-panel"
            className="container desktop-explore-panel"
            role="dialog"
            aria-modal="true"
          >
            {exploreGroups.map((group) => (
              <section key={group.title} className="desktop-explore-group">
                <p className="desktop-explore-title">{group.title}</p>
                <div className="desktop-explore-links">
                  {group.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`desktop-explore-link ${
                        pathname === link.href ? "active" : ""
                      }`}
                      onClick={closeAllNav}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      ) : null}

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
            {mobileNavGroups.map((group) => (
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
