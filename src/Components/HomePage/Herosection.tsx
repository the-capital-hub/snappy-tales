"use client";

import HeroLogo, { DarkHeroLogo } from "@/svgs/Herosection/HeroLogo";
import HeroSectionHuman, {
  DarkHuman,
} from "@/svgs/Herosection/HeroSectionHuman";
import Smiley from "@/svgs/Herosection/Smiley";
import React, { useEffect, useRef } from "react";
import Button from "../ui/Button";
import Scribble, { DarkScribble } from "@/svgs/Herosection/Scribble";
import Rectangle, { DarkRectangle } from "@/svgs/Herosection/Rectangle";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Inter, Moul } from "next/font/google";
import Website, { DarkWebsite } from "@/svgs/Herosection/Website";

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
      gsap.set(
        [
          humanRef.current,
          logoRef.current,
          textRef.current,
          scribbleRef.current,
          buttonRef.current,
        ],
        { opacity: 0 }
      );

      gsap.to(humanRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.to(logoRef.current, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1,
        ease: "back.out(1.7)",
      });
      gsap.to(textRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: 0.2,
      });
      gsap.to(scribbleRef.current, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.4,
      });
      gsap.to(buttonRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.6,
      });

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
        y: 10,
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
      className="relative w-full flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-20 bg-white dark:bg-black transition-colors  duration-300 overflow-hidden"
    >
      {/* Background Rectangles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 md:opacity-100">
        <div className="flex gap-4 md:gap-7 scale-75 md:scale-100">
          <div ref={rectangleLeftRef}>
            <Rectangle />
            <DarkRectangle />
          </div>
          <div ref={rectangleRightRef} className="-mt-20 md:-mt-18">
            <Rectangle />
            <DarkRectangle />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-0 w-full max-w-7xl">
        {/* Left Side - Human */}
        <div
          ref={humanRef}
          className="flex w-full lg:w-1/4 mt-0 lg:mt-0 relative lg:bottom-26 order-2 lg:order-1 scale-75 md:scale-90 lg:scale-100"
        >
          <div className="dark:hidden ">
            <HeroSectionHuman />
          </div>
          <div className="dark:block hidden">
            <DarkHuman />
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative lg:right-1/5 top-0 space-y-0 order-1 lg:order-2 w-full lg:w-auto">
          {/* Logo */}
          <div
            ref={logoRef}
            className="mx-auto lg:mx-0 relative left-0 md:left-32 lg:left-[14rem] top-0 scale-75 md:scale-90 lg:scale-100"
          >
            <HeroLogo />
          </div>
          <div
            ref={logoRef}
            className="mx-auto lg:mx-0 relative left-0 md:left-28 lg:left-[12rem] top-0 scale-75 md:scale-90 lg:scale-100"
          >
            <DarkHeroLogo />
          </div>

          {/* Heading */}
          <div ref={textRef} className="relative space-y-2 px-4 md:px-0">
            <h1
              className={`${moul.className} uppercase text-3xl md:text-5xl lg:text-7xl font-bold text-black dark:text-white leading-tight md:leading-relaxed`}
            >
              YOUR GROWTH.
              <br />
              <span className="flex items-center justify-center lg:justify-start gap-1 md:gap-2">
                <span className="scale-75 md:scale-90 lg:scale-100">
                  <Smiley />
                </span>
                <span>UR MISSION.</span>
              </span>
            </h1>

            {/* Scribble */}
            <div
              ref={scribbleRef}
              className="absolute bottom-6 hidden md:block md:bottom-20 lg:bottom-35 left-1/2 -translate-x-1/2 lg:left-[35rem] lg:translate-x-0 scale-75 md:scale-90 lg:scale-100"
            >
              <div className="dark:hidden block">
                <Scribble />
              </div>
              <div className="dark:block hidden">
                <DarkScribble />
              </div>
            </div>

            {/* Website Icon */}
            <div className="absolute left-full bottom-4 md:bottom-8 hidden lg:block">
              <div>
                <Website />
              </div>
              <div>
                <DarkWebsite />
              </div>
            </div>
          </div>

          {/* Paragraph */}
          <p
            className={`${inter.className} text-gray-700 text-center lg:text-left dark:text-white text-sm md:text-lg lg:text-2xl px-4 md:px-0 max-w-xl lg:max-w-none mt-4 lg:mt-0`}
          >
            We craft brands, build experiences, and run marketing
            <br className="hidden md:block" />
            that delivers measurable results.
          </p>

          {/* Button */}
          <div ref={buttonRef} className="relative top-6 md:top-8 left-0 md:left-32 lg:left-[13.5rem] mt-4 lg:mt-0">
            <Button>Request a Demo</Button>
          </div>
        </div>
      </div>

      {/* Background Glow Effects */}
      <div className="absolute inset-0 dark:block hidden pointer-events-none">
        <svg
          width="500"
          height="1000"
          viewBox="0 0 828 1507"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="md:w-[700px] md:h-[1507px]"
        >
          <g filter="url(#filter0_f_552_28097)">
            <circle cx="74.5" cy="753.5" r="209.5" fill="#F4C906" />
          </g>
          <defs>
            <filter
              id="filter0_f_552_28097"
              x="-679"
              y="0"
              width="1507"
              height="1507"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="272"
                result="effect1_foregroundBlur_552_28097"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="absolute right-0 bottom-0 rotate-180 dark:block hidden pointer-events-none">
        <svg
          width="500"
          height="1000"
          viewBox="0 0 828 1507"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="md:w-[700px] md:h-[1507px]"
        >
          <g filter="url(#filter0_f_552_28097_2)">
            <circle cx="74.5" cy="753.5" r="209.5" fill="#F4C906" />
          </g>
          <defs>
            <filter
              id="filter0_f_552_28097_2"
              x="-679"
              y="0"
              width="1507"
              height="1507"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="272"
                result="effect1_foregroundBlur_552_28097_2"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Herosection;