"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { Moul } from "next/font/google";

const ptMoul = Moul({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

interface PageRevealerProps {
  children: ReactNode;
  duration?: number;
  revealText?: string;
  onRevealComplete?: () => void;
}

const PageRevealer: React.FC<PageRevealerProps> = ({
  children,
  duration = 2.5,
  revealText = "SNAPPY TALES",
  onRevealComplete,
}) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const topHalfRef = useRef<HTMLDivElement | null>(null);
  const bottomHalfRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

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

    tl.fromTo(lineRef.current, { width: 0 }, { width: "200px", duration: duration * 0.32, ease: "power2.out" })
      .to(lineRef.current, { width: "100%", duration: duration * 0.28 })
      .fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: duration * 0.12, ease: "power2.out" }
      )
      .to({}, { duration: duration * 0.08 })
      .to(textRef.current, { opacity: 0, duration: duration * 0.08, ease: "power2.in" })
      .to(lineRef.current, { opacity: 0, duration: duration * 0.08, ease: "power2.in" }, "<")
      .to(topHalfRef.current, { yPercent: -100, duration: duration * 0.32, ease: "power3.inOut" })
      .to(bottomHalfRef.current, { yPercent: 100, duration: duration * 0.32, ease: "power3.inOut" }, "<");

 return () => {
    tl.kill();
  };
}, [duration, onRevealComplete]);

  return (
    <>
      {isAnimating && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          <div ref={topHalfRef} className="absolute top-0 left-0 w-full h-1/2 bg-yellow-300" />
          <div ref={bottomHalfRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-yellow-300" />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div ref={lineRef} className="h-0.5 bg-white shadow-lg" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div
              ref={textRef}
              className={`${ptMoul.className} text-black text-4xl md:text-6xl font-bold opacity-0 drop-shadow-lg`}
            >
              {revealText}
            </div>
          </div>
        </div>
      )}

      <div className={isAnimating ? "invisible" : "visible"}>{children}</div>
    </>
  );
};

export default PageRevealer;
