"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { processStyleImage } from "@/lib/api";
import { validateImage } from "@/lib/utils";
import GeneratedImages from "../GeneratedImages";
import OutfitSelector from "./OutfitSelector";
import LoadingShimmer from "../LoadingShimmer";
import { User, UserPlus, Zap } from "lucide-react";

export default function UploadSection({
  uploadPrompt,
}: {
  uploadPrompt: string;
}) {
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [selectedOutfit, setSelectedOutfit] = useState<string | null>(null);
  const [outfits, setOutfits] = useState<string[]>([]);
  const [personFile, setPersonFile] = useState<File | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);


const handleGenderSelect = (selectedGender: "male" | "female") => {
  setGender(selectedGender);

  if (selectedGender === "male") {
    setOutfits([
      "/style-gpt/m-1.webp",
      "/style-gpt/m-2.webp",
      "/style-gpt/m-3.webp",
      "/style-gpt/m-4.webp",
      "/style-gpt/m-5.webp",
    ]);
  } else {
    setOutfits([
      "/style-gpt/f-1.webp",
      "/style-gpt/f-2.webp",
      "/style-gpt/f-3.webp",
      "/style-gpt/f-4.webp",
      "/style-gpt/f-5.webp",
    ]);
  }

  setStep(2);
  setError("");
};

  const handleOutfitSelect = (outfit: string) => {
    setSelectedOutfit(outfit);
    setStep(3);
  };

  const handlePersonFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateImage(file)) {
      setPersonFile(file);
      setError("");
    } else {
      setError("Please upload a valid portrait (JPEG, PNG, WEBP, <5MB).");
    }
  };

  const handleGenerate = async () => {
    if (!personFile || !selectedOutfit) return;
    setIsProcessing(true);
    setError("");

    try {
      const outfitResponse = await fetch(selectedOutfit);
      const outfitBlob = await outfitResponse.blob();
      const outfitFile = new File([outfitBlob], "outfit.jpg", {
        type: "image/jpeg",
      });

      const result = await processStyleImage(personFile, outfitFile);
      setGeneratedImage(result);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to generate outfit"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const resetFlow = () => {
    setStep(1);
    setGender(null);
    setSelectedOutfit(null);
    setPersonFile(null);
    setGeneratedImage("");
    setError("");
  };

  if (generatedImage) {
    return (
      <section className="py-12 sm:py-16 bg-black/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.button
            onClick={resetFlow}
            className="mb-6 text-pink-400 hover:text-pink-300 flex items-center justify-center mx-auto gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Zap size={20} /> Try Another Outfit
          </motion.button>
          <GeneratedImages images={[generatedImage]} isSingle={true} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 bg-black/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mx-2 ${
                  step >= s
                    ? "bg-pink-400 text-black"
                    : "bg-gray-700 text-gray-400"
                }`}
              >
                {s}
              </div>
            ))}
          </div>
          <p className="text-gray-300 text-base sm:text-lg">{uploadPrompt}</p>
        </div>

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 max-w-md mx-auto"
          >
            <h3 className="text-xl font-bold text-white">Select Gender</h3>
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                onClick={() => handleGenderSelect("male")}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <User size={48} className="text-blue-400 mb-2" />
                <span className="text-white font-medium">Male</span>
              </motion.button>
              <motion.button
                onClick={() => handleGenderSelect("female")}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                <UserPlus size={48} className="text-pink-400 mb-2" />
                <span className="text-white font-medium">Female</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 2 && gender && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <OutfitSelector
              gender={gender}
              selectedOutfit={selectedOutfit}
              outfits={outfits}
              onSelect={handleOutfitSelect}
            />
          </motion.div>
        )}

        {step === 3 && selectedOutfit && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4 max-w-md mx-auto"
          >
            <div className="p-4 bg-gray-800 rounded-lg">
              <Image
                src={selectedOutfit}
                alt="Selected Outfit"
                width={200}
                height={266}
                className="w-full max-w-[200px] mx-auto rounded"
              />
            </div>
            <p className="text-gray-300">Now upload your photo:</p>
            <input
              type="file"
              accept="image/*"
              onChange={handlePersonFileChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-700"
            />
            <motion.button
              onClick={handleGenerate}
              disabled={!personFile || isProcessing}
              whileHover={{ scale: 1.05 }}
              className="bg-pink-600 text-white px-6 py-2 rounded-full disabled:opacity-50 font-medium text-sm sm:text-base w-full"
            >
              {isProcessing ? "Generating Outfit..." : "Wear This Outfit"}
            </motion.button>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </motion.div>
        )}

        {isProcessing && (
          <LoadingShimmer
            imageSrc={personFile ? URL.createObjectURL(personFile) : null}
          />
        )}
      </div>
    </section>
  );
}
