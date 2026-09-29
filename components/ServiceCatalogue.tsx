"use client";

import Link from "next/link";
import { Check, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { serviceCatalog } from "@/lib/service-catalog";
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
  const [selected, setSelected] = useState<string[]>([]);
  const categories = compact
    ? serviceCatalog.slice(0, 4).map((category) => ({
        ...category,
        services: category.services.slice(0, 3),
      }))
    : serviceCatalog;

  useEffect(() => {
    const refresh = () => setSelected(readServiceBucket().map((item) => item.name));
    refresh();
    window.addEventListener(SERVICE_BUCKET_UPDATED_EVENT, refresh);
    return () => window.removeEventListener(SERVICE_BUCKET_UPDATED_EVENT, refresh);
  }, []);

  return (
    <div className="service-catalogue">
      {categories.map((category) => (
        <section className="service-category" id={toSlug(category.name)} key={category.name}>
          <div className="service-category-heading">
            <div>
              <p className="eyebrow">Service capability</p>
              <h3>{category.name}</h3>
            </div>
            <p>{category.summary}</p>
          </div>
          <div className="service-card-grid">
            {category.services.map((service) => (
              <article className="service-listing-card" key={service}>
                <p className="service-type">Service</p>
                <h4>{service}</h4>
                <p>Scope assessed for your site. Proposal provided after technical review.</p>
                <button
                  type="button"
                  className={`service-select-button ${selected.includes(service) ? "selected" : ""}`}
                  onClick={() => toggleServiceBucketItem({ name: service, category: category.name })}
                >
                  {selected.includes(service) ? <Check aria-hidden="true" size={16} /> : <Plus aria-hidden="true" size={16} />}
                  {selected.includes(service) ? "Added to bucket" : "Add to bucket"}
                </button>
              </article>
            ))}
          </div>
        </section>
      ))}
      <div className="catalogue-bucket-cta">
        <ShoppingBag aria-hidden="true" size={20} />
        <p>Choose multiple systems, then send one complete enquiry.</p>
        <Link href="/bucket" className="text-link">Review bucket</Link>
      </div>
    </div>
  );
}
