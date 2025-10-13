import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-100 to-gray-100">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900">
          Protect Your Property With Our Expert Solutions
        </h2>
        <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
          From fire safety systems to electrical installations — we provide comprehensive solutions with quality and reliability.
        </p>
        <div className="mt-8">
          <Link
            href="/contact"
            className="px-8 py-4 rounded-lg bg-blue-900 text-white text-lg font-semibold hover:bg-blue-700 transition"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}