"use client";

import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import Button from "../ui/Button";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { useTheme } from "next-themes";
import { ThemeToggle } from "../theme-toggle";

const outfit = Outfit({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const Logo: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => setMounted(true), []);
  const currentTheme = mounted ? resolvedTheme : "light";

  useEffect(() => {
    if (!svgRef.current || hasAnimated.current || !mounted) return;
    hasAnimated.current = true;

    const paths = svgRef.current.querySelectorAll("path");

    paths.forEach((path, i) => {
      const length = (path as SVGPathElement).getTotalLength();

      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 0.8,
        delay: i * 0.2,
        ease: "power2.inOut",
      });
    });
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div>
      <svg
        ref={svgRef}
        width="28"
        height="29"
        viewBox="0 0 28 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M2 8.18421C2 4.46355 5.01619 1.44737 8.73684 1.44737H26V2.28947C26 6.01013 22.9838 9.02632 19.2632 9.02632H2V8.18421Z"
            fill="#F4C906"
          />
          <path
            d="M2 11.5526C2 15.2733 5.01619 18.2895 8.73684 18.2895H26V17.4474C26 13.7267 22.9838 10.7105 19.2632 10.7105H2V11.5526Z"
            fill={currentTheme === "dark" ? "#ffffff" : "#000000"}
          />
          <path
            d="M2 23.3421C2 21.4818 3.50809 19.9737 5.36842 19.9737H26V20.8158C26 24.5364 22.9838 27.5526 19.2632 27.5526H2V23.3421Z"
            fill="#F4C906"
          />
        </g>
      </svg>
    </div>
  );
};

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = mounted ? resolvedTheme : "light";

  useEffect(() => {
    if (!navRef.current) return;

    const navEl = navRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(navEl, {
        y: -80,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      const navItems = navEl.querySelectorAll(".nav-item");
      tl.from(
        navItems,
        {
          y: -30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      const maxScroll = 300;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (menuOpen) {
      // Lock body scroll
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline();

      // Animate overlay
      tl.fromTo(
        mobileMenuRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      // Animate menu content
      tl.fromTo(
        ".mobile-menu-content",
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
        "-=0.2"
      );

      // Animate menu items
      tl.fromTo(
        ".mobile-menu-item",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.3, ease: "power2.out" },
        "-=0.2"
      );
    } else {
      // Unlock body scroll
      document.body.style.overflow = "unset";

      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  const handleCalendly = () => {
    window.open("https://calendly.com/capitalhub-discovery/meeting-with-ceo", "_blank");
     setMenuOpen(false);
  }


  const links = [
    { label: "Home", href: "/" },
    { label: "Our Story", href: "/our-story" },
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Contact Us", href: "/contact" },
  ];

  if (!mounted) return null;

  const navBg = isScrolled
    ? currentTheme === "dark"
      ? "md:border-white/40 border-white/20"
      : "md:border-black/10 border-transparent"
    : currentTheme === "dark"
    ? "border-white/20"
    : "border-transparent md:border-black/5";

  const minOpacity = currentTheme === "dark" ? 0.2 : 0.4;
  const maxOpacity = currentTheme === "dark" ? 0.9 : 0.98;
  const easedProgress = Math.min(Math.max(scrollProgress, 0), 1);
  const opacity = minOpacity + (maxOpacity - minOpacity) * easedProgress;
  const baseColor = currentTheme === "dark" ? "17, 17, 17" : "255, 255, 255";
  const navStyle: CSSProperties = {
    backgroundColor: `rgba(${baseColor}, ${opacity})`,
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
  };

  const linkActive =
    "text-black bg-yellow-300/40 dark:text-black dark:bg-white";
  const linkInactive =
    "text-black/60 hover:text-black hover:bg-yellow-300/20 dark:text-white dark:hover:text-white dark:hover:bg-yellow-400";

  return (
    <>
      <nav
        ref={navRef}
        className={`md:fixed max-w-7xl px-6 py-3 w-full mx-auto left-0 right-0 z-50 transition-all duration-300 ${
          outfit.className
        } border ${navBg} ${
          isScrolled
            ? "md:rounded-full transition-all duration-300 top-4"
            : "rounded-xl"
        } transition-all duration-300`}
        style={navStyle}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="nav-item flex items-center gap-2 text-xl md:text-2xl font-bold uppercase flex-shrink-0"
            >
              <Logo />
              <h1
                className={
                  currentTheme === "dark" ? "text-white" : "text-black"
                }
              >
                Snappy Tales
              </h1>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center justify-center gap-2">
              {links.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className={`nav-item relative px-4 py-2 rounded-xl text-base font-medium transition-all duration-200 flex items-center gap-1 ${
                    pathname === link.href ? linkActive : linkInactive
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown size={16} />}
                </Link>
              ))}
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="nav-item hidden lg:block">
                <Button onClick={handleCalendly}>Book A Call</Button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden flex flex-col relative justify-between  w-6 h-5 focus:outline-none flex-shrink-0"
                aria-label="Toggle Menu"
              >
                <span
                  className={`h-0.5 w-full rounded transition-transform duration-300 dark:bg-white bg-black  ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}
                />
                <span
                  className={`h-0.5 w-full rounded transition-transform duration-300 dark:bg-white bg-black  ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          className="lg:hidden fixed inset-0 z-[100] bg-black/50 dark:bg-black/70 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className={`mobile-menu-content absolute top-0 left-0 right-0 mx-4 mt-4 rounded-3xl shadow-2xl overflow-hidden ${
              currentTheme === "dark"
                ? "bg-[#FFFFFF1A] border-2 border-white" // <- updated to match desktop
                : "bg-white border-2 border-gray-200"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between px-6 py-4 border-b ${
                currentTheme === "dark" ? "border-white/20" : "border-gray-200"
              }`}
            >
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-bold uppercase"
                onClick={() => setMenuOpen(false)}
              >
                <Logo />
                <h1
                  className={
                    currentTheme === "dark" ? "text-white" : "text-black"
                  }
                >
                  Snappy Tales
                </h1>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className={`p-2 rounded-full transition-colors ${
                  currentTheme === "dark"
                    ? "hover:bg-white/10 text-white"
                    : "hover:bg-gray-100 text-black"
                }`}
                aria-label="Close Menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="px-6 py-6 space-y-2 max-h-[70vh] overflow-y-auto">
              {links.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className={`mobile-menu-item flex items-center justify-between px-5 py-4 rounded-xl text-base font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-[#F4C906] text-black shadow-lg"
                      : currentTheme === "dark"
                      ? "text-white hover:bg-white/10"
                      : "text-black hover:bg-gray-100"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronDown
                      size={18}
                      className={pathname === link.href ? "text-black" : ""}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Footer */}
            <div
              className={`px-6 py-5 border-t ${
                currentTheme === "dark" ? "border-white/20" : "border-gray-200"
              }`}
            >
              <Button
                className="w-full"
                // href="/services"
                onClick={
                  handleCalendly}
              >
                Book A Call
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
