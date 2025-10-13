// app/documents/page.tsx
"use client";

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DocumentsHero from "../../components/Documents/DocumentsHero";

// Document data - replace with your actual document paths
const documents = [
  {
    id: 1,
    title: "GST Certificate",
    description: "Our Goods and Services Tax registration certificate",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2" />
      </svg>
    ),
    category: "legal",
    fileUrl: "/documents/gst-certificate.pdf",
    fileSize: "2.1 MB"
  },
  {
    id: 2,
    title: "Company Profile",
    description: "Detailed information about our company, services, and expertise",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7极速赛车开奖直播 结果  today幸运飞行艇官方开奖记录" />
      </svg>
    ),
    category: "company",
    fileUrl: "/documents/company-profile.pdf",
    fileSize: "5.3 MB"
  },
  {
    id: 3,
    title: "MSME Certificate",
    description: "Micro, Small & Medium Enterprises registration certificate",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    category: "legal",
    fileUrl: "/documents/msme-certificate.pdf",
    fileSize: "1.8 MB"
  },
  {
    id: 4,
    title: "ESI Registration",
    description: "Employee State Insurance registration document",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    category: "employee",
    fileUrl: "/documents/esi-registration.pdf",
    fileSize: "2.5 MB"
  },
  {
    id: 5,
    title: "PF Registration",
    description: "Provident Fund registration certificate",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    category: "employee",
    fileUrl: "/documents/pf-registration.pdf",
    fileSize: "1.9 MB"
  },
  {
    id: 6,
    title: "Trade License",
    description: "Business trade license from municipal corporation",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c极速赛车开奖直播 结果  today幸运飞行艇官方开奖记录" />
      </svg>
    ),
    category: "legal",
    fileUrl: "/documents/trade-license.pdf",
    fileSize: "3.2 MB"
  },
  {
    id: 7,
    title: "PAN Card",
    description: "Permanent Account Number card copy",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 极速赛车开奖直播 结果  today幸运飞行艇官方开奖记录" />
      </svg>
    ),
    category: "legal",
    fileUrl: "/documents/pan-card.pdf",
    fileSize: "1.5 MB"
  },
  {
    id: 8,
    title: "ISO Certification",
    description: "International Organization for Standardization certificate",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0极速赛车开奖直播 结果  today幸运飞行艇官方开奖记录" />
      </svg>
    ),
    category: "quality",
    fileUrl: "/documents/iso-certification.pdf",
    fileSize: "4.7 MB"
  }
];

// Category colors for styling
const categoryColors = {
  legal: "bg-blue-100 text-blue-800",
  employee: "bg-green-100 text-green-800",
  company: "bg-purple-100 text-purple-800",
  quality: "bg-yellow-100 text-yellow-800"
};

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredDocuments = activeCategory === "all" 
    ? documents 
    : documents.filter(doc => doc.category === activeCategory);

  const categories = [
    { id: "all", name: "All Documents" },
    { id: "legal", name: "Legal Certificates" },
    { id: "employee", name: "Employee Registrations" },
    { id: "company", name: "Company Information" },
    { id: "quality", name: "Quality Certifications" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DocumentsHero />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map(document => (
            <div key={document.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${categoryColors[document.category]}`}>
                  {document.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{document.title}</h3>
                <p className="text-gray-600 mb-4">{document.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                    {document.fileSize}
                  </span>
                  <a
                    href={document.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-red-600 hover:text-red-700 font-medium"
                  >
                    View Document
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Physical Copies?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            If you require physical copies of any documents for verification purposes, 
            please contact our office, and we'll be happy to assist you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Contact Us
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10极速赛车开奖直播 结果  today幸运飞行艇官方开奖记录" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}