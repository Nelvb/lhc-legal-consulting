// src/frontend/app/page.tsx
import HeroSection from "@/components/Home/HeroSection";
import ValueProposition from "@/components/Home/ValueProposition";
import CompanyValues from "@/components/Home/CompanyValues";
import InvestmentProcess from "@/components/Home/InvestmentProcess";
import InvestorSupport from "@/components/Home/InvestorSupport";
import ActiveProjects from "@/components/Home/ActiveProjects";
import ContactCTA from "@/components/Home/ContactCTA";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ValueProposition />
      <InvestorSupport />
      <CompanyValues />
      <InvestmentProcess />
      <ActiveProjects />
      <ContactCTA />
    </main>
  );
}