"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface LoadingShimmerProps {
  imageSrc?: string | null;
}

export default function LoadingShimmer({ imageSrc }: LoadingShimmerProps) {
  return (
    <div className="mt-6 flex justify-center">
      {imageSrc ? (
        <div className="relative w-64 h-48 rounded-lg overflow-hidden bg-gray-200 shadow-md">
          <Image
            src={imageSrc}
            alt="Processing your photo"
            fill
            className="object-contain"
            unoptimized={true}
          />
          <div className="absolute inset-0 shine-overlay">
            <div className="shine-effect" />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <p className="text-white font-medium">Processing...</p>
          </div>
        </div>
      ) : (
        <motion.div
          className="w-64 h-48 bg-gray-200 rounded-lg relative overflow-hidden shadow-md"
          animate={{
            background: [
              "linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)",
              "linear-gradient(90deg, #f3f4f6 0%, #ffffff 50%, #f3f4f6 100%)",
              "linear-gradient(90deg, #e5e7eb 0%, #f3f4f6 50%, #e5e7eb 100%)",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600">
            Processing...
          </p>
        </motion.div>
      )}
      <style jsx>{`
        .shine-overlay {
          pointer-events: none;
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
            rgba(255, 255, 255, 0.8) 50%,
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