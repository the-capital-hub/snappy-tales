"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PageRevealer from "./Revealer";
import AboutUs from "@/Components/HomePage/AboutUs";
import Testimonials from "@/Components/HomePage/Testimonials";
import Herosection from "@/Components/HomePage/Herosection";
import WhatWeDo from "@/Components/HomePage/WhatWeDo";
import WhyFounders from "@/Components/HomePage/WhyFounders";

interface ScrollToFunction {
  (value: number | HTMLElement, options?: { 
    duration?: number; 
    easing?: (t: number) => number; 
    immediate?: boolean;
  }): void;
}

declare global {
  interface Window {
    lenis?: {
      scrollTo: ScrollToFunction;
      on: (event: string, callback: () => void) => void;
      off: (event: string, callback: () => void) => void;
      raf?: (time: number) => void;
      scroll?: { instance?: { scroll?: { y?: number } } };
    };
  }
}

// Register GSAP plugin safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [revealComplete, setRevealComplete] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!revealComplete) return;

    const syncLenisWithGSAP = () => {
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          if (value !== undefined) {
            window.lenis?.scrollTo(value);
          } else {
            return window.lenis?.scroll?.instance?.scroll?.y || 0;
          }
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      const update = () => ScrollTrigger.update();
      window.lenis?.on("scroll", update);
      ScrollTrigger.addEventListener("refresh", update);
      ScrollTrigger.refresh();

      return () => {
        window.lenis?.off("scroll", update);
        ScrollTrigger.removeEventListener("refresh", update);
      };
    };

    const timer = setTimeout(syncLenisWithGSAP, 300);
    return () => clearTimeout(timer);
  }, [revealComplete]);

  useEffect(() => {
    if (!revealComplete || !contentRef.current) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      sectionsRef.current.forEach((section, index) => {
        if (!section || index === 0) return;

        gsap.set(section, { opacity: 1, y: 0, scale: 1 });

        gsap.fromTo(
          section,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "top 60%",
              scrub: 0.5,
              once: false,
              scroller: document.body,
            },
          }
        );
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [revealComplete]);

  return (
    <PageRevealer onRevealComplete={() => setRevealComplete(true)}>
      {revealComplete && (
        <ReactLenis
          root
          options={{
            lerp: 0.1,
            duration: 1.2,
            smoothWheel: true,
          }}
          onScroll={() => ScrollTrigger.update()}
        >
          <div ref={contentRef} className="overflow-hidden">
            <Herosection revealComplete={true} />

            <div
              ref={(el) => {
                sectionsRef.current[1] = el;
              }}
              className="relative z-10"
            >
              <AboutUs />
            </div>

            <div
              ref={(el) => {
                sectionsRef.current[3] = el;
              }}
              className="relative z-10"
            >
              <WhatWeDo />
            </div>

            <div
              ref={(el) => {
                sectionsRef.current[4] = el;
              }}
              className="relative z-10"
            >
              <WhyFounders />
            </div>

            <div
              ref={(el) => {
                sectionsRef.current[5] = el;
              }}
              className="relative z-10"
            >
              <Testimonials />
            </div>
          </div>
        </ReactLenis>
      )}
    </PageRevealer>
  );
}
