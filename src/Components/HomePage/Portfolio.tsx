
import Image from "next/image"
import boy from "@/../public/Transhumans Growth.png"
import { Moul, Outfit } from "next/font/google";
import Button from "../Common/Button";
import bgImg from "@/../public/Container.png"
import { Instrument_Sans } from "next/font/google";

const ptMoul = Moul({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
  });

  const ptOutfit = Outfit({
    weight: ["400"],
    subsets: ["latin"],
    display: "swap",
  });

  const ptSans = Instrument_Sans({
    weight: ["600","400"],
    subsets: ["latin"],
    display: "swap",
  });

const Portfolio = () => {
    return(
       <div className=" bg-[rgba(241,245,193,1)] flex flex-col mt-20 border-t-12 border-b-12 mx-auto border-black">
        <div>
          <div className="flex items-center justify-center py-12">
           <div>
           <Image
            src={boy}
            alt="A Boy sitting with book"
            width={420}
            height={440}
            />
           </div>
         
            <div>
            <h1 className={`${ptMoul.className} lg:text-5xl text-[rgba(29,30,32,1)]`}>PORTFOLIO COMPANIES</h1>
            <p className={`${ptOutfit.className} lg:text-2xl text-[rgba(55,57,60,1)] py-4`}>Some of the startups we&apos;ve helped grow:</p>
            <Button>Request A Demo</Button>
            </div>
          </div>
        </div>

        <div className="overflow-hidden relative -mt-13">
  <div className="horizontal-scroll ">
    {[1, 2, 3, 4, 5].map((_, i) => (
      <div key={i} className="relative max-w-xl mx-auto rounded-4xl flex-shrink-0 card-background">
        <div className="relative h-[540px]">
          <Image
            src={bgImg}
            alt={`Capital Hub ${i}`}
            className="rounded-4xl object-cover"
            width={800}
            height={500}
          />

          <div className="absolute top-90 left-1/2 -translate-x-1/2 w-[80%] rounded-2xl p-6 bg-[rgba(0,0,0,0.5)] shadow-lg">
            <h3 className={`text-white text-2xl ${ptSans.className} font-600`}>Capital Hub</h3>
            <p className={`mt-2 text-white ${ptSans.className} font-400 text-[16px]`}>
              Capital HUB provides 360 degree approach on ...
            </p>
            <button className={`mt-4 inline-flex items-center font-400 text-sm gap-2 bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-500 transition ${ptSans.className}`}>
              View Case Study
              <span>➜</span>
            </button>
          </div>
        </div>
      </div>
    ))}
   
  </div>
</div>




       </div>
    )
}

export default Portfolio