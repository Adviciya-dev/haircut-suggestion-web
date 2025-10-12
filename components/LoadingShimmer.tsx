"use client";
import Image from "next/image";

interface LoadingShimmerProps {
  imageSrc?: string | null;
}

export default function LoadingShimmer({ imageSrc }: LoadingShimmerProps) {
  return (
    <div className="mt-6 flex justify-center">
      <div className="relative w-48 sm:w-64 h-36 sm:h-68 rounded-lg overflow-hidden bg-gray-800 shadow-md">
        {imageSrc && (
          <Image
            src={imageSrc}
            alt="Processing"
            fill
            className="object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="honeycomb">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes honeycomb {
          0%,
          20%,
          80%,
          100% {
            opacity: 0;
            transform: scale(0);
          }
          30%,
          70% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .honeycomb {
          height: 24px;
          position: relative;
          width: 24px;
        }
        .honeycomb div {
          animation: honeycomb 2.1s infinite backwards;
          background: #3b82f6; /* Blue-600 to match theme */
          height: 12px;
          margin-top: 6px;
          position: absolute;
          width: 24px;
        }
        .honeycomb div:after,
        .honeycomb div:before {
          content: "";
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          position: absolute;
          left: 0;
          right: 0;
        }
        .honeycomb div:after {
          top: -6px;
          border-bottom: 6px solid #3b82f6;
        }
        .honeycomb div:before {
          bottom: -6px;
          border-top: 6px solid #3b82f6;
        }
        .honeycomb div:nth-child(1) {
          animation-delay: 0s;
          left: -28px;
          top: 0;
        }
        .honeycomb div:nth-child(2) {
          animation-delay: 0.1s;
          left: -14px;
          top: 22px;
        }
        .honeycomb div:nth-child(3) {
          animation-delay: 0.2s;
          left: 14px;
          top: 22px;
        }
        .honeycomb div:nth-child(4) {
          animation-delay: 0.3s;
          left: 28px;
          top: 0;
        }
        .honeycomb div:nth-child(5) {
          animation-delay: 0.4s;
          left: 14px;
          top: -22px;
        }
        .honeycomb div:nth-child(6) {
          animation-delay: 0.5s;
          left: -14px;
          top: -22px;
        }
        .honeycomb div:nth-child(7) {
          animation-delay: 0.6s;
          left: 0;
          top: 0;
        }
      `}</style>
    </div>
  );
}
