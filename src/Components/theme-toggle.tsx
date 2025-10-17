"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import gsap from "gsap";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const sunRef = React.useRef<SVGSVGElement | null>(null);
  const moonRef = React.useRef<SVGSVGElement | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Animate theme toggle
  React.useEffect(() => {
    if (!mounted) return;

    if (theme === "dark") {
      // Sun to Moon
      gsap.to(sunRef.current, { rotate: -90, scale: 0, duration: 0.5, ease: "power2.inOut" });
      gsap.to(moonRef.current, { rotate: 0, scale: 1, duration: 0.5, ease: "power2.inOut" });
    } else {
      // Moon to Sun
      gsap.to(moonRef.current, { rotate: 90, scale: 0, duration: 0.5, ease: "power2.inOut" });
      gsap.to(sunRef.current, { rotate: 0, scale: 1, duration: 0.5, ease: "power2.inOut" });
    }
  }, [theme, mounted]);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-6 h-6 flex items-center justify-center"
      aria-label="Toggle Theme"
    >
      <Sun
        ref={sunRef}
        className="absolute w-6 h-6 dark:text-white"
        style={{ transformOrigin: "50% 50%" }}
      />
      <Moon
        ref={moonRef}
        className="absolute w-6 h-6 dark:text-white"
        style={{ transformOrigin: "50% 50%", scale: 0 }}
      />
    </button>
  );
}
