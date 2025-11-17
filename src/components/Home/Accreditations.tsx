"use client";

import React from "react";

export default function Accreditations() {
  const certifications = [
    {
      name: "ISO 9001:2015",
      desc: "Quality Management System ensuring consistent project delivery and documentation standards.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "NFPA Standards",
      desc: "Designs and installations aligned with NFPA codes for fire protection and life safety engineering.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24">
          <path d="M12 2L19 7V17L12 22L5 17V7L12 2Z" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      ),
    },
    {
      name: "NBC & TAC Compliance",
      desc: "MEP and fire safety work executed in compliance with NBC, TAC and statutory norms.",
      icon: (
        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24">
          <path d="M4 3H20V21H4V3Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M8 7H16M8 12H16M8 17H16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-24 bg-[#0B1016] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-800/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Accreditations & Standards</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Certified engineering supported by quality benchmarks and global compliance frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="
                p-10 rounded-2xl bg-white/5 border border-white/10
                backdrop-blur-xl hover:bg-white/10 transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10
              "
            >
              <div className="text-blue-400 mb-6">{cert.icon}</div>

              <h3 className="text-2xl font-semibold mb-3">{cert.name}</h3>
              <p className="text-gray-300 leading-relaxed">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
