import Link from "next/link";
import { company } from "@/lib/content";

const getPhoneDigits = (value: string) => value.replace(/\D/g, "");

export default function StickyContactBar() {
  const primaryPhone = company.phones[0] || "";
  const phoneDigits = getPhoneDigits(primaryPhone);
  const whatsappNumber =
    phoneDigits.length === 10 ? `91${phoneDigits}` : phoneDigits;
  const whatsappMessage = encodeURIComponent(
    "Hello, I need support for Fire/MEP project requirements."
  );

  return (
    <div className="sticky-cta-bar" role="region" aria-label="Quick contact actions">
      <div className="sticky-cta-actions">
        <a href={`tel:${phoneDigits}`} className="sticky-cta-link" aria-label="Call now">
          Call Now
        </a>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
          className="sticky-cta-link"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
        >
          WhatsApp
        </a>
        <Link href="/contact" className="sticky-cta-link primary">
          Request Site Survey
        </Link>
      </div>
    </div>
  );
}
