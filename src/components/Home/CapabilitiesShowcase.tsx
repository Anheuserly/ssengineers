"use client";

import { useState } from "react";

export default function CapabilitiesShowcase() {
  const tabs = [
    {
      label: "Engineering",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 2L20 7V17L12 22L4 17V7L12 2Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      ),
      title: "Engineering Design & Planning",
      desc: "We deliver high-precision engineering supported by BIM, CAD modelling, load calculations, CFD analysis, and complete regulatory compliance documentation.",
      bullets: [
        "BIM (Revit) modelling & coordination",
        "Load calculations & system sizing",
        "CFD airflow + pressure simulations",
        "MEP, HVAC, Fire & Electrical integration",
      ],
    },
    {
      label: "Execution",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <path
            d="M3 21V10L9 13V10L15 13V10L21 13V21H3Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "On-Site Execution & Commissioning",
      desc: "Certified engineers ensure precise installation, QA/QC validation, testing, commissioning and handover with accurate as-built documentation.",
      bullets: [
        "Industrial-grade installation quality",
        "QA/QC process with validation sheets",
        "Pressure, continuity & performance tests",
        "Final testing, commissioning & handover",
      ],
    },
    {
      label: "Safety",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <path
            d="M12 2L21 8V16L12 22L3 16V8L12 2Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M9 12L11.2 14L15 10.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      ),
      title: "Safety, Compliance & Standards",
      desc: "All engineering and execution follow NFPA, NBC, TAC, IS Standards and strict safety protocols backed by documentation and certified approvals.",
      bullets: [
        "NFPA, NBC, TAC compliant designs",
        "Electrical & fire safety audits",
        "Risk assessment & hazard analysis",
        "Regulatory documentation support",
      ],
    },
    {
      label: "Technology",
      icon: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M12 7V12L15 14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: "Smart Automation & Digital Systems",
      desc: "From BMS to IoT-based safety controls, we integrate digital automation technologies for improved monitoring, uptime and operational intelligence.",
      bullets: [
        "BMS & PLC-based automation",
        "IoT-enabled fire & safety devices",
        "Remote monitoring dashboards",
        "Smart energy management systems",
      ],
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <section className="relative py-24 bg-[#0D121A] text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-700/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Our Capabilities
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            A multidisciplinary engineering team delivering precision, safety,
            automation and high-performance infrastructure across industries.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`
                group px-6 py-3 rounded-xl flex items-center gap-2 border
                transition-all duration-300 backdrop-blur-md
                ${
                  active === i
                    ? "bg-blue-600/20 border-blue-500 text-blue-400 shadow-blue-500/20 shadow-lg"
                    : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              {tab.icon}
              <span className="text-lg font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Active Content */}
        <div
          className="
            p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl
            shadow-2xl shadow-black/20 transition-all duration-500
          "
        >
          <h3 className="text-3xl font-semibold mb-6 text-blue-400">
            {tabs[active].title}
          </h3>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-3xl">
            {tabs[active].desc}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {tabs[active].bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                <span className="text-gray-300 text-base">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
