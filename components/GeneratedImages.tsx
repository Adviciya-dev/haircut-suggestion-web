"use client";
import Image from "next/image";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useState } from "react";

interface GeneratedImagesProps {
  images: string[];
}

export default function GeneratedImages({ images }: GeneratedImagesProps) {
  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    images.map(() => false)
  );

  const handleDownload = (url: string, index: number) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `variation-${index + 1}.png`;
    link.click();
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    for (let i = 0; i < images.length; i++) {
      const response = await fetch(images[i]);
      const blob = await response.blob();
      zip.file(`variation-${i + 1}.png`, blob);
    }
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "ai-variations.zip");
    });
  };

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => {
      const newLoaded = [...prev];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center mb-6">
        <button
          onClick={handleDownloadAll}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium text-sm sm:text-base hover:bg-blue-700 transition-colors"
        >
          Download All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {images.map((src, index) => (
          <div key={index} className="flex flex-col items-center space-y-3">
            <div className="relative w-full max-w-[200px] aspect-square rounded-lg overflow-hidden bg-gray-800 shadow-md">
              <Image
                src={src}
                alt={`Generated ${index + 1}`}
                width={200}
                height={200}
                className="w-full h-full object-cover rounded-lg transition-opacity duration-300"
                onLoadingComplete={() => handleImageLoad(index)}
              />
            </div>
            <button
              onClick={() => handleDownload(src, index)}
              className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors w-full max-w-[200px]"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
