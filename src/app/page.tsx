import ByTheNumbers from "@/components/ByTheNumbers";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import WhatYouCanBuild from "@/components/WhatYouCanBuild";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col">
        <Hero />
        <HowItWorks />
        <ByTheNumbers />
        <WhatYouCanBuild />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
