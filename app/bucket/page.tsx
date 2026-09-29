import Link from "next/link";
import BucketRequestForm from "@/components/BucketRequestForm";

export const metadata = {
  title: "Service Bucket | S.S. Engineers & Consultants",
  description: "Review selected engineering services and send one detailed site request.",
};

export default function BucketPage() {
  return (
    <main>
      <section className="bucket-hero">
        <div className="container bucket-hero-inner">
          <div>
            <p className="eyebrow">Service enquiry</p>
            <h1>Plan the right scope before work begins.</h1>
            <p className="lead">Select every relevant system, then send one clear requirement for technical review.</p>
          </div>
          <Link href="/services" className="button ghost">Browse services</Link>
        </div>
      </section>
      <section className="section">
        <div className="container"><BucketRequestForm /></div>
      </section>
    </main>
  );
}
