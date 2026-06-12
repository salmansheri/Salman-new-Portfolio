"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import portfolioData from "@/data/portfolio.json";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Animate cards on scroll
      gsap.fromTo(
        leftCardRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: leftCardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        rightCardRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rightCardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="max-w-7xl mx-auto px-4 py-8 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-bento-gap">
        {/* Engineering Philosophy Card */}
        <div
          ref={leftCardRef}
          className="md:col-span-8 glass-card p-8 md:p-12 rounded-xl flex flex-col justify-center"
        >
          <h2 className="font-body text-xl md:text-2xl font-bold text-primary-fixed uppercase tracking-wider mb-6">
            Engineering Philosophy
          </h2>
          <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed">
            {portfolioData.personal.philosophy}
          </p>
        </div>

        {/* Stats Card */}
        <div
          ref={rightCardRef}
          className="md:col-span-4 glass-card p-8 md:p-12 rounded-xl flex flex-col items-center justify-center text-center"
        >
          <div className="text-primary-fixed font-body text-5xl md:text-6xl font-extrabold mb-1">
            {portfolioData.personal.stats.experience}
          </div>
          <div className="font-body text-xs font-semibold text-on-surface-variant tracking-wider uppercase">
            Years of Experience
          </div>
          <div className="w-16 h-[2px] bg-primary-fixed/20 my-6"></div>
          <div className="text-primary-fixed font-body text-5xl md:text-6xl font-extrabold mb-1">
            {portfolioData.personal.stats.commits}
          </div>
          <div className="font-body text-xs font-semibold text-on-surface-variant tracking-wider uppercase">
            Commits This Month
          </div>
        </div>
      </div>
    </section>
  );
}
