"use client";

import { ReactNode } from "react";
import { Moul } from "next/font/google";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const ptMoul = Moul({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
  });

export default function Button({ children, onClick, className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn-cls ${className} ${ptMoul.className}`}
    >
      {children}
    </button>
  );
}
