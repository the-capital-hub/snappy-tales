"use client";

import React, { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import ContactForm from "@/Components/ContactUs/Form";
import { contactInfo, socialLinks } from "@/Components/ContactUs/contactInfo";
import Footer from "@/Components/Common/Footer";
import type Lenis from "lenis"; 

export default function ContactUs() {
  const lenisRef = useRef<Lenis | null>(null); 

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
    };

    initLenis();

    return () => {
      if (lenisRef.current) lenisRef.current.destroy();
    };
  }, []);

  return (
    <div className="min-h-fit flex flex-col pt-10 bg-white dark:bg-black">
      <main className="grow">
        <div className="container mx-auto py-12 px-6 md:px-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 dark:text-white text-black">Contact Us</h1>
            <p className="dark:text-gray-500 text-gray-600">
              Our experts will be happy to assist you with your queries
            </p>
          </div>

          <div className="bg-black dark:bg-white/80 rounded-xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Contact Information */}
              <div className="bg-[#F4C906] p-8 text-white">
                <h2 className="text-2xl text-black font-semibold mb-4">Contact Information</h2>
                <p className="text-neutral-800 mb-8">Say something to start a live chat!</p>

                <div className="space-y-6">
                  {contactInfo.map((item, index) => {
                    const isMapPin =
                      React.isValidElement(item.icon) && item.icon.type === MapPin;

                    return (
                      <a
                        key={index}
                        href={item.href}
                        className="flex items-start gap-4 text-gray-300 hover:text-white transition-colors"
                        target={isMapPin ? "_blank" : undefined}
                        rel={isMapPin ? "noopener noreferrer" : undefined}
                      >
                        <span className="mt-1 text-black">{item.icon}</span>
                        <span className="text-black">{item.text}</span>
                      </a>
                    );
                  })}
                </div>

                <div className="flex gap-4 mt-12">
                  {socialLinks.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:text-neutral-900 transition-colors"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>

                <div className="relative mt-12">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full border border-[#F4C906] opacity-50"></div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="col-span-2 p-8">
                <ContactForm />
                <div className="hidden md:block absolute bottom-12 right-12">
                  <svg
                    width="80"
                    height="80"
                    viewBox="0 0 80 80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M70 10L36 44"
                      stroke="#F4C906"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M70 10L48 70L36 44L10 32L70 10Z"
                      stroke="#F4C906"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
