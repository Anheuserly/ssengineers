"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ServiceIcons from "./ServiceIcons";
import HeroBackground from "../../static/home_hero_bg.png";

export default function HeroSection() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Fire Safety Background - FIX: Increased brightness for better visibility */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          transform: `translateY(${scrollPosition * 0.5}px)`,
          transition: "transform 0.1s ease-out",
          backgroundImage: `url(${HeroBackground.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(1.0)" // Changed from 0.7 to 1.0 for full brightness
        }}
      />
      
      {/* Dark overlay for better text visibility - FIX: Reduced opacity */}
      <div className="absolute inset-0 bg-black/10 z-0"></div> {/* Changed from bg-black/40 to bg-black/10 */}

      {/* Hero Content - FIX: Ensured text color is white for readability */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" />
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" />
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" />
              <path d="M17 8C17 10.2091 18.7909 12 21 12C23.2091 12 25 10.2091 25 8C25 5.79086 23.2091 4 21 4C18.7909 4 17 5.79086 17 8Z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white">
            SHREE GANESHE ENTERPRISES
          </h1>
        </div>
        
        <div className="h-1 w-24 bg-red-500 mx-auto mb-8"></div>
        
        <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto leading-relaxed text-white">
          Comprehensive Fire Safety Solutions: Sprinkler Systems, Extinguishers & Detection Systems
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
            Get a Quote
          </Link>
        </div>
      </div>

      <ServiceIcons />
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white mt-2 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}