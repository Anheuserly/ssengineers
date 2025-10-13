"use client";
import React from "react";
import Script from "next/script";

export default function SEO() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SHREE GANESHE ENTERPRISES",
    url: "https://www.asge.org.in",
    image: "https://www.asge.org.in/amcmep-icon.png",
    logo: "https://www.asge.org.in/amcmep-icon.png",
    telephone: "+91-9871936847",
    email: "anilkumarsaini0507@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "House No. 535, Second Floor, Left Side, Khasra No. 60, 128-D21, Chattarpur Pahadi",
      addressLocality: "New Delhi",
      postalCode: "110074",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.5068707,
      longitude: 77.1847125,
    },
    founder: {
      "@type": "Person",
      name: "A. K. Saini",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9871936847",
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    hasPart: [
      { "@type": "WebPage", url: "https://www.asge.org.in/about", name: "About Us" },
      { "@type": "WebPage", url: "https://www.asge.org.in/contact", name: "Contact Us" },
      { "@type": "WebPage", url: "https://www.asge.org.in/portfolio", name: "Portfolio" },
      { "@type": "WebPage", url: "https://www.asge.org.in/blog", name: "Blog" },
      { "@type": "WebPage", url: "https://www.asge.org.in/journal", name: "Journal" },
      { "@type": "WebPage", url: "https://www.asge.org.in/services", name: "Services" },
    ],
    sameAs: [
      "https://www.facebook.com/shreeganesheenterprises",
      "https://www.linkedin.com/company/shreeganesheenterprises ",
      "https://www.google.com/maps/place/Shree+Ganesh+Enterprises/@28.5068754,77.1821376,17z",
    ],
    seserviceType: [
      "Fire Fighting Systems",
      "Detection Systems",
      "Electrical Work",
      "Plumbing Solutions",
      "AMC (Annual Maintenance Contracts)",
      "Separation Systems",
      "Security Systems",
      "IT Solutions",
      "AutoCAD Services"
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does SHREE GANESHE ENTERPRISES provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide comprehensive fire safety solutions including fire fighting systems, detection systems, electrical work, plumbing solutions, AMC services, and security systems across Delhi NCR.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide maintenance contracts for fire safety systems?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, SHREE GANESHE ENTERPRISES provides Annual Maintenance Contracts (AMC) for all types of fire safety and security systems.",
        },
      },
      {
        "@type": "Question",
        name: "Where are you located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We are based in New Delhi and serve clients across the Delhi NCR region.",
        },
      },
    ],
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SHREE GANESHE ENTERPRISES",
    url: "https://www.sge.org.in",
    logo: "https://www.sge.org.in/amcmep-icon.png",
    sameAs: [
      "https://www.facebook.com/shreeganesheenterprises",
      "https://www.linkedin.com/company/shreeganesheenterprises",
    ],
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.sge.org.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://www.sge.org.in/about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Contact",
        item: "https://www.sge.org.in/contact",
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Fire Safety Systems & Electrical Solutions",
    provider: {
      "@type": "LocalBusiness",
      name: "SHREE GANESHE ENTERPRISES",
      url: "https://www.sge.org.in",
    },
    areaServed: {
      "@type": "Place",
      name: "Delhi NCR, India",
    },
    offers: {
      "@type": "Offer",
      url: "https://www.sge.org.in/services",
      priceCurrency: "INR",
      price: "Consultation-based",
      availability: "https://schema.org/InStock",
    },
  };


  return (
    <>
      <Script
        id="ld-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <Script
        id="ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="ld-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <Script
        id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
      <Script
        id="ld-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
