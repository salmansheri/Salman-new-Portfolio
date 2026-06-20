"use client";

import portfolioData from "@/data/portfolio.json";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full py-12 bg-surface-container-lowest/80 border-t border-foreground/5 dark:border-white/5 transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-8 max-w-7xl mx-auto gap-8">
        {/* Brand */}
        <button
          type="button"
          onClick={handleScrollToTop}
          className="font-body text-xl font-bold text-primary-fixed tracking-tighter select-none cursor-pointer hover:opacity-80 transition-opacity border-none bg-transparent p-0 text-left outline-none"
        >
          SALMAN.DEV
        </button>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a
            className="text-on-surface-variant hover:text-primary-fixed transition-colors font-code text-xs font-semibold uppercase tracking-wider select-none"
            href={portfolioData.personal.socials.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="text-on-surface-variant hover:text-primary-fixed transition-colors font-code text-xs font-semibold uppercase tracking-wider select-none"
            href={portfolioData.personal.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="text-on-surface-variant hover:text-primary-fixed transition-colors font-code text-xs font-semibold uppercase tracking-wider select-none"
            href={portfolioData.personal.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>

        </div>

        {/* Copyright */}
        <p className="text-on-surface-variant font-code text-xs font-semibold uppercase tracking-wider opacity-85 text-center md:text-right">
          © {new Date().getFullYear()} {portfolioData.personal.name}. Built with
          precision.
        </p>
      </div>
    </footer>
  );
}
