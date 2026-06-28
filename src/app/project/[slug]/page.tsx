"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useRef } from "react";
import Footer from "@/components/Footer";
import GlowBackground from "@/components/GlowBackground";
import Navbar from "@/components/Navbar";
import portfolioData from "@/data/portfolio.json";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const router = useRouter();

  // Find project in the portfolio.json
  const project = portfolioData.projects.find((p) => p.slug === slug);

  const containerRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const metadataRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Breadcrumb animation
      gsap.fromTo(
        breadcrumbRef.current,
        { y: prefersReducedMotion ? 0 : -5, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
      );

      // Hero image zoom reveal
      gsap.fromTo(
        heroRef.current,
        { scale: prefersReducedMotion ? 1 : 0.99, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.05,
        },
      );

      // Header title reveal
      gsap.fromTo(
        headerRef.current,
        { y: prefersReducedMotion ? 0 : 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.1 },
      );

      // Tech Stack banner reveal
      if (metadataRef.current) {
        gsap.fromTo(
          metadataRef.current,
          { y: prefersReducedMotion ? 0 : 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: metadataRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Achievements grid entry
      if (achievementsRef.current) {
        gsap.fromTo(
          achievementsRef.current.children,
          { y: prefersReducedMotion ? 0 : 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: prefersReducedMotion ? 0 : 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: achievementsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    { scope: containerRef },
  );

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col justify-between selection:bg-primary-fixed/30 relative">
        <GlowBackground />
        <Navbar />
        <main className="flex-grow pt-40 pb-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full flex flex-col items-center justify-center space-y-6 text-center">
          <span className="material-symbols-outlined text-rose-500 text-6xl animate-bounce select-none">
            error
          </span>
          <div className="space-y-2">
            <h1 className="font-body text-3xl font-extrabold text-foreground">
              Project Not Found
            </h1>
            <p className="font-body text-sm text-on-surface-variant max-w-md">
              The project you are looking for does not exist or has been
              archived. Check the URL and try again.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/#projects")}
            className="bg-primary-fixed text-on-primary-container hover:bg-primary-fixed-dim px-6 py-2.5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(0,219,233,0.2)] cursor-pointer"
          >
            Return to Projects
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-primary-fixed selection:text-on-primary-fixed relative">
      {/* Background atmosphere radial blobs */}
      <GlowBackground />

      {/* Floating navigation bar */}
      <Navbar />

      {/* Primary Details container (matches Stitch pt-[100px] layout padding and flex-col gap-16) */}
      <main
        ref={containerRef}
        className="flex-grow pt-[100px] pb-16 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full relative flex flex-col gap-16"
      >
        <div className="absolute top-20 right-10 w-[600px] h-[600px] bg-gradient-to-tr from-primary-fixed/5 to-transparent blur-3xl rounded-full pointer-events-none" />

        {/* Hero Section */}
        <section className="flex flex-col gap-6">
          {/* Breadcrumbs */}
          <div
            ref={breadcrumbRef}
            className="flex items-center gap-3 text-on-surface-variant font-code text-xs tracking-widest uppercase mb-4"
          >
            <Link
              href="/#projects"
              className="hover:text-primary-fixed transition-colors duration-200"
            >
              Work
            </Link>
            <span className="material-symbols-outlined text-sm select-none text-outline-variant">
              chevron_right
            </span>
            <span className="text-on-surface font-semibold">
              {project.title}
            </span>
          </div>

          {/* Hero Image Card */}
          <div
            ref={heroRef}
            className="w-full h-[500px] rounded-xl overflow-hidden glass-card relative group shadow-[0_0_30px_rgba(0,0,0,0.4)] border border-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent z-10" />
            {/* biome-ignore lint/performance/noImgElement: Project visualization */}
            <img
              src={project.image}
              alt={project.alt || project.title}
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Title & Description */}
          <div ref={headerRef} className="mt-6 max-w-3xl">
            <h1 className="font-body text-4xl md:text-6xl font-extrabold text-primary-fixed mb-4 tracking-tighter uppercase">
              {project.title}
            </h1>
            <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed">
              {project.description}
            </p>
          </div>
        </section>

        {/* Project Metadata Section (Tech Stack only) */}
        {project.tech && project.tech.length > 0 && (
          <section
            ref={metadataRef}
            className="glass-card rounded-xl p-8 flex flex-col gap-3 border border-white/5"
          >
            <span className="font-code text-xs text-primary-fixed opacity-80 uppercase tracking-wider font-semibold">
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-3 mt-1">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3.5 py-1 bg-primary-fixed/10 text-primary-fixed rounded-full font-code text-xs border border-primary-fixed/30 select-none"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Technical Achievements Section */}
        {project.achievements && project.achievements.length > 0 && (
          <section className="flex flex-col gap-6">
            <h2 className="font-body text-2xl md:text-3xl font-extrabold text-on-surface mb-8 tracking-tight uppercase">
              Technical Achievements
            </h2>
            <div
              ref={achievementsRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {project.achievements.map((ach) => (
                <div
                  key={ach.title}
                  className={`glass-card rounded-xl p-8 flex flex-col gap-4 items-start group hover:bg-surface-container/20 transition-all duration-300 border border-white/5 ${
                    ach.span === 2 ? "md:col-span-2" : "md:col-span-1"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-primary-fixed/10 flex items-center justify-center border border-primary-fixed/20 mb-2">
                    <span className="material-symbols-outlined text-primary-fixed text-xl select-none">
                      {ach.icon}
                    </span>
                  </div>
                  <h3 className="font-body text-xl font-bold text-on-surface group-hover:text-primary-fixed transition-colors duration-200">
                    {ach.title}
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed flex-grow">
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
