"use client";

import React from "react";

export default function WhyChooseUs() {
  const reasons = [
    {
      title: "Engineering Precision",
      desc: "All designs follow strict engineering workflows including BIM, load analysis, CFD airflow simulation and compliance-driven documentation.",
      icon: (
        <svg className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 2L20 7V17L12 22L4 17V7L12 2Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "End-to-End Delivery",
      desc: "Survey, design, execution, testing, commissioning and AMC — complete lifecycle engineering under one accountable team.",
      icon: (
        <svg className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24">
          <path
            d="M5 12H19M12 5V19"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Certified & Compliant",
      desc: "We adhere to NFPA, NBC, TAC, ISO 9001, electrical safety standards and industry regulations for every deliverable.",
      icon: (
        <svg className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 2L21 8V16L12 22L3 16V8L12 2Z"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M9 12L11 14L15 10"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "High-Reliability Execution",
      desc: "Industrial-grade installation practices, QA/QC, material validation and continuous performance monitoring ensure reliability.",
      icon: (
        <svg className="w-12 h-12 text-blue-400" fill="none" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M12 7V12L15 14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  const stats = [
    { value: "120+", label: "Projects Delivered" },
    { value: "30+ Years", label: "Combined Experience" },
    { value: "99.8%", label: "SLA Compliance" },
    { value: "24/7", label: "AMC Support" },
  ];

  return (
    <section className="relative py-24 bg-[#0B1017] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Why Clients Choose Us
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Engineering excellence backed by certified processes, advanced tools
            and reliable execution across industries.
          </p>
        </div>

        {/* Grid: Reasons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          {reasons.map((item, i) => (
            <div
              key={i}
              className="
                group p-8 rounded-2xl bg-white/5 border border-white/10 
                backdrop-blur-xl transition-all duration-300 
                hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2 
                hover:shadow-blue-500/10
              "
            >
              {/* Icon */}
              <div className="mb-6 group-hover:text-blue-300">{item.icon}</div>

              {/* Title */}
              <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>

              {/* Description */}
              <p className="text-gray-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div
              key={i}
              className="
                p-6 rounded-2xl bg-white/5 border border-white/10 
                backdrop-blur-xl transition-all duration-300
                hover:bg-white/10 hover:shadow-lg hover:shadow-blue-500/10
              "
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-400">
                {s.value}
              </div>
              <div className="text-gray-300 mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
