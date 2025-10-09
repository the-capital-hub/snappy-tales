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
    name: "Mike Torello",
    role: "CEO of Initech",
    text: "I like getting the SMS & knowing the job&#39;s done. I often refer to it as 'hope you get a ping today!' because my product.",
  },
  {
    name: "Richards Hawkins",
    role: "Marketing Manager of Upnow",
    text: "We&#39;ve successfully sold digital products and are happy with the results. Looking forward to using it again soon.",
  },
  {
    name: "Thomas Magnum",
    role: "Barellon NSW",
    text: "Design Monks offers producers a cost-effective selling tool. Having the ability to post prices you want on an exchange is visible.",
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
    <div className="max-w-7xl mx-auto mt-20 px-4 min-h-screen">
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="flex items-center bg-[rgba(249,250,251,1)] gap-2 border border-[rgba(234,236,240,1)] rounded-4xl py-2 px-4">
          <Image
            src={fire}
            alt="fire"
            width={24}
            height={24}
            className="mr-2"
          />
          <h3 className={`${ptPoppins.className} text-sm`}>TESTIMONIAL</h3>
        </div>
        <h1
          className={`${ptMoul.className} lg:text-5xl text-[rgba(29,30,32,1)] py-6 text-center`}
        >
          GET TO KNOW OUR CLIENTS
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
        {testimonials.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onClick={() => setActiveIndex(index)}
              className={`flex flex-col justify-between px-8 py-5 max-w-md rounded-2xl cursor-pointer transition-all duration-300 ${
                isActive
                  ? "bg-black text-white"
                  : "bg-white text-black shadow-md"
              }`}
            >
              <div className="mb-15">
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
                      fill="white"
                    />
                    <path
                      d="M48.0649 7.22461H29.6133C28.8204 7.22461 28.1777 7.86724 28.1777 8.66016V27.1118C28.1777 27.9047 28.8204 28.5473 29.6133 28.5473H37.4037V40.9506C37.4037 41.7432 38.0464 42.3862 38.8393 42.3862H43.4521C44.0701 42.3862 44.6185 41.9906 44.814 41.4045L49.4268 27.566C49.4754 27.4195 49.5005 27.2662 49.5005 27.1118V8.66016C49.5005 7.86724 48.8578 7.22461 48.0649 7.22461ZM46.6294 26.8789L42.4173 39.5147H40.2748V27.1118C40.2748 26.3189 39.6318 25.6762 38.8393 25.6762H31.0488V10.0957H46.6294V26.8789Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_146_12286">
                      <rect
                        width="49"
                        height="49"
                        fill="white"
                        transform="translate(0.5 0.333984)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <p className="text-sm mb-4">{item.text}</p>

              <div className="flex gap-2 items-center">
                <Image
                  src={img}
                  alt="user image"
                  width={40}
                  className="object-cover [border-radius:100%] h-10"
                />
                <div className="flex flex-col">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-xs text-gray-400">{item.role}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        ref={lastSectionRef}
        className="mx-auto flex flex-col justify-center items-center mt-10"
      >
        <Image src={last} alt="end image" width={600} className="mb-20" />
        <p
          className={`${ptMoul.className} text-6xl uppercase mb-10 text-center`}
        >
          Save smart. Achieve more.
        </p>
      </div>
    </div>
  );
};

export default TestimonialCards;
