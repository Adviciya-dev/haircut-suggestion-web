"use client";
import { motion } from "framer-motion";

const features = [
  {
    title: "Secure",
    description: "Your photos are processed securely and never stored.",
  },
  { title: "Fast", description: "Get your hairstyle variations in seconds." },
  {
    title: "User-Friendly",
    description: "Simple and intuitive interface for everyone.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-3xl font-semibold text-gray-900">
          Why Choose Haircut-GPT?
        </h3>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="p-6 bg-white rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h4>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
