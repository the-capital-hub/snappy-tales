"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
import Button from "../ui/Button";
import type { ServiceDetail } from "@/lib/serviceDetails";

gsap.registerPlugin(ScrollTrigger);

const accentGradient =
  "from-[#F4C906]/90 via-[#F9E36C]/60 to-transparent";

interface ServiceDetailContentProps {
  service: ServiceDetail;
}

const ServiceDetailContent: React.FC<ServiceDetailContentProps> = ({ service }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-kicker", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from([".hero-title", ".hero-copy"], {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1,
        delay: 0.1,
      });

      gsap.from(".hero-stats .stat-card", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.4,
      });

      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 48,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".timeline-step").forEach((step) => {
        gsap.from(step, {
          opacity: 0,
          x: -32,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-b from-[#02030A] via-[#050A14] to-black text-white"
    >
      <section className="relative overflow-hidden px-6 pb-24 pt-28 md:px-12 md:pt-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="animate-orb-slow absolute -left-32 top-24 h-72 w-72 rounded-full bg-[#F4C906]/40 blur-3xl mix-blend-screen" />
          <div className="animate-orb-fast absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[#8C72FF]/30 blur-3xl mix-blend-screen" />
          <div className="absolute inset-x-0 bottom-[-40%] h-1/2 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 md:flex-row md:items-end">
          <div className="max-w-3xl space-y-6">
            <p className="hero-kicker text-sm uppercase tracking-[0.4em] text-[#F4C906]/80">
              {service.hero.eyebrow}
            </p>
            <h1 className="hero-title text-4xl font-semibold leading-tight text-white md:text-6xl">
              {service.hero.heading}
            </h1>
            <p className="hero-copy text-base text-white/70 md:text-lg">
              {service.hero.description}
            </p>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center">
              <Link href={service.hero.ctaHref} className="inline-flex">
                <Button className="px-6 py-3 text-base md:px-7 md:py-3.5 md:text-lg">
                  {service.hero.ctaLabel}
                </Button>
              </Link>
              {service.hero.secondaryHref && service.hero.secondaryLabel && (
                <Link
                  href={service.hero.secondaryHref}
                  className="group inline-flex items-center justify-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
                >
                  <span>{service.hero.secondaryLabel}</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10H15M15 10L11 6M15 10L11 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          <div className="hero-stats grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-3 md:max-w-xs md:grid-cols-1">
            {service.stats.map((stat) => (
              <div
                key={stat.label}
                className="stat-card rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
              >
                <p className="text-3xl font-semibold text-white md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-wide text-white/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/5 bg-white/[0.03] py-6">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="relative mx-auto flex max-w-6xl overflow-hidden">
          <div className="marquee-track flex min-w-full items-center gap-10 whitespace-nowrap text-xs uppercase tracking-[0.6em] text-white/60 md:text-sm">
            {[...service.marquee, ...service.marquee].map((item, index) => (
              <span key={`${item}-${index}`} className="reveal-up">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.4em] text-[#F4C906]/80 reveal-up">
              Offering snapshot
            </p>
            <h2 className="reveal-up text-3xl font-semibold md:text-5xl">
              {service.title}
            </h2>
            <p className="reveal-up text-base leading-relaxed text-white/70 md:text-lg">
              {service.overview.description}
            </p>
          </div>
          <div className="reveal-up grid gap-3">
            {service.overview.bullets.map((bullet) => (
              <div
                key={bullet}
                className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-[#F4C906]/60 hover:bg-white/10"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${accentGradient} text-black`}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10L8.33333 13.3333L15 6.66667"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-white/80 md:text-base">
                  {bullet}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.4em] text-[#F4C906]/80 reveal-up">
                What we deliver
              </p>
              <h2 className="reveal-up text-3xl font-semibold md:text-5xl">
                Signature capabilities
              </h2>
            </div>
            <p className="reveal-up max-w-xl text-sm text-white/60 md:text-base">
              Every engagement blends strategy, creativity, and execution. These pillars outline how we turn ambition into traction for your team.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {service.features.map((feature) => (
              <div
                key={feature.title}
                className="reveal-up group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-8 backdrop-blur-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-[#F4C906]/10 blur-2xl" />
                <h3 className="text-2xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.5fr_1fr]">
          <div className="reveal-up space-y-4">
            <p className="text-sm uppercase tracking-[0.4em] text-[#F4C906]/80">
              How we partner
            </p>
            <h2 className="text-3xl font-semibold md:text-5xl">Our rhythm</h2>
            <p className="text-base leading-relaxed text-white/70 md:text-lg">
              Momentum matters. Our sprint cadence keeps discoveries, delivery, and optimisations connected so you see progress every single week.
            </p>
          </div>
          <div className="relative space-y-8 border-l border-white/10 pl-8 md:pl-12">
            <div className="absolute left-[-9px] top-0 h-full w-0.5 bg-gradient-to-b from-[#F4C906] via-transparent to-transparent" />
            {service.process.map((step, index) => (
              <div key={step.title} className="timeline-step relative pl-6">
                <div className="absolute left-[-33px] top-2 flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <span className="text-xs font-semibold text-white/80">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-white md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
                  {step.description}
                </p>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.3em] text-[#F4C906]/80">
                  {step.result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl md:grid-cols-[0.9fr_1.1fr] md:p-16">
          <div className="space-y-6">
            <p className="reveal-up text-sm uppercase tracking-[0.4em] text-[#F4C906]/80">
              Impact in motion
            </p>
            <h2 className="reveal-up text-3xl font-semibold md:text-5xl">
              Outcomes you feel on day one
            </h2>
            <p className="reveal-up text-base leading-relaxed text-white/70 md:text-lg">
              Engagements are designed to create visible wins fast while building the systems for compounding momentum.
            </p>
          </div>
          <div className="grid gap-6">
            {service.outcomes.map((outcome) => (
              <div
                key={outcome.title}
                className="reveal-up rounded-2xl border border-white/10 bg-white/[0.06] p-6"
              >
                <h3 className="text-xl font-semibold text-white md:text-2xl">
                  {outcome.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-base">
                  {outcome.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {service.testimonial && (
        <section className="px-6 pb-20 md:px-12">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-white/[0.02] p-10 text-center backdrop-blur-xl">
            <p className="reveal-up text-sm uppercase tracking-[0.4em] text-[#F4C906]/80">
              Founder stories
            </p>
            <blockquote className="reveal-up mt-6 text-2xl font-medium leading-relaxed text-white md:text-3xl">
              “{service.testimonial.quote}”
            </blockquote>
            <p className="reveal-up mt-6 text-sm font-medium uppercase tracking-[0.3em] text-white/70">
              {service.testimonial.author} · {service.testimonial.role}
            </p>
          </div>
        </section>
      )}

      <section className="px-6 pb-24 md:px-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 rounded-3xl border border-white/10 bg-[#F4C906]/15 p-10 text-center backdrop-blur-xl md:p-14">
          <p className="text-sm uppercase tracking-[0.4em] text-black/70">
            Let’s build your next chapter
          </p>
          <h2 className="text-3xl font-semibold text-black md:text-5xl">
            Ready to co-create something legendary?
          </h2>
          <p className="max-w-2xl text-base text-black/80 md:text-lg">
            Share your goals, and we’ll craft a sprint that matches your momentum. Product, design, growth, or capital—we’ve got you covered end to end.
          </p>
          <Link href="/contact" className="inline-flex">
            <Button className="px-6 py-3 text-base md:px-8 md:py-3.5 md:text-lg">
              Book a discovery call
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailContent;
