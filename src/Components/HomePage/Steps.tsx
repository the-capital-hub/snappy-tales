"use client";
import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StepSectionHuman } from "@/svgs/Herosection/StepSectionHuman";
import { Montserrat, Moul, Outfit } from "next/font/google";

gsap.registerPlugin(ScrollTrigger);

const outfit = Outfit({ weight: ["300"], subsets: ["latin"], display: "swap" });
const mont = Montserrat({ weight: ["400"], subsets: ["latin"] });
const moul = Moul({ weight: ["400"], subsets: ["latin"] });

const DashPath = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const maskId = useId();

  useEffect(() => {
  const path = pathRef.current;
  const container = containerRef.current;
  if (!path || !container) return;

  const pathLength = path.getTotalLength();

  // Set initial dash state
  gsap.set(path, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength,
  });

  const steps = gsap.utils.toArray(".step-content") as HTMLElement[];


  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 40%",
      end: "bottom 110%",
      scrub: 1.2,
      pin: false,
      markers: false,
    },
  });

  // 1️⃣ Animate path draw
  tl.to(path, {
    strokeDashoffset: 0,
    ease: "none",
    duration: 1, 
  });


  steps.forEach((step, i) => {
    tl.fromTo(
      step,
      {
        opacity: 0,
        x: 10,
        scale: 0.9,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        ease: "power2.out",
        duration: 0.1,
      },
      i / steps.length 
    );
  });

  return () => {
    tl.scrollTrigger?.kill();
    tl.kill();
  };
}, []);


  return (
    <div
      ref={containerRef}
      className="max-w-7xl mx-auto"
      style={{ minHeight: "250vh" }} 
    >
      <svg
        width="1291"
        height="1130"
        viewBox="0 0 1291 1130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id={maskId}>
            <path
              ref={pathRef}
              d="M529.225 2.33398H692.334H783.261C799.829 2.33398 813.261 15.7654 813.261 32.334V184.182V211.578C813.261 222.624 822.215 231.578 833.261 231.578H877.725C888.77 231.578 897.725 240.532 897.725 251.578V313.334V327.334C897.725 343.903 884.293 357.334 867.725 357.334H495.725C479.156 357.334 465.725 370.765 465.725 387.334V533.834C465.725 550.403 452.293 563.834 435.725 563.834H32.7246C16.1561 563.834 2.72461 577.265 2.72461 593.834V740.334C2.72461 756.903 16.1561 770.334 32.7246 770.334H734.225H1258.22C1274.79 770.334 1288.22 783.765 1288.22 800.334V1033.83V1097.83C1288.22 1114.4 1274.79 1127.83 1258.22 1127.83H179.225"
              stroke="white"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>
          <path
            d="M529.225 2.33398H692.334H783.261C799.829 2.33398 813.261 15.7654 813.261 32.334V184.182V211.578C813.261 222.624 822.215 231.578 833.261 231.578H877.725C888.77 231.578 897.725 240.532 897.725 251.578V313.334V327.334C897.725 343.903 884.293 357.334 867.725 357.334H495.725C479.156 357.334 465.725 370.765 465.725 387.334V533.834C465.725 550.403 452.293 563.834 435.725 563.834H32.7246C16.1561 563.834 2.72461 577.265 2.72461 593.834V740.334C2.72461 756.903 16.1561 770.334 32.7246 770.334H734.225H1258.22C1274.79 770.334 1288.22 783.765 1288.22 800.334V1033.83V1097.83C1288.22 1114.4 1274.79 1127.83 1258.22 1127.83H179.225"
            stroke="#F4C906"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="14 14"
          />
        </g>
      </svg>
    </div>
  );
};

export const Steps = () => {
  return (
    <div className="relative min-h-[240vh] my-10 max-w-7xl mx-auto">
      <div className="flex flex-col justify-center items-center gap-5 mb-5">
        <h1 className={`${moul.className} text-5xl tex-center uppercase`}>
          Our Process
        </h1>
        <p className={`${mont.className} text-base text-neutral-500`}>
          How We Turn Your Startup Idea into Growth
        </p>
      </div>
      {/*Step 1*/}
      <div className="absolute left-1/3 top-[7.5rem] step-content z-50 space-y-5">
        <h4
          className={`${moul.className} text-4xl bg-[#F4C906] p-3 inline-flex rounded-xl`}
        >
          Step 1
        </h4>
        <div className="space-y-8">
          <p className={`${moul.className} text-3xl`}>Fill Out a Basic Form</p>
          <p className={`${outfit.className} text-base text-neutral-500`}>
            Provide your startup details and get an instant <br /> estimated
            quote.
          </p>
        </div>
      </div>

       {/*Step 2*/}
      <div className="absolute right-25 top-[30rem] step-content z-50 space-y-5">
        <h4
          className={`${moul.className} text-4xl bg-[#F4C906] p-3 inline-flex rounded-xl`}
        >
          Step 2
        </h4>
        <div className="space-y-6">
          <p className={`${moul.className} text-3xl`}>Schedule a Meeting</p>
          <p className={`${outfit.className} text-base text-neutral-500`}>
            Connect with our expert team to discuss your goals,<br/> challenges, and vision.
          </p>
        </div>
      </div>

       {/*Step 3*/}
      <div className="absolute left-28 top-[42.54rem] step-content z-50 space-y-5">
        <h4
          className={`${moul.className} text-4xl bg-[#F4C906] p-3 inline-flex rounded-xl`}
        >
          Step 3
        </h4>
        <div className="space-y-6">
          <p className={`${moul.className} text-3xl`}>Get Free Tools & Resources</p>
          <p className={`${outfit.className} text-base text-neutral-500`}>
         Receive actionable tools and resources to accelerate your<br/> startup journey.

          </p>
        </div>
      </div>

       {/*Step 4*/}
      <div className="absolute right-[15rem] top-[55.5rem] step-content z-50 space-y-5">
        <h4
          className={`${moul.className} text-4xl bg-[#F4C906] p-3 inline-flex rounded-xl`}
        >
          Step 4
        </h4>
        <div className="space-y-6">
          <p className={`${moul.className} text-3xl`}>Receive a Detailed Business </p>
          <p className={`${outfit.className} text-base text-neutral-500`}>
           We analyze your startup and provide a free report outlining<br/> exactly how we can help.
          </p>
        </div>
      </div>

   {/*Step 5*/}
      <div className="absolute right-[15rem] top-[78rem] step-content z-50 space-y-5">
        <h4
          className={`${moul.className} text-4xl bg-[#F4C906] p-3 inline-flex rounded-xl`}
        >
          Step 5
        </h4>
        <div className="space-y-6">
          <p className={`${moul.className} text-3xl`}>Sign Proposal & Onboard</p>
          <p className={`${outfit.className} text-base text-neutral-500`}>
             Finalize the partnership and get officially onboarded.
          </p>
        </div>
      </div>

         {/*Step 6*/}
      <div className="absolute left-[5rem] top-[78rem] step-content z-50 space-y-5">
        <h4
          className={`${moul.className} text-4xl bg-[#F4C906] p-3 inline-flex rounded-xl`}
        >
          Step 6
        </h4>
        <div className="space-y-6">
          <p className={`${moul.className} text-3xl`}>Let’s Start Building</p>
          <p className={`${outfit.className} text-base text-neutral-500`}>
            We kickstart your project — from tech, design, marketing, GTM <br/> strategy, to funding support — turning your vision into reality.
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 inset-y-10 z-40">
        <StepSectionHuman />
      </div>
      <div></div>
      <div className="absolute top-38 inset-x-0 ">
        <DashPath />
      </div>
    </div>
  );
};
