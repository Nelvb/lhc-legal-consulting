// src/frontend/app/page.tsx
import HeroSection from "@/components/Home/HeroSection";
import ValueProposition from "@/components/Home/ValueProposition";
import CompanyValues from "@/components/Home/CompanyValues";
import InvestorSupport from "@/components/Home/InvestorSupport";

InvestorSupport
export default function Home() {
  return (
    <main>
      <HeroSection />
      <ValueProposition />
      <InvestorSupport />
      <CompanyValues />
    </main>
  );
}
