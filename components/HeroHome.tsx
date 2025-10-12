"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";
import SlideButton from "./buttons/SlideButton";
import GlowButton from "./buttons/GlowButton";

export default function HeroHome() {
  const particlesRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const lastCreationTime = useRef(0);

  const createRandomParticle = useCallback(() => {
    if (!particlesRef.current) return;
    const container = particlesRef.current;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const size = 8 + Math.random() * 12; 
    const duration = 4 + Math.random() * 6; 
    const driftX = (Math.random() - 0.5) * 20; 
    const driftY = (Math.random() - 0.5) * 20;
    const particle = document.createElement("div");
    particle.className = "floating-particle";
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.setProperty("--duration", `${duration}s`);
    particle.style.setProperty("--drift-x", `${driftX}px`);
    particle.style.setProperty("--drift-y", `${driftY}px`);
    container.appendChild(particle);
    setTimeout(() => {
      if (particle.parentNode) particle.remove();
    }, duration * 1000 + 1000);
  }, []);

  const createInteractiveParticle = useCallback((x: number, y: number) => {
    if (!particlesRef.current) return;
    const container = particlesRef.current;
    const size = 20 + Math.random() * 30;
    const duration = 2 + Math.random() * 3; 
    const driftX = (Math.random() - 0.5) * 40; 
    const driftY = (Math.random() - 0.5) * 40;
    const particle = document.createElement("div");
    particle.className = "interactive-particle";
    particle.style.left = `${x}%`;
    particle.style.top = `${y}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.setProperty("--duration", `${duration}s`);
    particle.style.setProperty("--drift-x", `${driftX}px`);
    particle.style.setProperty("--drift-y", `${driftY}px`);
    container.appendChild(particle);
    setTimeout(() => {
      if (particle.parentNode) particle.remove();
    }, duration * 1000 + 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(createRandomParticle, 4000); 
    return () => clearInterval(interval);
  }, [createRandomParticle]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const now = Date.now();
      if (now - lastCreationTime.current < 250) return; 
      lastCreationTime.current = now;
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      createInteractiveParticle(x, y);
    },
    [createInteractiveParticle]
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      onPointerMove={handlePointerMove}
    >
      {/* Parallax Background */}
      <div
        className="parallax-bg absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
        style={{ backgroundImage: "url('/futuristic-bg.jpg')" }}
      />

      {/* Floating Particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center max-w-4xl mx-auto w-full"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-blue-400 text-glow mb-4 sm:mb-6"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Futuris AI
        </motion.h1>
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Unleash the future of personal transformation with AI-powered tools
          for style, space, and speed.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Link href="/haircut-gpt">
            <GlowButton label="Transform Now" />
          </Link>
          <Link href="#features">
            <SlideButton label="Explore Features" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
