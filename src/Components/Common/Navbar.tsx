"use client";
import React, { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Outfit } from "next/font/google";
import Link from "next/link";

const outfit = Outfit({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

const Logo: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll("path");

    paths.forEach((path, i) => {
      const length = (path as SVGPathElement).getTotalLength();
      gsap.set(path, {
        stroke: "#000",
        fill: "transparent",
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 0.8,
        delay: i * 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.to(path, {
            fill: path.getAttribute("fill") ?? "none",
            stroke: "none",
            duration: 0.6,
            delay: 0.2,
          });
        },
      });
    });
  }, []);

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
          <path d="M2 8.18421C2 4.46355 5.01619 1.44737 8.73684 1.44737H26V2.28947C26 6.01013 22.9838 9.02632 19.2632 9.02632H2V8.18421Z" fill="#F4C906" />
          <path d="M2 11.5526C2 15.2733 5.01619 18.2895 8.73684 18.2895H26V17.4474C26 13.7267 22.9838 10.7105 19.2632 10.7105H2V11.5526Z" fill="black" />
          <path d="M2 23.3421C2 21.4818 3.50809 19.9737 5.36842 19.9737H26V20.8158C26 24.5364 22.9838 27.5526 19.2632 27.5526H2V23.3421Z" fill="#F4C906" />
        </g>
      </svg>
    </div>
  );
};

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (navRef.current) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.8,
      }).from(
        navRef.current.querySelectorAll(".nav-item"),
        {
          y: -30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
        },
        "-=0.4"
      );
    }
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "Our Story", href: "/ourstory" },
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <nav
      ref={navRef}
      className={`max-w-7xl z-10 mx-auto p-2 flex items-center justify-between ${outfit.className}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 text-black text-2xl font-bold uppercase">
        <Logo />
        <h1>Snappy Tales</h1>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center justify-center gap-6 text-base font-medium text-black/60">
        {links.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className={`nav-item px-3 py-1 rounded-md flex items-center gap-1 transition-colors duration-200 ${
              pathname === link.href
                ? "bg-[rgba(255,248,217,1)]"
                : "hover:bg-[rgba(255,248,217,1)]"
            }`}
          >
            {link.label}
            {link.hasDropdown && <ChevronDown size={16} />}
          </Link>
        ))}
      </div>
        <div className="nav-item">
          <Button>Book A Call</Button>
        </div>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex flex-col relative  justify-between w-6 h-5 focus:outline-none"
        aria-label="Toggle Menu"
      >
        <span
          className={`h-0.5 w-full bg-black rounded transition-transform duration-300 ${
            menuOpen ? "rotate-60 translate-y-2" : ""
          }`}
        />
        <span
          className={`h-0.5 w-full bg-black rounded transition-transform duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 py-6">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className={`px-3 py-2 rounded-md text-lg font-medium ${
                pathname === link.href
                  ? "bg-[rgba(255,248,217,1)]"
                  : "hover:bg-[rgba(255,248,217,1)]"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button>Book A Call</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
