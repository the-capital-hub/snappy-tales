"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HeroLogo = () => {
  const pathsRef = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    const paths = pathsRef.current;

    paths.forEach((path, i) => {
      if (!path) return;
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
    <div className="w-[173px] dark:hidden block">
      <svg
        width="150"
        height="150"
        viewBox="0 0 173 188"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_205_20494)">
          <path
            ref={(el) => {
              pathsRef.current[0] = el;
            }}
            d="M2.56445 47.3914C2.56445 21.458 23.5876 0.434814 49.521 0.434814H169.847V6.30437C169.847 32.2377 148.824 53.2609 122.891 53.2609H2.56445V47.3914Z"
            fill="black"
          />
        </g>
        <g filter="url(#filter1_d_205_20494)">
          <path
            ref={(el) => {
              pathsRef.current[1] = el;
            }}
            d="M2.56445 70.8696C2.56445 96.803 23.5876 117.826 49.521 117.826H169.847V111.957C169.847 86.0232 148.824 65 122.891 65H2.56445V70.8696Z"
            fill="black"
          />
        </g>
        <g filter="url(#filter2_d_205_20494)">
          <path
            ref={(el) => {
              pathsRef.current[2] = el;
            }}
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

export const DarkHeroLogo = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Step 1: Animate main yellow circle scale
      tl.fromTo(
        "#circle",
        { scale: 0, transformOrigin: "center center" },
        { scale: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }
      );

      // Step 2: Animate each black bar sequentially
      tl.fromTo(
        "#bar1",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.6"
      )
        .fromTo(
          "#bar2",
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          "#bar3",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4"
        );

      // Step 3: Gentle looping pulse for the circle
      // gsap.to("#circle", {
      //   scale: 1.05,
      //   transformOrigin: "center center",
      //   duration: 2,
      //   repeat: -1,
      //   yoyo: true,
      //   ease: "sine.inOut",
      // });
    }, logoRef);

    return () => ctx.revert(); // cleanup on unmount
  }, []);

  return (
    <div ref={logoRef} className="dark:block hidden rounded-full">
      <svg
        width="230"
        height="230"
        viewBox="0 0 317 318"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === Yellow Circle === */}
        <g id="circle" filter="url(#filter0_d_552_28209)">
          <rect
            x="23.5"
            y="22"
            width="270"
            height="270"
            rx="135"
            fill="#F4C906"
          />
        </g>

        {/* === Black Bars === */}
        <g id="bar1" filter="url(#filter1_d_552_28209)">
          <path
            d="M74.5652 112.391C74.5652 86.458 95.5883 65.4348 121.522 65.4348H241.848V71.3044C241.848 97.2377 220.825 118.261 194.891 118.261H74.5652V112.391Z"
            fill="black"
          />
        </g>
        <g id="bar2" filter="url(#filter2_d_552_28209)">
          <path
            d="M74.5654 135.87C74.5654 161.803 95.5886 182.826 121.522 182.826H241.848V176.957C241.848 151.023 220.825 130 194.892 130H74.5654V135.87Z"
            fill="black"
          />
        </g>
        <g id="bar3" filter="url(#filter3_d_552_28209)">
          <path
            d="M74.5654 218.044C74.5654 205.077 85.077 194.565 98.0437 194.565H241.848V200.435C241.848 226.368 220.825 247.391 194.892 247.391H74.5654V218.044Z"
            fill="black"
          />
        </g>

        {/* === Filters === */}
        <defs>
          <filter
            id="filter0_d_552_28209"
            x="0.0217361"
            y="0.869563"
            width="316.957"
            height="316.957"
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
            <feGaussianBlur stdDeviation="11.7391" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.956863 0 0 0 0 0.788235 0 0 0 0 0.0235294 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_552_28209"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_552_28209"
              result="shape"
            />
          </filter>

          <filter
            id="filter1_d_552_28209"
            x="72.2174"
            y="65.4348"
            width="171.978"
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
              result="effect1_dropShadow_552_28209"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_552_28209"
              result="shape"
            />
          </filter>

          <filter
            id="filter2_d_552_28209"
            x="72.2176"
            y="130"
            width="171.978"
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
              result="effect1_dropShadow_552_28209"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_552_28209"
              result="shape"
            />
          </filter>

          <filter
            id="filter3_d_552_28209"
            x="72.2176"
            y="194.565"
            width="171.978"
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
              result="effect1_dropShadow_552_28209"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_552_28209"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
};
