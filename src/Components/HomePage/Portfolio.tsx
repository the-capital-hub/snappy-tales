"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Moul, Outfit, Instrument_Sans } from "next/font/google";
import Button from "../ui/Button";
import boy from "@/../public/Transhumans Growth.png";
import bgImg from "@/../public/Container.png";

gsap.registerPlugin(ScrollTrigger);

const ptMoul = Moul({ weight: ["400"], subsets: ["latin"], display: "swap" });
const ptOutfit = Outfit({ weight: ["400"], subsets: ["latin"], display: "swap" });
const ptSans = Instrument_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

const PORTFOLIO_ITEMS = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  title: "Capital Hub",
  description: "Capital HUB provides 360 degree approach on ...",
}));

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const racesWrapperRef = useRef<HTMLDivElement>(null);
  const racesRef = useRef<HTMLDivElement>(null);
  const boyRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // HERO IMAGE + TEXT ANIMATION WITH SCRUB
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "top 40%",
          scrub: 1,
        },
      });

      heroTl
        .from(boyRef.current, {
          x: -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        })
        .from(
          textRef.current?.children || [],
          {
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5"
        );

      // ✅ HORIZONTAL SCROLL SECTION (INSPIRED FROM YOUR JS SNIPPET)
      const races = racesRef.current;
      const racesWrapper = racesWrapperRef.current;
      if (!races || !racesWrapper) return;

      function getScrollAmount() {
  return races!.scrollWidth - window.innerWidth;
}

const tween = gsap.to(races, {
  x: () => getScrollAmount(),
  ease: "none",
});

ScrollTrigger.create({
  trigger: racesWrapper,
  start: "top top",
  end: () => `+=${getScrollAmount()}`,
  pin: true,
  scrub: 1,
  animation: tween,
  invalidateOnRefresh: true,
  markers: true,
});
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[rgba(241,245,193,1)] border-t-12 border-b-12 border-black mt-20 overflow-hidden"
    >
      {/* HERO SECTION */}
      <div className="flex items-center justify-center py-15 gap-10 max-w-7xl mx-auto px-4">
        <div ref={boyRef}>
          <Image
            src={boy}
            alt="A Boy sitting with book"
            width={420}
            height={440}
            priority
          />
        </div>

        <div ref={textRef}>
          <h1
            className={`${ptMoul.className} lg:text-5xl text-[rgba(29,30,32,1)]`}
          >
            PORTFOLIO COMPANIES
          </h1>
          <p
            className={`${ptOutfit.className} lg:text-2xl text-[rgba(55,57,60,1)] py-4`}
          >
            Some of the startups we&apos;ve helped grow:
          </p>
          <Button>Request A Demo</Button>
        </div>
      </div>

      {/* HORIZONTAL SCROLL SECTION */}
      <div
        ref={racesWrapperRef}
        className="relative h-[100vh] flex items-center overflow-hidden racesWrapper"
      >
        <div
          ref={racesRef}
          className="flex gap-8 p-10 will-change-transform races"
        >
          {PORTFOLIO_ITEMS.map((item) => (
            <div
              key={item.id}
              className="relative max-w-xl rounded-4xl flex-shrink-0 card-background"
            >
              <div className="relative h-[540px]">
                <Image
                  src={bgImg}
                  alt={`${item.title} ${item.id}`}
                  className="rounded-4xl object-cover"
                  width={800}
                />

                <div className="absolute top-90 left-1/2 -translate-x-1/2 w-[80%] rounded-2xl p-6 bg-[rgba(0,0,0,0.5)] shadow-lg">
                  <h3
                    className={`text-white text-2xl ${ptSans.className} font-600`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-2 text-white ${ptSans.className} font-400 text-[16px]`}
                  >
                    {item.description}
                  </p>
                  <button
                    className={`mt-4 inline-flex items-center font-400 text-sm gap-2 bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-500 transition ${ptSans.className}`}
                  >
                    View Case Study <span>➜</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
