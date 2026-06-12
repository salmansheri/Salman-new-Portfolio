"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import portfolioData from "@/data/portfolio.json";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const avatarContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.3 },
      )
        .fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=0.6",
        )
        .fromTo(
          descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.7",
        )
        .fromTo(
          socialsRef.current?.children || [],
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.15 },
          "-=0.5",
        )
        .fromTo(
          avatarContainerRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.75)" },
          "-=0.8",
        );
    },
    { scope: containerRef },
  );

  // Magnetic hover effect for social links
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(target, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <section
      ref={containerRef}
      className="flex flex-col md:flex-row items-center justify-between gap-12 py-16 md:py-24 max-w-7xl mx-auto px-4 overflow-hidden"
    >
      {/* Left: Headline & Text */}
      <div className="flex-1 space-y-6 text-center md:text-left z-10">
        <div
          ref={badgeRef}
          className="inline-block px-4 py-1.5 rounded-full bg-primary-fixed/10 border border-primary-fixed/20 text-primary-fixed font-code text-xs font-semibold uppercase tracking-wider select-none"
        >
          AVAILABLE FOR COLLABORATION
        </div>
        <h1
          ref={titleRef}
          className="font-body text-4xl sm:text-5xl lg:text-7xl font-extrabold text-foreground leading-none tracking-tight uppercase"
        >
          HELLO, I'M <br />
          <span className="text-primary-fixed">
            {portfolioData.personal.name}
          </span>
        </h1>
        <p
          ref={descRef}
          className="font-body text-lg text-on-surface-variant max-w-xl leading-relaxed"
        >
          {portfolioData.personal.tagline}
        </p>

        {/* Social Links */}
        <div
          ref={socialsRef}
          className="flex gap-6 justify-center md:justify-start pt-4"
        >
          <a
            className="w-12 h-12 rounded-full border border-foreground/10 dark:border-white/10 flex items-center justify-center text-primary-fixed hover:text-primary-container hover:border-primary-fixed hover:bg-primary-fixed/5 transition-colors duration-300 shadow-[0_0_15px_rgba(0,0,0,0.05)]"
            href={portfolioData.personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            aria-label="GitHub Profile"
          >
            <span className="material-symbols-outlined select-none text-[22px]">
              terminal
            </span>
          </a>
          <a
            className="w-12 h-12 rounded-full border border-foreground/10 dark:border-white/10 flex items-center justify-center text-primary-fixed hover:text-primary-container hover:border-primary-fixed hover:bg-primary-fixed/5 transition-colors duration-300 shadow-[0_0_15px_rgba(0,0,0,0.05)]"
            href={portfolioData.personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            aria-label="LinkedIn Profile"
          >
            <span className="material-symbols-outlined select-none text-[22px]">
              person
            </span>
          </a>
          <a
            className="w-12 h-12 rounded-full border border-foreground/10 dark:border-white/10 flex items-center justify-center text-primary-fixed hover:text-primary-container hover:border-primary-fixed hover:bg-primary-fixed/5 transition-colors duration-300 shadow-[0_0_15px_rgba(0,0,0,0.05)]"
            href={`mailto:${portfolioData.personal.email}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            aria-label="Send Email"
          >
            <span className="material-symbols-outlined select-none text-[22px]">
              mail
            </span>
          </a>
        </div>
      </div>

      {/* Right: Avatar container */}
      <div
        ref={avatarContainerRef}
        className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px]"
      >
        <div className="absolute inset-0 rounded-full neon-border animate-pulse-slow"></div>
        <div className="absolute inset-3 rounded-full overflow-hidden border border-foreground/10 dark:border-white/10 glass-card">
          {/* biome-ignore lint/performance/noImgElement: External mockup URL */}
          <img
            alt={portfolioData.personal.name}
            className="w-full h-full object-cover"
            src={portfolioData.personal.avatar}
          />
        </div>
        {/* Floating Decorative Orb */}
        <div
          className="absolute -top-4 -right-4 w-20 h-20 bg-tertiary-fixed-dim/20 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "6s" }}
        ></div>
      </div>
    </section>
  );
}
