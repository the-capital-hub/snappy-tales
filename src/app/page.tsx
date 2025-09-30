import Button from "@/Components/Common/Button";
import AboutUs from "@/Components/HomePage/AboutUs";
import Portfolio from "@/Components/HomePage/Portfolio";
import Testimonials from "@/Components/HomePage/Testimonials";

export default function Home() {
  return (
    <div>
      <Button>Book a Call</Button>
      <AboutUs/>
      <Portfolio/>
      <Testimonials/>
    </div>

  );
}
