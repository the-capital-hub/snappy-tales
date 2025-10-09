"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Hand = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const path = svgRef.current.querySelector("path") as SVGPathElement | null;
    if (!path) return;

    const length = path.getTotalLength();

    // Hide the stroke initially
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Animate drawing the path
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 3,
      ease: "power2.out",
    });

    // Add a subtle "wiggle" after drawing completes
    gsap.to(path, {
      rotation: 3,
      transformOrigin: "center center",
      yoyo: true,
      repeat: -1,
      duration: 1,
      ease: "sine.inOut",
      delay: 3, // wait until after drawing finishes
    });
  }, []);

  return (
    <div>
      <svg
        ref={svgRef}
        width="100"
        height="119"
        viewBox="0 0 135 119"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M66.4337 42.5331C66.4337 42.5331 50.7809 25.5222 34.8677 15.2011M77.1856 30.8389C67.5803 19.0306 59.6935 12.7442 53.4215 9.90135M115.13 62.0505C113.843 59.3386 112.046 55.8067 109.858 51.8174M83.3622 97.427C83.3622 97.427 76.7074 96.9205 68.5092 95.8224M78.6341 48.726C84.7895 52.5732 89.9952 58.7233 93.0772 63.248M65.8916 61.8456C71.9453 65.282 76.3186 69.3111 81.1594 73.8858M68.5092 95.8224C50.0222 93.346 19.7804 87.0547 18.7796 72.336C17.4873 53.3302 49.7125 59.0717 49.7125 59.0717C49.7125 59.0717 -8.50635 29.2175 6.43111 11.3876C12.5651 4.06584 23.7796 8.00951 34.8677 15.2011M68.5092 95.8224C68.5092 95.8224 64.057 108.089 71.7816 113.835C86.3496 124.672 144.204 63.6647 127.947 48.938C120.286 41.9978 109.858 51.8174 109.858 51.8174M109.858 51.8174C96.6349 27.7073 68.8492 -12.6413 53.4215 9.90135M53.4215 9.90135C42.6473 5.01784 36.6381 10.296 34.8677 15.2011"
          stroke="#F4C906"
          strokeWidth="6.438"
        />
      </svg>
    </div>
  );
};

export default Hand;
