"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import proj1 from "../../../public/project2.png";
import proj2 from "../../../public/MacBookCapital.png";
import proj3 from "../../../public/MacBookSafety.png";
import proj4 from "../../../public/project4.png";
import human from "../../../public/Transhumans Growth.png";
import { Montserrat, Moul } from "next/font/google";
import Image from "next/image";
import Button from "../ui/Button";

const mont = Montserrat({ weight: ["400"], subsets: ["latin"] });
const moul = Moul({ weight: ["400"], subsets: ["latin"] });

const sliderData = [
  { img: proj1, title: "Full Stack AI Startup" },
  { img: proj2, title: "Capital Hub" },
  { img: proj3, title: "Safety Online" },
  { img: proj4, title: "Parenting Plus" },
];

type State = {
  currentX: number;
  targetX: number;
  velocity: number;
  slideWidth: number;
  slideGap: number;
  slidesCount: number;
  copies: number;
  isDragging: boolean;
  startPointerX: number;
  lastPointerX: number;
  dragDistance: number;
};

export const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const stateRef = useRef<State>({
    currentX: 0,
    targetX: 0,
    velocity: 0,
    slideWidth: 500,
    slideGap: 20,
    slidesCount: sliderData.length,
    copies: 3,
    isDragging: false,
    startPointerX: 0,
    lastPointerX: 0,
    dragDistance: 0,
  });

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    track.innerHTML = "";
    slidesRef.current = [];

    const { slideWidth, slideGap, copies } = stateRef.current;

    // Dynamically adjust slide width for smaller screens
    const getSlideWidth = () =>
      window.innerWidth < 768 ? window.innerWidth * 0.8 : slideWidth;

    stateRef.current.slideWidth = getSlideWidth();

    const renderSlides = () => {
      track.innerHTML = "";
      slidesRef.current = [];

      for (let c = 0; c < copies; c++) {
        for (let i = 0; i < sliderData.length; i++) {
          const { img, title } = sliderData[i];
          const slide = document.createElement("div");
          slide.className =
            "slide flex-shrink-0 rounded-3xl overflow-hidden bg-gradient-to-b from-black to-[#3C361A] dark:from-[#1e1e1e] dark:to-[#000000] p-4 select-none shadow-lg shadow-gray-300/40 dark:shadow-black/50";
          slide.style.width = `${stateRef.current.slideWidth}px`;
          slide.style.margin = `0 ${slideGap / 2}px`;
          slide.style.height = "460px";

          slide.innerHTML = `
            <div class="rounded-xl mb-5 pointer-events-none overflow-hidden">
              <img src="${img.src}" alt="${title}"
                class="w-full h-[300px] object-cover rounded-2xl select-none pointer-events-none"
                draggable="false" />
            </div>
            <div class="bg-[#0000001A] dark:bg-white/5 relative bottom-12 backdrop-blur-md rounded-xl p-4 border border-white/40 dark:border-white/10 select-none flex flex-col justify-between">
              <div>
                <h3 class="text-white dark:text-gray-100 font-semibold text-base mb-2 select-none">${title}</h3>
                <p class="text-gray-300 dark:text-gray-400 text-sm mb-4 leading-snug select-none">
                  Capital HUB provides 360&#39; approach on...
                </p>
              </div>
              <button class="bg-[#F4C906] text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#e5e9b5] transition-colors select-none w-fit">
                View Case Study
              </button>
            </div>
          `;
          track.appendChild(slide);
          slidesRef.current.push(slide);
        }
      }
    };

    renderSlides();

    // Responsive re-render on resize
    const handleResize = () => {
      stateRef.current.slideWidth = getSlideWidth();
      renderSlides();
    };
    window.addEventListener("resize", handleResize);

    const seqWidth =
      sliderData.length * (stateRef.current.slideWidth + slideGap);

      
    const wrapPosition = () => {
  if (stateRef.current.currentX < -seqWidth) {
    stateRef.current.currentX += seqWidth;
    stateRef.current.targetX += seqWidth;
  } else if (stateRef.current.currentX > 0) {
    stateRef.current.currentX -= seqWidth;
    stateRef.current.targetX -= seqWidth;
  }
};

    const updateParallax = () => {
      const viewportCenter = window.innerWidth / 2;
      slidesRef.current.forEach((slide) => {
        const img = slide.querySelector("img");
        if (!img) return;
        const rect = slide.getBoundingClientRect();
        const distance =
          (rect.left + rect.width / 2 - viewportCenter) / viewportCenter;
        const offset = distance * -25;
        gsap.to(img, { x: offset, duration: 0.6, ease: "power2.out" });
      });
    };

    const animate = () => {
      const LERP = 0.1;
      const FRICTION = 0.95;

      const trackEl = trackRef.current;
      if (!trackEl) return;

      // Momentum effect
      if (!stateRef.current.isDragging) {
        stateRef.current.targetX += stateRef.current.velocity;
        stateRef.current.velocity *= FRICTION;
      }

      stateRef.current.currentX +=
        (stateRef.current.targetX - stateRef.current.currentX) * LERP;
      wrapPosition();

      trackEl.style.transform = `translate3d(${stateRef.current.currentX}px,0,0)`;
      updateParallax();

      requestAnimationFrame(animate);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      stateRef.current.targetX -= delta * 1.2;
    };

    const onPointerDown = (e: PointerEvent | TouchEvent) => {
      const clientX =
        e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
      stateRef.current.isDragging = true;
      stateRef.current.startPointerX = clientX;
      stateRef.current.lastPointerX = clientX;
      stateRef.current.velocity = 0;
    };

    const onPointerMove = (e: PointerEvent | TouchEvent) => {
      if (!stateRef.current.isDragging) return;
      const clientX =
        e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - stateRef.current.lastPointerX) * 1.3;
      stateRef.current.targetX += delta;
      stateRef.current.velocity = delta * 0.3;
      stateRef.current.lastPointerX = clientX;
    };

    const onPointerUp = () => {
      stateRef.current.isDragging = false;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    container.addEventListener("touchstart", onPointerDown);
    window.addEventListener("touchmove", onPointerMove);
    window.addEventListener("touchend", onPointerUp);

    const prevent = (e: Event) => e.preventDefault();
    container.addEventListener("selectstart", prevent);
    container.addEventListener("dragstart", prevent);

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      container.removeEventListener("selectstart", prevent);
      container.removeEventListener("dragstart", prevent);
    };
  }, []);

  return (
    <div className="bg-[#F1F5C1] dark:bg-[#000] w-full overflow-hidden select-none transition-colors duration-300">
      <div className="mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto justify-between items-center gap-10 md:gap-0 select-none">
          <Image
            src={human}
            alt="Human reading book"
            width={400}
            draggable={false}
            className="pointer-events-none select-none dark:opacity-90"
          />
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h1
              className={`${moul.className} text-4xl md:text-5xl uppercase text-black dark:text-white`}
            >
              Portfolio Companies
            </h1>
            <p
              className={`${mont.className} text-gray-700 dark:text-gray-300`}
            >
              Some of the Startups we&apos;ve helped grow:
            </p>
            <div className="flex justify-center md:justify-start mb-5">
              <Button>Request a Demo</Button>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          className="slider relative w-full cursor-grab active:cursor-grabbing select-none overflow-hidden"
          style={{ touchAction: "none", userSelect: "none" }}
        >
          <div
            ref={trackRef}
            className="slide-track flex items-center will-change-transform select-none"
            style={{ transform: "translate3d(0,0,0)" }}
          />
        </div>
      </div>
    </div>
  );
};
