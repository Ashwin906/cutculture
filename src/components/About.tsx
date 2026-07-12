"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - t, 3)) * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="display text-5xl md:text-6xl" style={{ color: "var(--accent)" }}>
      {n}
      {suffix}
    </span>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

export default function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-14 md:py-32" style={{ background: "var(--surface)" }}>
      <motion.p {...fadeUp} className="mono mb-3 text-[10px] tracking-[0.3em]" style={{ color: "var(--accent)" }}>
        04 — BEHIND THE TIMELINE
      </motion.p>
      <motion.h2 {...fadeUp} className="display mb-14 text-5xl md:text-7xl">
        THE <span className="outline-text">EDITOR</span>
      </motion.h2>

      <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
        {/* portrait placeholder with viewfinder overlay */}
        <motion.div {...fadeUp} className="relative mx-auto w-full max-w-md">
          <div
            className="relative aspect-[3/4] w-full overflow-hidden rounded-md"
            style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
          >
            {/* placeholder body */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="mono text-[10px] tracking-widest" style={{ color: "var(--text3)" }}>
                PORTRAIT — HARIVARSHAN R
              </span>
            </div>
            {/* viewfinder overlay */}
            <div className="mono absolute left-4 top-4 flex items-center gap-2 text-[9px]" style={{ color: "var(--text2)" }}>
              <span className="rec-dot" /> REC
            </div>
            <span className="mono absolute right-4 top-4 text-[9px]" style={{ color: "var(--text2)" }}>
              A7IV — 4K 24P
            </span>
            <span className="mono absolute bottom-4 left-4 text-[9px]" style={{ color: "var(--text2)" }}>
              F/1.8 — ISO 800
            </span>
            {/* focus brackets */}
            {["left-3 top-3 border-l-2 border-t-2", "right-3 top-3 border-r-2 border-t-2", "left-3 bottom-3 border-l-2 border-b-2", "right-3 bottom-3 border-r-2 border-b-2"].map(
              (cls) => (
                <span key={cls} className={`absolute h-6 w-6 ${cls}`} style={{ borderColor: "var(--accent)" }} />
              )
            )}
          </div>
        </motion.div>

        {/* bio + stats */}
        <div>
          <motion.p {...fadeUp} className="max-w-xl text-base leading-relaxed md:text-lg" style={{ color: "var(--text2)" }}>
            I&apos;ve been editing and shooting stories since 2021 — starting with short
            films and growing into promotional and brand work across dance,
            hospitality and catering. Based in Coimbatore, I edit for{" "}
            <span style={{ color: "var(--text)" }}>Wingerz Dance Company</span> and run{" "}
            <span style={{ color: "var(--accent)" }}>CutCulture</span>, my own creative
            studio — cinematography, color grading, sound design, all of it.
          </motion.p>
          <motion.p {...fadeUp} className="mt-5 max-w-xl text-base leading-relaxed md:text-lg" style={{ color: "var(--text2)" }}>
            The goal is simple: make every project look and feel cinematic, no matter
            the budget — and build that into a full production house.
          </motion.p>

          {/* stats */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            {[
              { to: 100, suffix: "+", label: "PROJECTS CUT" },
              { to: 25, suffix: "+", label: "HAPPY CLIENTS" },
              { to: 4, suffix: "", label: "YEARS ACTIVE" },
            ].map((s) => (
              <motion.div key={s.label} {...fadeUp}>
                <CountUp to={s.to} suffix={s.suffix} />
                <p className="mono mt-2 text-[9px] tracking-[0.2em]" style={{ color: "var(--text3)" }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* tools */}
          <motion.div {...fadeUp} className="mt-12">
            <p className="mono mb-4 text-[9px] tracking-[0.3em]" style={{ color: "var(--text3)" }}>
              WEAPONS OF CHOICE
            </p>
            <div className="flex flex-wrap gap-3">
              {["DAVINCI RESOLVE", "PREMIERE PRO", "AFTER EFFECTS", "PHOTOSHOP"].map((t) => (
                <span
                  key={t}
                  className="mono rounded-full border px-4 py-2 text-[10px] tracking-widest"
                  style={{ borderColor: "var(--border)", color: "var(--text2)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* experience timeline */}
          <motion.div {...fadeUp} className="mt-12 border-t pt-8" style={{ borderColor: "var(--border)" }}>
            {[
              { role: "EDITOR", org: "Wingerz Dance Company", where: "Gandhi Nagar, Coimbatore", when: "CURRENT" },
              { role: "FOUNDER", org: "CutCulture Studio", where: "Video · Photo · Edit · DJ", when: "CURRENT" },
              { role: "FREELANCE", org: "Independent Projects", where: "Short films → brand work", when: "SINCE 2021" },
            ].map((e) => (
              <div key={e.role} className="flex items-baseline justify-between gap-4 py-3">
                <div>
                  <span className="display text-lg md:text-xl">{e.role}</span>
                  <span className="ml-3 text-sm" style={{ color: "var(--text2)" }}>
                    {e.org}
                  </span>
                  <p className="mono mt-0.5 text-[9px] tracking-wider" style={{ color: "var(--text3)" }}>
                    {e.where.toUpperCase()}
                  </p>
                </div>
                <span className="mono shrink-0 text-[9px] tracking-widest" style={{ color: "var(--accent)" }}>
                  {e.when}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
