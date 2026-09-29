"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  X,
  LogIn,
  PhoneCall,
  Flame,
  Zap,
  Wrench,
  ShieldCheck,
  Layers,
  Clock,
  ChevronRight,
  Building,
} from "lucide-react";
import { company, gstRegistrations } from "@/lib/content";
import { serviceCatalog } from "@/lib/service-catalog";
import BucketLink from "@/components/BucketLink";

const toSlug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const allSearchServices = serviceCatalog.flatMap((cat) =>
  cat.services.map((svc) => ({
    name: svc,
    category: cat.name,
    slug: toSlug(cat.name),
  }))
);

const categoryNavItems = [
  { name: "All Disciplines", slug: "all", icon: Layers },
  { name: "Fire Fighting & Safety", slug: "fire-fighting-fire-safety", icon: Flame },
  { name: "Electrical & Substation", slug: "electrical-services", icon: Zap },
  { name: "Plumbing & Sanitary", slug: "plumbing-services", icon: Wrench },
  { name: "ELV, Security & IBMS", slug: "elv-security-and-ibms", icon: ShieldCheck },
  { name: "Turnkey Installation", slug: "design-supply-and-installation", icon: Building },
  { name: "AMC & Maintenance", slug: "amc-and-maintenance", icon: Clock },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDiscipline, setActiveDiscipline] = useState<string>("all");

  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  // Sync active discipline from URL in browser
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const disc = params.get("discipline");
    const svc = params.get("service");

    if (svc) {
      const match = allSearchServices.find(
        (s) => s.name.toLowerCase() === svc.toLowerCase().trim()
      );
      if (match) setActiveDiscipline(match.slug);
    } else if (disc) {
      setActiveDiscipline(disc);
    } else if (pathname === "/services") {
      setActiveDiscipline("all");
    } else {
      setActiveDiscipline("");
    }
  }, [pathname]);

  const filteredServices = searchQuery.trim().length > 0
    ? allSearchServices
        .filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase().trim())
        )
        .slice(0, 8)
    : [];

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearchFocused(false);
    router.push(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleSelectService = (item: { name: string; category: string; slug: string }) => {
    setSearchFocused(false);
    setSearchQuery("");
    setMobileMenuOpen(false);
    // Directly show ONLY that exact result!
    router.push(`/services?service=${encodeURIComponent(item.name)}`);
  };

  const gstLine = gstRegistrations
    .map((item) => `${item.state}: ${item.gstin}`)
    .join(" | ");
  const primaryPhoneRaw = company.phones[0] || "";
  const primaryPhoneDigits = primaryPhoneRaw.replace(/\D/g, "");
  const primaryPhoneLabel = primaryPhoneDigits
    ? `+91 ${primaryPhoneDigits}`
    : primaryPhoneRaw;
  const primaryEmail = "anil@ssengineers.in";

  return (
    <header className="site-header">
      {/* Top GST & Contact Strip */}
      <div className="gst-top-strip">
        <div className="container gst-strip-inner">
          <p className="gst-item">
            <strong>GST:</strong> {gstLine}
            {primaryPhoneDigits ? (
              <>
                <span className="gst-sep">|</span>
                <strong>Hotline:</strong>{" "}
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

      {/* Main Header Bar */}
      <div className="container header-inner">
        {/* Brand */}
        <Link href="/" className="brand" onClick={() => setMobileMenuOpen(false)}>
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
            <p className="brand-sub">Turnkey Fire Protection & Integrated MEP</p>
          </div>
        </Link>

        {/* Smart Search Box */}
        <div className="header-search-wrap" ref={searchContainerRef}>
          <form className="header-search-form" onSubmit={handleSearchSubmit}>
            <Search className="search-icon" size={17} aria-hidden="true" />
            <input
              type="text"
              className="header-search-input"
              placeholder="Search 50+ MEP services, fire fighting, HT/LT electrical..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchFocused(true);
              }}
              onFocus={() => setSearchFocused(true)}
              aria-label="Search MEP services and systems"
            />
            {searchQuery ? (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search input"
              >
                <X size={15} />
              </button>
            ) : null}
            <button type="submit" className="search-submit-btn">
              Search
            </button>
          </form>

          {/* Live Search Suggestions Dropdown */}
          {searchFocused && filteredServices.length > 0 ? (
            <div className="search-dropdown-menu">
              <div className="search-dropdown-header">
                <span>Direct System Match</span>
                <span className="search-count">{filteredServices.length} found</span>
              </div>
              <ul className="search-results-list">
                {filteredServices.map((item) => (
                  <li key={`${item.category}-${item.name}`}>
                    <button
                      type="button"
                      className="search-result-item"
                      onClick={() => handleSelectService(item)}
                    >
                      <div className="search-item-info">
                        <span className="search-item-name">{item.name}</span>
                        <span className="search-item-cat">{item.category}</span>
                      </div>
                      <ChevronRight size={15} className="search-arrow" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="search-dropdown-footer">
                <Link
                  href={`/services?q=${encodeURIComponent(searchQuery.trim())}`}
                  className="search-view-all"
                  onClick={() => setSearchFocused(false)}
                >
                  View all matching results in catalogue →
                </Link>
              </div>
            </div>
          ) : null}
        </div>

        {/* Header Actions */}
        <div className="header-actions">
          <BucketLink />

          <a
            className="app-login-link"
            href={company.appLinks.login}
            target="_blank"
            rel="noreferrer"
            title="SGE One App Login"
          >
            <LogIn aria-hidden="true" size={15} />
            <span>One App</span>
          </a>

          <a
            className="header-hotline-btn"
            href={`tel:${primaryPhoneDigits}`}
            title="Direct Engineering Hotline"
          >
            <PhoneCall size={14} />
            <span>+91 {primaryPhoneDigits}</span>
          </a>

          <button
            type="button"
            className="mobile-nav-trigger"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Sub-Header MEP Disciplines Strip */}
      <nav className="header-category-strip" aria-label="MEP Engineering Disciplines">
        <div className="container category-strip-inner">
          <div className="category-strip-label">
            <span>MEP DISCIPLINES:</span>
          </div>
          <div className="category-strip-scroll">
            {categoryNavItems.map((cat) => {
              const Icon = cat.icon;
              const isSelected = activeDiscipline === cat.slug;
              const href =
                cat.slug === "all" ? "/services" : `/services?discipline=${cat.slug}`;

              return (
                <Link
                  key={cat.slug}
                  href={href}
                  className={`category-strip-item ${isSelected ? "active" : ""}`}
                  onClick={() => {
                    setActiveDiscipline(cat.slug);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Icon size={14} className="category-icon" aria-hidden="true" />
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
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
              <p>MEP Disciplines</p>
              <button
                type="button"
                className="mobile-nav-close"
                aria-label="Close navigation"
                onClick={() => setMobileMenuOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="mobile-nav-search">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search systems & services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </div>

            <div className="mobile-category-list">
              <p className="mobile-nav-group-title">Select Discipline</p>
              {categoryNavItems.map((cat) => {
                const Icon = cat.icon;
                const isSelected = activeDiscipline === cat.slug;
                const href =
                  cat.slug === "all" ? "/services" : `/services?discipline=${cat.slug}`;
                return (
                  <Link
                    key={cat.slug}
                    href={href}
                    className={`mobile-category-link ${isSelected ? "active" : ""}`}
                    onClick={() => {
                      setActiveDiscipline(cat.slug);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Icon size={16} className="category-icon" />
                    <span>{cat.name}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mobile-nav-meta">
              <Link
                href="/contact#request-work"
                className="button full-width"
                onClick={() => setMobileMenuOpen(false)}
                style={{ marginBottom: "0.8rem", textAlign: "center" }}
              >
                Create Work Request
              </Link>
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
