"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Check,
  Plus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { serviceCatalog, ServiceCategory } from "@/lib/service-catalog";
import {
  readServiceBucket,
  SERVICE_BUCKET_UPDATED_EVENT,
  toggleServiceBucketItem,
} from "@/lib/service-bucket";

const toSlug = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type ServiceCatalogueProps = {
  compact?: boolean;
};

export default function ServiceCatalogue({ compact = false }: ServiceCatalogueProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedBucket, setSelectedBucket] = useState<string[]>([]);
  const [activeDiscipline, setActiveDiscipline] = useState<string>("all");
  const [activeSearch, setActiveSearch] = useState<string>("");
  const [spotlightService, setSpotlightService] = useState<string>("");

  // Sync bucket
  useEffect(() => {
    const refresh = () => setSelectedBucket(readServiceBucket().map((item) => item.name));
    refresh();
    window.addEventListener(SERVICE_BUCKET_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(SERVICE_BUCKET_UPDATED_EVENT, refresh);
  }, []);

  // Sync search params from URL safely without SSR bailouts
  useEffect(() => {
    if (compact || typeof window === "undefined") return;

    const parseParams = () => {
      const params = new URLSearchParams(window.location.search);
      const sParam = params.get("service") || "";
      const qParam = params.get("q") || "";
      const dParam = params.get("discipline") || "all";

      setSpotlightService(sParam);
      setActiveSearch(qParam);
      setActiveDiscipline(dParam);
    };

    parseParams();
    window.addEventListener("popstate", parseParams);
    return () => window.removeEventListener("popstate", parseParams);
  }, [pathname, compact]);

  const clearAllFilters = () => {
    setSpotlightService("");
    setActiveSearch("");
    setActiveDiscipline("all");
    router.push("/services", { scroll: false });
  };

  const handleSelectDiscipline = (slug: string) => {
    setSpotlightService("");
    setActiveSearch("");
    setActiveDiscipline(slug);
    if (slug === "all") {
      router.push("/services", { scroll: false });
    } else {
      router.push(`/services?discipline=${slug}`, { scroll: false });
    }
  };

  // Find exact spotlight service if requested
  const matchedSpotlight = useMemo(() => {
    if (!spotlightService) return null;
    for (const cat of serviceCatalog) {
      const found = cat.services.find(
        (s) => s.toLowerCase() === spotlightService.toLowerCase().trim()
      );
      if (found) {
        return { name: found, category: cat.name, summary: cat.summary };
      }
    }
    return null;
  }, [spotlightService]);

  // Filter categories and services
  const displayedCategories = useMemo(() => {
    if (compact) {
      return serviceCatalog.slice(0, 4).map((cat) => ({
        ...cat,
        services: cat.services.slice(0, 3),
      }));
    }

    // If a single spotlight service is selected, show only that
    if (matchedSpotlight) {
      return [
        {
          name: matchedSpotlight.category,
          summary: matchedSpotlight.summary,
          services: [matchedSpotlight.name],
        },
      ];
    }

    let list = serviceCatalog;

    // Filter by discipline if selected
    if (activeDiscipline && activeDiscipline !== "all") {
      list = list.filter((cat) => toSlug(cat.name) === activeDiscipline);
    }

    // Filter by search query if entered
    if (activeSearch.trim()) {
      const query = activeSearch.toLowerCase().trim();
      list = list
        .map((cat) => ({
          ...cat,
          services: cat.services.filter(
            (s) =>
              s.toLowerCase().includes(query) || cat.name.toLowerCase().includes(query)
          ),
        }))
        .filter((cat) => cat.services.length > 0);
    }

    return list;
  }, [compact, matchedSpotlight, activeDiscipline, activeSearch]);

  const totalFilteredCount = useMemo(() => {
    return displayedCategories.reduce((acc, cat) => acc + cat.services.length, 0);
  }, [displayedCategories]);

  return (
    <div className="service-catalogue">
      {/* Filter Control Bar for Full Catalogue Page */}
      {!compact ? (
        <div className="catalogue-filter-bar">
          <div className="filter-status-info">
            {matchedSpotlight ? (
              <div className="filter-badge-active">
                <Sparkles size={15} className="text-accent" />
                <span>Single Result View: <strong>{matchedSpotlight.name}</strong></span>
                <span className="badge-cat">({matchedSpotlight.category})</span>
                <button type="button" onClick={clearAllFilters} className="clear-filter-btn">
                  <RotateCcw size={13} /> View All 50+ Services
                </button>
              </div>
            ) : activeSearch ? (
              <div className="filter-badge-active">
                <span>Search results for: <strong>"{activeSearch}"</strong> ({totalFilteredCount} systems found)</span>
                <button type="button" onClick={clearAllFilters} className="clear-filter-btn">
                  <RotateCcw size={13} /> Reset Filter
                </button>
              </div>
            ) : activeDiscipline !== "all" ? (
              <div className="filter-badge-active">
                <span>Discipline: <strong>{displayedCategories[0]?.name}</strong> ({totalFilteredCount} systems)</span>
                <button type="button" onClick={clearAllFilters} className="clear-filter-btn">
                  <RotateCcw size={13} /> Show All Disciplines
                </button>
              </div>
            ) : (
              <div className="filter-badge-neutral">
                <span>Displaying all <strong>50+ certified MEP & Fire Safety capabilities</strong></span>
              </div>
            )}
          </div>

          {/* Quick On-Page Discipline Tabs */}
          <div className="catalogue-discipline-tabs">
            <button
              type="button"
              className={`discipline-tab-btn ${activeDiscipline === "all" && !matchedSpotlight && !activeSearch ? "active" : ""}`}
              onClick={() => handleSelectDiscipline("all")}
            >
              All Disciplines
            </button>
            {serviceCatalog.map((cat) => {
              const slug = toSlug(cat.name);
              const isActive = activeDiscipline === slug && !matchedSpotlight && !activeSearch;
              return (
                <button
                  key={slug}
                  type="button"
                  className={`discipline-tab-btn ${isActive ? "active" : ""}`}
                  onClick={() => handleSelectDiscipline(slug)}
                >
                  {cat.name.split("&")[0].trim()}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Spotlight Single Result Presentation */}
      {!compact && matchedSpotlight ? (
        <section className="spotlight-result-card">
          <div className="spotlight-head">
            <div className="spotlight-badge-row">
              <span className="spotlight-discipline-tag">{matchedSpotlight.category}</span>
              <span className="spotlight-spec-tag">NBC 2016 Part-IV & NFPA Aligned</span>
            </div>
            <h2 className="spotlight-title">{matchedSpotlight.name}</h2>
            <p className="spotlight-summary">{matchedSpotlight.summary}</p>
          </div>

          <div className="spotlight-details-grid">
            <div className="spotlight-feature">
              <CheckCircle2 size={16} className="text-accent" />
              <div>
                <strong>Site Survey & Risk Review</strong>
                <p>On-site architectural evaluation, code mapping, and risk classification.</p>
              </div>
            </div>
            <div className="spotlight-feature">
              <CheckCircle2 size={16} className="text-accent" />
              <div>
                <strong>CAD Drawings & Hydraulic Calculations</strong>
                <p>Statutory approval-ready layouts, water demands, and pump sizing.</p>
              </div>
            </div>
            <div className="spotlight-feature">
              <CheckCircle2 size={16} className="text-accent" />
              <div>
                <strong>Direct OEM Sourcing & Fabrication</strong>
                <p>Original manufacturer test certificates, UL/FM/BIS certified components.</p>
              </div>
            </div>
            <div className="spotlight-feature">
              <CheckCircle2 size={16} className="text-accent" />
              <div>
                <strong>Testing, Commissioning & Handover</strong>
                <p>Hydrostatic testing, joint authority inspection, and FSC/NOC assistance.</p>
              </div>
            </div>
          </div>

          <div className="spotlight-actions">
            <button
              type="button"
              className={`button ${selectedBucket.includes(matchedSpotlight.name) ? "selected-bucket-btn" : ""}`}
              onClick={() =>
                toggleServiceBucketItem({
                  name: matchedSpotlight.name,
                  category: matchedSpotlight.category,
                })
              }
            >
              {selectedBucket.includes(matchedSpotlight.name) ? (
                <>
                  <Check size={18} /> Added to Requirement Bucket
                </>
              ) : (
                <>
                  <Plus size={18} /> Add to Requirement Bucket
                </>
              )}
            </button>

            <Link
              href={`/contact?discipline=${encodeURIComponent(matchedSpotlight.category)}&service=${encodeURIComponent(matchedSpotlight.name)}#request-work`}
              className="button ghost"
            >
              <Wrench size={16} /> Request Technical Survey for This System
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      ) : null}

      {/* Grid Listing of Categories & Services */}
      {(!matchedSpotlight || compact) && (
        <>
          {displayedCategories.length === 0 ? (
            <div className="catalogue-empty-state">
              <p className="empty-title">No direct system match found for your search.</p>
              <p className="empty-desc">
                We design and execute custom turnkey MEP systems. Clear your filter to view all 50+
                capabilities, or speak directly with our senior engineers.
              </p>
              <button type="button" onClick={clearAllFilters} className="button small">
                Reset & View All Services
              </button>
            </div>
          ) : (
            displayedCategories.map((category) => (
              <section
                className="service-category"
                id={toSlug(category.name)}
                key={category.name}
              >
                <div className="service-category-heading">
                  <div>
                    <p className="eyebrow">Service Discipline</p>
                    <h3>{category.name}</h3>
                  </div>
                  <p>{category.summary}</p>
                </div>
                <div className="service-card-grid">
                  {category.services.map((service) => (
                    <article className="service-listing-card" key={service}>
                      <div className="service-card-top">
                        <span className="service-type">{category.name.split("&")[0].trim()}</span>
                        <span className="service-dot" />
                      </div>
                      <h4>{service}</h4>
                      <p className="service-card-desc">
                        Engineering assessment, OEM equipment supply, installation, testing, and
                        statutory compliance handover.
                      </p>
                      <div className="service-card-actions">
                        <button
                          type="button"
                          className={`service-select-button ${selectedBucket.includes(service) ? "selected" : ""}`}
                          onClick={() =>
                            toggleServiceBucketItem({ name: service, category: category.name })
                          }
                        >
                          {selectedBucket.includes(service) ? (
                            <Check aria-hidden="true" size={15} />
                          ) : (
                            <Plus aria-hidden="true" size={15} />
                          )}
                          {selectedBucket.includes(service) ? "Added to Bucket" : "Add to Bucket"}
                        </button>
                        <Link
                          href={`/services?service=${encodeURIComponent(service)}`}
                          className="service-inspect-link"
                          title="View system specifications"
                        >
                          Details →
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))
          )}
        </>
      )}

      {/* Review Bucket Callout */}
      <div className="catalogue-bucket-cta">
        <ShoppingBag aria-hidden="true" size={20} />
        <p>Select multiple systems across disciplines, then submit one unified enquiry for site survey.</p>
        <Link href="/bucket" className="text-link">
          Review Bucket & Dispatch →
        </Link>
      </div>
    </div>
  );
}
