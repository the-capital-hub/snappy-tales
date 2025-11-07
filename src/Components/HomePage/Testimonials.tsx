"use client";

import React, { useState, useEffect, useRef } from "react";
import fire from "@/../public/fi_10760660.png";
import { Poppins, Moul } from "next/font/google";
import Image from "next/image";
import img from "../../../public/reviewer1.png";
import last from "../../../public/endImage.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ptPoppins = Poppins({
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
});

const ptMoul = Moul({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Suresh",
    role: "CEO of OrgOrbit",
    text: "Our website redesign by Snappy Tales completely transformed our digital presence. The development team delivered a responsive and lightning-fast experience that boosted user engagement across all devices.",
  },
  {
    name: "Adi Vangaveti",
    role: "CEO of Medibank",
    text: "Their marketing integration and analytics setup helped us optimize conversion funnels effortlessly. From SEO to performance tracking, everything was built with growth in mind.",
  },
  {
    name: "Sunil Ladwa",
    role: "CEO of LADWA Group",
    text: "The UI/UX work was exceptional — intuitive, visually stunning, and user-focused. Snappy Tales process combines creativity with usability, ensuring every interface feels natural and impactful.",
  },
];

const TestimonialCards: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lastSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Animate testimonial cards
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
          },
        }
      );
    });

    // Animate final section
    if (lastSectionRef.current) {
      gsap.fromTo(
        lastSectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: lastSectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <div className="w-full mx-auto px-4 md:px-16 mt-15 min-h-screen dark:bg-black bg-white">
      {/* Header */}
      <div className="flex flex-col items-center max-w-7xl px-4 mx-auto py-8 justify-center mb-12">
        <div className="flex items-center bg-[rgba(249,250,251,1)] dark:bg-zinc-900 gap-2 border border-[rgba(234,236,240,1)] dark:border-zinc-700 rounded-full py-2 px-4">
          <Image src={fire} alt="fire" width={24} height={24} />
          <h3 className={`${ptPoppins.className} text-sm text-black dark:text-white`}>
            TESTIMONIAL
          </h3>
        </div>
        <h1
          className={`${ptMoul.className} lg:text-5xl text-3xl md:text-4xl text-[rgba(29,30,32,1)] dark:text-white py-6 text-center`}
        >
          GET TO KNOW OUR CLIENTS
        </h1>
      </div>

      {/* Testimonial Cards */}
      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch flex-wrap md:flex-nowrap">
        {testimonials.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onClick={() => setActiveIndex(index)}
              className={`flex flex-col justify-between px-6 md:px-8 py-5 max-w-md w-full rounded-2xl cursor-pointer transition-all duration-300 ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-white text-black shadow-md dark:bg-zinc-900 dark:text-white dark:shadow-[0_0_10px_rgba(255,255,255,0.1)]"
              }`}
            >
              <div className="mb-4 md:mb-6">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_146_12286)">
                    <path
                      d="M20.3872 7.22461H1.93555C1.14263 7.22461 0.5 7.86724 0.5 8.66016V27.1118C0.5 27.9047 1.14263 28.5473 1.93555 28.5473H9.72563V40.9506C9.72563 41.7432 10.3683 42.3862 11.1612 42.3862H15.7744C16.392 42.3862 16.9408 41.9906 17.1359 41.4045L21.7487 27.566C21.7977 27.4195 21.8227 27.2662 21.8227 27.1118V8.66016C21.8227 7.86724 21.1801 7.22461 20.3872 7.22461ZM18.9516 26.8789L14.7396 39.5147H12.5967V27.1118C12.5967 26.3189 11.9541 25.6762 11.1612 25.6762H3.37109V10.0957H18.9516V26.8789Z"
                      fill={isActive ? "#000000" : "currentColor"}
                    />
                    <path
                      d="M48.0649 7.22461H29.6133C28.8204 7.22461 28.1777 7.86724 28.1777 8.66016V27.1118C28.1777 27.9047 28.8204 28.5473 29.6133 28.5473H37.4037V40.9506C37.4037 41.7432 38.0464 42.3862 38.8393 42.3862H43.4521C44.0701 42.3862 44.6185 41.9906 44.814 41.4045L49.4268 27.566C49.4754 27.4195 49.5005 27.2662 49.5005 27.1118V8.66016C49.5005 7.86724 48.8578 7.22461 48.0649 7.22461ZM46.6294 26.8789L42.4173 39.5147H40.2748V27.1118C40.2748 26.3189 39.6318 25.6762 38.8393 25.6762H31.0488V10.0957H46.6294V26.8789Z"
                      fill={isActive ? "#000000" : "currentColor"}
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_146_12286">
                      <rect width="49" height="49" fill="white" transform="translate(0.5 0.333984)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <p className="text-sm md:text-base mb-4 md:mb-6">{item.text}</p>

              <div className="flex gap-2 items-center">
                
                <div className="flex flex-col">
                  <h4 className="font-semibold text-sm md:text-base">{item.name}</h4>
                  <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Final CTA Section */}
      <div
        ref={lastSectionRef}
        className="mx-auto flex flex-col justify-center items-center mt-10 px-2 md:px-0"
      >
        <Image
          src={last}
          alt="end image"
          width={600}
          className="mb-10 md:mb-20 dark:bg-[#f1f5c1] rounded-3xl p-3 w-full max-w-[600px] object-contain"
        />
        <p
          className={`${ptMoul.className} text-4xl md:text-6xl uppercase mb-6 md:mb-10 text-center text-black dark:text-white`}
        >
          Save smart. Achieve more.
        </p>
      </div>
    </div>
  );
};

export default TestimonialCards;
