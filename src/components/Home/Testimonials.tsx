"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  org?: string;
  avatar?: string | null;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "SS Engineers delivered a turnkey MEP & fire solution for our data centre with zero downtime and exceptional documentation — highly recommended.",
    author: "R. Kumar",
    role: "Head of Facilities",
    org: "Tier-1 Data Centre",
    avatar: "/avatars/avatar1.jpg",
  },
  {
    quote:
      "Their engineering rigour, BIM coordination and commissioning rigor helped our hospital achieve compliance quickly and without interruptions.",
    author: "Dr. S. Jain",
    role: "Hospital Administrator",
    org: "MetroCare Hospitals",
    avatar: "/avatars/avatar2.jpg",
  },
  {
    quote:
      "Professional execution, transparent reporting and great after-sales AMC support. Our plant uptime improved dramatically.",
    author: "A. Mehra",
    role: "Plant Manager",
    org: "Industrial Manufacturer",
    avatar: "/avatars/avatar3.jpg",
  },
];

export default function Testimonials(): JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const length = TESTIMONIALS.length;
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, 6000);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isPaused, length]);

  // Keyboard navigation (left / right)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  function goTo(i: number) {
    setIndex(((i % length) + length) % length);
  }

  function prev() {
    goTo(index - 1);
    resetTimer();
  }

  function next() {
    goTo(index + 1);
    resetTimer();
  }

  function resetTimer() {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, 6000);
  }

  return (
    <section
      className="relative py-24 bg-[#0B1117] text-white overflow-hidden"
      aria-label="Client testimonials"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">What Clients Say</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mt-3">
            Feedback from organisations that trust our engineering delivery and ongoing support.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          ref={containerRef}
        >
          {/* Slider viewport */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {TESTIMONIALS.map((t, i) => (
                <article
                  key={i}
                  className="min-w-full px-6 md:px-12 flex flex-col items-center text-center"
                  aria-hidden={i !== index}
                >
                  <div className="w-full max-w-3xl">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-white/6 flex items-center justify-center">
                        {t.avatar ? (
                          <Image
                            src={t.avatar}
                            alt={t.author}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        ) : (
                          <svg
                            className="w-10 h-10 text-gray-300"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden
                          >
                            <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                            <path
                              d="M4 20c0-4 4-6 8-6s8 2 8 6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </div>
                    </div>

                    <p className="text-xl md:text-2xl font-light text-gray-100 leading-relaxed mb-6">
                      “{t.quote}”
                    </p>

                    <div className="mt-4">
                      <div className="text-lg font-semibold">{t.author}</div>
                      <div className="text-sm text-gray-400">
                        {t.role} {t.org ? `• ${t.org}` : ""}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-4"
            role="toolbar"
            aria-label="Testimonials navigation"
          >
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full bg-white/6 hover:bg-white/10 text-white flex items-center justify-center transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex items-center gap-3">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`w-3 h-3 rounded-full transition-all ${i === index ? "bg-blue-400 w-6" : "bg-white/20"}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-white/6 hover:bg-white/10 text-white flex items-center justify-center transition"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* CTA below testimonials */}
        <div className="mt-28 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:scale-[1.02] transition"
          >
            View Our Case Studies
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
