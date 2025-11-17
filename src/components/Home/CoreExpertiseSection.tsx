"use client";

import React from "react";
import Link from "next/link";

export default function CoreExpertiseSection() {
  const services = [
    {
      title: "MEP Consulting",
      desc: "End-to-end Mechanical, Electrical & Plumbing consulting with BIM-integrated workflows, load simulations, and industrial design validation.",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L19 7V17L12 22L5 17V7L12 2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      ),
      bullets: [
        "BIM & Revit modelling",
        "Load + capacity calculations",
        "System integration drawings",
      ],
    },
    {
      title: "Fire Safety Engineering",
      desc: "Fire system design aligned with NFPA, NBC & TAC standards — including suppression, detection, hydrants, sprinklers & evacuation strategy.",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2C10 5 7 7.5 7 12C7 16 9.5 20 12 20C14.5 20 17 16 17 12C17 8 14 4 12 2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
        </svg>
      ),
      bullets: [
        "Hydraulic + pressure calculations",
        "Deluge / Pre-action / FM200 / CO₂",
        "Fire alarm & evacuation modelling",
      ],
    },
    {
      title: "HT / LT Electrical Systems",
      desc: "Industrial-grade electrical engineering covering HT panels, transformers, earthing, lighting layouts & power reliability strategies.",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24">
          <path
            d="M13 2L3 14H11L10 22L20 10H12L13 2Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      bullets: [
        "HT/LT panel designing",
        "Earthing & lightning protection",
        "Power factor & harmonics control",
      ],
    },
    {
      title: "HVAC & Automation",
      desc: "Energy-optimized ventilation, cooling and AHU systems with BMS integration, CFD airflow analysis and high-efficiency climate control.",
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3" fill="currentColor" />
          <path
            d="M12 2V6M12 18V22M2 12H6M18 12H22"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M5 5L8 8M16 16L19 19M5 19L8 16M16 8L19 5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
      bullets: [
        "CFD airflow simulation",
        "AHU/VRV/Chiller planning",
        "Energy optimisation & BMS",
      ],
    },
  ];

  return (
    <section className="relative py-24 bg-[#0A0E15] text-white overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Core Engineering Expertise
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Industrial-grade engineering solutions combining precision, safety and
            performance — powered by advanced tools & compliance frameworks.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {services.map((s, index) => (
            <div
              key={index}
              className="
                group relative p-8 rounded-2xl bg-white/5 border border-white/10 
                backdrop-blur-xl transition-all duration-300 hover:bg-white/10
                hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10
              "
            >
              {/* Icon */}
              <div className="mb-6 text-blue-400 group-hover:text-blue-300 transition">
                {s.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold mb-3">{s.title}</h3>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed">{s.desc}</p>

              {/* Bullets */}
              <ul className="space-y-2 mb-6">
                {s.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-2 h-2 mt-2 rounded-full bg-blue-500"></span>
                    <span className="text-gray-300">{b}</span>
                  </li>
                ))}
              </ul>

              {/* Link */}
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition font-medium"
              >
                Explore More
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
