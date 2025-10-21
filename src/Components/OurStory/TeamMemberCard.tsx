"use client";

import React, { useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { Linkedin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


interface TeamMember {
  name: string;
  position: string;
  expertise?: string;
  image: string | StaticImageData;
  linkedinUrl: string;
}

interface Props {
  member: TeamMember;
  index: number;
}

const TeamMemberCard: React.FC<Props> = ({ member, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

useEffect(() => {
  if (!cardRef.current) return;

  // Scroll animation
  gsap.from(cardRef.current, {
    y: 50,
    opacity: 0,
    duration: 0.5,
    delay: index * 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: cardRef.current,
      start: "top 85%",
      toggleActions: "play none none none",
    },
  });

  // Hover scale effect for image
  const imageEl = imageRef.current;
  if (imageEl) {
    const hoverIn = () => gsap.to(imageEl, { scale: 1.05, duration: 0.3, ease: "power3.out" });
    const hoverOut = () => gsap.to(imageEl, { scale: 1, duration: 0.3, ease: "power3.out" });
    imageEl.addEventListener("mouseenter", hoverIn);
    imageEl.addEventListener("mouseleave", hoverOut);
    return () => {
      imageEl.removeEventListener("mouseenter", hoverIn);
      imageEl.removeEventListener("mouseleave", hoverOut);
    };
  }
}, [index]);

useEffect(() => {
  const linkEl = linkRef.current;
  if (!linkEl) return;

  const hoverInLink = () => gsap.to(linkEl, { y: -5, duration: 0.2, ease: "power3.out" });
  const hoverOutLink = () => gsap.to(linkEl, { y: 0, duration: 0.2, ease: "power3.out" });
  linkEl.addEventListener("mouseenter", hoverInLink);
  linkEl.addEventListener("mouseleave", hoverOutLink);

  return () => {
    linkEl.removeEventListener("mouseenter", hoverInLink);
    linkEl.removeEventListener("mouseleave", hoverOutLink);
  };
}, []);


  return (
    <div ref={cardRef} className="rounded-3xl p-6 custom-shadow">
      <div className="team-member relative">
        {/* Member Image */}
        <div ref={imageRef} className="member-image-container cursor-pointer">
          <div className="member-image-wrapper rounded-full overflow-hidden w-48 h-48 mx-auto">
            <Image src={member.image} alt={member.name} width={192} height={192} />
          </div>
        </div>

        {/* Browser Dots */}
        <div className="browser-dots absolute top-2.5 left-2.5 flex gap-1.5">
          <span className="dot w-2 h-2 rounded-full bg-[#ff5f57]" />
          <span className="dot w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <span className="dot w-2 h-2 rounded-full bg-[#28ca41]" />
        </div>

        {/* Member Info */}
        <div className="member-info text-center mt-4">
          <a
            ref={linkRef}
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link inline-flex items-center justify-center w-8 h-8 rounded bg-[#0077b5] text-white mx-auto mb-2"
          >
            <Linkedin size={18} />
          </a>
          <h3 className="text-xl font-semibold">{member.name}</h3>
          <p className="position text-gray-500">{member.position}</p>
          {member.expertise && <p className="expertise text-gray-500">{member.expertise}</p>}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
