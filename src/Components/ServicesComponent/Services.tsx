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
import Link from "next/link";
import { serviceDetails } from "@/lib/serviceDetails";

gsap.registerPlugin(ScrollTrigger);

const mont = Montserrat({ subsets: ["latin"] });
const inter = Inter({ subsets: ["latin"] });

interface ServiceOverviewCard {
  id: number;
  title: string;
  description: string;
  items: string[];
  slug: string;
}

const Services: React.FC = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const servicesRef = useRef<(HTMLDivElement | null)[]>([]);
  const logosRef = useRef<(HTMLDivElement | null)[]>([]);
  const headlineRef = useRef<HTMLDivElement | null>(null);

  const services: ServiceOverviewCard[] = serviceDetails.map((service, index) => ({
    id: index + 1,
    title: service.title,
    description: service.overview.description,
    items: service.overview.bullets,
    slug: service.slug,
  }));

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
      const link = el.querySelector<HTMLAnchorElement>(".service-link");
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

      if (link) {
        gsap.fromTo(
          link,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power1.out",
            scrollTrigger: {
              trigger: link,
              start: "top 90%",
              end: "top 75%",
              toggleActions: "play reverse play reverse",
              scrub: 0.3,
            },
          }
        );
      }
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
      className={`${mont.className} min-h-screen bg-gray-50 p-6 transition-colors duration-300 dark:bg-black md:p-12`}
    >
      <div className="mx-auto max-w-6xl space-y-6">
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={(el) => {
              servicesRef.current[index] = el;
            }}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-black/5 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/5 dark:bg-white/5"
            onMouseMove={(e) => handleMouseMove(e, service.id)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#F4C906]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="relative flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
              <div className="service-icon flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#FFDE48] to-[#F4C906]">
                <Smartphone className="h-6 w-6 text-gray-900 dark:text-black" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
                  {service.title}
                </h2>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300 md:text-base">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {service.items.map((item) => (
                    <div
                      key={item}
                      className="service-item flex items-center gap-2 rounded-full border border-gray-200/80 px-3 py-1 text-sm text-gray-700 transition-colors dark:border-white/10 dark:text-gray-300 md:text-base"
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
                <Link
                  href={`/services/${service.slug}`}
                  className="service-link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-900 transition-colors hover:text-black dark:text-white dark:hover:text-[#F4C906]"
                >
                  <span>Explore this service</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10H15M15 10L11 6M15 10L11 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {hoveredService === service.id && (
              <div
                className="pointer-events-none absolute h-10 w-10 rounded-full bg-gradient-to-b from-[#FFDE48] to-[#F4C906] transition-opacity duration-200 md:h-12 md:w-12"
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
                  className="flex h-full w-full items-center justify-center"
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

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 py-6 md:flex-row md:gap-12 md:py-12">
        <div className="flex flex-wrap justify-center gap-5 md:flex-nowrap">
          {[orange, react].map((logo, i) => (
            <div
              key={i}
              ref={(el) => {
                logosRef.current[i] = el;
              }}
              className="rounded-2xl bg-[#D5D5D51A] p-4 shadow-inner dark:bg-[#ffffff0d] md:p-6"
            >
              <Image src={logo} alt={`logo-${i}`} width={120} />
            </div>
          ))}
        </div>

        <div className="mx-auto my-6 md:my-0">
          <MiddleLogo />
        </div>

        <div className="flex flex-wrap justify-center gap-5 md:flex-nowrap">
          {[figma, mac].map((logo, i) => (
            <div
              key={i}
              ref={(el) => {
                logosRef.current[i + 2] = el;
              }}
              className={`rounded-2xl bg-[#D5D5D51A] p-3 shadow-inner dark:bg-[#ffffff0d] md:p-4 ${
                logo === mac ? "rotate-180" : ""
              }`}
            >
              <Image src={logo} alt={`logo-${i + 2}`} width={120} />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center gap-4 text-center md:gap-6">
        <span className="text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">
          Why Founders <br /> Choose Snappy Tales
        </span>
        <p className="text-lg text-gray-700 dark:text-gray-300 md:text-2xl">
          One Partner, All Solutions – Tech, design, marketing, funding — no juggling agencies.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 md:text-2xl">
          Speed + Quality – We execute fast without compromising results.
        </p>
        <Button>Request a demo</Button>
      </div>

      <div
        ref={headlineRef}
        className={`${inter.className} my-12 text-center text-5xl font-bold text-gray-900 transition-colors duration-300 dark:text-white md:my-16 md:text-8xl`}
      >
        Save smart. Achieve more.
      </div>
    </div>
  );
};

export default Services;
