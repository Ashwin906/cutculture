"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { featured, thumbFor, Project } from "@/data/projects";

/** Draggable LOG vs GRADED comparison built from one thumbnail:
 *  left side simulates flat log footage via CSS filters. */
function GradeSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0.5);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(Math.max((clientX - r.left) / r.width, 0.02), 0.98));
  };

  return (
    <div
      ref={ref}
      data-cursor="drag"
      className="relative aspect-video w-full select-none overflow-hidden rounded-md"
      style={{ border: "1px solid var(--border)", touchAction: "pan-y" }}
      onPointerDown={(e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={(e) => {
        dragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
      }}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* GRADED (full) */}
      <Image
        src={thumbFor(featured)}
        alt="Graded footage"
        fill
        unoptimized
        sizes="100vw"
        className="object-cover"
        style={{ filter: "saturate(1.15) contrast(1.08)" }}
      />
      {/* LOG (clipped left) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${(1 - pos) * 100}% 0 0)` }}
      >
        <Image
          src={thumbFor(featured)}
          alt="LOG ungraded footage"
          fill
          unoptimized
          sizes="100vw"
          className="object-cover"
          style={{ filter: "saturate(0.35) contrast(0.75) brightness(1.15)" }}
        />
      </div>
      {/* divider */}
      <div
        className="absolute inset-y-0 z-10 w-[2px]"
        style={{ left: `${pos * 100}%`, background: "var(--accent)", boxShadow: "0 0 12px var(--accent)" }}
      >
        <span
          className="mono absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[9px]"
          style={{ background: "var(--accent)", color: "#0a0a0b" }}
        >
          ◀▶
        </span>
      </div>
      {/* labels */}
      <span className="mono absolute left-3 top-3 rounded-sm px-2 py-1 text-[9px] tracking-widest" style={{ background: "rgba(0,0,0,0.6)", color: "var(--text2)" }}>
        LOG — REC.709 OFF
      </span>
      <span className="mono absolute right-3 top-3 rounded-sm px-2 py-1 text-[9px] tracking-widest" style={{ background: "rgba(0,0,0,0.6)", color: "var(--accent)" }}>
        GRADED — DAVINCI RESOLVE
      </span>
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

export default function FeaturedCase({ onOpen }: { onOpen: (p: Project) => void }) {
  return (
    <section id="featured" className="px-6 py-24 md:px-14 md:py-32" style={{ background: "var(--surface)" }}>
      <motion.p {...fadeUp} className="mono mb-3 text-[10px] tracking-[0.3em]" style={{ color: "var(--accent)" }}>
        02 — FEATURED CASE STUDY
      </motion.p>
      <motion.h2 {...fadeUp} className="display mb-12 max-w-4xl text-5xl md:text-7xl">
        WINGERZ <span className="outline-text">DANCE CO.</span>
      </motion.h2>

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        {/* video */}
        <motion.div {...fadeUp}>
          <button
            onClick={() => onOpen(featured)}
            data-cursor="play"
            className="group relative block aspect-video w-full overflow-hidden rounded-md"
            style={{ border: "1px solid var(--border)" }}
          >
            <Image
              src={thumbFor(featured)}
              alt="Wingerz Dance Company — featured edit"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,10,11,0.35)" }}>
              <span
                className="mono flex h-20 w-20 items-center justify-center rounded-full text-lg transition-transform group-hover:scale-110"
                style={{ background: "var(--accent)", color: "#0a0a0b" }}
              >
                ▶
              </span>
            </div>
            <span className="mono absolute bottom-3 left-3 text-[9px] tracking-widest" style={{ color: "var(--text2)" }}>
              {featured.duration} — CLICK TO PLAY
            </span>
          </button>

          <div className="mt-6">
            <GradeSlider />
            <p className="mono mt-3 text-[9px] tracking-widest" style={{ color: "var(--text3)" }}>
              DRAG TO COMPARE — EVERY FRAME COLOR GRADED BY HAND
            </p>
          </div>
        </motion.div>

        {/* brief / approach / result */}
        <div className="flex flex-col gap-10">
          {[
            {
              k: "BRIEF",
              v: "Wingerz Dance Company needed edits with the same energy as their choreography — content that stops the scroll and fills workshops.",
            },
            {
              k: "APPROACH",
              v: "Cut to the beat, frame by frame. Speed ramps timed to footwork, hard cuts on impact, color graded for stage light. Sound designed so every hit lands twice — once in the eyes, once in the ears.",
            },
            {
              k: "RESULT",
              v: "An ongoing partnership. CutCulture is now the editing arm of Wingerz — every showcase, every reel, every frame.",
            },
          ].map((b, i) => (
            <motion.div
              key={b.k}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="border-l-2 pl-6"
              style={{ borderColor: i === 2 ? "var(--accent)" : "var(--border)" }}
            >
              <h3 className="mono mb-2 text-[10px] tracking-[0.3em]" style={{ color: "var(--accent)" }}>
                {b.k}
              </h3>
              <p className="text-sm leading-relaxed md:text-base" style={{ color: "var(--text2)" }}>
                {b.v}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
