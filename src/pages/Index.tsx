
import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/home/Hero";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import Features from "@/components/home/Features";
import CompanyShowcase from "@/components/home/CompanyShowcase";
import Testimonials from "@/components/home/Testimonials";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <FeaturedJobs />
      <CompanyShowcase />
      <Testimonials />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
