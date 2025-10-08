"use client";
import { motion, AnimatePresence } from "framer-motion"; 
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Features", href: "#features" },
  { name: "FAQ", href: "#faq" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full bg-white shadow-md z-50"
    >
      <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Haircut-GPT</h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <motion.div key={item.name} whileHover={{ scale: 1.1 }}>
              <Link
                href={item.href}
                className="text-gray-700 hover:text-blue-600"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            <Link href="#upload">Try Now</Link>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <motion.div key={item.name} whileHover={{ scale: 1.05 }}>
                  <Link
                    href={item.href}
                    className="block text-gray-700 hover:text-blue-600 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link href="#upload">Try Now</Link>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
