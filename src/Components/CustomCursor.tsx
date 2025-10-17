"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    // Hide the default cursor
    document.body.style.cursor = "none";

    const moveCursor = (e:MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Hover effect for clickable elements
    const addHover = () =>
      gsap.to(cursor, { scale: 1.8, backgroundColor: "#000", duration: 0.3 });
    const removeHover = () =>
      gsap.to(cursor, { scale: 1, backgroundColor: "#fff", duration: 0.3 });

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
      className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
    ></div>
  );
};

export default CustomCursor;
