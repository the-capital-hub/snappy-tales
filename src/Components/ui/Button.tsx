"use client";

import Link from "next/link";
import {
  MouseEventHandler,
  ReactNode,
} from "react";
import { Moul } from "next/font/google";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  target?: string;
  rel?: string;
}

const ptMoul = Moul({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export default function Button({
  children,
  className = "",
  href,
  onClick,
  target,
  rel,
}: ButtonProps) {
  const sharedClasses = `btn-cls ${className} ${ptMoul.className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} target={target} rel={rel} className={sharedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={sharedClasses}>
      {children}
    </button>
  );
}
