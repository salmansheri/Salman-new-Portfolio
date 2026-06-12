"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Reveal contact card on scroll
      gsap.fromTo(
        containerRef.current,
        { scale: 0.95, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: containerRef },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setIsSubmitted(true);
      // Reset form
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto px-4 py-12 overflow-hidden"
    >
      <div
        ref={containerRef}
        className="max-w-2xl mx-auto glass-card p-8 md:p-16 rounded-3xl relative overflow-hidden"
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/5 rounded-bl-[100px] pointer-events-none"></div>

        {isSubmitted ? (
          <div className="text-center py-12 space-y-4">
            <span className="material-symbols-outlined text-primary-fixed text-6xl select-none animate-bounce">
              mark_email_read
            </span>
            <h3 className="font-body text-2xl font-bold text-foreground">
              Signal Transmitted
            </h3>
            <p className="text-on-surface-variant max-w-sm mx-auto font-body text-sm md:text-base">
              Thank you! Your message has been sent successfully. I will get
              back to you shortly.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-body text-xl md:text-2xl font-bold text-primary-fixed uppercase tracking-wider">
                Initiate Contact
              </h2>
              <p className="text-on-surface-variant font-body text-sm md:text-base">
                Let's discuss your next breakthrough project.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2 flex flex-col">
                  <label
                    htmlFor="name"
                    className="font-code text-xs font-semibold text-primary-fixed opacity-70 uppercase tracking-wider"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    className="input-minimal w-full py-2 text-on-surface focus:outline-none"
                    placeholder="John Doe"
                    type="text"
                  />
                </div>
                <div className="space-y-2 flex flex-col">
                  <label
                    htmlFor="email"
                    className="font-code text-xs font-semibold text-primary-fixed opacity-70 uppercase tracking-wider"
                  >
                    Work Email
                  </label>
                  <input
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    className="input-minimal w-full py-2 text-on-surface focus:outline-none"
                    placeholder="john@company.com"
                    type="email"
                  />
                </div>
              </div>

              <div className="space-y-2 flex flex-col">
                <label
                  htmlFor="message"
                  className="font-code text-xs font-semibold text-primary-fixed opacity-70 uppercase tracking-wider"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="input-minimal w-full py-2 text-on-surface resize-none focus:outline-none"
                  placeholder="Briefly describe your vision..."
                  rows={4}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-fixed text-on-primary-container py-4 rounded-xl font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(0,219,233,0.15)] hover:shadow-[0_0_25px_rgba(0,219,233,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer"
              >
                Transmit Signal
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
