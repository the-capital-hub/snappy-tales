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

const moul = Moul({
  weight: ["400"],
  subsets: ["latin"],
});

const outfit = Outfit({
  weight: ["400"],
  subsets: ["latin"],
});

const cardData = [
  {
    id: 1,
    icon: Smartphone,
    title: "Design",
    description: "Websites, apps, products, and powerful brand identities.",
    buttonText: "Explore More",
    image: img1,
  },
  {
    id: 2,
    icon: Smartphone,
    title: "Market",
    description: "SEO, SMM, SEM, content & performance campaigns convert.",
    buttonText: "Explore More",
    image: img2,
  },
  {
    id: 3,
    icon: Smartphone,
    title: "Build",
    description: "Websites, apps, products, and powerful brand identities.",
    buttonText: "Explore More",
    image: img3,
  },
  {
    id: 4,
    icon: Smartphone,
    title: "Scale",
    description: "GTM strategies, growth marketing, and investor connections.",
    buttonText: "Explore More",
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

  useGSAP(
    () => {
      // Header title animation
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

      // Header description animation
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

      // Header button animation
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

      // SVG animation - triggers when first card is visible
      gsap.from(svgRef.current, {
        opacity: 0,
        scale: 0.5,
        rotation: -180,
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
          end: "top 50%",
          scrub: 1.5,
        },
      });

      // Cards animations
      cardsRef.current.forEach((card) => {
        if (card) {
          // Card container animation
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

          // Card icon animation
          const icon = card.querySelector(".card-icon");
          if (icon) {
            gsap.from(icon, {
              scale: 0,
              rotation: 360,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 60%",
                scrub: 2,
              },
            });
          }

          // Card title animation
          const title = card.querySelector(".card-title");
          if (title) {
            gsap.from(title, {
              opacity: 0,
              x: -30,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 60%",
                scrub: 2,
              },
            });
          }

          // Card description animation
          const desc = card.querySelector(".card-description");
          if (desc) {
            gsap.from(desc, {
              opacity: 0,
              y: 20,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 55%",
                scrub: 2,
              },
            });
          }

          // Card button animation
          const button = card.querySelector(".card-button");
          if (button) {
            gsap.from(button, {
              opacity: 0,
              scale: 0.5,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 55%",
                scrub: 2.5,
              },
            });
          }

          // Card image animation
          const img = card.querySelector(".card-image");
          if (img) {
            gsap.from(img, {
              scale: 0.8,
              opacity: 0.5,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 50%",
                scrub: 2,
              },
            });
          }
        }
      });

      // CTA title animation with split text effect
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

      // CTA button animation
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
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto py-12">
      <div className="flex items-center justify-between mb-12">
        <div className="flex flex-col gap-4">
          <h2 ref={headerTitleRef} className={`${moul.className} text-5xl`}>
            What We Do
          </h2>
          <p
            ref={headerDescRef}
            className={`${outfit.className} text-2xl max-w-xl`}
          >
            Define, position, and grow your brand with clarity and consistency.
            We help you create a brand identity that connects with your
            audience.
          </p>
        </div>
        <div ref={headerButtonRef}>
          <Button>Request a Demo</Button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {cardData.map((card, index) => (
          <div
            key={card.id}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="relative bg-white border border-gray-200 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,0.8)] p-3 flex flex-col gap-4"
          >
            {/* SVG only on first card */}
            {index === 0 && (
              <div ref={svgRef} className="absolute -top-9 -right-11 z-10">
                <NiceSvg />
              </div>
            )}

            {/* Icon & Title */}
            <div className="flex items-center gap-2">
              <span className="card-icon text-2xl bg-gradient-to-b from-[#FFDE48] to-[#F4C906] rounded-full p-3">
                <card.icon size={20} className="text-black" />
              </span>
              <h3
                className={`${moul.className} card-title text-2xl font-bold`}
              >
                {card.title}
              </h3>
            </div>

            {/* Description */}
            <p
              className={`${outfit.className} card-description text-gray-700`}
            >
              {card.description}
            </p>

            {/* Button */}
            <div className="card-button">
              <Button className="w-fit">{card.buttonText}</Button>
            </div>

            {/* Image with tagline */}
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
      <div className="flex flex-col items-center justify-center my-20 gap-8 max-w-5xl mx-auto">
        <p
          ref={ctaTitleRef}
          className={`${moul.className} text-5xl uppercase text-center`}
        >
          Want to see how we can build <br />
          and scale your business?
        </p>
        <div ref={ctaButtonRef}>
          <Button>Free Strategy Consultation</Button>
        </div>
      </div>
    </div>
  );
};

export default WhatWeDo;