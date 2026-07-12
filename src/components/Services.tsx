"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES = [
  {
    n: "01",
    t: "VIDEO EDITING",
    d: "Story-first cuts in DaVinci Resolve & Premiere Pro. Pacing that holds attention from first frame to last.",
  },
  {
    n: "02",
    t: "CINEMATOGRAPHY",
    d: "Shot with intent — composition, movement and light planned for the edit before the record button is pressed.",
  },
  {
    n: "03",
    t: "COLOR GRADING",
    d: "From flat LOG to cinematic. Custom looks per project — skin tones protected, mood dialled in.",
  },
  {
    n: "04",
    t: "SOUND DESIGN",
    d: "Cuts you feel. Whooshes, hits, risers and ambience layered so every transition lands.",
    waveform: true,
  },
  {
    n: "05",
    t: "VISUAL STORYTELLING",
    d: "Concept to final export. Structure, rhythm and emotion engineered into every timeline.",
  },
  {
    n: "06",
    t: "PROMO & BRAND CONTENT",
    d: "Content built to convert — dance companies, hospitality, catering, fitness and beyond.",
  },
];

function Waveform() {
  return (
    <span className="flex h-5 items-end gap-[3px]" aria-hidden>
      {[6, 12, 18, 9, 15, 20, 8, 14, 11, 17, 7, 13].map((h, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-sm"
          style={{ background: "var(--accent)" }}
          animate={{ height: [h, h * 0.4, h] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.07, ease: "easeInOut" }}
        />
      ))}
    </span>
  );
}

export default function Services() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="services" className="px-6 py-24 md:px-14 md:py-32">
      <p className="mono mb-3 text-[10px] tracking-[0.3em]" style={{ color: "var(--accent)" }}>
        03 — THE CRAFT
      </p>
      <h2 className="display mb-14 text-5xl md:text-7xl">
        WHAT I <span className="outline-text">DO</span>
      </h2>

      <div className="border-t" style={{ borderColor: "var(--border)" }}>
        {SERVICES.map((s, i) => {
          const active = open === i;
          return (
            <motion.div
              key={s.n}
              className="border-b"
              style={{ borderColor: "var(--border)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="group flex w-full items-center gap-6 py-6 text-left md:py-8"
                data-cursor="view"
                onMouseEnter={() => setOpen(i)}
                onMouseLeave={() => setOpen(null)}
                onClick={() => setOpen(active ? null : i)}
              >
                <span className="mono w-10 shrink-0 text-xs" style={{ color: active ? "var(--accent)" : "var(--text3)" }}>
                  {s.n}
                </span>
                <motion.h3
                  className="display flex-1 text-3xl md:text-5xl"
                  animate={{ x: active ? 16 : 0, color: active ? "var(--accent)" : "var(--text)" }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {s.t}
                </motion.h3>
                {s.waveform && active && <Waveform />}
                <motion.span
                  className="mono text-lg"
                  animate={{ rotate: active ? 90 : 0, color: active ? "var(--accent)" : "var(--text3)" }}
                >
                  ▶
                </motion.span>
              </button>
              <AnimatePresence>
                {active && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-2xl pb-8 pl-16 pr-6 text-sm leading-relaxed md:text-base" style={{ color: "var(--text2)" }}>
                      {s.d}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
