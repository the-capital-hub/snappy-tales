"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Detect if device has a fine pointer (i.e., a mouse)
    const isDesktop = window.matchMedia("(pointer: fine)").matches;

    if (!isDesktop) {
      // Don't show or run cursor logic on mobile/tablet
      if (cursorRef.current) cursorRef.current.style.display = "none";
      document.body.style.cursor = "auto";
      return;
    }

    const cursor = cursorRef.current!;
    document.body.style.cursor = "none";

    // Smooth GSAP movement
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power2.out" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    // Hover animations (only color change, no scale)
    const addHover = () =>
      gsap.to(cursor, { backgroundColor: "#000", duration: 0.3 });
    const removeHover = () =>
      gsap.to(cursor, { backgroundColor: "#fff", duration: 0.3 });

    const hoverables = document.querySelectorAll("a, button, .hover-target");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference shadow-[0_0_10px_rgba(255,255,255,0.5)]"
    ></div>
  );
};

export default CustomCursor;