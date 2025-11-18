"use client";
import React from "react";
import Script from "next/script";

export default function SEO() {
  const companyName = "SS Engineers & Consultants";
  const canonicalUrl = "https://www.ssengineers.in";
  const logoUrl = "https://www.ssengineers.in/logo.png"; // update if needed

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",

    name: companyName,
    url: canonicalUrl,
    logo: logoUrl,
    image: logoUrl,

    telephone: "+91-9871936847",
    email: "anil@ssengineers.in",

    address: {
      "@type": "PostalAddress",
      streetAddress: "A-45 Industrial Area",
      addressLocality: "Gurgaon",
      addressRegion: "Haryana",
      postalCode: "122001",
      addressCountry: "IN",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: 28.4595,
      longitude: 77.0266,
    },

    founder: {
      "@type": "Person",
      name: "Poonam Saini",
    },

    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9871936847",
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],

    hasPart: [
      { "@type": "WebPage", url: `${canonicalUrl}/about`, name: "About Us" },
      { "@type": "WebPage", url: `${canonicalUrl}/contact`, name: "Contact Us" },
      { "@type": "WebPage", url: `${canonicalUrl}/projects`, name: "Projects" },
      { "@type": "WebPage", url: `${canonicalUrl}/services`, name: "Services" },
      { "@type": "WebPage", url: `${canonicalUrl}/career`, name: "Careers" },
      { "@type": "WebPage", url: `${canonicalUrl}/journal`, name: "Journal" },
    ],

    // --------------------------------------------------------
    //               COMPLETE ECOSYSTEM SAMEAS
    // --------------------------------------------------------
    sameAs: [
      // SS Engineers (main)
      "https://www.facebook.com/ssengineers",
      "https://www.linkedin.com/company/ssengineers",
      canonicalUrl,

      // SGE Group
      "https://www.sge.org.in/",
      "https://www.facebook.com/profile.php?id=61566464961902",
      "https://www.instagram.com/_sgemep/",
      "https://www.linkedin.com/in/shree-ganesh-enterprises-1385b5271/",
      "https://www.youtube.com/@sgemep",
      "https://x.com/_sgemep",

      // Owner YouTube Channel
      "https://www.youtube.com/@purevegsatvikrasoi06",

      // AMC-MEP Group
      "https://x.com/amcmep24x7",
      "https://www.instagram.com/amcmep247",
      "https://www.linkedin.com/in/amc-mep-b53b68391",
      "https://www.facebook.com/profile.php?id=61583370617483",

      // Mobile Apps
      "https://play.google.com/store/apps/details?id=com.mepsge.amcsge",
      "https://play.google.com/store/apps/details?id=com.mepsge.amcsgepartner.amcsgepartner",

      // Communication Platforms
      "https://wa.me/919871936847",
      "https://t.me/+HJbJBvfbGyMxMzI1",
      "https://discord.gg/hp5Z6ddTNy",

      // Other Company Domains
      "https://www.amcmep.in/",
      "https://www.arcelevenarchitect.com/",

      // Arc Eleven Architects
      "https://www.linkedin.com/in/ar-shashank-saini-a0830b19b",
      "https://www.facebook.com/profile.php?id=61578009358525",
      "https://koloapp.in/delhi/architects/shashank-saini--delhi",
      "https://www.instagram.com/arc11studio_/",
    ],

    service: [
      "MEP Consulting",
      "Fire Fighting Systems",
      "Detection Systems",
      "Electrical Contracting",
      "Plumbing Solutions",
      "AMC Maintenance Services",
      "Security Surveillance Setup",
      "IT & Automation Solutions",
      "AutoCAD Drafting Services",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does SS Engineers & Consultants provide?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We provide MEP consulting, fire fighting systems, electrical contracting, HVAC solutions, AMC services, and complete industrial engineering solutions.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide AMC maintenance services?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes, we provide Annual Maintenance Contracts (AMC) for fire systems, electrical panels, pumps, CCTV, and industrial infrastructure.",
        },
      },
      {
        "@type": "Question",
        name: "Which areas do you serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We serve Delhi NCR, Gurgaon, Noida, Faridabad, and all industrial zones across North India.",
        },
      },
    ],
  };

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyName,
    url: canonicalUrl,
    logo: logoUrl,
    sameAs: [
      // SS Engineers
      "https://www.facebook.com/ssengineers",
      "https://www.linkedin.com/company/ssengineers",

      // Ecosystem domains
      "https://www.sge.org.in/",
      "https://www.amcmep.in/",
      "https://www.arcelevenarchitect.com/",

      // Owner YouTube
      "https://www.youtube.com/@purevegsatvikrasoi06"
    ],
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: canonicalUrl },
      { "@type": "ListItem", position: 2, name: "About", item: `${canonicalUrl}/about` },
      { "@type": "ListItem", position: 3, name: "Contact", item: `${canonicalUrl}/contact` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Engineering, MEP & Industrial Solutions",
    provider: {
      "@type": "LocalBusiness",
      name: companyName,
      url: canonicalUrl,
    },
    areaServed: {
      "@type": "Place",
      name: "Delhi NCR, India",
    },
    offers: {
      "@type": "Offer",
      url: `${canonicalUrl}/services`,
      priceCurrency: "INR",
      price: "Based on project requirements",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <Script id="ld-localbusiness" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Script id="ld-organization" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <Script id="ld-breadcrumb" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
      <Script id="ld-service" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </>
  );
}
