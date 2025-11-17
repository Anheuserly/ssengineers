"use client";

import React from "react";
import Link from "next/link";

export default function IndustriesWeServe() {
  const industries = [
    {
      name: "Data Centres",
      desc: "High-availability engineering for mission-critical environments with Tier-ready power systems, precision cooling, structured cabling, containment, VESDA and IG gas suppression.",
      features: [
        "HV/LV redundancy design",
        "Precision cooling & containment",
        "VESDA, IG Gas, FM200 systems",
      ],
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      ),
    },
    {
      name: "Hospitals & Healthcare",
      desc: "Critical-care engineering with infection-controlled HVAC, medical gas lines, fire detection, nurse call systems, and complete power redundancy for healthcare safety.",
      features: [
        "Laminar flow & pressure zoning",
        "Medical Gas Pipeline Systems (MGPS)",
        "Advanced fire detection & evacuation",
      ],
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none">
          <path d="M12 2V22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M5 12H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      name: "Manufacturing & Industrial",
      desc: "End-to-end utility engineering for factories — industrial ventilation, compressed air, process piping, electrical distribution and fire suppression systems.",
      features: [
        "Industrial ventilation & extraction",
        "HT/LT distribution & earthing",
        "Fire hydrant & sprinkler networks",
      ],
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 21V10L9 13V10L15 13V10L21 13V21H3Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      name: "Commercial & Corporate",
      desc: "Smart building engineering with automated HVAC, BMS controls, lighting, security, energy-saving design and comprehensive life safety compliance.",
      features: [
        "BMS & automation",
        "Energy-efficient HVAC",
        "Fire safety & surveillance",
      ],
      icon: (
        <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="3" width="16" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 8H15M9 12H15M9 16H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-24 bg-[#0C1118] text-white overflow-hidden">
      {/* Soft gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Industries We Serve
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Tailored engineering solutions crafted for high-demand sectors requiring precision, safety and continuous reliability.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {industries.map((item, index) => (
            <div
              key={index}
              className="
                group relative p-8 rounded-2xl bg-white/5 border border-white/10 
                backdrop-blur-xl transition-all duration-300 
                hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 
                hover:shadow-blue-500/10
              "
            >
              {/* Icon */}
              <div className="text-blue-400 group-hover:text-blue-300 mb-6 transition">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold mb-3">{item.name}</h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed mb-6">{item.desc}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {item.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                    <span className="text-gray-300">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Link */}
              <Link
                href="/industries"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition font-medium"
              >
                Learn More
                <svg
                  className="w-4 h-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
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
