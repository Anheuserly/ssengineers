"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedProjects() {
  const projects = [
    {
      title: "Tier-III Data Centre Fire & MEP Infrastructure",
      location: "Gurugram, Haryana",
      industry: "Data Centre",
      image: "/projects/datacentre.jpg",
      highlights: [
        "Clean Agent Suppression (IG-55)",
        "Precision Cooling Integration",
        "VESDA & Addressable Fire Alarm",
      ],
    },
    {
      title: "Corporate Headquarters — HVAC + Automation",
      location: "Noida, UP",
      industry: "Corporate",
      image: "/projects/corporate.jpg",
      highlights: [
        "VRV + AHU Hybrid System",
        "BMS Integration",
        "Fire Detection & PA System",
      ],
    },
    {
      title: "Industrial Manufacturing Facility MEP Turnkey",
      location: "Bhiwadi, Rajasthan",
      industry: "Industrial",
      image: "/projects/industrial.jpg",
      highlights: [
        "HT/LT Electrical + Earthing",
        "Hydrant + Sprinkler Network",
        "Ventilation & Exhaust Systems",
      ],
    },
    {
      title: "Hospital HVAC & Fire Compliance Upgrade",
      location: "New Delhi",
      industry: "Healthcare",
      image: "/projects/hospital.jpg",
      highlights: [
        "Laminar Flow OT HVAC",
        "MGPS Compliance Upgrade",
        "Fire Detection & Evacuation",
      ],
    },
  ];

  return (
    <section className="relative py-24 bg-[#0C1117] text-white overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Trusted by leading enterprises for mission-critical engineering
            solutions across MEP, Fire, Electrical, HVAC & Automation.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="
                group rounded-2xl overflow-hidden relative
                border border-white/10 bg-white/5 backdrop-blur-xl
                hover:bg-white/10 transition-all duration-500
                hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10
              "
            >
              {/* Image */}
              <div className="w-full h-64 relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                {/* Industry Badge */}
                <span className="absolute top-4 left-4 px-4 py-1 rounded-full bg-blue-600/30 border border-blue-500/40 backdrop-blur-md text-sm font-semibold">
                  {project.industry}
                </span>
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{project.location}</p>

                <ul className="space-y-2 mb-6">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-500 mt-2"></span>
                      <span className="text-gray-300">{h}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
                >
                  View Full Case Study
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
