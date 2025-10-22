"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamMemberCard from "./TeamMemberCard";
import { founder, teamMembers } from "./aboutUsImage";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

type TimelineEvent = {
  align: "left" | "right";
  content: ReactNode;
};

type ImpactStat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description: string;
};

const timelineEvents: TimelineEvent[] = [
  {
    align: "left",
    content: (
      <>
        Every startup has a story. Ours began when we saw founders juggling
        multiple agencies for tech, design, marketing, and growth—wasting
        time and energy. We asked,
        <strong>
          {" "}
          “Why not create a one-stop growth engine for startups?”
        </strong>
      </>
    ),
  },
  {
    align: "right",
    content: (
      <>
        That&apos;s how <strong>Snappy Tales</strong> was born—a
        <strong> venture studio and growth partner</strong> helping startups
        <strong> launch faster, grow smarter, and scale bigger.</strong> From
        <strong> web &amp; app development, branding, UI/UX, marketing, GTM
        strategy, to accelerator support</strong>, we provide everything under
        one roof so founders can focus on building their vision.
      </>
    ),
  },
  {
    align: "left",
    content: (
      <>
        We act as an <strong>extension of your team</strong>, driving growth,
        solving problems, and building momentum. We don&apos;t just deliver
        projects—<strong>we partner for your success.</strong>
      </>
    ),
  },
  {
    align: "right",
    content: (
      <>
        Today, our tribe of strategists, builders, storytellers, and growth
        experts <strong>craft immersive brand experiences</strong> and
        <strong> unlock capital connections</strong> for founders who dare to
        dream big.
      </>
    ),
  },
];

const heroPills = [
  "Product strategy & launch roadmaps",
  "Design + technology build squads",
  "Performance-led growth experiments",
  "Capital, mentors & community access",
];

const impactStats: ImpactStat[] = [
  {
    label: "Startups Empowered",
    value: 120,
    suffix: "+",
    description: "Founders we have guided from idea to launch.",
  },
  {
    label: "Capital Raised Through Our Network",
    value: 85,
    prefix: "₹",
    suffix: "Cr+",
    description:
      "Investments unlocked via angels, VCs, and ecosystem partners.",
  },
  {
    label: "Campaign Success Rate",
    value: 96,
    suffix: "%",
    description:
      "Growth experiments that hit or surpassed the north-star metric.",
  },
  {
    label: "Partner Mentors & Experts",
    value: 250,
    suffix: "+",
    description:
      "Strategists, builders, and storytellers backing every cohort.",
  },
];

const floatingShapes = [
  "top-[-6rem] left-[-8rem] h-64 w-64 rounded-full bg-gradient-to-br from-[#F4C906]/70 via-[#fde68a]/40 to-transparent blur-3xl mix-blend-screen dark:from-[#F4C906]/40 dark:via-[#fde68a]/10",
  "bottom-[-5rem] right-[-6rem] h-72 w-72 rounded-full bg-gradient-to-br from-[#f8d34b]/60 via-[#fff8d9]/30 to-transparent blur-3xl mix-blend-screen dark:from-[#f4c906]/30 dark:via-[#f4c906]/10",
  "top-[18%] right-[18%] h-32 w-32 rounded-full border border-[#F4C906]/40 bg-[#F4C906]/20 backdrop-blur-2xl mix-blend-screen dark:border-[#F4C906]/30 dark:bg-[#F4C906]/10",
  "bottom-[22%] left-[20%] h-28 w-28 rounded-full border border-white/50 bg-white/40 backdrop-blur-xl mix-blend-screen dark:border-[#F4C906]/20 dark:bg-[#F4C906]/10",
];

