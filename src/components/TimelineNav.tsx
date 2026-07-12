"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "OPEN" },
  { id: "work", label: "WORK" },
  { id: "featured", label: "FEATURE" },
  { id: "services", label: "CRAFT" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

export default function TimelineNav() {
  const { scrollYProgress } = useScroll();
  const playhead = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });
  const left = useTransform(playhead, (n) => `${n * 100}%`);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[100] hidden md:block"
      aria-label="Section timeline"
      style={{
        background: "rgba(10,10,11,0.85)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="relative mx-auto flex h-11 max-w-screen-2xl items-stretch gap-px px-4">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => jump(s.id)}
            data-cursor="view"
            className="mono group relative flex-1 overflow-hidden text-[9px] tracking-widest transition-colors"
            style={{ color: "var(--text3)", background: "var(--surface)" }}
          >
            <span className="relative z-10 transition-colors group-hover:text-[var(--accent)]">
              {s.label}
            </span>
            <span
              className="absolute left-1 top-1 h-1 w-1 rounded-[1px]"
              style={{ background: "var(--border)" }}
            />
            <span
              className="absolute right-1 top-1 h-1 w-1 rounded-[1px]"
              style={{ background: "var(--border)" }}
            />
          </button>
        ))}
        {/* playhead */}
        <div className="pointer-events-none absolute inset-y-0 left-4 right-4">
          <motion.span
            className="absolute top-0 block h-full w-[2px]"
            style={{
              background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent)",
              left,
            }}
          />
        </div>
      </div>
    </nav>
  );
}
