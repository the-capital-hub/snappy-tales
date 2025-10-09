"use client";
import MiddleLogo from "@/svgs/Herosection/MiddleLogo";
import { LongVector, Rhombus } from "@/svgs/Herosection/WhyfounderSvgs";
import React, {  useRef, useState } from "react";
import { Moul, Outfit } from "next/font/google";
import { Database, DollarSign, IdCardLanyard, Lock } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const moul = Moul({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});
const outfit = Outfit({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

const options = [
  {
    id: 1,
    icon: Lock,
    title: "Everything Under One Roof",
    description: "No more managing 5 agencies.",
  },
  {
    id: 2,
    icon: Database,
    title: "Fast Execution, Real Results",
    description: "Speed meets quality in every delivery.",
  },
  {
    id: 3,
    icon: IdCardLanyard,
    title: "True Partnership",
    description: "Your success is our success.",
  },
  {
    id: 4,
    icon: DollarSign,
    title: "Built for Growth",
    description: "Scale without limits.",
  },
];

const WhyFounders = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const optionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const circleRef = useRef(null);
  const textContentRef = useRef(null);
  const [activeOption, setActiveOption] = useState(0);

  useGSAP(
    () => {
      // Heading animation
      gsap.from(headingRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });

      // Options stagger animation
      gsap.from(optionsRef.current, {
        opacity: 0,
        x: -100,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: optionsRef.current[0],
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });

      // Circle animation with scale and rotation
      gsap.from(circleRef.current, {
        opacity: 0,
        scale: 0,
        rotation: 180,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: circleRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });

      // Text content fade in
      gsap.from(textContentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: textContentRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: 1,
        },
      });

      // Hover animations for options
      optionsRef.current.forEach((option, index) => {
        if (option) {
          option.addEventListener("mouseenter", () => {
            gsap.to(option, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            });
            setActiveOption(index);
          });

          option.addEventListener("mouseleave", () => {
            gsap.to(option, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      });

      // Continuous floating animation for circle
      gsap.to(circleRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  // Update text content when active option changes
  useGSAP(
    () => {
      gsap.to(textContentRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        onComplete: () => {
          gsap.to(textContentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
          });
        },
      });
    },
    { dependencies: [activeOption] }
  );

  return (
    <div className="bg-black">
      <div
        ref={containerRef}
        className="bg-snappy max-w-full mx-auto min-h-screen relative z-10 flex flex-col items-center px-16 py-12"
      >
        {/* HEADING CENTERED */}
        <h2
          ref={headingRef}
          className={`${moul.className} text-3xl md:text-4xl font-bold text-white text-center mb-12`}
        >
          WHY FOUNDERS CHOOSE SNAPPY TALES
        </h2>

        {/* MAIN CONTENT: LEFT OPTIONS + RIGHT CIRCLE */}
        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-12 relative z-20">
          {/* LEFT SIDE OPTIONS */}
          <div className="w-full md:w-auto mt-5">
            <div className="space-y-5">
              {options.map((option, index) => {
                const Icon = option.icon;
                return (
                  <div
                    key={option.id}
                    ref={(el) => {
                      optionsRef.current[index] = el;
                    }}
                    className={`px-6 py-5 text-4xl flex items-center gap-4 text-white relative cursor-pointer ${outfit.className}`}
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "#1A1A1A99",
                    }}
                  >
                    {/* Gradient border */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        borderRadius: "10px",
                        padding: "2px",
                        background:
                          index === activeOption
                            ? "linear-gradient(to right, #F4C906, #FFFFFF)"
                            : "transparent",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                        pointerEvents: "none",
                        zIndex: 0,
                        transition: "background 0.3s ease",
                      }}
                    ></div>

                    <div className="relative flex items-center gap-4">
                      <div className="bg-yellow-400 rounded-full p-1 text-black">
                        <Icon />
                      </div>
                      {option.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE CIRCLE + TEXT */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {/* Yellow Circle */}
            <div
              ref={circleRef}
              className="w-72 h-72 rounded-full bg-[#F4C906] flex items-center justify-center shadow-[0_0_80px_#F4C90680]"
            >
              <MiddleLogo />
            </div>

            {/* Title + Subtext */}
            <div ref={textContentRef} className="text-center mt-6">
              <h3
                className={`${moul.className} text-2xl font-bold text-white mb-2`}
              >
                {options[activeOption].title}
              </h3>
              <p className={`${outfit.className} text-gray-300 text-sm`}>
                {options[activeOption].description}
              </p>
            </div>
          </div>
        </div>

        {/* BACKGROUND SHAPES */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          {/* Top right LongVector */}
          <div className="absolute top-[0%] right-[0%] opacity-30">
            <LongVector />
          </div>

          {/* Left center Rhombus */}
          <div className="absolute top-[70%] left-[33%] w-[15%] opacity-20 -translate-y-1/2">
            <Rhombus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyFounders;
