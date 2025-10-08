import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UploadSection from "@/components/UploadSection";
import AllowedImages from "@/components/AllowedImages";
import FeaturesSection from "@/components/FeaturesSection";
import DemoCarousel from "@/components/DemoCarousel";
import FAQSection from "@/components/FAQSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <UploadSection />
      <AllowedImages />
      <FeaturesSection />
      <DemoCarousel />
      <FAQSection />
    </main>
  );
}
