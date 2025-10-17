"use client";
import Header from "../Header";
import UploadSection from "./UploadSection";
import DemoCarousel from "../DemoCarousel";
import Footer from "../Footer";

interface StyleGptWrapperProps {
  title: string;
  description: string;
  uploadPrompt: string;
  demos: string[];
}

export default function StyleGptWrapper({
  title,
  description,
  uploadPrompt,
  demos,
}: StyleGptWrapperProps) {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <section className="pt-24 sm:pt-28 lg:pt-32 pb-12 flex items-center justify-center bg-gradient-to-br from-black to-gray-900">
        <div className="text-center max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-pink-400 text-glow mb-4">
            {title}
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </section>
      <UploadSection uploadPrompt={uploadPrompt} />
      <DemoCarousel title={`${title} Demos`} images={demos} />
      <Footer />
    </div>
  );
}
