// import React from "react";
import { Hero } from "./Hero/hero";
import { Section_1 } from "./center_context/section_1";
import { Footer } from "../Footer/footer";
import About from "../about/about";
export function Home() {
  return (
    <>
      <Hero />
      <Section_1 />
      <div className="w-full h-[2px] bg-gradient-to-l from-transparent via-[rgba(255,255,255,0.8)] to-transparent"></div>
      <About />
    </>
  );
}
