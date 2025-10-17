"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Footer from "./Footer";

export default function FooterWrapper() {
  const [showFooter, setShowFooter] = useState(false);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleHeroComplete = () => {
      setShowFooter(true);
    };

 
    window.addEventListener("heroAnimationComplete", handleHeroComplete);

    return () => {
      window.removeEventListener("heroAnimationComplete", handleHeroComplete);
    };
  }, []);

  useEffect(() => {
    if (!showFooter || !footerRef.current) return;

    gsap.fromTo(
      footerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, [showFooter]);

  return (
    <div ref={footerRef} className="w-full dark:bg-black bg-white">
      {showFooter && <Footer />}
    </div>
  );
}
