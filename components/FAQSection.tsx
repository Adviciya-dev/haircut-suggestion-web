"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "What file formats are supported?",
    answer: "JPEG, JPG, WEBP, PNG.",
  },
  { question: "How long does processing take?", answer: "A few seconds." },
  {
    question: "Is my data secure?",
    answer: "Yes, processed securely, not stored.",
  },
  {
    question: "Can I use it on mobile?",
    answer: "Fully responsive for all devices.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-black/50">
      <div className="max-w-4xl mx-auto px-4">
        <h3 className="text-3xl font-semibold text-center mb-10 text-blue-400 text-glow">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-800">
              <button
                className="w-full text-left py-4 flex justify-between items-center text-gray-300"
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <span>{activeIndex === index ? "-" : "+"}</span>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-400 pb-4">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
