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

    // create slide copies
    for (let c = 0; c < copies; c++) {
      for (let i = 0; i < sliderData.length; i++) {
        const { img, title } = sliderData[i];
        const slide = document.createElement("div");
        slide.className =
          "slide flex-shrink-0 rounded-3xl overflow-hidden bg-gradient-to-b from-black to-[#3C361A] p-4 select-none";
        slide.style.width = `${slideWidth}px`;
        slide.style.margin = `0 ${slideGap / 2}px`;
        slide.style.height = "460px";

        slide.innerHTML = `
          <div class="rounded-xl mb-5 pointer-events-none overflow-hidden">
            <img src="${img.src}" alt="${title}"
              class="w-full h-[300px] object-cover rounded-2xl select-none pointer-events-none"
              draggable="false" />
          </div>
          <div class="bg-[#0000001A] relative bottom-12 backdrop-blur-md rounded-xl p-4 border border-white/40 select-none flex flex-col justify-between ">
            <div>
              <h3 class="text-white font-semibold text-base mb-2 select-none">${title}</h3>
              <p class="text-gray-300 text-sm mb-4 leading-snug select-none">
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

    const seqWidth = sliderData.length * (slideWidth + slideGap);

    const wrapPosition = (): void => {
      const { copies: cp } = stateRef.current;
      const totalWidth = seqWidth * cp;
      if (stateRef.current.currentX < -seqWidth) {
        stateRef.current.currentX += seqWidth;
        stateRef.current.targetX += seqWidth;
      } else if (stateRef.current.currentX > 0) {
        stateRef.current.currentX -= seqWidth;
        stateRef.current.targetX -= seqWidth;
      }
    };

    const updateParallax = (): void => {
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

    const animate = (): void => {
      const LERP = 0.1;
      const trackEl = trackRef.current;
      if (!trackEl) return;

      stateRef.current.currentX +=
        (stateRef.current.targetX - stateRef.current.currentX) * LERP;
      wrapPosition();
      trackEl.style.transform = `translate3d(${stateRef.current.currentX}px,0,0)`;
      updateParallax();
      requestAnimationFrame(animate);
    };

    const handleWheel = (e: WheelEvent): void => {
      e.preventDefault();
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      stateRef.current.targetX -= delta * 1.2;
    };

    const onPointerDown = (e: PointerEvent | TouchEvent): void => {
      const clientX =
        e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
      stateRef.current.isDragging = true;
      stateRef.current.startPointerX = clientX;
      stateRef.current.lastPointerX = clientX;
      stateRef.current.dragDistance = 0;
    };

    const onPointerMove = (e: PointerEvent | TouchEvent): void => {
      if (!stateRef.current.isDragging) return;
      const clientX =
        e instanceof TouchEvent ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - stateRef.current.lastPointerX) * 1.2;
      stateRef.current.targetX += delta;
      stateRef.current.dragDistance += Math.abs(delta);
      stateRef.current.lastPointerX = clientX;
    };

    const onPointerUp = (): void => {
      stateRef.current.isDragging = false;
    };

    // Event Listeners
    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("touchstart", onPointerDown);
    window.addEventListener("touchmove", onPointerMove);
    window.addEventListener("touchend", onPointerUp);

    // Disable unwanted selections
    const prevent = (e: Event) => e.preventDefault();
    container.addEventListener("selectstart", prevent);
    container.addEventListener("dragstart", prevent);
    container.addEventListener("dblclick", prevent);

    requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      container.removeEventListener("selectstart", prevent);
      container.removeEventListener("dragstart", prevent);
      container.removeEventListener("dblclick", prevent);
    };
  }, []);

  return (
    <div className="bg-[#F1F5C1] w-full overflow-hidden select-none">
      <div className="mx-auto px-4 py-12">
        <div className="flex max-w-7xl mx-auto justify-between items-center select-none">
          <Image
            src={human}
            alt="Human reading book"
            width={400}
            draggable={false}
            className="pointer-events-none select-none"
          />
          <div className="flex-col gap-3 flex select-none">
            <h1 className={`${moul.className} text-5xl uppercase select-none`}>
              Portfolio Companies
            </h1>
            <div className="space-y-3 select-none">
              <p className={`${mont.className} font-thin select-none`}>
                Some of the Startups we&apos;ve helped grow:
              </p>
              <Button>Request a Demo</Button>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div
          ref={containerRef}
          className="slider relative w-full cursor-grab active:cursor-grabbing select-none overflow-hidden"
          style={{ touchAction: "pan-y", userSelect: "none" }}
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
