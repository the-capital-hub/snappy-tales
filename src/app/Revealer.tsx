"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Moul } from "next/font/google";

const ptMoul = Moul({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
  });

const PageRevealer = ({ children, duration = 2.5, revealText = "SNAPPY TALES", onRevealComplete }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const lineRef = useRef(null);
  const topHalfRef = useRef(null);
  const bottomHalfRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Prevent scroll during animation
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        setIsAnimating(false);
        document.body.style.overflow = ""; // restore scroll
        // Trigger callback to start hero section animations
        if (onRevealComplete) {
          onRevealComplete();
        }
      },
    });

    // Stage 1: Line grows from center
    tl.fromTo(
      lineRef.current,
      { width: 0 },
      { width: "200px", duration: duration * 0.32, ease: "power2.out" }
    )
      // Stage 2: Extend line to full width
      .to(lineRef.current, {
        width: "100%",
        duration: duration * 0.28,
      })
      // Stage 3: Reveal text
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: duration * 0.12,
          ease: "power2.out",
        }
      )
      // Pause to show text
      .to({}, { duration: duration * 0.08 })
      // Fade out text and line
      .to(textRef.current, {
        opacity: 0,
        duration: duration * 0.08,
        ease: "power2.in",
      })
      .to(lineRef.current, {
        opacity: 0,
        duration: duration * 0.08,
        ease: "power2.in",
      }, "<")
      // Stage 4: Split animation - top half slides up
      .to(
        topHalfRef.current,
        {
          yPercent: -100,
          duration: duration * 0.32,
          ease: "power3.inOut",
        }
      )
      // Bottom half slides down at the same time
      .to(
        bottomHalfRef.current,
        {
          yPercent: 100,
          duration: duration * 0.32,
          ease: "power3.inOut",
        },
        "<"
      );

    return () => tl.kill();
  }, [duration, onRevealComplete]);

  return (
    <>
      {/* Overlay Revealer - Fixed position, doesn't affect layout */}
      {isAnimating && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          {/* Top Half - starts covering top 50% */}
          <div
            ref={topHalfRef}
            className="absolute top-0 left-0 w-full h-1/2 bg-yellow-300"
          />

          {/* Bottom Half - starts covering bottom 50% */}
          <div
            ref={bottomHalfRef}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-yellow-300"
          />

          {/* Center Line - on top of halves */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div ref={lineRef} className="h-0.5 bg-white shadow-lg" />
          </div>

          {/* Reveal Text - on top of everything */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div
              ref={textRef}
              className={`${ptMoul.className} text-black text-4xl md:text-6xl font-bold  opacity-0 drop-shadow-lg`}
            >
              {revealText}
            </div>
          </div>
        </div>
      )}

      {/* Children are always rendered */}
      <div className={isAnimating ? "invisible" : "visible"}>
        {children}
      </div>
    </>
  );
};

export default PageRevealer;