"use client";

import React from "react";

export default function TechStack() {
  const tools = [
    { name: "AutoCAD", cat: "Drafting & Layout" },
    { name: "Revit BIM", cat: "3D Modelling & Coordination" },
    { name: "SolidWorks", cat: "Mechanical Simulation" },
    { name: "Dialux", cat: "Lighting Simulations" },
    { name: "ETAP", cat: "Electrical Load Analysis" },
    { name: "CFD Tools", cat: "Airflow & Pressure Modelling" },
    { name: "Visio", cat: "Schematic Mapping" },
    { name: "PLC / BMS Systems", cat: "Automation & Monitoring" },
  ];

  return (
    <section className="relative py-24 bg-[#0D121A] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-700/10 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Technology & Tools We Use
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Powered by advanced engineering software and digital automation systems ensuring accuracy and performance.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {tools.map((tool, i) => (
            <div
              key={i}
              className="
                p-8 rounded-2xl bg-white/5 border border-white/10
                backdrop-blur-xl hover:bg-white/10 transition-all duration-300
                hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10
                text-center
              "
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-2">{tool.name}</h3>
              <p className="text-gray-300 text-sm">{tool.cat}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
                                    