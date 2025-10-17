"use client";
import React, { useState, useEffect, useRef } from "react";
import { Smartphone } from "lucide-react";
import MiddleLogo from "@/svgs/Herosection/MiddleLogo";
import orange from "../../../public/s-icon.png";
import react from "../../../public/react-icon.png";
import figma from "../../../public/figma.png";
import mac from "../../../public/mac-icon.png";
import Image from "next/image";
import { Inter, Montserrat } from "next/font/google";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Button from "../ui/Button";

const mont = Montserrat({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

gsap.registerPlugin(ScrollTrigger);

interface ServiceType {
  id: number;
  title: string;
  description: string;
  items: string[];
}

const Services: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const servicesRef = useRef<(HTMLDivElement | null)[]>([]);
  const logosRef = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLDivElement | null>(null);

  const services: ServiceType[] = [
    {
      id: 1,
      title: "Website & App Development",
      description:
        "We create fast, scalable, and stunning digital products that deliver real impact.",
      items: [
        "Custom Websites & Landing Pages",
        "E-commerce Stores",
        "Mobile Apps (iOS & Android)",
        "Product MVPs & Prototypes",
      ],
    },
    {
      id: 2,
      title: "Branding & UI/UX Design",
      description: "Your brand is your story — we make it unforgettable.",
      items: [
        "Logo & Brand Identity Design",
        "UI/UX for Web & Mobile",
        "Pitch Decks & Creative Collateral",
        "Social Media Graphics & Campaign Assets",
      ],
    },
    {
      id: 3,
      title: "Marketing & Growth",
      description:
        "More visibility, more engagement, more customers — powered by data-driven marketing.",
      items: [
        "SEO, SEM, SMM",
        "Content & Inbound Marketing",
        "Performance Marketing (Meta, Google, LinkedIn Ads)",
        "Growth Campaigns that Convert",
      ],
    },
    {
      id: 4,
      title: "Go-To-Market (GTM) & Scaling Strategy",
      description: "From launch to traction, we help you scale smarter.",
      items: [
        "GTM Strategy & Execution",
        "Growth Funnels & Experimentation",
        "Community & Audience Building",
        "Conversion Rate Optimization",
      ],
    },
    {
      id: 5,
      title: "Accelerator Support & Investor Connect",
      description: "We help you get investor-ready and open the right doors.",
      items: [
        "Fundraising Strategy & Pitch Deck Creation",
        "Investor Intros & Warm Connects",
        "Pitch Practice & Advisory",
      ],
    },
  ];

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    serviceId: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setHoveredService(serviceId);
  };

  const handleMouseLeave = () => setHoveredService(null);

  useEffect(() => {
    servicesRef.current.forEach((el) => {
      if (!el) return;
      const icon = el.querySelector<HTMLDivElement>(".service-icon");
      const title = el.querySelector<HTMLHeadingElement>("h2");
      const description = el.querySelector<HTMLParagraphElement>("p");
      const items = el.querySelectorAll<HTMLDivElement>(".service-item");
      if (!icon || !title || !description) return;

      gsap.fromTo(
        icon,
        { opacity: 0, x: -30, scale: 0.8 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.4,
          ease: "power1.out",
          scrollTrigger: {
            trigger: icon,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play reverse play reverse",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        title,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power1.out",
          scrollTrigger: {
            trigger: title,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play reverse play reverse",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        description,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power1.out",
          scrollTrigger: {
            trigger: description,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play reverse play reverse",
            scrub: 0.5,
          },
        }
      );

      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power1.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              end: "top 70%",
              toggleActions: "play reverse play reverse",
              scrub: 0.3,
            },
          }
        );
      });
    });

    logosRef.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power1.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 65%",
            toggleActions: "play reverse play reverse",
            scrub: 0.4,
          },
        }
      );
    });

    if (headlineRef.current) {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power1.out",
          scrollTrigger: {
            trigger: headlineRef.current,
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play reverse play reverse",
            scrub: 0.5,
          },
        }
      );
    }
  }, []);

  return (
    <div
      className={`${mont.className} min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 p-6 md:p-12`}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => {
              servicesRef.current[index] = el;
            }}
            className="relative rounded-2xl p-6 md:p-8 transition-all duration-300 cursor-pointer md:shadow-none shadow-sm hover:shadow-md"
            onMouseMove={(e) => handleMouseMove(e, service.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-b from-[#FFDE48] to-[#F4C906] rounded-full flex items-center justify-center service-icon">
                <Smartphone className="w-6 h-6 text-gray-900 dark:text-black" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm md:text-base">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {service.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 service-item text-sm md:text-base"
                    >
                      <svg
                        width="14"
                        height="16"
                        viewBox="0 0 18 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                      >
                        <path
                          d="M15.6018 6.4903C18.2456 8.01669 18.2456 11.8327 15.6018 13.3591L6.51475 18.6055C3.49505 20.3489 -0.142922 17.6268 0.677589 14.2379L1.49594 10.8579C1.64442 10.2446 1.64442 9.60476 1.49594 8.99149L0.677593 5.61149C-0.14292 2.22255 3.49505 -0.499515 6.51475 1.24391L15.6018 6.4903Z"
                          fill="#F4C906"
                        />
                      </svg>
                      <span className="dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {hoveredService === service.id && (
              <div
                className="absolute w-10 h-10 md:w-12 md:h-12 bg-gradient-to-b from-[#FFDE48] to-[#F4C906] rounded-full flex items-center justify-center pointer-events-none transition-opacity duration-200"
                style={{
                  left: `${cursorPosition.x - 20}px`,
                  top: `${cursorPosition.y - 20}px`,
                }}
              >
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M15.6018 6.4903C18.2456 8.01669 18.2456 11.8327 15.6018 13.3591L6.51475 18.6055C3.49505 20.3489 -0.142922 17.6268 0.677589 14.2379L1.49594 10.8579C1.64442 10.2446 1.64442 9.60476 1.49594 8.99149L0.677593 5.61149C-0.14292 2.22255 3.49505 -0.499515 6.51475 1.24391L15.6018 6.4903Z"
                    fill="black"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Logos + MiddleLogo */}
      <div className="flex flex-col md:flex-row justify-center items-center py-6 md:py-12 max-w-6xl mx-auto gap-6 md:gap-12">
        <div className="flex gap-5 flex-wrap md:flex-nowrap justify-center">
          {[orange, react].map((logo, i) => (
            <div
              key={i}
              ref={(el) => {logosRef.current[i] = el}}
              className="bg-[#D5D5D51A] dark:bg-[#ffffff0d] shadow-inner rounded-2xl p-4 md:p-6"
            >
              <Image src={logo} alt={`logo-${i}`} width={120} />
            </div>
          ))}
        </div>

        <div className="mx-auto my-6 md:my-0">
          <MiddleLogo />
        </div>

        <div className="flex gap-5 flex-wrap md:flex-nowrap justify-center">
          {[figma, mac].map((logo, i) => (
            <div
              key={i}
              ref={(el) => {logosRef.current[i + 2] = el}}
              className={`bg-[#D5D5D51A] dark:bg-[#ffffff0d] shadow-inner rounded-2xl p-3 md:p-4 ${
                logo === mac ? "rotate-180" : ""
              }`}
            >
              <Image src={logo} alt={`logo-${i + 2}`} width={120} />
            </div>
          ))}
        </div>
      </div>

      {/* Founder Text */}
      <div className="flex flex-col items-center gap-4 md:gap-6 text-center max-w-3xl mx-auto mb-12">
        <span className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white">
          Why Founders <br /> Choose Snappy Tales
        </span>
        <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300">
          One Partner, All Solutions – Tech, design, marketing, funding — no
          juggling agencies.
        </p>
        <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300">
          Speed + Quality – We execute fast without compromising results.
        </p>
        <Button>Request a demo</Button>
      </div>

      {/* Headline */}
      <div
        ref={headlineRef}
        className={`${inter.className} text-5xl md:text-8xl font-bold text-center my-12 md:my-16 text-gray-900 dark:text-white`}
      >
        Save smart. Achieve more.
      </div>
    </div>
  );
};

export default Services;
