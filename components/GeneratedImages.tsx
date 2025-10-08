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
    link.download = `hairstyle-${index + 1}.png`;
    link.click();
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    for (let i = 0; i < images.length; i++) {
      const response = await fetch(images[i]);
      const blob = await response.blob();
      zip.file(`hairstyle-${i + 1}.png`, blob);
    }
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "haircut-gpt-styles.zip");
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
    <div className="mt-6">
      <div className="flex justify-center mb-4">
        <button
          onClick={handleDownloadAll}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Download All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="relative w-[200px] h-[200px] rounded-lg overflow-hidden bg-gray-200">
              {!loadedImages[index] && (
                <div className="absolute inset-0 shine-overlay">
                  <div className="shine-effect" />
                </div>
              )}
              <Image
                src={src}
                alt={`Generated hairstyle ${index + 1}`}
                width={200}
                height={200}
                className={`rounded-lg transition-opacity duration-300 ${
                  loadedImages[index] ? "opacity-100" : "opacity-0"
                }`}
                onLoadingComplete={() => handleImageLoad(index)}
              />
            </div>
            <button
              onClick={() => handleDownload(src, index)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors w-full max-w-[200px]"
            >
              Download
            </button>
          </div>
        ))}
      </div>
      <style jsx>{`
        .shine-overlay {
          background-color: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .shine-effect {
          position: absolute;
          top: 0;
          left: -75%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 50%,
            transparent 100%
          );
          transform: skewX(-25deg);
          animation: shine 1.5s infinite ease-in-out;
        }
        @keyframes shine {
          0% {
            left: -75%;
          }
          100% {
            left: 125%;
          }
        }
      `}</style>
    </div>
  );
}