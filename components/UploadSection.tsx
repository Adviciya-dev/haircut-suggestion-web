"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { processImageWithAI } from "@/lib/api";
import { validateImage } from "@/lib/utils";
import LoadingShimmer from "@/components/LoadingShimmer";
import GeneratedImages from "@/components/GeneratedImages";

export default function UploadSection() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const revokeImageUrl = useCallback((url: string | null) => {
    if (url) {
      URL.revokeObjectURL(url);
    }
  }, []);

  useEffect(() => {
    return () => {
      revokeImageUrl(imageUrl);
    };
  }, [imageUrl, revokeImageUrl]);

  const handleDrop = useCallback(
    async (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0];
      if (validateImage(droppedFile)) {
        setError("");
        revokeImageUrl(imageUrl);
        const newImageUrl = URL.createObjectURL(droppedFile);
        setImageUrl(newImageUrl);
        setUploadedImage(newImageUrl);
        setIsLoading(true);
        try {
          const response = await processImageWithAI(droppedFile);
          setResults(response);
        } catch (err) {
          const errorMessage =
            err instanceof Error
              ? err.message
              : "Failed to process image. Please try again.";
          setError(errorMessage);
        }
        setIsLoading(false);
      } else {
        setError(
          "Invalid file format or size. Supported: JPEG, JPG, WEBP, PNG (max 5MB)."
        );
      }
    },
    [imageUrl, revokeImageUrl]
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateImage(selectedFile)) {
      setError("");
      revokeImageUrl(imageUrl);
      const newImageUrl = URL.createObjectURL(selectedFile);
      setImageUrl(newImageUrl);
      setUploadedImage(newImageUrl);
      setIsLoading(true);
      try {
        const response = await processImageWithAI(selectedFile);
        setResults(response);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to process image. Please try again.";
        setError(errorMessage);
      }
      setIsLoading(false);
    } else {
      setError(
        "Invalid file format or size. Supported: JPEG, JPG, WEBP, PNG (max 5MB)."
      );
    }
  };

  return (
    <section id="upload" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-3xl font-semibold text-gray-900">
          Upload Your Photo
        </h3>
        <p className="text-gray-600 mt-2">
          Supported formats: JPEG, JPG, WEBP, PNG (max 5MB)
        </p>
        <motion.div
          className={`mt-6 border-2 border-dashed border-gray-300 p-10 rounded-lg ${
            isDragging ? "bg-blue-50 border-blue-600" : ""
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <p className="text-gray-600">Drag & drop or click to upload</p>
          </label>
        </motion.div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {uploadedImage && !isLoading && (
          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Your Uploaded Photo
            </h4>
            <div className="relative w-64 h-48 mx-auto rounded-lg shadow-md overflow-hidden bg-gray-200">
              <Image
                src={uploadedImage}
                alt="Uploaded photo"
                fill
                className="object-contain"
                unoptimized={true}
              />
            </div>
          </div>
        )}
        {isLoading && <LoadingShimmer imageSrc={uploadedImage} />}
        {results.length > 0 && <GeneratedImages images={results} />}
      </div>
    </section>
  );
}