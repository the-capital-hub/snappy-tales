"use client";

import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
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
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // const [menuVisible, setMenuVisible] = useState(false);

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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navItemsRef.current) return;

    const menu = navItemsRef.current;

    if (menuOpen) {
      gsap.fromTo(
        menu,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    } else {
      gsap.to(menu, { opacity: 0, y: -20, duration: 0.3, ease: "power3.in" });
    }
  }, [menuOpen]);

  const links = [
    { label: "Home", href: "/" },
    { label: "Our Story", href: "/ourstory" },
    { label: "Services", href: "/services", hasDropdown: true },
    // { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "/contact" },
  ];

  if (!mounted) return null;

  const navBg = isScrolled
    ? currentTheme === "dark"
      ? "bg-black border-white md:shadow-lg md:border-b-4"
      : "md:bg-white md:border-black md:shadow-lg md:border-b-4 "
    : currentTheme === "dark"
    ? "bg-black border-transparent"
    : "bg-white border-transparent";

  const linkActive =
    "text-black bg-yellow-300/40 dark:text-white dark:bg-yellow-400";
  const linkInactive =
    "text-black/60 hover:text-black hover:bg-yellow-300/20 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-yellow-400";

  return (
    <nav
      ref={navRef}
      className={`md:fixed max-w-7xl px-6 py-3 w-full  mx-auto left-0 right-0 z-50  transition-all duration-300 ${
        outfit.className
      } ${navBg} ${
        isScrolled
          ? "md:rounded-full transition-all duration-300 top-4"
          : "rounded-xl"
      } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className={`flex items-center justify-between  `}>
          {/* Logo */}
          <Link
            href="/"
            className="nav-item flex items-center gap-2 text-xl md:text-2xl font-bold uppercase flex-shrink-0"
          >
            <Logo />
            <h1
              className={currentTheme === "dark" ? "text-white" : "text-black"}
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
              <Button>Book A Call</Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col relative justify-between w-6 h-5 focus:outline-none flex-shrink-0"
              aria-label="Toggle Menu"
            >
              <span
                className={`h-0.5 w-full rounded transition-transform duration-300 ${
                  currentTheme === "dark" ? "bg-white" : "bg-black"
                } ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}
              />
              <span
                className={`h-0.5 w-full rounded transition-transform duration-300 ${
                  currentTheme === "dark" ? "bg-white" : "bg-black"
                } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          ref={navItemsRef}
          className={`lg:hidden overflow-hidden ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <div
            className={`rounded-b-3xl border-x-2 border-b-4 mt-2 px-6 py-6 space-y-3 ${
              currentTheme === "dark"
                ? "bg-black/90 border-white"
                : "bg-white border-black"
            }`}
          >
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                  pathname === link.href ? linkActive : linkInactive
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t pt-3 mt-3 border-black/10 dark:border-white/10">
              <Button className="w-full">Book A Call</Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
