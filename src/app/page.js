import HeroSection from "../components/Home/HeroSection";
import ServicesSection from "../components/Home/ServicesSection";
import AboutSection from "../components/Home/AboutSection";
import StatsSection from "../components/Home/StatsSection";
import TestimonialsSection from "../components/Home/TestimonialsSection";
import ProjectsSection from "../components/Home/ProjectsSection";
import ProcessSection from "../components/Home/ProcessSection";
import CertificationsSection from "../components/Home/CertificationsSection";
import CTASection from "../components/Home/CTASection";

export default function HomePage() {
  return (
    <div className="min-h-screen font-['Montserrat']">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <StatsSection />
      <ProcessSection />
      <ProjectsSection />
      <CertificationsSection />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}