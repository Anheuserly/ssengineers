"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CTASectionElite() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Demo behavior: emulate network call
    await new Promise((res) => setTimeout(res, 900));

    setLoading(false);
    setSent(true);

    // In production: replace with API call / Appwrite / Formspree / custom endpoint
    // fetch('/api/contact', { method: 'POST', body: JSON.stringify(payload) })
  }

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#071226] to-[#08131a] text-white overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -right-40 -top-40 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-40 -bottom-40 w-80 h-80 bg-purple-700/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: sales copy */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Ready to make your project resilient & efficient?
            </h2>
            <p className="text-gray-300 mb-6 max-w-lg">
              Book a technical consultation with our senior engineers. We’ll scope your requirements, propose a tailored solution and produce a fast, compliant plan ready for execution.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <li className="flex items-start gap-3 text-gray-200">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-600/20 text-blue-400">✓</span>
                Expert site surveys & feasibility
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-600/20 text-blue-400">✓</span>
                BIM-based design & clash detection
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-600/20 text-blue-400">✓</span>
                Certified testing & commissioning
              </li>
              <li className="flex items-start gap-3 text-gray-200">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-blue-600/20 text-blue-400">✓</span>
                24/7 AMC & performance SLAs
              </li>
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow hover:scale-[1.02] transition"
              >
                Request Consultation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition"
              >
                View Case Studies
              </Link>
            </div>
          </div>

          {/* Right: contact form (compact) */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Full name</label>
                  <input
                    name="name"
                    required
                    className="w-full rounded-md px-3 py-2 bg-transparent border border-white/10 text-white placeholder:text-white/60 focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Email or Phone</label>
                  <input
                    name="contact"
                    required
                    className="w-full rounded-md px-3 py-2 bg-transparent border border-white/10 text-white placeholder:text-white/60 focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="email@company.com or +91 98xxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Project brief</label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full rounded-md px-3 py-2 bg-transparent border border-white/10 text-white placeholder:text-white/60 focus:ring-2 focus:ring-blue-600 outline-none"
                    placeholder="Short description, timeline, or budget"
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-md bg-blue-600 text-white font-semibold shadow hover:scale-[1.02] transition disabled:opacity-60"
                  >
                    {loading ? (
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-20" />
                        <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                      </svg>
                    ) : (
                      "Send Request"
                    )}
                  </button>

                  <Link href="/services" className="text-sm text-gray-200 underline underline-offset-2">
                    See service catalogue
                  </Link>
                </div>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Request received</h3>
                <p className="text-gray-300 mb-6">Our team will contact you within 24 hours to schedule a consultation.</p>
                <div className="flex justify-center gap-3">
                  <Link href="/projects" className="px-4 py-2 rounded-md bg-white/5 border border-white/10 text-white">
                    View Projects
                  </Link>
                  <Link href="/contact" className="px-4 py-2 rounded-md bg-blue-600 text-white">
                    Contact Page
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer micro-note */}
        <div className="mt-10 text-sm text-gray-400 text-center">
          <span>All consultations are subject to preliminary feasibility assessment. For emergency services call +91-9871936847</span>
        </div>
      </div>
    </section>
  );
}
