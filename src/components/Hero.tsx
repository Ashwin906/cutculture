"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { heroReel } from "@/data/projects";

const TAGLINE = "EDITOR. CINEMATOGRAPHER. STORYTELLER.";
const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/=#";

function useScramble(text: string, delay = 2200) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let raf: number;
    let start: number | null = null;
    const dur = 900;
    const timer = setTimeout(() => {
      const tick = (now: number) => {
        if (start === null) start = now;
        const t = Math.min((now - start) / dur, 1);
        const reveal = Math.floor(t * text.length);
        let s = text.slice(0, reveal);
        for (let i = reveal; i < text.length; i++) {
          s += text[i] === " " || text[i] === "." ? text[i]
            : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)];
        }
        setOut(s);
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, delay]);
  return out;
}

function Timecode() {
  const [tc, setTc] = useState("00:00:00:00");
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const ms = Date.now() - start;
      const f = Math.floor((ms / 1000) * 24);
      const frames = f % 24;
      const s = Math.floor(f / 24);
      const pad = (n: number) => n.toString().padStart(2, "0");
      setTc(
        `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}:${pad(frames)}`
      );
    }, 1000 / 12);
    return () => clearInterval(id);
  }, []);
  return <>{tc}</>;
}

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { delay: 1.9 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero({ onPlayReel }: { onPlayReel: () => void }) {
  const tagline = useScramble(TAGLINE);
  const { scrollYProgress } = useScroll();
  // letterbox bars retract over the first 20% of scroll
  const barH = useTransform(scrollYProgress, [0, 0.12], ["7vh", "0vh"]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-14"
    >
      {/* letterbox bars */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[80]"
        style={{ height: barH, background: "#000" }}
      />
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-[80]"
        style={{ height: barH, background: "#000" }}
      />

      {/* corner HUD */}
      <div className="mono absolute left-6 top-24 hidden items-center gap-3 text-[10px] md:left-14 lg:flex" style={{ color: "var(--text2)" }}>
        <span className="rec-dot" /> REC
      </div>
      <div className="mono absolute right-6 top-24 hidden text-[10px] md:right-14 lg:block" style={{ color: "var(--text2)" }}>
        <Timecode />
      </div>
      <div className="mono absolute bottom-10 left-6 hidden text-[10px] md:left-14 lg:block" style={{ color: "var(--text3)" }}>
        COIMBATORE, IN — 11.0168° N, 76.9558° E
      </div>

      {/* headline */}
      <h1 className="display select-none text-[16.5vw] leading-[0.88] md:text-[13vw]">
        <span className="block overflow-hidden">
          <motion.span className="block" variants={line} custom={0} initial="hidden" animate="show">
            CUT
          </motion.span>
        </span>
        <span className="block overflow-hidden">
          <motion.span
            className="block"
            style={{ color: "var(--accent)" }}
            variants={line}
            custom={1}
            initial="hidden"
            animate="show"
          >
            CULTURE
          </motion.span>
        </span>
        <span className="block overflow-hidden">
          <motion.span className="outline-text block" variants={line} custom={2} initial="hidden" animate="show">
            STUDIO
          </motion.span>
        </span>
      </h1>

      {/* tagline + play */}
      <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-center md:justify-between">
        <p className="mono min-h-[1.2em] text-xs tracking-[0.18em] md:text-sm" style={{ color: "var(--text2)" }}>
          {tagline}
        </p>
        <motion.button
          onClick={onPlayReel}
          data-cursor="play"
          className="mono group flex w-fit items-center gap-4 rounded-full border px-7 py-4 text-xs tracking-widest"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04, borderColor: "var(--accent)" }}
          whileTap={{ scale: 0.97 }}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors group-hover:bg-[var(--accent)] group-hover:text-black"
            style={{ background: "var(--surface2)" }}
          >
            ▶
          </span>
          PLAY SHOWREEL — {heroReel.duration.slice(3)}
        </motion.button>
      </div>

      {/* scroll cue */}
      <motion.div
        className="mono absolute bottom-10 right-6 flex items-center gap-2 text-[10px] tracking-widest md:right-14"
        style={{ color: "var(--text3)" }}
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        SCROLL TO PLAY ▼
      </motion.div>
    </section>
  );
}
