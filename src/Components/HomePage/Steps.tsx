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

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const steps = gsap.utils.toArray(".step-content-desktop") as HTMLElement[];

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

    tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 });

    steps.forEach((step, i) => {
      tl.fromTo(
        step,
        { opacity: 0, x: 10, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, ease: "power2.out", duration: 0.1 },
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
      className="hidden md:block max-w-7xl mx-auto"
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
            className="stroke-[#F4C906] dark:stroke-[#e2bb05]"
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
  const mobileSteps = [
    {
      step: "Step 1",
      title: "Fill Out a Basic Form",
      desc: "Provide your startup details and get an instant estimated quote.",
    },
    {
      step: "Step 2",
      title: "Schedule a Meeting",
      desc: "Connect with our expert team to discuss your goals, challenges, and vision.",
    },
    {
      step: "Step 3",
      title: "Get Free Tools & Resources",
      desc: "Receive actionable tools and resources to accelerate your startup journey.",
    },
    {
      step: "Step 4",
      title: "Receive a Detailed Business",
      desc: "We analyze your startup and provide a free report outlining exactly how we can help.",
    },
    {
      step: "Step 5",
      title: "Sign Proposal & Onboard",
      desc: "Finalize the partnership and get officially onboarded.",
    },
    {
      step: "Step 6",
      title: "Let’s Start Building",
      desc: "We kickstart your project — from tech, design, marketing, GTM strategy, to funding support — turning your vision into reality.",
    },
  ];

  return (
    <div className="relative dark:bg-black py-10 mx-auto max-w-7xl">
      {/* Section Header */}
      <div className="flex flex-col justify-center items-center gap-0 max-w-7xl mx-auto">
        <h1
          className={`${moul.className} text-5xl text-center uppercase text-black dark:text-white`}
        >
          Our Process
        </h1>
        <p
          className={`${mont.className} text-base text-neutral-500 dark:text-neutral-400`}
        >
          How We Turn Your Startup Idea into Growth
        </p>
      </div>

      {/* Desktop Steps (manual, absolute) */}
      <div className="hidden md:block relative min-h-[250vh]">
        {/* Step 1 */}
        <div className="absolute left-1/3 top-[10.5rem] step-content-desktop z-50 space-y-5">
          <h4 className={`${moul.className} text-4xl bg-[#F4C906] p-3 inline-flex rounded-xl`}>
            Step 1
          </h4>
          <div className="space-y-8">
            <p className={`${moul.className} text-3xl text-black dark:text-white`}>
              Fill Out a Basic Form
            </p>
            <p className={`${outfit.className} text-base text-neutral-500 dark:text-neutral-400`}>
              Provide your startup details and get an instant <br /> estimated quote.
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="absolute right-35 top-[33rem] step-content-desktop z-50 space-y-5">
          <h4 className={`${moul.className} text-4xl bg-[#F4C906] p-3 inline-flex rounded-xl`}>Step 2</h4>
          <div className="space-y-6">
            <p className={`${moul.className} text-3xl text-black dark:text-white`}>Schedule a Meeting</p>
            <p className={`${outfit.className} text-base text-neutral-500 dark:text-neutral-400`}>
              Connect with our expert team to discuss your goals, <br /> challenges, and vision.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="absolute left-28 top-[45.5rem] step-content-desktop z-50 space-y-5">
          <h4 className={`${moul.className} text-4xl bg-[#F4C906] p-3 inline-flex rounded-xl`}>Step 3</h4>
          <div className="space-y-6">
            <p className={`${moul.className} text-3xl text-black dark:text-white`}>Get Free Tools & Resources</p>
            <p className={`${outfit.className} text-base text-neutral-500 dark:text-neutral-400`}>
              Receive actionable tools and resources to accelerate your <br /> startup journey.
            </p>
          </div>
        </div>

        {/* Step 4 */}
        <div className="absolute right-[15rem] top-[58.5rem] step-content-desktop z-50 space-y-5">
          <h4 className={`${moul.className} text-4xl bg-[#F4C906] p-3 inline-flex rounded-xl`}>Step 4</h4>
          <div className="space-y-6">
            <p className={`${moul.className} text-3xl text-black dark:text-white`}>Receive a Detailed Business</p>
            <p className={`${outfit.className} text-base text-neutral-500 dark:text-neutral-400`}>
              We analyze your startup and provide a free report outlining <br /> exactly how we can help.
            </p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="absolute right-[15rem] top-[81rem] step-content-desktop z-50 space-y-5">
          <h4 className={`${moul.className} text-4xl bg-[#F4C906] p-3 inline-flex rounded-xl`}>Step 5</h4>
          <div className="space-y-6">
            <p className={`${moul.className} text-3xl text-black dark:text-white`}>Sign Proposal & Onboard</p>
            <p className={`${outfit.className} text-base text-neutral-500 dark:text-neutral-400`}>
              Finalize the partnership and get officially onboarded.
            </p>
          </div>
        </div>

        {/* Step 6 */}
        <div className="absolute left-[5rem] top-[81rem] step-content-desktop z-50 space-y-5">
          <h4 className={`${moul.className} text-4xl bg-[#F4C906] p-3 inline-flex rounded-xl`}>Step 6</h4>
          <div className="space-y-6">
            <p className={`${moul.className} text-3xl text-black dark:text-white`}>Let’s Start Building</p>
            <p className={`${outfit.className} text-base text-neutral-500 dark:text-neutral-400`}>
              We kickstart your project — from tech, design, marketing, GTM <br /> strategy, to funding support — turning your vision into reality.
            </p>
          </div>
        </div>

        <div className="absolute inset-x-0 inset-y-10 z-40">
          <StepSectionHuman />
        </div>

        <div className="absolute top-50 inset-x-0">
          <DashPath />
        </div>
      </div>

      {/* Mobile Steps */}
      <div className="flex flex-col gap-10 md:hidden max-w-3xl mx-auto mt-10 px-4">
        {mobileSteps.map((step, i) => (
          <div key={i} className="space-y-3">
            <h4 className={`${moul.className} text-2xl bg-[#F4C906] p-2 inline-flex rounded-xl`}>
              {step.step}
            </h4>
            <p className={`${moul.className} text-xl text-black dark:text-white`}>{step.title}</p>
            <p className={`${outfit.className} text-sm text-neutral-500 dark:text-neutral-400`}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
