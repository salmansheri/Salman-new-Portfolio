"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRef } from "react";
import portfolioData from "@/data/portfolio.json";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Title slide-up
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );

      // Grid items reveal
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
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
      id="projects"
      ref={containerRef}
      className="max-w-7xl mx-auto px-4 py-8 space-y-8 overflow-hidden"
    >
      <h2
        ref={titleRef}
        className="font-body text-xl md:text-2xl font-bold text-primary-fixed uppercase tracking-wider text-center md:text-left border-b border-foreground/5 dark:border-white/5 pb-4"
      >
        Selected Works
      </h2>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-bento-gap"
      >
        {portfolioData.projects.map((project) => (
          <div
            key={project.title}
            className="glass-card group rounded-xl overflow-hidden flex flex-col justify-between"
          >
            {/* Image section */}
            <div className="h-64 bg-surface-container relative overflow-hidden select-none">
              {/* biome-ignore lint/performance/noImgElement: External mockup URL */}
              <img
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                src={project.image}
                alt={project.alt}
                loading="lazy"
              />
              {/* Bottom overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-85"></div>
              {/* Badge Tag */}
              <div className="absolute top-4 left-4">
                <span className="bg-background/80 dark:bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full text-[10px] font-bold text-primary-fixed border border-primary-fixed/20 shadow-lg select-none">
                  {project.tag}
                </span>
              </div>
            </div>

            {/* Description section */}
            <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-body text-xl md:text-2xl font-bold text-primary-fixed tracking-tight uppercase">
                  {project.title}
                </h3>
                <p className="text-on-surface-variant font-body text-sm md:text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Action trigger */}
              <div className="pt-4">
                <Link
                  href={project.link}
                  className="inline-flex items-center gap-2 text-primary-fixed font-code text-xs font-semibold uppercase tracking-wider transition-all duration-300 group-hover:gap-4 hover:text-primary-fixed-dim"
                >
                  View Details{" "}
                  <span className="material-symbols-outlined text-sm select-none transition-transform duration-300 group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
