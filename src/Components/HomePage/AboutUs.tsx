
import { Moul, Inter, Outfit } from "next/font/google";
import Image from "next/image";

import Frame from "@/../public/Frame.png"
import Logo8 from "@/../public/logo-8.png"
import Logo27 from "@/../public/logo-27.png";
import Logo30 from "@/../public/logo-30.png";
import Logo53 from "@/../public/logo-53.png";
import Logo77 from "@/../public/logo-77.png";

const logos = [Frame, Logo8, Logo27, Logo30, Logo53, Logo77,Frame, Logo8, Logo27, Logo30, Logo53, Logo77];

const ptMoul = Moul({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
  });

  const ptOutfit = Outfit({
    weight: ["700","400"],
    subsets: ["latin"],
    display: "swap",
  });

const AboutUs = () => {
    return(

        <div className="flex flex-col cd d items-center justify-center py-4 overflow-hidden">
            <div className="about-title">
                <div className="first-left-line"></div>
                <div className="third-left-line"></div>
                <h1 className={`${ptMoul.className} text-center text-6xl`}>ABOUT US</h1>
                <div className="first-right-line"></div>
                <div className="third-right-line"></div>
            </div>
            <div className="py-10 text-center max-w-[940px]">
                <h4 className={`text-2xl text-[rgba(55,57,60,1)] ${ptOutfit.className} font-[700]`}>We Don&apos;t Just Build, We Build to Scale.</h4>
                <p className={`py-6 ${ptOutfit.className} font-[400] text-[rgba(55,57,60,1)] text-xl`}>Snappy Tales works as your venture studio & growth engine, helping you launch, scale, and dominate your market with web & app development, branding, marketing, Business analytics, Market analysis, and GTM strategy — all under one roof.
                </p>
            </div>

            <div className=" overflow-hidden py-2">
        <div className="scroll-logos">
          {/* Duplicate logos for seamless infinite scroll */}
          {[...logos, ...logos].map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={`logo-${idx}`}
              width={250}
              height={40}
              className="object-contain"
            />
          ))}
        </div>
      </div>

        </div>

    )
}

export default AboutUs