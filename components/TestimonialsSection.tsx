"use client";

import { useEffect, useState } from "react";
import SectionHeading from "@/components/SectionHeading";

type FeedbackItem = {
  id: string;
  customerName: string;
  rating: number;
  message: string;
  createdAt: string;
};

function stars(count: number) {
  const value = Math.min(5, Math.max(1, count));
  return "★".repeat(value) + "☆".repeat(5 - value);
}

export default function TestimonialsSection() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    fetch("/api/testimonials", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unable to load feedback.");
        return response.json() as Promise<{ testimonials?: FeedbackItem[] }>;
      })
      .then((payload) => {
        if (active) setItems(Array.isArray(payload.testimonials) ? payload.testimonials : []);
      })
      .catch(() => {
        if (active) setItems([]);
      })
      .finally(() => {
        if (active) setLoaded(true);
      });

    return () => {
      active = false;
    };
  }, []);

  if (!loaded || items.length === 0) return null;

  return (
    <section className="section testimonials-shell compact-feedback-section">
      <div className="container">
        <SectionHeading
          eyebrow="Client Voices"
          title="Approved Client Feedback"
          subtitle="Published from verified feedback after management review."
        />
        <div className="testimonial-rail" aria-label="Approved client feedback">
          {items.map((item) => (
            <article key={item.id} className="testimonial-card compact">
              <p className="testimonial-stars" aria-label={`${item.rating} out of 5`}>
                {stars(item.rating)}
              </p>
              <p className="testimonial-copy">“{item.message}”</p>
              <p className="testimonial-person">{item.customerName}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
