import Footer from "@/Components/Common/Footer";
import AboutPage from "@/Components/OurStory/AboutUs";
import ReactLenis from "lenis/react";
import React from "react";

const OurStoryPage = () => {
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
        <AboutPage />
        <Footer />
      </div>
    </ReactLenis>
  );
};

export default OurStoryPage;