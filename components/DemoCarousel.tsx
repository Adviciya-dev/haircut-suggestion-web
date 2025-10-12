"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface DemoCarouselProps {
  title: string;
  images: string[];
}

export default function DemoCarousel({ title, images }: DemoCarouselProps) {
  const extendedImages = [...images, ...images];

  return (
    <section className="py-20 bg-black/50">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center mb-8 text-blue-400 text-glow">
          {title}
        </h3>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: "200%" }}
          >
            {extendedImages.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className="flex-shrink-0 w-80 h-80 relative"
              >
                <Image
                  src={src}
                  alt={`Demo ${index + 1}`}
                  fill
                  className="object-cover rounded-lg futuristic-glow"
                  sizes="320px"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
