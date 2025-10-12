"use client";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Lock, X } from "lucide-react";
import { useState } from "react";

interface Feature {
  title: string;
  description: string;
  image: string;
  href: string;
  active: boolean;
}

const features: Feature[] = [
  {
    title: "Haircut-GPT",
    description: "AI-generated hairstyles tailored to your face.",
    image: "/feature-section/barber-ai.webp",
    href: "/haircut-gpt",
    active: true,
  },
  {
    title: "Dreamspace-GPT",
    description: "Smart redesigns for your living spaces.",
    image: "/feature-section/dream-space.webp",
    href: "/dreamspace-gpt",
    active: true,
  },
  {
    title: "AutoMod-GPT",
    description: "Subtle upgrades for your vehicles.",
    image: "/feature-section/automod-ai.webp",
    href: "/automod-gpt",
    active: true,
  },
  {
    title: "Tattoo-GPT",
    description: "Personalized body art designs that fit your style.",
    image: "/feature-section/tatoo-ai.webp",
    href: "#",
    active: false,
  },
  {
    title: "Style-GPT",
    description: "AI-curated outfits for any occasion.",
    image: "/feature-section/ai-outfit.webp",
    href: "#",
    active: false,
  },
];

export default function FeaturesShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  const handleOpenModal = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section id="features" className="py-20 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h3
          className="text-3xl sm:text-4xl font-bold text-center mb-16 text-blue-400 text-glow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Our AI Transformers
        </motion.h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
                !feature.active ? "grayscale opacity-70" : ""
              }`}
              whileHover={
                feature.active ? { scale: 1.05, rotateY: 5 } : { scale: 1.02 }
              }
            >
              {!feature.active && (
                <Lock
                  className="absolute top-4 right-4 z-10 text-white/70"
                  size={24}
                />
              )}
              <Link
                href={feature.href}
                onClick={
                  !feature.active
                    ? (e) => {
                        e.preventDefault();
                        handleOpenModal(feature);
                      }
                    : undefined
                }
              >
                <div className="feature-image h-48 relative bg-gradient-to-br from-gray-800 to-gray-900">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h4 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                    {feature.title}
                  </h4>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative bg-black/80 border border-blue-400 rounded-lg max-w-md w-full mx-auto backdrop-blur-sm text-center p-6 sm:p-8"
                initial={{ scale: 0.9, opacity: 0, rotateY: -10 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{
                  scale: 0.9,
                  opacity: 0,
                  rotateY: 10,
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 text-white/70 hover:text-blue-400 transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="flex flex-col items-center justify-center">
                  <Lock className="text-blue-400 mb-4" size={48} />
                  <h4 className="text-2xl sm:text-3xl font-bold mb-2 text-blue-400 text-glow">
                    {selectedFeature?.title}
                  </h4>
                  <p className="text-lg text-white/80 mb-6">Coming Soon</p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
