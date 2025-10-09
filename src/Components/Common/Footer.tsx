"use client"
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
      // Animate footer wrapper
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 100 },
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

      // Animate inner sections individually
      gsap.utils.toArray<HTMLElement>(".footer-section").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%", // starts when each section enters
              end: "top 60%",
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
      className="bg-black max-w-6xl mx-auto rounded-3xl mb-14 text-white px-6 py-8 md:px-12 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Newsletter Section */}
        <div className="footer-section flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pb-12 border-b border-gray-800">
          <div className="flex-1 max-w-md">
            <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-6">
              <HardDrive className="w-6 h-6 text-black" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Keep up with the<br />latest
            </h2>
            <p className="text-gray-400 text-sm">
              Join our newsletter to stay up to date on features and releases.
            </p>
          </div>

          <div className="flex-1 max-w-md lg:pt-8">
            <div className="space-y-4">
              <label className="block text-sm text-gray-400">
                Stay up to date
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                />
                <button
                  onClick={handleSubscribe}
                  className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing you agree to our{" "}
                <Link href="#" className="underline hover:text-white">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-section flex gap-15 pt-12">
          {/* Logo Column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Logo</h3>
            <p className="text-sm text-gray-500">
              Make your complicated simple
            </p>
          </div>

          {/* Logo Links */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Logo</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Payment
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Cloud
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Products</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Personal
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Invoices
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Company</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Developer</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  API Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition-colors">
                  Change Log
                </Link>
              </li>
            </ul>
          </div>

          {/* Community & Support & Legal */}
          <div className="flex justify-between gap-10">
            <div className="mb-6 lg:mb-8">
              <h3 className="font-semibold text-sm mb-4">Community</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Host a meetup
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Join
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mb-6 lg:mb-8">
              <h3 className="font-semibold text-sm mb-4">Support</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-4">Legal</h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
