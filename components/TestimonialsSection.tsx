import SectionHeading from "@/components/SectionHeading";
import FeedbackForm from "@/components/FeedbackForm";
import {
  AppwriteRequestError,
  getAppwriteConfig,
  listAppwriteDocuments,
} from "@/functions/appwrite";
import { testimonialFallback } from "@/lib/content";

type TestimonialView = {
  authorName: string;
  authorRole: string;
  company: string;
  projectName: string;
  rating: number;
  testimonial: string;
  createdAt: string;
  status: string;
  displayOrder: number;
};

const toText = (value: unknown, max = 300) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const toNumber = (value: unknown, fallback = 0) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isFinite(parsed)) return parsed;
  }
  return fallback;
};

const normalize = (doc: Record<string, unknown>): TestimonialView => ({
  authorName: toText(doc.authorName, 100) || "Verified Client",
  authorRole: toText(doc.authorRole, 120),
  company: toText(doc.company, 120),
  projectName: toText(doc.projectName, 160),
  rating: Math.min(5, Math.max(1, toNumber(doc.rating, 5))),
  testimonial: toText(doc.testimonial, 2400),
  createdAt: toText(doc.createdAt, 80),
  status: (toText(doc.status, 24) || "published").toLowerCase(),
  displayOrder: toNumber(doc.displayOrder, 9999),
});

async function getTestimonials() {
  try {
    const {
      collections: { testimonials },
    } = getAppwriteConfig();
    const result = await listAppwriteDocuments(testimonials, {
      requireApiKey: true,
      limit: 100,
    });

    const rows = (result.documents || [])
      .map((item) => normalize(item))
      .filter((item) => item.status === "published" && item.testimonial.length >= 10)
      .sort((a, b) => {
        if (a.displayOrder !== b.displayOrder) {
          return a.displayOrder - b.displayOrder;
        }
        return b.createdAt.localeCompare(a.createdAt);
      })
      .slice(0, 6);

    return rows.length > 0 ? rows : testimonialFallback;
  } catch (error) {
    if (error instanceof AppwriteRequestError) {
      return testimonialFallback;
    }
    return testimonialFallback;
  }
}

function stars(count: number) {
  const value = Math.min(5, Math.max(1, count));
  return "★".repeat(value) + "☆".repeat(5 - value);
}

export default async function TestimonialsSection() {
  const items = await getTestimonials();

  return (
    <section className="section alt testimonials-shell">
      <div className="container">
        <SectionHeading
          eyebrow="Client Voices"
          title="Testimonials & Feedback"
          subtitle="Testimonials are published separately after internal review. Feedback submissions are saved directly to our CRM database."
        />
        <div className="testimonials-layout">
          <div className="testimonials-grid">
            {items.map((item, index) => (
              <article
                key={`${item.authorName}-${item.projectName}-${index}`}
                className="testimonial-card"
              >
                <p className="testimonial-stars" aria-label={`${item.rating} out of 5`}>
                  {stars(item.rating)}
                </p>
                <p className="testimonial-copy">“{item.testimonial}”</p>
                <p className="testimonial-person">
                  {item.authorName}
                  {item.authorRole ? `, ${item.authorRole}` : ""}
                </p>
                <p className="testimonial-meta">
                  {[item.company, item.projectName].filter(Boolean).join(" • ")}
                </p>
              </article>
            ))}
          </div>
          <aside className="form-panel feedback-panel">
            <h3>Share Your Feedback</h3>
            <p className="muted">
              Your feedback is submitted directly to our database and reviewed by
              management. Published testimonials are curated separately.
            </p>
            <FeedbackForm />
          </aside>
        </div>
      </div>
    </section>
  );
}
