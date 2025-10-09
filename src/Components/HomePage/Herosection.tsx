"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import BgCircle from "@/svgs/Herosection/BgCircle";
import Smiley from "@/svgs/Herosection/Smiley";
import Love from "@/svgs/Herosection/Love";
import Hand from "@/svgs/Herosection/Hand";
import MiddleLogo from "@/svgs/Herosection/MiddleLogo";
import orange from "../../../public/s-icon.png";
import react from "../../../public/react-icon.png";
import figma from "../../../public/figma.png";
import mac from "../../../public/mac-icon.png";
import Image from "next/image";
import { Montserrat, Moul, Outfit } from "next/font/google";
import Button from "../ui/Button";

const outfit = Outfit({ weight: ["400", "700"], subsets: ["latin"], display: "swap" });
const mont = Montserrat({ weight: ["700"], subsets: ["latin"] });
const moul = Moul({ weight: ["400"], subsets: ["latin"] });

interface HeroSectionProps {
  revealComplete: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ revealComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef(null);
  const heading1Ref = useRef(null);
  const heading2Ref = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);
  const handRef = useRef(null);
  const smileyRef = useRef(null);
  const loveRef = useRef(null);

  const logo1Ref = useRef(null);
  const logo2Ref = useRef(null);
  const middleLogoRef = useRef(null);
  const logo3Ref = useRef(null);
  const logo4Ref = useRef(null);

  useEffect(() => {
    if (!revealComplete) return;
     gsap.to(containerRef.current, { opacity: 1, duration: 0.01 });

    const elements = [
      pillRef.current,
      heading1Ref.current,
      heading2Ref.current,
      descRef.current,
      buttonRef.current,
      handRef.current,
      smileyRef.current,
      loveRef.current,
      logo1Ref.current,
      logo2Ref.current,
      middleLogoRef.current,
      logo3Ref.current,
      logo4Ref.current,
    ];

    // Initial state
    gsap.set(elements, { opacity: 0, y: 5, scale: 0 });

    const tl = gsap.timeline({ defaults: { ease: "back.out(1)", duration: 0.8 } });

    // Hero content animations
    tl.to(pillRef.current, { opacity: 1, y: 0, scale: 1 })
      .to(heading1Ref.current, { opacity: 1, y: 0, scale: 1 }, "-=0.4")
      .to(smileyRef.current, { opacity: 1, y: 0, scale: 1, rotation: 360, duration: 0.8 }, "-=0.5")
      .to(heading2Ref.current, { opacity: 1, y: 0, scale: 1 }, "-=0.5")
      .to(loveRef.current, { opacity: 1, y: 0, scale: 1, rotation: 360, duration: 0.8 }, "-=0.5")
      .to(descRef.current, { opacity: 1, y: 0, scale: 1 }, "-=0.5")
      .to(buttonRef.current, { opacity: 1, y: 0, scale: 1 }, "-=0.5")
      .to(handRef.current, { opacity: 1, y: 0, scale: 1, rotation: 15 }, "-=0.5")
      // Logos animations
      .to([logo1Ref.current, logo2Ref.current], { opacity: 1, scale: 1, y: 0, stagger: 0.1 }, "-=0.5")
      .to(middleLogoRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.8 }, "-=0.5")
      .to([logo3Ref.current, logo4Ref.current], { opacity: 1, scale: 1, y: 0, stagger: 0.1 }, "-=0.6");

    // Floating animations
    gsap.to(handRef.current, { y: -2, repeat: -1, yoyo: true, duration: 0.8, ease: "power1.inOut", delay: 1.5 });
    gsap.to([smileyRef.current, loveRef.current], { y: -2, repeat: -1, yoyo: true, duration: 1.5, ease: "power1.inOut", stagger: 0.3, delay: 2 });
  }, [revealComplete]);

  return (
    <div className="relative min-h-screen w-full px-5 mx-auto text-center opacity-0"
    ref={containerRef}
    >
      {/* Background Circle */}
      <div className="absolute inset-0 flex items-center justify-center z-[-1]">
        <BgCircle />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto z-10 flex flex-col items-center justify-center py-8">
        <div ref={pillRef} className={`bg-white border mx-auto border-[#F4C90659] px-8 py-2 rounded-full text-sm text-black ${outfit.className}`}>
          Best Services For You....!
        </div>

        <div className="uppercase mt-6 ">
          <h1 ref={heading1Ref} className={`text-5xl md:text-7xl ${mont.className} font-bold text-black leading-tight`}>
            Your All-in-
            <span ref={smileyRef} className="inline-flex relative bottom-2 left-1 items-center">
              <Smiley className="w-14 h-14 inline-block" />
            </span>
            ne
          </h1>
          <h1 ref={heading2Ref} className={`text-5xl text-black md:text-7xl mt-2 ${moul.className} font-bold leading-tight`}>
            Gr
            <span ref={loveRef} className="inline-flex relative bottom-2 items-center">
              <Love className="w-14 h-14 inline-block" />
            </span>
            wth Partner
          </h1>
        </div>

        <div ref={descRef} className="mt-6 mb-8 max-w-4xl mx-auto text-[#565656]">
          At Snappy Tales, we&apos;re not just a service provider — we are a venture studio.
          From website & app development to branding, UI/UX, marketing, GTM strategy, and accelerator support, we give startups everything they need to launch faster, grow stronger, and scale bigger.
        </div>

        <div ref={buttonRef}>
          <Button>Request a Demo</Button>
        </div>
        <div ref={handRef} className="absolute top-10/11 right-1/3">
          <Hand />
        </div>
      </div>

      {/* Logos Section */}
      <div className="flex justify-center items-center py-3 max-w-6xl mx-auto">
        <div className="flex justify-between items-center gap-5">
          <div ref={logo1Ref} className="bg-[#D5D5D51A] shadow-inner rounded-2xl p-6.5">
            <Image src={orange} alt="s logo" width={150} className="rounded-full" />
          </div>
          <div ref={logo2Ref} className="bg-[#D5D5D51A] shadow-inner rounded-2xl p-4">
            <Image src={react} alt="react logo" width={150} />
          </div>
        </div>

        <div ref={middleLogoRef} className="mx-auto">
          <MiddleLogo />
        </div>

        <div className="flex justify-between items-center gap-5">
          <div ref={logo3Ref} className="bg-[#D5D5D51A] shadow-inner rounded-2xl p-4">
            <Image src={figma} alt="figma logo" width={150} />
          </div>
          <div ref={logo4Ref} className="bg-[#D5D5D51A] shadow-inner rounded-2xl p-3 rotate-180">
            <Image src={mac} alt="mac logo" width={150} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
