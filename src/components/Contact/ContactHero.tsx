"use client";

import React from "react";
import Link from "next/link";

export default function ContactHero() {
  return (
    <section className="relative py-20 bg-gray-900 text-white overflow-hidden">
      {/* Professional Contact Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.3)"
        }}
      />
      
      {/* Dark Overlay for Better Text Readability */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get In Touch
          </h1>
          <div className="h-1 w-24 bg-red-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Ready to discuss your fire safety and MEP needs? Contact us for expert solutions and professional consultation.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="#contact-form" 
              className="px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-lg"
            >
              Send a Message
            </Link>
            <a 
              href="tel:+918527378555" 
              className="px-8 py-3 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Call Now: +91 8527378555
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}