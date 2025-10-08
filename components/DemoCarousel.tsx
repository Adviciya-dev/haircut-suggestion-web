"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const demoImages = [
  "/buzz.webp",
  "/model.jpg",
  "/fade.webp",
  "/bruce-wayne.webp",
  "/long.webp",
  "/spike.webp",
];

export default function DemoCarousel() {
  const extendedImages = [...demoImages, ...demoImages, ...demoImages]; 

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-semibold text-gray-900 text-center mb-8">
          Explore Haircut Styles
        </h3>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{ x: ["0%", "-66.67%"] }} 
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop", 
              
            }}
            style={{ minWidth: "300%" }} 
          >
            {extendedImages.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="flex-shrink-0 w-[300px] h-[300px] relative"
              >
                <Image
                  src={src}
                  alt={`Demo haircut ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 300px"
                  priority={index < 3}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
