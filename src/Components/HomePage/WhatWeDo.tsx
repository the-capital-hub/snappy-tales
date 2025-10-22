"use client";
import React, { useRef } from "react";
import { Moul, Outfit } from "next/font/google";
import Button from "../ui/Button";
import Image from "next/image";
import { Smartphone } from "lucide-react";
import img1 from "../../../public/card1-img.png";
import img2 from "../../../public/card2-img.png";
import img3 from "../../../public/card3-img.png";
import img4 from "../../../public/card4-img.png";
import NiceSvg from "@/svgs/Herosection/NiceSvg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const moul = Moul({ weight: ["400"], subsets: ["latin"] });
const outfit = Outfit({ weight: ["400"], subsets: ["latin"] });

const cardData = [
  {
    id: 1,
    icon: Smartphone,
    title: "Design",
    description: "Websites, apps, products, and powerful brand identities.",
    buttonText: "Explore More",
    slug: "branding-ui-ux-design",
    image: img1,
  },
  {
    id: 2,
    icon: Smartphone,
    title: "Market",
    description: "SEO, SMM, SEM, content & performance campaigns convert.",
    buttonText: "Explore More",
    slug: "marketing-growth",
    image: img2,
  },
  {
    id: 3,
    icon: Smartphone,
    title: "Build",
    description: "Websites, apps, products, and powerful brand identities.",
    buttonText: "Explore More",
    slug: "website-app-development",
    image: img3,
  },
  {
    id: 4,
    icon: Smartphone,
    title: "Scale",
    description: "GTM strategies, growth marketing, and investor connections.",
    buttonText: "Explore More",
    slug: "gtm-scaling-strategy",
    image: img4,
  },
];

const WhatWeDo = () => {
  const containerRef = useRef(null);
  const headerTitleRef = useRef(null);
  const headerDescRef = useRef(null);
  const headerButtonRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef(null);
  const ctaTitleRef = useRef(null);
  const ctaButtonRef = useRef(null);

  const handleMouseMove = (e: React.MouseEvent, cardEl: HTMLDivElement) => {
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; 
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(cardEl, {
      rotateX: -rotateX,
      rotateY: rotateY,
      scale: 1.05,
      transformPerspective: 500,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (cardEl: HTMLDivElement) => {
    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  // Scroll animations
  useGSAP(() => {
    gsap.from(headerTitleRef.current, {
      opacity: 0,
      x: -100,
      scrollTrigger: {
        trigger: headerTitleRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: 1,
      },
    });
    gsap.from(headerDescRef.current, {
      opacity: 0,
      x: -80,
      scrollTrigger: {
        trigger: headerDescRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: 1.5,
      },
    });
    gsap.from(headerButtonRef.current, {
      opacity: 0,
      x: 100,
      scale: 0.8,
      scrollTrigger: {
        trigger: headerButtonRef.current,
        start: "top 80%",
        end: "top 50%",
        scrub: 1.5,
      },
    });

    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.from(card, {
        opacity: 0,
        y: 100,
        rotation: -5,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "top 55%",
          scrub: 1.5,
        },
      });
    });

    gsap.from(ctaTitleRef.current, {
      opacity: 0,
      y: 60,
      scale: 0.9,
      scrollTrigger: {
        trigger: ctaTitleRef.current,
        start: "top 85%",
        end: "top 60%",
        scrub: 1.5,
      },
    });

    gsap.from(ctaButtonRef.current, {
      opacity: 0,
      y: 40,
      scale: 0.7,
      scrollTrigger: {
        trigger: ctaButtonRef.current,
        start: "top 85%",
        end: "top 65%",
        scrub: 2,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full dark:bg-black mx-auto py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col gap-4 text-center lg:text-left">
          <h2
            ref={headerTitleRef}
            className={`${moul.className} text-4xl lg:text-5xl text-black dark:text-white`}
          >
            What We Do
          </h2>
          <p
            ref={headerDescRef}
            className={`${outfit.className} text-lg lg:text-2xl text-gray-700 dark:text-gray-300 max-w-xl mx-auto lg:mx-0`}
          >
            Define, position, and grow your brand with clarity and consistency.
            We help you create a brand identity that connects with your audience.
          </p>
        </div>
        <div ref={headerButtonRef} className="flex justify-center lg:justify-end">
          <Button href="/services">Request a Demo</Button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 py-7 max-w-7xl mx-auto">
        {cardData.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => {cardsRef.current[index] = el}}
            className="relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,0.8)] dark:shadow-[6px_6px_0px_rgba(255,255,255,0.2)] p-4 flex flex-col gap-4 transition-transform transform-style-preserve-3d"
            onMouseMove={(e) => handleMouseMove(e, cardsRef.current[index]!)}
            onMouseLeave={() => handleMouseLeave(cardsRef.current[index]!)}
          >
            {index === 0 && (
              <div ref={svgRef} className="absolute -top-9 -right-5 z-10">
                <NiceSvg />
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="card-icon text-2xl bg-gradient-to-b from-[#FFDE48] to-[#F4C906] rounded-full p-3">
                <card.icon size={20} className="text-black" />
              </span>
              <h3
                className={`${moul.className} card-title text-2xl font-bold text-black dark:text-white`}
              >
                {card.title}
              </h3>
            </div>
            <p
              className={`${outfit.className} card-description text-gray-700 dark:text-gray-300`}
            >
              {card.description}
            </p>
            <div className="card-button">
              <Button className="w-fit" href={`/services/${card.slug}`}>
                {card.buttonText}
              </Button>
            </div>
            <div className="card-image relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center justify-center my-20 gap-8 max-w-5xl mx-auto px-4 text-center">
        <p
          ref={ctaTitleRef}
          className={`${moul.className} text-3xl lg:text-5xl uppercase text-black dark:text-white`}
        >
          Want to see how we can build <br className="hidden lg:block" />
          and scale your business?
        </p>
        <div ref={ctaButtonRef}>
          <Button href="/services">Free Strategy Consultation</Button>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;
