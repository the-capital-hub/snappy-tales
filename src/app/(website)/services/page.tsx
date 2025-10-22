import Footer from "@/Components/Common/Footer";
import Herosection from "@/Components/ServicesComponent/Herosection";
import Services from "@/Components/ServicesComponent/Services";
import React from "react";
import ReactLenis from "lenis/react";

const ServicesPage = () => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      <div className="bg-white dark:bg-black">
        <Herosection />
        <Services />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default ServicesPage;
