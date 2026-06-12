"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import portfolioData from "@/data/portfolio.json";

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );

      // Cards stagger animation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="max-w-7xl mx-auto px-4 py-8 space-y-6 overflow-hidden"
    >
      {/* Title & Meta */}
      <div
        ref={headerRef}
        className="flex justify-between items-end border-b border-foreground/5 dark:border-white/5 pb-4"
      >
        <h2 className="font-body text-xl md:text-2xl font-bold text-primary-fixed uppercase tracking-wider">
          Technical Arsenal
        </h2>
        <span className="font-code text-xs text-on-surface-variant font-semibold uppercase tracking-widest">
          LATEST STACK
        </span>
      </div>

      {/* Cards Grid */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-bento-gap"
      >
        {/* Languages */}
        <div className="glass-card p-8 rounded-xl space-y-6">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary-fixed select-none text-2xl">
              code
            </span>
            <h3 className="font-body text-lg font-bold text-foreground">
              Languages
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {portfolioData.skills.languages.map((lang) => (
              <span
                key={lang}
                className="skill-tag px-3 py-1.5 rounded text-xs font-medium tracking-wide uppercase transition-all duration-300 hover:scale-105 hover:bg-primary-fixed/10"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Frameworks */}
        <div className="glass-card p-8 rounded-xl space-y-6">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary-fixed select-none text-2xl">
              layers
            </span>
            <h3 className="font-body text-lg font-bold text-foreground">
              Frameworks
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {portfolioData.skills.frameworks.map((fw) => (
              <span
                key={fw}
                className="skill-tag px-3 py-1.5 rounded text-xs font-medium tracking-wide uppercase transition-all duration-300 hover:scale-105 hover:bg-primary-fixed/10"
              >
                {fw}
              </span>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="glass-card p-8 rounded-xl space-y-6">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-primary-fixed select-none text-2xl">
              construction
            </span>
            <h3 className="font-body text-lg font-bold text-foreground">
              Tools
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {portfolioData.skills.tools.map((tool) => (
              <span
                key={tool}
                className="skill-tag px-3 py-1.5 rounded text-xs font-medium tracking-wide uppercase transition-all duration-300 hover:scale-105 hover:bg-primary-fixed/10"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
