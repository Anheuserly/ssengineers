"use client";

import React from "react";
import Link from "next/link";

import ProjectsHero from "../../components/Projects/ProjectsHero";
import ProjectCard from "../../components/Projects/ProjectCard";

const projects = [
  { project_name: "ADANI CONNEX", client_name: "Adani Connex, Voltas Ltd.", location: "Delhi", scope_of_work: "Electrical, Fire protection, detection, plumbing", additional_details: "Data center safety & operational efficiency", image: null },
  { project_name: "ICC, Dwarka", client_name: "L&T Constructions", location: "Dwarka, Delhi", scope_of_work: "Electrical, Fire protection, plumbing installations", additional_details: "World-class exhibition and conference center", image: null },
  { project_name: "Commercial Building Okhla", client_name: "CAPFI", location: "Okhla, Delhi", scope_of_work: "Electrical, Fire detection, plumbing", additional_details: "Advanced safety systems", image: null },
  { project_name: "SSB Building Super", client_name: "IMSSB", location: "Delhi", scope_of_work: "Electrical, Fire protection, detection, hydrants", additional_details: "Residential fire safety infrastructure", image: null },
  { project_name: "HSCC Project", client_name: "HSCC (INDIA) LIMITED", location: "Delhi", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Healthcare facility safety & compliance", image: null },
  { project_name: "Hudda City Centre - DMRC", client_name: "Delhi Metro Rail Corporation", location: "Delhi", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Metro infrastructure safety", image: null },
  { project_name: "DLF HOTEL & Apartment", client_name: "DLF Project Ltd.", location: "Delhi", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Hospitality safety solutions", image: null },
  { project_name: "DLF Ltd. - DLF City", client_name: "DLF Ltd.", location: "Delhi", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "High-rise residential infrastructure", image: null },
  { project_name: "Mahagun Moderne", client_name: "Mahagun (INDIA) Pvt. Ltd.", location: "Delhi", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Residential project safety", image: null },
  { project_name: "Mahagun Mywood", client_name: "Mahagun (INDIA) Pvt. Ltd.", location: "Delhi", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Safety measures for residential development", image: null },
  { project_name: "200-Bedded Referral Hospital", client_name: "V3S Infratech", location: "Delhi", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Healthcare infrastructure", image: null },
  { project_name: "AIIMS Underground Parking", client_name: "V3S Infratech", location: "Delhi", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Safety compliance for public parking", image: null },
  { project_name: "AEPC", client_name: "Apparel Export Promotion Council", location: "Delhi", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Government project", image: null },
  { project_name: "ATDC Vocational Institute", client_name: "Apparel Export Promotion Council", location: "Noida", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Educational facility safety", image: null },
  { project_name: "Blue Bell Model School", client_name: "Blue Bells Group of Schools", location: "Gurgaon", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "School safety measures", image: null },
  { project_name: "Blue Bell Preparatory School", client_name: "Blue Bells Group of Schools", location: "Gurgaon", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Safety infrastructure for primary education", image: null },
  { project_name: "Blue Bell Public School", client_name: "Blue Bells Group of Schools", location: "Gurgaon", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Full-scale safety solutions", image: null },
  { project_name: "The Indian Express Building", client_name: "Indian Express Group", location: "Delhi", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Media house safety infrastructure", image: null },
  { project_name: "Hydra Power Station", client_name: "Hydra Power Station, Obra", location: "Sonbhadra, U.P.", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Energy sector infrastructure", image: null },
  { project_name: "S.N.S Hospital, Leh", client_name: "S.N.S Hospital", location: "Leh, Ladakh", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Healthcare infrastructure", image: null },
  { project_name: "Sir Ganga Ram Hospital", client_name: "Sir Ganga Ram Hospital", location: "Delhi", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Hospital fire safety", image: null },
  { project_name: "NBCC Building", client_name: "NBCC (INDIA) LIMITED", location: "Delhi", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Government infrastructure", image: null },
  { project_name: "Air Force Station Tuglakabad", client_name: "Air Force Station", location: "Delhi", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Military facility safety", image: null },
  { project_name: "F1-Info-Solution & Services", client_name: "Flipkart", location: "Delhi", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "E-commerce infrastructure", image: null },
  { project_name: "Kutub Hotel & Apartment", client_name: "Vadhera Builders", location: "Delhi", scope_of_work: "Electrical, Fire protection, plumbing", additional_details: "Hospitality infrastructure", image: null }
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectsHero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Our Project Portfolio</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive MEP projects across various sectors including healthcare, education, infrastructure, and commercial developments.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}