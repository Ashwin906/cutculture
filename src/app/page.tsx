"use client";

import { useState } from "react";
import { Project, heroReel } from "@/data/projects";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import TimelineNav from "@/components/TimelineNav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WorkGrid from "@/components/WorkGrid";
import FeaturedCase from "@/components/FeaturedCase";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import VideoModal from "@/components/VideoModal";

export default function Home() {
  const [playing, setPlaying] = useState<Project | null>(null);

  return (
    <SmoothScroll>
      <Preloader />
      <CustomCursor />
      <TimelineNav />

      {/* top bar */}
      <header
        className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between px-6 py-4 md:px-14"
        style={{
          background: "linear-gradient(to bottom, rgba(10,10,11,0.9), transparent)",
        }}
      >
        <span className="display text-lg tracking-wide">
          CUT<span style={{ color: "var(--accent)" }}>CULTURE</span>
        </span>
        <a
          href="#contact"
          data-cursor="view"
          className="mono rounded-full border px-4 py-2 text-[10px] tracking-widest transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          style={{ borderColor: "var(--border)", color: "var(--text2)" }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          START A PROJECT
        </a>
      </header>

      <main>
        <Hero onPlayReel={() => setPlaying(heroReel)} />
        <Marquee
          items={[
            "COLOR GRADING",
            "SOUND DESIGN",
            "CINEMATOGRAPHY",
            "VISUAL STORYTELLING",
            "VIDEO EDITING",
          ]}
        />
        <WorkGrid onOpen={setPlaying} />
        <FeaturedCase onOpen={setPlaying} />
        <Services />
        <About />
        <Marquee
          items={["LET'S CREATE SOMETHING", "CUTCULTURE", "SINCE 2021", "COIMBATORE"]}
          reverse
        />
        <Contact />
      </main>

      <VideoModal project={playing} onClose={() => setPlaying(null)} />
    </SmoothScroll>
  );
}
