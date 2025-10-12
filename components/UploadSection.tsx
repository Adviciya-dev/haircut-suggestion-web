"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  processHaircutImage,
  processIndoorImage,
  processVehicleImage,
} from "@/lib/api";
import { validateImage } from "@/lib/utils";
import GeneratedImages from "./GeneratedImages";
import LoadingShimmer from "./LoadingShimmer";

interface UploadSectionProps {
  uploadPrompt: string;
  apiFn: "processHaircutImage" | "processIndoorImage" | "processVehicleImage";
}

export default function UploadSection({
  uploadPrompt,
  apiFn,
}: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateImage(selectedFile)) {
      setFile(selectedFile);
      setError("");
    } else {
      setError("Please upload a valid image (JPEG, PNG, WEBP, <5MB).");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError("");
    try {
      let result: string[];
      switch (apiFn) {
        case "processHaircutImage":
          result = await processHaircutImage(file);
          break;
        case "processIndoorImage":
          result = await processIndoorImage(file);
          break;
        case "processVehicleImage":
          result = await processVehicleImage(file);
          break;
      }
      setImages(result);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-black/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto">
          {uploadPrompt}
        </p>
        <div className="space-y-4 max-w-md mx-auto">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          <motion.button
            onClick={handleUpload}
            disabled={!file || isProcessing}
            whileHover={{ scale: 1.05 }}
            className="bg-blue-600 text-white px-6 py-2 rounded-full disabled:opacity-50 font-medium text-sm sm:text-base"
          >
            {isProcessing ? "Processing..." : "Generate Variations"}
          </motion.button>
        </div>
        {error && (
          <p className="text-red-400 mt-4 text-sm sm:text-base">{error}</p>
        )}
        {isProcessing && (
          <LoadingShimmer imageSrc={file ? URL.createObjectURL(file) : null} />
        )}
        {images.length > 0 && <GeneratedImages images={images} />}
      </div>
    </section>
  );
}
