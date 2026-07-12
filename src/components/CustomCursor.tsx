"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorMode = "default" | "play" | "view" | "drag";

const LABELS: Record<CursorMode, string> = {
  default: "",
  play: "▶ PLAY",
  view: "VIEW",
  drag: "◀ DRAG ▶",
};

export default function CustomCursor() {
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 35, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 400, damping: 35, mass: 0.6 });

  useEffect(() => {
    // only enable on fine pointers
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.body.classList.add("custom-cursor-on");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor]"
      );
      setMode((target?.dataset.cursor as CursorMode) ?? "default");
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.body.classList.remove("custom-cursor-on");
    };
  }, [x, y]);

  const expanded = mode !== "default";

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[150] hidden md:flex items-center justify-center"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
    >
      <motion.div
        className="mono flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full text-[10px] font-medium"
        animate={{
          width: expanded ? "auto" : 14,
          height: expanded ? 34 : 14,
          paddingLeft: expanded ? 16 : 0,
          paddingRight: expanded ? 16 : 0,
          backgroundColor: expanded ? "var(--accent)" : "var(--accent)",
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        style={{ color: "#0a0a0b" }}
      >
        {expanded && LABELS[mode]}
      </motion.div>
    </motion.div>
  );
}
