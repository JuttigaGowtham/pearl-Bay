"use client";

import { usePathname } from "next/navigation";
import Hero from "./Hero";
import Urgencybanner from "./Urgencybanner";
import About from "./About";
import Testimonials from "./Testimonials";
import Text from "./Text";
import Text2 from "./Text2";
import Services from "./Services";
import Hotels from "./Hotels";
import Clock from "./Clock";
import Membership from "./Membership";
import Waitlist from "./Waitlist";
import Footer from "./Footer";

import ParallaxSection from "./ParallaxSection";

export default function HomeLayout() {
  const pathname = usePathname();

  // Only show home components on the home page
  if (pathname !== "/") {
    return null;
  }

  return (
    <>
      <Hero />
      <ParallaxSection speed={0.1}>
        <About />
      </ParallaxSection>
      <Testimonials />
      <Urgencybanner />
      <Clock />
      {/* <ParallaxSection speed={0.15}>
        <Text />
      </ParallaxSection> */}
      {/* <ParallaxSection speed={0.2}>
        <Text2 />
      </ParallaxSection> */}
      {/* <ParallaxSection speed={0.25}>
        <Services />
      </ParallaxSection> */}
      {/* <Hotels /> */}
      <Membership />
      <Waitlist />
      <Footer />
    </>
  );
}

