// src/app/page.tsx
"use client";

import HeroSectionNew from "../components/Home/HeroSectionNew";
import CoreExpertiseSection from "../components/Home/CoreExpertiseSection";
import IndustriesWeServe from "../components/Home/IndustriesWeServe";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import CapabilitiesShowcase from "../components/Home/CapabilitiesShowcase";
import FeaturedProjects from "../components/Home/FeaturedProjects";
import ProcessFlow from "../components/Home/ProcessFlow";
import Accreditations from "../components/Home/Accreditations";
import TechStack from "../components/Home/TechStack";
import Testimonials from "../components/Home/Testimonials";
import CTASectionElite from "../components/Home/CTASectionElite";

export default function HomePage() {
  return (
    <div className="min-h-screen font-['Inter'] bg-[#0B0E14] text-white overflow-x-hidden">
      {/* Hero */}
      <HeroSectionNew />

      {/* Core sections */}
      <CoreExpertiseSection />
      <IndustriesWeServe />
      <WhyChooseUs />
      <CapabilitiesShowcase />

      {/* Projects & Process */}
      <FeaturedProjects />
      <ProcessFlow />

      {/* Credibility */}
      <Accreditations />
      <TechStack />
      <Testimonials />

      {/* CTA */}
      <CTASectionElite />
    </div>
  );
}
