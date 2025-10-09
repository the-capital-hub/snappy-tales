"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import PageRevealer from "./Revealer";
import Button from "@/Components/ui/Button";
import AboutUs from "@/Components/HomePage/AboutUs";
import Portfolio from "@/Components/HomePage/Portfolio";
import Testimonials from "@/Components/HomePage/Testimonials";
import Herosection from "@/Components/HomePage/Herosection";
import WhatWeDo from "@/Components/HomePage/WhatWeDo";
import WhyFounders from "@/Components/HomePage/WhyFounders";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [revealComplete, setRevealComplete] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  // --- ✅ Sync GSAP ScrollTrigger with Lenis ---
  useEffect(() => {
    if (!revealComplete) return;

    const syncLenisWithGSAP = () => {
      // Tell ScrollTrigger to use Lenis scroller
      ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
          return arguments.length
            ? window.lenis?.scrollTo(value)
            : window.lenis?.scroll?.instance?.scroll?.y || 0;
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

  // --- Section Animations ---
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
              scroller: document.body, // ✅ important with Lenis
            },
          }
        );
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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

            <div ref={(el) => (sectionsRef.current[1] = el)} className="relative z-10">
              <AboutUs />
            </div>

            {/* ✅ Horizontal pinned Portfolio section */}
            {/* <div ref={(el) => (sectionsRef.current[2] = el)} className="relative z-20">
              <Portfolio />
            </div> */}

            <div ref={(el) => (sectionsRef.current[3] = el)} className="relative z-10">
              <WhatWeDo />
            </div>

            <div ref={(el) => (sectionsRef.current[4] = el)} className="relative z-10">
              <WhyFounders />
            </div>

            <div ref={(el) => (sectionsRef.current[5] = el)} className="relative z-10">
              <Testimonials />
            </div>
          </div>
        </ReactLenis>
      )}
    </PageRevealer>
  );
}