export default function AboutPage() {
  const lenisRef = useRef<Lenis | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let lenis: Lenis | null = null;
    let rafId = 0;

    const ticker = (time: number) => {
      if (lenis) {
        lenis.raf(time * 1000);
      }
    };

    const initLenis = async () => {
      const { default: Lenis } = await import("lenis");

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);

      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    };

    initLenis();

    let ctx: gsap.Context | null = null;

    const timer = window.setTimeout(() => {
      if (!containerRef.current) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".hero-section",
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" }
        );

        gsap.fromTo(
          ".hero-title",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.2 }
        );

        gsap.fromTo(
          ".hero-description",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.4 }
        );

        gsap.utils.toArray<HTMLElement>(".hero-pill").forEach((pill, index) => {
          gsap.fromTo(
            pill,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.6 + index * 0.1,
              ease: "power2.out",
            }
          );
        });

        gsap.utils
          .toArray<HTMLElement>(".floating-shape")
          .forEach((shape, index) => {
            gsap.fromTo(
              shape,
              { opacity: 0, scale: 0.8 },
              {
                opacity: 0.6,
                scale: 1,
                duration: 1.2,
                ease: "power3.out",
                delay: index * 0.2,
              }
            );

            gsap.to(shape, {
              y: index % 2 === 0 ? 40 : -40,
              x: index % 2 === 0 ? -30 : 30,
              duration: 12 + index * 2,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });

            gsap.to(shape, {
              rotate: index % 2 === 0 ? 6 : -6,
              duration: 14,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: index * 0.3,
            });
          });

        gsap.utils.toArray<HTMLElement>(".section-title").forEach((title) => {
          gsap.fromTo(
            title,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              scrollTrigger: {
                trigger: title,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        gsap.fromTo(
          ".timeline-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: ".story-timeline",
              start: "top 70%",
              end: "bottom 30%",
              scrub: 1,
            },
          }
        );

        gsap.utils
          .toArray<HTMLElement>(".timeline-item")
          .forEach((item, index) => {
            const isLeft = index % 2 === 0;

            gsap.fromTo(
              item,
              { x: isLeft ? -50 : 50, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                  trigger: item,
                  start: "top 80%",
                  end: "top 50%",
                  toggleActions: "play none none reverse",
                },
              }
            );

            const dot = item.querySelector(".timeline-dot");
            if (dot) {
              gsap.fromTo(
                dot,
                { scale: 0, opacity: 0 },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 0.5,
                  scrollTrigger: {
                    trigger: item,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            }
          });

        gsap.utils
          .toArray<HTMLElement>(".impact-card")
          .forEach((card, index) => {
            gsap.fromTo(
              card,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                delay: index * 0.1,
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });

        gsap.utils
          .toArray<HTMLElement>(".impact-stat-value")
          .forEach((stat) => {
            const { value, prefix = "", suffix = "" } = stat.dataset;
            const targetValue = Number(value ?? 0);
            const counter = { value: 0 };

            gsap.to(counter, {
              value: targetValue,
              duration: 2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: stat,
                start: "top 85%",
                toggleActions: "play none none none",
              },
              onUpdate: () => {
                stat.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
              },
              onComplete: () => {
                stat.textContent = `${prefix}${Math.round(targetValue)}${suffix}`;
              },
            });
          });

        gsap.utils
          .toArray<HTMLElement>(".glow-card")
          .forEach((card) => {
            gsap.fromTo(
              card,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });

        gsap.to(".parallax-bg", {
          y: 150,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-us-container",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      }, containerRef);
    }, 120);

    return () => {
      window.clearTimeout(timer);

      if (ctx) {
        ctx.revert();
      }

      if (lenis) {
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
        lenisRef.current = null;
      }

      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="about-us-container relative flex flex-col text-gray-900 transition-colors duration-300 dark:text-white"
    >
      <div className="parallax-bg pointer-events-none fixed inset-0 -z-10 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,201,6,0.45),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(244,201,6,0.25),transparent_65%)]" />
      </div>

      <main className="grow">
        <section className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 text-center">
          <div className="absolute inset-0 bg-white/70 backdrop-blur-lg dark:bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fdf6c3]/60 to-transparent dark:via-[#f4c906]/10" />
          <div className="pointer-events-none absolute inset-0">
            {floatingShapes.map((shape, index) => (
              <div key={index} className={`floating-shape ${shape}`} />
            ))}
          </div>
          <div className="container relative z-10 mx-auto px-4">
            <span className="hero-kicker inline-flex items-center justify-center rounded-full border border-yellow-200/70 bg-yellow-50/60 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-yellow-600 shadow-sm dark:border-[#f4c906]/20 dark:bg-[#f4c906]/10 dark:text-[#f4c906]">
              Our Story
            </span>
            <h1 className="hero-title mx-auto mt-6 max-w-5xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
              Building <span className="bg-gradient-to-r from-[#F4C906] via-[#ffda44] to-[#F4C906] bg-clip-text text-transparent">timeless startup tales</span> with heart and velocity
            </h1>
            <p className="hero-description mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              We are the storytellers, builders, and growth partners powering India&apos;s boldest founders. From shaping product strategy to orchestrating capital connects, Snappy Tales blends design, technology, and marketing to turn sparks of ideas into ventures that shine.
            </p>
            <div className="hero-pills mt-10 flex flex-wrap items-center justify-center gap-3">
              {heroPills.map((pill) => (
                <div
                  key={pill}
                  className="hero-pill group relative overflow-hidden rounded-full border border-yellow-200/80 bg-white/70 px-5 py-2 text-sm font-medium text-gray-700 shadow-[0_10px_40px_rgba(244,201,6,0.18)] transition duration-300 hover:-translate-y-1 hover:border-[#F4C906] hover:bg-white dark:border-[#f4c906]/20 dark:bg-white/5 dark:text-gray-100"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#F4C906]/0 via-[#F4C906]/15 to-[#F4C906]/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="relative z-10">{pill}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-20">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <h2 className="section-title relative mb-6 block text-center text-3xl font-bold text-gray-900 after:absolute after:left-1/2 after:-bottom-3 after:h-1 after:w-3/5 after:-translate-x-1/2 after:rounded-full after:bg-[#F4C906] md:text-4xl lg:text-5xl dark:text-white">
              Our Story
            </h2>
            <p className="mx-auto mb-16 max-w-3xl text-center text-base text-gray-600 dark:text-gray-300">
              What started as a desire to simplify the founder journey has grown into a studio that designs, builds, and markets the next wave of Indian innovation.
            </p>
            <div className="story-timeline relative mx-auto max-w-5xl overflow-hidden">
              <div className="absolute top-0 bottom-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full bg-gray-300 dark:bg-gray-700 max-lg:left-8 max-lg:translate-x-0">
                <div className="timeline-progress absolute inset-0 bg-[#F4C906] shadow-[0_0_20px_rgba(244,201,6,0.5)]" />
              </div>
              {timelineEvents.map((event, index) => {
                const isLeft = event.align === "left";
                return (
                  <div
                    key={`timeline-${index}`}
                    className={`timeline-item relative mb-20 flex items-stretch ${
                      isLeft ? "" : "flex-row-reverse"
                    } max-lg:ml-20 max-lg:flex-row`}
                  >
                    <div className="w-1/2 max-lg:hidden" />
                    <div
                      className={`timeline-dot absolute hidden h-6 w-6 -translate-x-1/2 rounded-full border-4 border-gray-50 bg-[#F4C906] shadow-[0_0_20px_rgba(244,201,6,0.6)] dark:border-gray-900 md:block ${
                        isLeft ? "left-1/2 max-lg:left-8 max-lg:translate-x-0" : "left-1/2 max-lg:left-8 max-lg:translate-x-0"
                      }`}
                    />
                    <div
                      className={`w-1/2 ${
                        isLeft
                          ? "pl-12 max-lg:w-full max-lg:pl-8"
                          : "pr-12 max-lg:w-full max-lg:pl-8 max-lg:pr-0"
                      }`}
                    >
                      <div className="timeline-card group relative overflow-hidden rounded-2xl border-2 border-gray-400 bg-white/90 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#F4C906] hover:shadow-2xl hover:shadow-[#f4c906]/20 dark:border-gray-100/30 dark:bg-neutral-900/70">
                        <div
                          className={`absolute top-8 h-4 w-4 rotate-45 border-2 border-gray-200 bg-white transition-colors duration-300 dark:border-gray-700 dark:bg-neutral-900 ${
                            isLeft
                              ? "-left-4 border-t-2 border-l-2 group-hover:border-[#F4C906]"
                              : "-right-4 border-t-2 border-r-2 group-hover:border-[#F4C906]"
                          } max-lg:hidden`}
                        />
                        <p className="relative text-base leading-relaxed text-gray-700 dark:text-gray-300">
                          {event.content}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white via-[#fff8d9]/70 to-white py-20 dark:from-black dark:via-neutral-950 dark:to-black">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <h2 className="section-title relative mb-6 block text-center text-3xl font-bold text-gray-900 after:absolute after:left-1/2 after:-bottom-3 after:h-1 after:w-3/5 after:-translate-x-1/2 after:rounded-full after:bg-[#F4C906] md:text-4xl lg:text-5xl dark:text-white">
              Our Impact
            </h2>
            <p className="mx-auto mb-14 max-w-3xl text-center text-base text-gray-600 dark:text-gray-300">
              Momentum looks like numbers, but it feels like confidence. Here&apos;s a glimpse of the energy we bring to every partnership.
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {impactStats.map((stat) => (
                <div
                  key={stat.label}
                  className="impact-card group relative overflow-hidden rounded-3xl border border-yellow-200/60 bg-white/70 p-6 shadow-[0_25px_80px_rgba(244,201,6,0.18)] transition-all duration-500 hover:-translate-y-3 hover:border-[#F4C906] hover:shadow-[0_35px_110px_rgba(244,201,6,0.25)] dark:border-[#f4c906]/20 dark:bg-neutral-900/60"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-[#F4C906]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative z-10 space-y-4">
                    <span
                      className="impact-stat-value block text-4xl font-bold text-gray-900 sm:text-5xl dark:text-white"
                      data-value={stat.value.toString()}
                      data-prefix={stat.prefix ?? ""}
                      data-suffix={stat.suffix ?? ""}
                    >
                      0
                    </span>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {stat.label}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mission-card bg-gray-50 py-20 dark:bg-neutral-900">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <h2 className="section-title relative mb-6 text-center text-3xl font-bold text-gray-900 after:absolute after:left-1/2 after:-bottom-3 after:h-1 after:w-3/5 after:-translate-x-1/2 after:rounded-full after:bg-[#F4C906] md:text-4xl lg:text-5xl dark:text-white">
              Our Mission
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-base text-gray-600 dark:text-gray-300">
              To build compounding momentum for founders with frameworks, creativity, and execution that turns ambition into traction.
            </p>
            <div className="glow-card group relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-yellow-200/60 bg-white/80 p-[1px] shadow-[0_30px_90px_rgba(244,201,6,0.2)] transition-all duration-500 hover:-translate-y-2 dark:border-[#f4c906]/20 dark:bg-neutral-900/60">
              <div className="relative rounded-3xl bg-white/95 p-10 text-lg leading-relaxed text-gray-700 dark:bg-neutral-950/70 dark:text-gray-300">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#F4C906]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <p className="relative z-10 text-center">
                  To empower startups by providing end-to-end support that accelerates growth, maximizes efficiency, and creates measurable impact across industries. Our mission is to build strong foundations for founders and guide them to scale sustainably through innovation, data, and collaboration.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="vision-card bg-white py-20 dark:bg-black">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <h2 className="section-title relative mb-6 text-center text-3xl font-bold text-gray-900 after:absolute after:left-1/2 after:-bottom-3 after:h-1 after:w-3/5 after:-translate-x-1/2 after:rounded-full after:bg-[#F4C906] md:text-4xl lg:text-5xl dark:text-white">
              Our Vision
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-base text-gray-600 dark:text-gray-300">
              To become the go-to venture studio and trusted growth partner for the founders rewriting India&apos;s startup story.
            </p>
            <div className="glow-card group relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-yellow-200/60 bg-gray-50/80 p-[1px] shadow-[0_30px_90px_rgba(244,201,6,0.2)] transition-all duration-500 hover:-translate-y-2 dark:border-[#f4c906]/20 dark:bg-neutral-900/70">
              <div className="relative rounded-3xl bg-white/95 p-10 text-lg leading-relaxed text-gray-700 dark:bg-neutral-950/70 dark:text-gray-300">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#F4C906]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <p className="relative z-10 text-center">
                  To be the go-to venture studio and trusted growth partner for startups across India, helping them transform bold ideas into impactful ventures. Our vision is to shape an ecosystem where innovation, mentorship, and opportunity come together to create the next generation of industry leaders.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20 dark:bg-black">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <h2 className="section-title relative mb-6 block text-center text-3xl font-bold text-gray-900 after:absolute after:left-1/2 after:-bottom-3 after:h-1 after:w-3/5 after:-translate-x-1/2 after:rounded-full after:bg-[#F4C906] md:text-4xl lg:text-5xl dark:text-white">
              Founding Team
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-center text-base text-gray-600 dark:text-gray-300">
              The heartbeat of Snappy Tales—a founder obsessed with momentum and meaningful outcomes.
            </p>
            <div className="founder-section mx-auto flex max-w-6xl flex-col items-center gap-12 rounded-3xl border border-yellow-200/60 bg-white/80 p-10 shadow-[0_30px_90px_rgba(244,201,6,0.18)] transition-transform duration-500 hover:-translate-y-1 dark:border-[#f4c906]/20 dark:bg-neutral-900/70 lg:flex-row">
              <div className="lg:w-1/3">
                <TeamMemberCard member={founder} index={0} />
              </div>
              <div className="founder-bio space-y-6 text-center text-lg leading-relaxed text-gray-700 dark:text-gray-300 lg:w-2/3 lg:text-left">
                <p>
                  With an entrepreneurial spirit and a flair for innovation, Pramod Badiger, the Founder and CEO of The Capital HUB, is a force to be reckoned with. He thrives on structured processes but cherishes the beauty of unscripted conversations.
                </p>
                <p>
                  A true believer in diving deep into the details and envisioning the future, he is often found crystal ball gazing to chart the path ahead. As the silent cheerleader and occasional horse whisperer at The Capital HUB, Pramod lends his unwavering support to founders, encouraging them to build their businesses with conviction and individuality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 pb-24">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <h2 className="section-title relative mb-6 block text-center text-3xl font-bold text-gray-900 after:absolute after:left-1/2 after:-bottom-3 after:h-1 after:w-3/5 after:-translate-x-1/2 after:rounded-full after:bg-[#F4C906] md:text-4xl lg:text-5xl dark:text-white">
              Meet Our Warriors
            </h2>
            <p className="mx-auto mb-14 max-w-3xl text-center text-base text-gray-600 dark:text-gray-300">
              A powerhouse crew that brings imagination, craft, and data-led execution to every founder story.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member-card">
                  <TeamMemberCard member={member} index={index} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
