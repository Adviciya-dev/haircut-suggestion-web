import Header from "@/components/Header";
import HeroHome from "@/components/HeroHome";
import FeaturesShowcase from "@/components/FeaturesShowcase";
import DemoSection from "@/components/DemoSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <HeroHome />
      <FeaturesShowcase />
      <DemoSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
