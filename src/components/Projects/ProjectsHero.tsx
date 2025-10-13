"use client";

import React from "react";
import Link from "next/link";

export default function ProjectsHero() {
  return (
    <section className="relative h-96 w-full flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4)"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
          Our Projects
        </h1>
        
        <div className="h-1 w-24 bg-red-500 mx-auto mb-8"></div>
        
        <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
          Showcasing our expertise in MEP solutions across diverse sectors and applications
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            href="/services" 
            className="px-8 py-3 bg-white text-blue-900 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
          >
            Our Services
          </Link>
          <Link 
            href="/contact" 
            className="px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 border border-red-600 transition-colors duration-300 shadow-lg"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}