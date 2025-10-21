"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { HardDrive } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [email, setEmail] = useState("");
  const footerRef = useRef<HTMLDivElement | null>(null);

  const handleSubscribe = () => {
    if (email) {
      console.log("Subscribing email:", email);
      setEmail("");
    }
  };

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".footer-section").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 5 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 80%",
              scrub: true,
            },
          }
        );
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="
        max-w-7xl mx-auto rounded-3xl px-6 py-5 md:px-12 lg:px-10
        bg-black text-white 
        dark:bg-white dark:text-black
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="footer-section flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pb-12 border-b border-gray-800 dark:border-gray-700">
          <div className="flex-1 max-w-md text-center lg:text-left">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-6 mx-auto lg:mx-0">
              <HardDrive className="w-6 h-6 text-black" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Keep up with the<br className="hidden sm:block" /> latest
            </h2>
            <p className="text-gray-500 text-sm">
              Join our newsletter to stay up to date on features and releases.
            </p>
          </div>

          <div className="flex-1 max-w-md lg:pt-8">
            <div className="space-y-4">
              <label className="block text-sm text-gray-500">
                Stay up to date
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="
                    flex-1 px-4 py-3 rounded-lg text-white placeholder-gray-500 
                    bg-gray-900 border border-gray-800 
                    focus:outline-none focus:ring-2 focus:ring-white
                    dark:bg-white dark:border-gray-700 dark:text-black
                  "
                />
                <button
                  onClick={handleSubscribe}
                  className="
                    px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap
                    bg-yellow-400 text-black hover:bg-gray-200
                    dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500
                  "
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center sm:text-left">
                By subscribing you agree to our{" "}
                <Link href="#" className="underline hover:text-gray-700">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div
          className="
            footer-section grid grid-cols-2  md:grid-cols-4 lg:flex 
            flex-wrap justify-between gap-4 pt-10 text-sm
          "
        >
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-bold text-lg mb-4 uppercase">Snappy tales</h3>
            <p className="text-gray-500 uppercase font-semibold  dark:text-gray-400">
              Save Smart & Achieve More
            </p>
          </div>

          {[
            { title: "Products", links: ["Personal", "Business", "Invoices"] },
            { title: "Company", links: ["About", "Careers", "Book A Slot"] },
            {
              title: "Services",
              links: ["Website & App development", "Branding & UI/UX design", "Marketing & Growth", "GTM & Scaling", "Accelrator Support & Investor Connect"],
            },
            {
              title: "Community",
              links: ["Host a meetup", "Join"],
            },
            {
              title: "Support",
              links: ["Help", "FAQ", "Contact"],
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service"],
            },
          ].map((section, idx) => (
            <div key={idx} className="min-w-[120px]">
              <h3 className="font-semibold text-sm mb-3">{section.title}</h3>
              <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="hover:text-white dark:hover:text-black transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
