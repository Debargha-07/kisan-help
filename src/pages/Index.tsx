
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeatureSection from "@/components/home/FeatureSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-12 py-6">
        <HeroSection />
        <FeatureSection />
        <HowItWorksSection />
        <TestimonialSection />
        <CTASection />
      </div>
    </Layout>
  );
};

export default Index;
