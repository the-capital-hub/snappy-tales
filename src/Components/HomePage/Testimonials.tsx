import { Poppins,Moul } from "next/font/google"
import fire from "@/../public/fi_10760660.png"
import Image from "next/image"

const ptPoppins = Poppins({
    weight : ["600"],
    subsets: ["latin"],
    display: "swap",
})

const ptMoul = Moul({
    weight : ["400"],
    subsets: ["latin"],
    display: "swap",
})

const Testimonials = () => {
    return(
        <div className="max-w-7xl mx-auto mt-20">
  <div className="flex flex-col items-center justify-center">
    <div className="flex items-center bg-[rgba(249,250,251,1)] gap-2 border border-[rgba(234,236,240,1)] rounded-4xl py-2 px-4">
      <Image
        src={fire}
        alt="fire"
        width={24}
        height={24}
        className="mr-2" // spacing between image and text
      />
      <h3 className={`${ptPoppins.className} text-sm`}>TESTIMONIAL</h3>
    </div>
   <h1 className={`${ptMoul.className} lg:text-5xl text-[rgba(29, 30, 32, 1)] py-6`}>GET TO KNOW OUR CLIENTS</h1>
  </div>
</div>

    )
}

export default Testimonials