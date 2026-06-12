"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function GlowBackground() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 60;
      const yPercent = (clientY / window.innerHeight - 0.5) * 60;

      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          x: xPercent,
          y: yPercent,
          duration: 1.5,
          ease: "power2.out",
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          x: -xPercent,
          y: -yPercent,
          duration: 1.5,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Top Left Orb */}
      <div
        ref={orb1Ref}
        className="glow-bg bg-primary-fixed-dim/30 dark:bg-primary-fixed-dim/15 top-[-10%] left-[-10%] animate-pulse-slow"
      />
      {/* Bottom Right Orb */}
      <div
        ref={orb2Ref}
        className="glow-bg bg-secondary-container/20 dark:bg-secondary-container/10 bottom-[-10%] right-[-10%] animate-pulse-slow"
        style={{ animationDelay: "-5s" }}
      />
    </div>
  );
}
