import { Moul, Outfit } from "next/font/google";
import Image from "next/image";

import Frame from "@/../public/Frame.png";
import Logo8 from "@/../public/logo-8.png";
import Logo27 from "@/../public/logo-27.png";
import Logo30 from "@/../public/logo-30.png";
import Logo53 from "@/../public/logo-53.png";
import Logo77 from "@/../public/logo-77.png";

const logos = [Frame, Logo8, Logo27, Logo30, Logo53, Logo77, Frame, Logo8, Logo27, Logo30, Logo53, Logo77];

const ptMoul = Moul({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const ptOutfit = Outfit({
  weight: ["700", "400"],
  subsets: ["latin"],
  display: "swap",
});

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center dark:bg-black bg-white justify-center py-4 mt-10 overflow-hidden">
      
      {/* Title Section */}
      <div className="about-title flex items-center justify-center">
        <div className="first-left-line bg-black dark:bg-white"></div>
        <div className="third-left-line bg-black dark:bg-white"></div>
        <h1 className={`${ptMoul.className} text-center text-5xl md:text-6xl text-black dark:text-white`}>
          ABOUT US
        </h1>
        <div className="first-right-line bg-black dark:bg-white"></div>
        <div className="third-right-line bg-black dark:bg-white"></div>
      </div>

      {/* Description Section */}
      <div className="py-10 text-center max-w-[940px]">
        <h4 className={`${ptOutfit.className} font-[700] text-2xl text-gray-800 dark:text-gray-200`}>
          We Don&apos;t Just Build, We Build to Scale.
        </h4>
        <p className={`${ptOutfit.className} font-[400] text-sm md:text-xl py-6 text-gray-800 dark:text-gray-300`}>
          Snappy Tales works as your venture studio & growth engine, helping you launch, scale, and dominate your market with web & app development, branding, marketing, business analytics, market analysis, and GTM strategy — all under one roof.
        </p>
      </div>

      {/* Logo Scroll Section */}
      <div className="overflow-hidden py-2">
        <div className="scroll-logos flex gap-6">
          {[...logos, ...logos].map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={`logo-${idx}`}
              width={250}
              height={40}
              className="object-contain filter dark:brightness-75"
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
