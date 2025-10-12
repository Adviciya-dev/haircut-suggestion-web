"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import GlowButton from "../components/buttons/GlowButton";

const demoPairs = [
  { before: "/home-demo/haricut-1.webp", after: "/home-demo/haricut-2.webp" },
  { before: "/home-demo/indoor-1.webp", after: "/home-demo/indoor-2.webp" },
];

export default function DemoSection() {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isTransforming, setIsTransforming] = useState(false);
  const [isAfterImage, setIsAfterImage] = useState([false, false]); 

  const handleTap = (index: number) => {
    if (isTransforming || isAfterImage[index]) return;
    setIsTransforming(true);
    setActiveDemo(index);
    setIsAfterImage((prev) => {
      const newState = [...prev];
      newState[index] = true; 
      return newState;
    });
    setTimeout(() => setIsTransforming(false), 1000); 
  };

  const handleReset = (index: number) => {
    if (isTransforming) return;
    setIsTransforming(true);
    setActiveDemo(index);
    setIsAfterImage((prev) => {
      const newState = [...prev];
      newState[index] = false; 
      return newState;
    });
    setTimeout(() => setIsTransforming(false), 1000);
  };

  return (
    <section
      id="demo"
      className="py-16 bg-gradient-to-b from-black/80 to-black/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h3
          className="text-3xl font-bold text-center mb-12 text-blue-400 text-glow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          See the Magic
        </motion.h3>
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-4xl">
            {demoPairs.map((pair, index) => (
              <div key={index} className="flex-1">
                <motion.button
                  onClick={() => handleTap(index)}
                  className="relative magic-sparkle w-full"
                  whileHover={{ scale: 1.02 }}
                  disabled={isTransforming || isAfterImage[index]}
                >
                  <div className="relative w-full aspect-[4/3] max-w-[360px] mx-auto bg-gray-800 rounded-xl overflow-hidden cursor-pointer shadow-xl">
                    <Image
                      src={isAfterImage[index] ? pair.after : pair.before} 
                      alt={`Demo ${index + 1}`}
                      fill
                      className="object-cover transition-opacity duration-500 hover:brightness-110"
                    />
                    {isTransforming && activeDemo === index && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="scanner-effect" />
                      </motion.div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-30 pointer-events-none" />
                  </div>
                </motion.button>
                {isAfterImage[index] && (
                  <div className="mt-4 flex justify-center">
                    <GlowButton
                      label="Reset"
                      onClick={() => handleReset(index)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <motion.div
            className="text-center mt-8 lg:mt-0 lg:ml-8 w-full lg:w-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300 text-base font-medium mb-2">
              Tap to witness AI transformation
            </p>
            <p className="text-sm text-gray-400">
              Experience stunning Before → After results powered by our advanced
              GPTs.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
