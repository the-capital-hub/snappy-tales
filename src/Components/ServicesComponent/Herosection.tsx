"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import BgCircle from "@/svgs/Herosection/BgCircle";
import { Montserrat } from "next/font/google";

const mont = Montserrat({ subsets: ["latin"] });

const Herosection = () => {
  const sBoxRef = useRef(null);
  const path1Ref = useRef<SVGPathElement | null>(null);
  const path2Ref = useRef<SVGPathElement | null>(null);
  const path3Ref = useRef<SVGPathElement | null>(null);
  const path4Ref = useRef<SVGPathElement | null>(null);
  const svgContainerRef = useRef<HTMLDivElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({
        onComplete: () => {
          window.dispatchEvent(new Event("heroAnimationComplete"));
        },
      });

      masterTl.from(sBoxRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
        delay: 0.3,
      });

      masterTl.to(
        svgContainerRef.current,
        {
          scale: 1.3,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      );

      const paths = [path1Ref.current, path2Ref.current, path3Ref.current, path4Ref.current];
      paths.forEach((path, index) => {
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });

          masterTl.to(
            path,
            {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: "power2.inOut",
            },
            index === 0 ? "-=0.3" : "<+=0.15"
          );
        }
      });

      masterTl.to(
        svgContainerRef.current,
        {
          scale: 1,
          duration: 0.8,
          ease: "power2.inOut",
        },
        "+=0.3"
      );

      if (textContainerRef.current) {
        const children = Array.from(textContainerRef.current.children);
        masterTl.from(children, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full px-6 md:px-12 mx-auto my-auto min-h-screen overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      {/* Background Circle */}
      <div className="fixed hidden inset-0 md:flex items-center justify-center -z-10 pointer-events-none">
        <BgCircle />
      </div>

      {/* SVG Animation Container */}
      <div
        ref={svgContainerRef}
        className="flex justify-center items-center mt-16 md:mt-24 mb-8 md:mb-12 scale-100"
      >
        <svg
          width="888"
          height="280"
          viewBox="0 0 888 239"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-4xl"
        >
          {/* S Box */}
          <g ref={sBoxRef}>
            <rect
              x="404.5"
              y="159.5"
              width="79"
              height="79"
              rx="15.5"
              fill="#F4C906"
              stroke="#866D00"
            />
            <path
              d="M434.406 209C434.406 209 436.635 208.865 441.094 208.594C443.156 208.469 445.229 208.26 447.312 207.969L447.531 204.031L436.562 199.719C435.917 199.469 435.427 198.99 435.094 198.281C434.76 197.552 434.594 196.979 434.594 196.562C434.594 196.146 434.594 195.885 434.594 195.781C434.615 195.656 434.646 195.375 434.688 194.938L435.375 189.031C435.583 187.365 436.427 186.208 437.906 185.562C438.823 185.146 439.979 184.771 441.375 184.438C444.229 183.771 446.229 183.323 447.375 183.094L450.406 182.438C451.281 182.271 452.062 182.125 452.75 182L454.188 189.156L442 190.969L441.5 193.969L453.031 199.344C454.427 199.99 455.021 201.229 454.812 203.062L453.969 210.594C453.781 212.198 452.479 213.271 450.062 213.812C447.479 214.521 444.615 215.042 441.469 215.375C438.344 215.729 436.281 215.927 435.281 215.969L434.406 209Z"
              fill="black"
              className="dark:fill-white transition-colors duration-500"
            />
          </g>

          {/* Dots and Paths */}
          <circle cx="756" cy="6.5" r="5.333" fill="#F4C906" />
          <path
            ref={path1Ref}
            d="M487.5 190.5V191.5H558.005V190.5V189.5H487.5V190.5ZM558.005 190.5V191.5C662.537 191.5 749.348 110.824 756.997 6.57317L756 6.5L755.003 6.42683C747.431 109.633 661.489 189.5 558.005 189.5V190.5Z"
            fill="none"
            stroke="url(#paint0_linear_190_17481)"
            strokeWidth="2"
          />
          <circle cx="882" cy="6" r="5.333" fill="#F4C906" />
          <path
            ref={path2Ref}
            d="M484 203.5V204.5H645.775V203.5V202.5H484V203.5ZM881.453 8.84555L882.434 9.03449L882.982 6.18894L882 6L881.018 5.81106L880.471 8.65662L881.453 8.84555ZM645.775 203.5V204.5C761.318 204.5 860.604 122.497 882.434 9.03449L881.453 8.84555L880.471 8.65662C858.821 121.177 760.36 202.5 645.775 202.5V203.5Z"
            fill="none"
            stroke="url(#paint1_linear_190_17481)"
            strokeWidth="2"
          />
          <circle cx="132" cy="6.5" r="5.333" fill="#F4C906" />
          <path
            ref={path3Ref}
            d="M400.5 190.5V191.5H329.995V190.5V189.5H400.5V190.5ZM329.995 190.5V191.5C225.463 191.5 138.652 110.824 131.003 6.57317L132 6.5L132.997 6.42683C140.569 109.633 226.511 189.5 329.995 189.5V190.5Z"
            fill="none"
            stroke="url(#paint2_linear_190_17481)"
            strokeWidth="2"
          />
          <circle cx="6" cy="6" r="5.333" fill="#F4C906" />
          <path
            ref={path4Ref}
            d="M404 203.5V204.5H242.225V203.5V202.5H404V203.5ZM6.54749 8.84555L5.56552 9.03449L5.01801 6.18894L6 6L6.98199 5.81106L7.52948 8.65662L6.54749 8.84555ZM242.225 203.5V204.5C126.682 204.5 27.3962 122.497 5.56552 9.03449L6.54749 8.84555L7.52948 8.65662C29.179 121.177 127.64 202.5 242.225 202.5V203.5Z"
            fill="none"
            stroke="url(#paint3_linear_190_17481)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient id="paint0_linear_190_17481" x1="487" y1="191" x2="770.5" y2="6" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#F4C906" />
            </linearGradient>
            <linearGradient id="paint1_linear_190_17481" x1="486.264" y1="191.503" x2="797.337" y2="-105.513" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#F4C906" />
            </linearGradient>
            <linearGradient id="paint2_linear_190_17481" x1="401" y1="191" x2="117.5" y2="6" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#F4C906" />
            </linearGradient>
            <linearGradient id="paint3_linear_190_17481" x1="401.736" y1="191.503" x2="90.6626" y2="-105.513" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" />
              <stop offset="1" stopColor="#F4C906" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Hero Text */}
      <div
        ref={textContainerRef}
        className={`${mont.className} flex flex-col items-center justify-center gap-4 md:gap-6 transition-colors duration-500`}
      >
        <h1 className="text-4xl md:text-5xl font-bold max-w-full md:max-w-4xl text-center leading-snug text-black dark:text-white">
          Everything Your Startup Needs to Launch, Grow & Scale
        </h1>
        <p className="text-lg md:text-xl max-w-full md:max-w-5xl text-center text-gray-800 dark:text-gray-300">
          Snappy Tales isn&#39;t just an agency — we&#39;re your venture studio +
          growth partner. From tech to traction, we handle everything so you
          can focus on building your vision.
        </p>
      </div>
    </div>
  );
};

export default Herosection;
