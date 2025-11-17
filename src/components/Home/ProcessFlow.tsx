"use client";

import React from "react";

export default function ProcessFlow() {
  const steps = [
    {
      step: "01",
      title: "Requirement Study & Site Survey",
      desc: "Detailed site inspection, requirement mapping, load study, feasibility check and risk identification.",
    },
    {
      step: "02",
      title: "Engineering Design & Planning",
      desc: "Creation of design documents, BIM models, drawings, hydraulic/electrical calculations and compliance planning.",
    },
    {
      step: "03",
      title: "Execution & Installation",
      desc: "On-site execution with QA/QC monitoring, material verification and real-time supervision by engineers.",
    },
    {
      step: "04",
      title: "Testing, Commissioning & Handover",
      desc: "System performance testing, documentation, training and certified handover to client teams.",
    },
  ];

  return (
    <section className="relative py-24 bg-[#0C1117] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Project Workflow</h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            A structured and proven multi-stage approach ensuring safe, compliant and precise engineering delivery.
          </p>
        </div>

        <div className="relative border-l border-white/10 pl-10 space-y-16">
          {steps.map((item, i) => (
            <div
              key={i}
              className="relative group"
            >
              {/* Timeline Dot */}
              <div className="
                absolute -left-[34px] w-6 h-6 rounded-full bg-blue-500
                ring-4 ring-blue-500/30 shadow-lg shadow-blue-500/20
              "></div>

              <div className="
                bg-white/5 border border-white/10 backdrop-blur-lg
                p-8 rounded-2xl transition-all duration-500
                group-hover:bg-white/10 group-hover:-translate-y-1 group-hover:shadow-2xl
              ">
                <div className="text-blue-400 text-xl font-bold mb-2">{item.step}</div>
                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-300 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
