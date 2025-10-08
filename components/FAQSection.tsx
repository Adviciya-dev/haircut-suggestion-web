"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    question: "What file formats are supported?",
    answer: "We support JPEG, JPG, WEBP, and PNG formats.",
  },
  {
    question: "How long does it take to process?",
    answer: "Processing typically takes a few seconds.",
  },
  {
    question: "Is my photo secure?",
    answer: "Yes, your photos are processed securely and not stored.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h3 className="text-3xl font-semibold text-gray-900 text-center">
          Frequently Asked Questions
        </h3>
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                className="w-full text-left py-4 flex justify-between items-center"
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
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
                    <p className="text-gray-600 pb-4">{faq.answer}</p>
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
