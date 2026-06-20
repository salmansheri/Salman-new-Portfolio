"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Sync state with HTML class
    const isLight = document.documentElement.classList.contains("light");
    setTheme(isLight ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-surface/5 backdrop-blur-xl border-b border-foreground/5 dark:border-white/10 shadow-[0_0_30px_rgba(0,219,233,0.05)] transition-all duration-300">
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <span className="font-body text-2xl font-bold text-primary-fixed tracking-tighter select-none cursor-pointer">
          SALMAN.DEV
        </span>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 items-center">
          {/* biome-ignore lint/a11y/useValidAnchor: smooth scroll to element */}
          <a
            className="font-body text-sm text-on-surface-variant hover:text-primary-fixed transition-colors duration-300"
            href="#about"
            onClick={(e) => handleScroll(e, "about")}
          >
            About
          </a>
          {/* biome-ignore lint/a11y/useValidAnchor: smooth scroll to element */}
          <a
            className="font-body text-sm text-on-surface-variant hover:text-primary-fixed transition-colors duration-300"
            href="#skills"
            onClick={(e) => handleScroll(e, "skills")}
          >
            Skills
          </a>
          {/* biome-ignore lint/a11y/useValidAnchor: smooth scroll to element */}
          <a
            className="font-body text-sm text-on-surface-variant hover:text-primary-fixed transition-colors duration-300"
            href="#projects"
            onClick={(e) => handleScroll(e, "projects")}
          >
            Projects
          </a>
          {/* biome-ignore lint/a11y/useValidAnchor: smooth scroll to element */}
          <a
            className="font-body text-sm text-on-surface-variant hover:text-primary-fixed transition-colors duration-300"
            href="#contact"
            onClick={(e) => handleScroll(e, "contact")}
          >
            Contact
          </a>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full text-on-surface-variant hover:text-primary-fixed hover:bg-primary-fixed/10 transition-all duration-300 flex items-center justify-center cursor-pointer"
            aria-label="Toggle Theme Mode"
          >
            <span className="material-symbols-outlined select-none">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>

          {/* Resume Button */}
          <a
            href="./resume/resume.pdf"
            download="resume.pdf"
            className="bg-primary-fixed text-on-primary-container hover:bg-primary-fixed-dim px-6 py-2 rounded-full font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(0,219,233,0.2)] cursor-pointer"
          >
            Resume
          </a>
        </div>

        {/* Hamburger Menu Toggle (Mobile/Tablet) */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Theme Toggle in Mobile */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-full text-on-surface-variant hover:text-primary-fixed hover:bg-primary-fixed/10 transition-all duration-300 flex items-center justify-center cursor-pointer"
            aria-label="Toggle Theme Mode"
          >
            <span className="material-symbols-outlined select-none">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-primary-fixed p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined select-none">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay / Drawer */}
      <div
        className={`fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-background/95 backdrop-blur-xl border-t border-foreground/5 dark:border-white/5 flex flex-col items-center justify-center gap-8 z-40 transition-all duration-300 md:hidden ${
          isMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-8 pointer-events-none"
        }`}
      >
        {/* biome-ignore lint/a11y/useValidAnchor: smooth scroll to element */}
        <a
          className="font-body text-2xl text-on-surface hover:text-primary-fixed transition-colors duration-300"
          href="#about"
          onClick={(e) => handleScroll(e, "about")}
        >
          About
        </a>
        {/* biome-ignore lint/a11y/useValidAnchor: smooth scroll to element */}
        <a
          className="font-body text-2xl text-on-surface hover:text-primary-fixed transition-colors duration-300"
          href="#skills"
          onClick={(e) => handleScroll(e, "skills")}
        >
          Skills
        </a>
        {/* biome-ignore lint/a11y/useValidAnchor: smooth scroll to element */}
        <a
          className="font-body text-2xl text-on-surface hover:text-primary-fixed transition-colors duration-300"
          href="#projects"
          onClick={(e) => handleScroll(e, "projects")}
        >
          Projects
        </a>
        {/* biome-ignore lint/a11y/useValidAnchor: smooth scroll to element */}
        <a
          className="font-body text-2xl text-on-surface hover:text-primary-fixed transition-colors duration-300"
          href="#contact"
          onClick={(e) => handleScroll(e, "contact")}
        >
          Contact
        </a>
        <button
          type="button"
          className="bg-primary-fixed text-on-primary-container px-10 py-3 rounded-full font-bold hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(0,219,233,0.2)]"
        >
          Resume
        </button>
      </div>
    </nav>
  );
}
