import Proof from "@/components/Proof";
import Problem from "@/components/Problem";
import Amplify from "@/components/Amplify";
import Solution from "@/components/Solution";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Offer from "@/components/Offer";
import Guarantee from "@/components/Guarantee";
import HVCO from "@/components/HVCO";
import Close from "@/components/Close";
import FAQ from "@/components/FAQ";
import LatestHero from "@/components/LatestHero";

export default function Home() {

  return (
    <main>
      <LatestHero />
      <Proof  />
      <Problem  />
      <Amplify />
      <Solution />
      <Services />
      <Testimonials/>
      <Offer/>
      {/* <BookingForm/> */}
      <Guarantee/>
      <HVCO/>
      <FAQ/>
      {/* <Urgency/> */}
      <Close/>
    </main>
  );
}
