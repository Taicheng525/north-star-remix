import AtomArrayBackground from "@/components/AtomArrayBackground";
import ByTheNumbers from "@/components/ByTheNumbers";
import Closing from "@/components/Closing";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import IntroFilm from "@/components/IntroFilm";
import Navbar from "@/components/Navbar";
import WhatYouCanBuild from "@/components/WhatYouCanBuild";
// WhyBuild — temporarily hidden, awaiting redesign before shipping.
// Component file kept at src/components/WhyBuild.tsx for later use.
// import WhyBuild from "@/components/WhyBuild";

export default function Home() {
  return (
    <>
      {/* Plays on every page load (~14.5s). Dismisses on "Enter
          Console" click, on the "Skip Intro" button (always visible
          top-right), or when the timeline completes. */}
      <IntroFilm />
      <Navbar />
      {/* `isolation: isolate` makes <main> a fresh stacking context.
          The atom canvas inside (z-index:-1) is then layered BEHIND
          sections but WITHIN main's stacking context — which is what
          `backdrop-filter: blur(...)` on frosted-glass cards needs in
          order to actually pick up the atoms as the backdrop and blur
          them. If the canvas lived OUTSIDE main, cards' backdrop-filter
          couldn't see it and atoms would appear unblurred "on top of"
          the glass. */}
      <main
        className="relative flex flex-col"
        style={{ isolation: "isolate" }}
      >
        <AtomArrayBackground />
        <Hero />
        {/* <WhyBuild /> — hidden pending redesign */}
        <HowItWorks />
        <ByTheNumbers />
        <WhatYouCanBuild />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
