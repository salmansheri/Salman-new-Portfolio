"use client";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GlowBackground from "@/components/GlowBackground";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-primary-fixed/30 relative">
      {/* Dynamic atmospheric backdrops */}
      <GlowBackground />

      {/* Floating navigation */}
      <Navbar />

      {/* Primary layout container */}
      <main className="flex-grow pt-32 pb-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto w-full space-y-20 md:space-y-32">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Technical branding footer */}
      <Footer />
    </div>
  );
}
