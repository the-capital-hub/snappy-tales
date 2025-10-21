"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamMemberCard from "./TeamMemberCard";
import { founder, teamMembers } from "./aboutUsImage";
import type Lenis from "lenis"; 


gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {

 const lenisRef = useRef<Lenis | null>(null);
 const containerRef = useRef<HTMLDivElement | null>(null) 

  useEffect(() => {


    let lenis: Lenis; 

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
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);

      // Integrate Lenis with ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    };

    initLenis();

    const timer = setTimeout(() => {
      // Hero Section
      gsap.fromTo(
        ".hero-section",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
      );

      gsap.fromTo(
        ".hero-description",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.6 }
      );

      // Section Titles
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

      // Timeline Progress Line
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

      // Timeline Items
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, i) => {
        const isLeft = i % 2 === 0;

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

      // Founder Section
      gsap.fromTo(
        ".founder-section",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: ".founder-section",
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Team Members Grid with Stagger
      gsap.utils
        .toArray<HTMLElement>(".team-member-card")
        .forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: i * 0.1,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

      // Mission & Vision Cards
      gsap.utils
        .toArray<HTMLElement>(".mission-card, .vision-card")
        .forEach((card) => {
          gsap.fromTo(
            card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
            }
          );
        });

      // Parallax Background
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
    }, 100);

     return () => {
      clearTimeout(timer);
      if (lenisRef.current) lenisRef.current.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove((time) => {
        if (lenisRef.current) lenisRef.current.raf(time * 1000);
      });
    };
  }, []);

  return (
     <div
      ref={containerRef}
    className="flex flex-col  about-us-container text-gray-900 dark:text-white relative  transition-colors duration-300">
      {/* Parallax Background */}
      <div className="parallax-bg fixed inset-0 -z-10 opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F4C906] via-yellow-400 to-[#F4C906]" />
      </div>

      <main className="grow">
        {/* Hero Section */}
        <section className="hero-section min-h-screen flex items-center justify-center text-center py-16 px-4 relative overflow-hidden">
          <div className="absolute inset-0 dark:bg-black bg-white pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="hero-title text-gray-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 my-4">
              Helping Millions of Indians build startups
            </h1>
            <p className="hero-description text-lg text-gray-700 dark:text-gray-300 max-w-6xl mx-auto leading-relaxed">
              Welcome to The Capital HUB, where our mission is to empower
              millions of aspiring Indian entrepreneurs in building successful
              startups. Our platform provides a dynamic ecosystem, connecting
              startups with investors and mentors, fostering growth and
              innovation. With a relentless commitment to supporting the startup
              community, we strive to be the driving force behind India&apos;s
              entrepreneurial revolution. Join us on this exciting journey as we
              collectively shape a thriving future for the Indian startup
              landscape.
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            {/* Section Title */}
            <h2 className="section-title relative mb-16 font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white after:content-[''] after:absolute after:left-1/2 after:-bottom-3 after:h-1 after:w-3/5 after:bg-[#F4C906] after:-translate-x-1/2 after:rounded-full mx-auto block text-center">
              Our Story
            </h2>

            {/* Timeline */}
            <div className="relative story-timeline max-w-5xl mx-auto overflow-hidden">
              {/* Timeline Base Line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[3px] bg-gray-300 dark:bg-gray-700 -translate-x-1/2 max-lg:left-8 max-lg:translate-x-0 rounded-full overflow-hidden">
                {/* Animated Progress Line */}
                <div className="timeline-progress absolute inset-0 bg-[#F4C906] shadow-[0_0_20px_rgba(244,201,6,0.5)]" />
              </div>

              {/* Timeline Item 1 */}
              <div className="timeline-item relative mb-20 flex items-center max-lg:ml-20">
                <div className="w-1/2 max-lg:w-0" />
                <div className="timeline-dot absolute hidden md:block md:left-1/2 w-6 h-6 rounded-full bg-[#F4C906] shadow-[0_0_20px_rgba(244,201,6,0.6)] -translate-x-1/2 max-lg:left-8 max-lg:translate-x-0 border-4 border-gray-50 dark:border-gray-900 z-10" />
                <div className="w-1/2 max-lg:w-full pl-12 max-lg:pl-8">
                  <div className="timeline-card group p-8 rounded-2xl shadow-lg bg-white dark:bg-neutral-800/50 border-2 border-gray-500 dark:border-gray-100 hover:border-[#F4C906] dark:hover:border-[#F4C906] transition-all duration-300 hover:shadow-2xl hover:shadow-[#f4c906]/20">
                    <div className="absolute -left-4 top-8 w-4 h-4 bg-white dark:bg-neutral-800 border-t-2 border-l-2 border-gray-200 dark:border-gray-700 group-hover:border-[#F4C906] rotate-45 max-lg:hidden transition-colors duration-300" />
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Every startup has a story. Ours began when we saw founders
                      juggling multiple agencies for tech, design, marketing,
                      and growth — wasting time and energy. We asked, “Why not
                      create a one-stop growth engine for startups?”
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="timeline-item relative mb-20 flex items-center flex-row-reverse max-lg:flex-row max-lg:ml-20">
                <div className="w-1/2 max-lg:w-0" />
                <div className="timeline-dot absolute hidden md:block left-1/2 w-6 h-6 rounded-full bg-[#F4C906] shadow-[0_0_20px_rgba(244,201,6,0.6)] -translate-x-1/2 max-lg:left-8 max-lg:translate-x-0 border-4 border-gray-50 dark:border-gray-900 z-10" />
                <div className="w-1/2 max-lg:w-full pr-12 max-lg:pr-0 max-lg:pl-8">
                  <div className="timeline-card group p-8 rounded-2xl shadow-lg bg-white dark:bg-neutral-800/50 border-2 border-gray-500 dark:border-gray-100 hover:border-[#F4C906] dark:hover:border-[#F4C906] transition-all duration-300 hover:shadow-2xl hover:shadow-[#f4c906]/20">
                    <div className="absolute -right-4 top-8 w-4 h-4 bg-white dark:bg-gray-800 border-t-2 border-r-2 border-gray-200 dark:border-gray-700 group-hover:border-[#F4C906] -rotate-45 max-lg:hidden transition-colors duration-300" />
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                     That&apso;s how <strong>Snappy Tales</strong>  was born — a <strong>venture studio and growth partner</strong> helping startups<strong>launch faster, grow smarter, and scale bigger.</strong>  From <strong>web & app development, branding, UI/UX, marketing, GTM strategy, to accelerator support</strong>, we provide everything under one roof so founders can focus on building their vision.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="timeline-item relative mb-20 flex items-center max-lg:ml-20">
                <div className="w-1/2 max-lg:w-0" />
                <div className="timeline-dot absolute hidden md:block left-1/2 w-6 h-6 rounded-full bg-[#F4C906] shadow-[0_0_20px_rgba(244,201,6,0.6)] -translate-x-1/2 max-lg:left-8 max-lg:translate-x-0 border-4 border-gray-50 dark:border-gray-900 z-10" />
                <div className="w-1/2 max-lg:w-full pl-12 max-lg:pl-8">
                  <div className="timeline-card group p-8 rounded-2xl shadow-lg bg-white dark:bg-neutral-800/50 border-2 border-gray-500 dark:border-gray-100 hover:border-[#F4C906] dark:hover:border-[#F4C906] transition-all duration-300 hover:shadow-2xl hover:shadow-[#f4c906]/20">
                    <div className="absolute -left-4 top-8 w-4 h-4 bg-white dark:bg-gray-800 border-t-2 border-l-2 border-gray-200 dark:border-gray-700 group-hover:border-[#F4C906] rotate-45 max-lg:hidden transition-colors duration-300" />
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                     We act as an <strong>extension of your team</strong>, driving growth, solving problems, and building momentum. We don&apos;t just deliver projects —<strong>we partner for your success</strong> .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

           <section className="py-20 bg-gray-50 dark:bg-neutral-900 mission-card">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <h2 className="section-title relative mb-12 font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white after:content-[''] after:absolute after:left-1/2 after:-bottom-3 after:h-1 after:w-3/5 after:bg-[#F4C906] after:-translate-x-1/2 after:rounded-full text-center">
              Our Mission
            </h2>

            <div className="max-w-4xl mx-auto p-10 rounded-3xl bg-white dark:bg-neutral-800/50 border-2 border-gray-400 dark:border-gray-200 hover:border-[#F4C906] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#f4c906]/30">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                To empower startups by providing end-to-end support that accelerates growth,
                maximizes efficiency, and creates measurable impact across industries.
                Our mission is to build strong foundations for founders and guide them to scale
                sustainably through innovation, data, and collaboration.
              </p>
            </div>
          </div>
        </section>

        {/* ✨ Our Vision Section */}
        <section className="py-20 bg-white dark:bg-black vision-card">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <h2 className="section-title relative mb-12 font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white after:content-[''] after:absolute after:left-1/2 after:-bottom-3 after:h-1 after:w-3/5 after:bg-[#F4C906] after:-translate-x-1/2 after:rounded-full text-center">
              Our Vision
            </h2>

            <div className="max-w-4xl mx-auto p-10 rounded-3xl bg-gray-50 dark:bg-neutral-900/60 border-2 border-gray-400 dark:border-gray-200 hover:border-[#F4C906] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#f4c906]/30">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                To be the go-to venture studio and trusted growth partner for startups across India,
                helping them transform bold ideas into impactful ventures. Our vision is to shape
                an ecosystem where innovation, mentorship, and opportunity come together to create
                the next generation of industry leaders.
              </p>
            </div>
          </div>
        </section>


        {/* Founding Team Section */}
        <section className="py-16 bg-gray-100 dark:bg-black">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <h2 className="section-title relative mb-16 font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white after:content-[''] after:absolute after:left-1/2 after:-bottom-3 after:h-1 after:w-3/5 after:bg-[#F4C906] after:-translate-x-1/2 after:rounded-full mx-auto block text-center">
              Founding Team
            </h2>

            <div className="founder-section flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto">
              <div className="lg:w-1/3">
                <TeamMemberCard member={founder} index={0} />
              </div>
              <div className="lg:w-2/3 founder-bio text-center lg:text-left space-y-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  With an entrepreneurial spirit and a flair for innovation,
                  Pramod Badiger, the Founder and CEO of The Capital HUB, is a
                  force to be reckoned with. He thrives on structured processes
                  but cherishes the beauty of unscripted conversations.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  A true believer in diving deep into the details and
                  envisioning the future, he is often found crystal ball gazing
                  to chart the path ahead. As the silent cheerleader and
                  occasional horse whisperer at The Capital HUB, Pramod lends
                  his unwavering support to founders, encouraging them to build
                  their businesses with conviction and individuality.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Warriors Section */}
        <section className="py-16 pb-24">
          <div className="container mx-auto px-6 md:px-12 lg:px-20">
            <h2 className="section-title relative mb-16 font-bold text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white after:content-[''] after:absolute after:left-1/2 after:-bottom-3 after:h-1 after:w-3/5 after:bg-[#F4C906] after:-translate-x-1/2 after:rounded-full mx-auto block text-center">
              Meet Our Warriors
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
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
