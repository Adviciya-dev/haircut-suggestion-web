"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "lucide-react";

interface OutfitSelectorProps {
  gender: "male" | "female" | null;
  selectedOutfit: string | null;
  outfits: string[];
  onSelect: (outfit: string) => void;
}

export default function OutfitSelector({
  gender,
  selectedOutfit,
  outfits,
  onSelect,
}: OutfitSelectorProps) {
  if (!gender) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-center mb-8 text-pink-400"
      >
        Choose Your Style
      </motion.h3>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        {outfits.map((outfit, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`relative rounded-lg overflow-hidden bg-gray-800 cursor-pointer group ${
              selectedOutfit === outfit ? "ring-2 ring-pink-400" : ""
            }`}
            onClick={() => onSelect(outfit)}
          >
            <Image
              src={outfit}
              alt={`Outfit ${index + 1}`}
              width={150}
              height={200}
              className="w-full h-48 object-cover group-hover:brightness-110 transition-all"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
            {selectedOutfit === outfit && (
              <User
                className="absolute top-2 right-2 text-pink-400"
                size={20}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
