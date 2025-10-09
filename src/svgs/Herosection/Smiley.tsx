"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Smiley =(props: React.SVGProps<SVGSVGElement>) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return; // ✅ safety check

    const paths = svgRef.current.querySelectorAll("path");

    paths.forEach((path, i) => {
      const svgPath = path as SVGPathElement; // ✅ cast to SVGPathElement
      const length = svgPath.getTotalLength();

      // Initial hidden stroke
      gsap.set(svgPath, {
        opacity: 0,
        stroke: "#F4C906",
        strokeWidth: 1,
        fill: "none", // temporarily hide fill
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      // Animate stroke drawing
      gsap.to(svgPath, {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 1.2,
        delay: i * 0.3,
        ease: "power2.out",
        onComplete: () => {
          // restore original fill color after drawing
          gsap.set(svgPath, { fill: "#F4C906" });
        },
      });
    });
  }, []);

  return (
    <div>
      <svg
      {...props}
        ref={svgRef}
        width="67"
        height="68"
        viewBox="0 0 67 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4.25732 32.2123C4.61791 22.802 8.56114 13.45 17.9132 7.00586C20.4141 5.28433 23.4151 4.19093 26.3115 3.15569C40.5141 -1.92747 58.0318 7.92478 61.8238 25.9543C64.5341 38.8425 61.3236 50.1836 51.1573 58.8262C37.3386 70.5744 16.9245 66.2357 8.31687 50.0324C5.62989 44.9958 4.28059 39.6102 4.25732 32.2123ZM8.34014 31.8866C8.35177 39.8312 10.178 45.7868 14.0049 51.1142C22.1007 62.3972 36.6872 64.9213 47.5631 56.9302C62.4985 45.9496 62.9056 21.6505 48.4006 10.1232C39.5486 3.08589 26.1137 2.86489 17.3665 11.5656C11.3295 17.5677 8.45646 24.8376 8.34014 31.8866Z" fill="#F4C906"/>
        <path d="M34.8843 51.8236C28.5797 51.998 22.2287 47.101 20.9027 41.0408C20.8212 40.6802 20.7863 40.2847 20.7863 39.959C20.7747 39.0401 21.2516 38.8307 21.6238 38.7144C21.9961 38.6097 22.694 38.9586 22.9731 39.3192C23.5082 40.0055 23.8455 40.8314 24.2527 41.6107C25.9509 44.7979 28.3238 47.2522 31.8483 48.3107C38.3622 50.2649 45.2134 45.5656 46.237 38.5166C46.2719 38.2374 46.4348 37.7722 46.5046 37.5628C46.8768 36.5624 47.3188 36.5159 47.8655 36.4694C48.7612 36.3996 49.0636 37.2487 48.9589 38.0513C47.912 45.8913 42.3054 51.6956 34.8843 51.8236Z" fill="#F4C906"/>
        <path d="M43.9457 20.9061C44.0388 20.4292 44.2714 19.7546 45.0508 19.7546C45.8068 19.7546 46.3303 20.2315 46.4931 20.6735C47.668 23.9188 48.1216 27.3037 47.6447 30.7351C47.5749 31.2586 46.9817 32.0495 46.3884 32.0495C45.5393 32.0495 44.8879 31.3051 44.76 30.7468C44.2133 28.4785 43.4456 23.4535 43.9457 20.9061Z" fill="#F4C906"/>
        <path d="M19.0068 27.6874C19.0068 25.6751 19.1348 24.7794 19.3791 23.5115C19.4721 23.0114 19.7164 22.4065 20.4841 22.1622C21.3914 22.1622 21.6589 22.9067 21.7403 23.3371C22.3801 26.7336 22.5662 29.6648 22.5546 33.2475C22.5546 34.0966 22.287 34.969 21.2169 35.0388C20.0537 35.1086 19.8327 34.1897 19.635 33.3056C19.1697 31.27 19.0068 29.7114 19.0068 27.6874Z" fill="#F4C906"/>
      </svg>
    </div>
  );
};

export default Smiley;
