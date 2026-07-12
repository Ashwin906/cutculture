"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Category, Project, projects, thumbFor } from "@/data/projects";

const FILTERS: Category[] = ["ALL", "DANCE", "BRAND", "EVENTS", "REELS"];

function ProjectCard({
  p,
  onOpen,
  index,
}: {
  p: Project;
  onOpen: (p: Project) => void;
  index: number;
}) {
  const [scrub, setScrub] = useState(0);
  const [hover, setHover] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setScrub(Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1));
  };

  // fake ticking timecode from scrub position
  const totalF = 24 * 60;
  const f = Math.floor(scrub * totalF);
  const pad = (n: number) => n.toString().padStart(2, "0");
  const tc = `00:${pad(Math.floor(f / 24 / 60))}:${pad(Math.floor(f / 24) % 60)}:${pad(f % 24)}`;

  return (
    <motion.button
      ref={ref}
      layout
      onClick={() => onOpen(p)}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor="play"
      className="group relative block w-full overflow-hidden rounded-md text-left"
      style={{
        aspectRatio: p.ratio,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        gridRow: p.ratio === "9/16" ? "span 2" : "span 1",
      }}
      initial={{ opacity: 0, y: 36, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      {/* thumbnail (or film-frame placeholder when unavailable) */}
      {imgFailed ? (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              "repeating-linear-gradient(135deg, var(--surface) 0 14px, var(--surface2) 14px 28px)",
          }}
        >
          <span
            className="mono flex h-14 w-14 items-center justify-center rounded-full text-sm"
            style={{ background: "rgba(0,0,0,0.5)", border: "1px solid var(--border)", color: "var(--accent)" }}
          >
            ▶
          </span>
        </div>
      ) : (
        <Image
          src={thumbFor(p)}
          alt={`${p.title} — ${p.client}`}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-all duration-500 group-hover:scale-105"
          style={{ filter: hover ? "saturate(1.05)" : "saturate(0.85) brightness(0.9)" }}
          onError={() => setImgFailed(true)}
        />
      )}
      {/* gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,11,0.9) 0%, rgba(10,10,11,0.1) 45%, rgba(10,10,11,0.25) 100%)",
        }}
      />
      {/* top meta */}
      <div className="mono absolute left-3 top-3 flex items-center gap-2 text-[9px]" style={{ color: "var(--text2)" }}>
        <span
          className="rounded-sm px-1.5 py-0.5"
          style={{ background: "rgba(0,0,0,0.55)", border: "1px solid var(--border)" }}
        >
          {p.category}
        </span>
      </div>
      <div
        className="mono absolute right-3 top-3 rounded-sm px-1.5 py-0.5 text-[9px] transition-colors"
        style={{
          background: "rgba(0,0,0,0.55)",
          border: "1px solid var(--border)",
          color: hover ? "var(--accent)" : "var(--text2)",
        }}
      >
        {hover ? tc : p.duration}
      </div>
      {/* title */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="overflow-hidden">
          <motion.h3
            className="display text-xl md:text-2xl"
            animate={{ y: hover ? 0 : 6, opacity: hover ? 1 : 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {p.title}
          </motion.h3>
        </div>
        <p className="mono mt-1 text-[10px] tracking-wider" style={{ color: "var(--text2)" }}>
          {p.client.toUpperCase()} — {p.year}
        </p>
      </div>
      {/* scrub bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background: "rgba(255,255,255,0.08)" }}>
        <motion.div
          className="h-full"
          style={{ background: "var(--accent)" }}
          animate={{ width: hover ? `${scrub * 100}%` : "0%" }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.button>
  );
}

export default function WorkGrid({ onOpen }: { onOpen: (p: Project) => void }) {
  const [filter, setFilter] = useState<Category>("ALL");
  const visible = projects.filter((p) => filter === "ALL" || p.category === filter);

  return (
    <section id="work" className="px-6 py-24 md:px-14 md:py-32">
      {/* header */}
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mono mb-3 text-[10px] tracking-[0.3em]" style={{ color: "var(--accent)" }}>
            01 — SELECTED WORK
          </p>
          <h2 className="display text-5xl md:text-7xl">
            THE <span className="outline-text">CUTS</span>
          </h2>
        </div>
        {/* filters */}
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((fl) => (
            <button
              key={fl}
              onClick={() => setFilter(fl)}
              data-cursor="view"
              className="mono relative rounded-full border px-4 py-2 text-[10px] tracking-widest transition-colors"
              style={{
                borderColor: filter === fl ? "var(--accent)" : "var(--border)",
                color: filter === fl ? "#0a0a0b" : "var(--text2)",
                background: filter === fl ? "var(--accent)" : "transparent",
              }}
            >
              {fl}
            </button>
          ))}
        </div>
      </div>

      {/* grid */}
      <motion.div
        layout
        className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <ProjectCard key={p.id} p={p} onOpen={onOpen} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="mono mt-8 text-center text-[10px] tracking-widest" style={{ color: "var(--text3)" }}>
        {visible.length} CLIPS ON TIMELINE — CLICK ANY FRAME TO PLAY
      </p>
    </section>
  );
}
