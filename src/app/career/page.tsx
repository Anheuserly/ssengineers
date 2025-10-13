// app/career/page.tsx


import CareerHero from "../../components/Career/CareerHero";
import WhyWorkWithUs from "../../components/Career/WhyWorkWithUs";
import OpenPositions from "../../components/Career/OpenPositions";
import CareerBenefits from "../../components/Career/CareerBenefits";
import CareerCTA from "../../components/Career/CareerCTA";

export const metadata = {
  title: "Contact Us - ARC 11 ARCHITECT | Architectural Design Studio",
  description:
    "Get in touch with ARC 11 ARCHITECT. Let's discuss your architectural vision and transform it into reality with our innovative design solutions.",
  alternates: { canonical: "https://www.arc11architect.com/career" },
};

export default function CareerPage() {
  return (
    <div className="min-h-screen font-['Montserrat']">
      <CareerHero />
      <WhyWorkWithUs />
      <OpenPositions />
      <CareerBenefits />
      <CareerCTA />
    </div>
  );
}