"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import FuturisticButton from "./buttons/FuturisticButton";

const navItems = [
  { name: "Features", href: "/#features" },
  { name: "Demo", href: "/#demo" },
  { name: "FAQ", href: "/#faq" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full bg-black/80 backdrop-blur-md shadow-lg z-50"
    >
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-400 ">
          Futuris AI
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <motion.div key={item.name} whileHover={{ scale: 1.1 }}>
              <Link
                href={item.href}
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <FuturisticButton label="Start Transforming" href="/#features" />
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/90 border-t border-gray-800"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                  <Link
                    href={item.href}
                    className="block text-gray-300 hover:text-blue-400 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <FuturisticButton
                label="Start Transforming"
                href="/#features"
                isMobile
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
