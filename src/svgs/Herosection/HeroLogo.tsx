"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HeroLogo = () => {
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const paths = pathsRef.current;

    paths.forEach((path, i) => {
        if(!path) return
      const length = path.getTotalLength();

      // Start hidden
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fill: "transparent",
        stroke: "black",
        strokeWidth: 2,
      });

      // Animate stroke drawing
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        delay: i * 0.4, // stagger
        ease: "power2.out",
      });

      // Fill after stroke animation
      gsap.to(path, {
        fill: "black",
        stroke: "none",
        delay: 1.2 + i * 0.4,
        duration: 0.5,
        ease: "power1.inOut",
      });
    });
  }, []);

  return (
    <div className="w-[173px]">
      <svg
        width="150"
        height="150"
        viewBox="0 0 173 188"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_205_20494)">
          <path
            ref={(el) => {pathsRef.current[0] = el}}
            d="M2.56445 47.3914C2.56445 21.458 23.5876 0.434814 49.521 0.434814H169.847V6.30437C169.847 32.2377 148.824 53.2609 122.891 53.2609H2.56445V47.3914Z"
            fill="black"
          />
        </g>
        <g filter="url(#filter1_d_205_20494)">
          <path
            ref={(el) => {pathsRef.current[1] = el}}
            d="M2.56445 70.8696C2.56445 96.803 23.5876 117.826 49.521 117.826H169.847V111.957C169.847 86.0232 148.824 65 122.891 65H2.56445V70.8696Z"
            fill="black"
          />
        </g>
        <g filter="url(#filter2_d_205_20494)">
          <path
            ref={(el) => {pathsRef.current[2] = el}}
            d="M2.56445 153.044C2.56445 140.077 13.076 129.565 26.0427 129.565H169.847V135.435C169.847 161.368 148.824 182.391 122.891 182.391H2.56445V153.044Z"
            fill="black"
          />
        </g>

        <defs>
          <filter
            id="filter0_d_205_20494"
            x="0.216627"
            y="0.434814"
            width="171.979"
            height="57.5217"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2.34783" />
            <feGaussianBlur stdDeviation="1.17391" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.514423 0 0 0 0 0.514423 0 0 0 0 0.514423 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_205_20494"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_205_20494"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_d_205_20494"
            x="0.216627"
            y="65"
            width="171.979"
            height="57.5217"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2.34783" />
            <feGaussianBlur stdDeviation="1.17391" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.514423 0 0 0 0 0.514423 0 0 0 0 0.514423 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_205_20494"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_205_20494"
              result="shape"
            />
          </filter>
          <filter
            id="filter2_d_205_20494"
            x="0.216627"
            y="129.565"
            width="171.979"
            height="57.5217"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="2.34783" />
            <feGaussianBlur stdDeviation="1.17391" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.514423 0 0 0 0 0.514423 0 0 0 0 0.514423 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_205_20494"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_205_20494"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default HeroLogo;
