"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-[50vh] flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      {" "}
      {/* Shortened to 50vh */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-5xl font-bold text-gray-900">AI Barber</h2>
        <p className="text-2xl text-gray-600 mt-4">Try Your Best AI Haircut</p>
      </motion.div>
    </section>
  );
}
