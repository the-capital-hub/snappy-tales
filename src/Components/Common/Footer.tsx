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
      // Animate wrapper
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

      // Animate each section
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
        max-w-7xl mx-auto  rounded-3xl px-6 py-10  md:px-12 lg:px-10
        bg-black text-white 
        dark:bg-white dark:text-black
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto ">
        {/* Newsletter Section */}
        <div className="footer-section flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pb-12 border-b border-gray-800 dark:border-gray-700">
          <div className="flex-1 max-w-md">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
              <HardDrive className="w-6 h-6 text-black" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Keep up with the<br />latest
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
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="
                    flex-1 px-4 py-3 rounded-lg text-white placeholder-gray-500 
                    bg-gray-900 border border-gray-800 
                    focus:outline-none focus:ring-2 focus:ring-white
                    dark:bg-white dark:border-gray-700
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
              <p className="text-xs text-gray-500">
                By subscribing you agree to our{" "}
                <Link href="#" className="underline hover:text-gray-700">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="footer-section flex flex-1 gap-18 pt-5 text-sm">
          <div>
            <h3 className="font-bold text-lg mb-4">Logo</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Make your complicated simple
            </p>
          </div>

          {[
            { title: "Logo", links: ["Payment", "Cloud", "Pricing"] },
            { title: "Products", links: ["Personal", "Business", "Invoices"] },
            { title: "Company", links: ["About", "Careers", "Press Kit"] },
            {
              title: "Developer",
              links: ["API Documentation", "Tools", "Change Log"],
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
              links: ["Privacy Policy", "Terms of Service", "Cookies"],
            },
          ].map((section, idx) => (
            <div key={idx}>
              <h3 className="font-semibold text-sm mb-4">{section.title}</h3>
              <ul className="space-y-3 text-gray-400 dark:text-gray-500">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="hover:text-white transition-colors">
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
