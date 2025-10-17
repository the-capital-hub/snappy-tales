"use client";

import HeroLogo from "@/svgs/Herosection/HeroLogo";
import HeroSectionHuman from "@/svgs/Herosection/HeroSectionHuman";
import Smiley from "@/svgs/Herosection/Smiley";
import React, { useEffect, useRef } from "react";
import Button from "../ui/Button";
import Scribble from "@/svgs/Herosection/Scribble";
import Rectangle from "@/svgs/Herosection/Rectangle";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Inter, Moul } from "next/font/google";
import Website from "@/svgs/Herosection/Website";

gsap.registerPlugin(ScrollTrigger);
const moul = Moul({ weight: ["400"], subsets: ["latin"] });
const inter = Inter({ weight: ["400"], subsets: ["latin"] });

const Herosection = () => {
  const containerRef = useRef(null);
  const humanRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const rectangleLeftRef = useRef(null);
  const rectangleRightRef = useRef(null);
  const scribbleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero elements immediately on page load
      gsap.set([humanRef.current, logoRef.current, textRef.current, scribbleRef.current, buttonRef.current], { opacity: 0 });

      gsap.to(humanRef.current, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" });
      gsap.to(logoRef.current, { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.7)" });
      gsap.to(textRef.current, { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.2 });
      gsap.to(scribbleRef.current, { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)", delay: 0.4 });
      gsap.to(buttonRef.current, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.6 });

      // Parallax effect for rectangles (scroll-based)
      gsap.to(rectangleLeftRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(rectangleRightRef.current, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center px-6 py-20 bg-white dark:bg-black transition-colors my-5 duration-300"
    >
      {/* Background Rectangles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex gap-7">
          <div ref={rectangleLeftRef}>
            <Rectangle />
          </div>
          <div ref={rectangleRightRef} className="-mt-18">
            <Rectangle />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-0 w-full max-w-7xl">
        {/* Left Side */}
        <div
          ref={humanRef}
          className="flex w-full lg:w-1/4 mt-12 lg:mt-0 relative bottom-26"
        >
          <HeroSectionHuman />
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative right-1/5 top-0 space-y-0">
          {/* Logo */}
          <div
            ref={logoRef}
            className="mx-auto relative left-[14rem] top-0 lg:mx-0"
          >
            <HeroLogo />
          </div>

          {/* Heading */}
          <div ref={textRef} className="relative space-y-2">
            <h1
              className={`${moul.className} uppercase text-4xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white leading-relaxed`}
            >
              YOUR GROWTH.
              <br />
              <span className="flex items-center">
                <Smiley />
                <span>UR MISSION.</span>
              </span>
            </h1>

            {/* Scribble */}
            <div
              ref={scribbleRef}
              className="absolute bottom-35 left-1/2 -translate-x-1/2 lg:left-[35rem] lg:translate-x-0"
            >
              <Scribble />
            </div>

            <div className="absolute left-full bottom-8">
              <Website />
            </div>
          </div>

          {/* Paragraph */}
          <p
            className={`${inter.className} text-gray-700 text-center dark:text-white text-base md:text-2xl`}
          >
            We craft brands, build experiences, and run marketing
            <br />
            that delivers measurable results.
          </p>

          {/* Button */}
          <div ref={buttonRef} className="relative top-8 left-[13.5rem]">
            <Button>Request a Demo</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
