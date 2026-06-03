'use client';

import Hero from '@/components/sections/Hero';
import ModeSwitch from '@/components/sections/ModeSwitch';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Works from '@/components/sections/Works';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import FooterCTA from '@/components/sections/FooterCTA';
import Marquee from '@/components/ui/Marquee';

export default function Home() {
  return (
    <>
      <Hero />
      <ModeSwitch />
      <Marquee />
      <About />
      <Works />
      <Skills />
      <Experience />
      <Contact />
      <FooterCTA />
    </>
  );
}
