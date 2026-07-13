"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

export default function Marquee({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 300 });
  const skew = useTransform(smoothVelocity, [-2000, 2000], ["-4deg", "4deg"]);
  const factor = useTransform(smoothVelocity, [-2000, 2000], [-3, 3]);
  const dirRef = useRef(reverse ? -1 : 1);

  useAnimationFrame((_, delta) => {
    const f = factor.get();
    // reverse travel direction when scrolling up
    if (f < -0.1) dirRef.current = reverse ? 1 : -1;
    else if (f > 0.1) dirRef.current = reverse ? -1 : 1;
    let move = dirRef.current * 0.02 * delta * (1 + Math.abs(f));
    let next = baseX.get() + move;
    // wrap within one copy width (track holds 4 copies; wrap at -50%..0)
    if (next <= -50) next += 50;
    if (next > 0) next -= 50;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);
  const text = items.join("  •  ") + "  •  ";

  return (
    <div
      className="relative overflow-hidden border-y py-5 md:py-7"
      style={{ borderColor: "var(--border)" }}
      aria-hidden
    >
      <motion.div className="marquee-track" style={{ x, skewX: skew }}>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="display whitespace-nowrap pr-4 text-4xl md:text-6xl"
            style={{
              color: i % 2 ? "transparent" : "var(--text)",
              WebkitTextStroke: i % 2 ? "1px var(--text3)" : undefined,
            }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
