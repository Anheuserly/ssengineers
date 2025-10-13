import React from "react";
import "../styles/About.css";

import AboutHero from "../../components/About/AboutHero";

export const metadata = {
  title: "About Us - Shree Ganesh Enterprises",
  description:
    "Shree Ganesh Enterprises is a trusted provider of comprehensive fire fighting solutions. We specialize in supplying, installing, and maintaining high-quality fire safety equipment to protect lives and property across industries.",
  alternates: { canonical: "https://www.sge.org.in/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AboutHero />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About Shree Ganesh Enterprises</h2>
          <div className="max-w-4xl mx-auto text-lg text-gray-700 space-y-6">
            <p>
              Shree Ganesh Enterprises is a leading provider of comprehensive fire fighting solutions dedicated to safeguarding lives and property. Since our establishment, we've specialized in <strong>fire safety equipment supply, installation, and maintenance services</strong>, delivering reliable protection systems that balance advanced technology with practical safety requirements.
            </p>
            <p>
              Committed to creating safer environments for our clients, we focus on quality, compliance, and cutting-edge fire prevention technology for maximum protection. From risk assessment to system implementation, our team ensures code-compliant and effective fire safety solutions tailored to your specific needs. Serving <strong>industrial, commercial, and residential sectors</strong>, we are dedicated to providing peace of mind through superior fire protection systems.
            </p>
          </div>
        </div>

        {/* Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 极速赛车开奖直播 结果  today幸运飞行艇官方开奖记录" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Our Mission</h3>
            <p className="text-gray-700 text-center">
              To provide innovative fire safety solutions that effectively protect lives and property while ensuring regulatory compliance and exceeding client expectations in quality and service.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Our Vision</h3>
            <p className="text-gray-700 text-center">
              To be recognized as the foremost fire safety solutions provider, setting industry standards in equipment quality, technical expertise, and comprehensive fire protection services.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety First</h3>
              <p className="text-gray-700">
                We prioritize human safety above all else, delivering solutions that provide maximum protection and peace of mind.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Reliability</h3>
              <p className="text-gray-700">
                We maintain the highest standards in equipment quality and service execution, ensuring systems perform when needed most.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expertise</h3>
              <p className="text-gray-700">
                Our team possesses deep technical knowledge and stays updated with the latest fire safety standards and technologies.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg shadow-md p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-blue-200">Projects Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <p className="text-blue-200">Years of Experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <p className="text-blue-200">Client Satisfaction</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <p className="text-blue-200">Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}