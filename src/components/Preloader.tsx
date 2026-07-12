"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [frame, setFrame] = useState(0);

  // count 0 → 72 frames (~3s of 24fps footage) over ~1.6s real time
  useEffect(() => {
    const total = 72;
    const start = performance.now();
    const dur = 1600;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      // ease-out so the counter decelerates like a spooling reel
      const eased = 1 - Math.pow(1 - t, 3);
      setFrame(Math.round(eased * total));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 250);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const seconds = Math.floor(frame / 24);
  const frames = frame % 24;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: "var(--bg)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.45, ease: [0.87, 0, 0.13, 1] },
          }}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="rec-dot" />
              <span className="mono text-xs" style={{ color: "var(--text2)" }}>
                LOADING REEL
              </span>
            </div>
            <div
              className="mono text-4xl md:text-6xl"
              style={{ color: "var(--text)" }}
            >
              00:00:{pad(seconds)}:{pad(frames)}
            </div>
            <div
              className="h-px w-48 overflow-hidden"
              style={{ background: "var(--border)" }}
            >
              <motion.div
                className="h-full"
                style={{ background: "var(--accent)" }}
                initial={{ width: "0%" }}
                animate={{ width: `${(frame / 72) * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <span className="mono text-[10px]" style={{ color: "var(--text3)" }}>
              CUTCULTURE — 24 FPS
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
