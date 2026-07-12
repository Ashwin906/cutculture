"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function LocalClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour12: false,
          timeZone: "Asia/Kolkata",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <>{time}</>;
}

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 pb-28 pt-24 md:px-14 md:pt-32">
      <p className="mono mb-3 text-[10px] tracking-[0.3em]" style={{ color: "var(--accent)" }}>
        05 — FINAL CUT
      </p>

      {/* giant CTA */}
      <a
        href="https://wa.me/919095399911?text=Hi%20Harivarshan%2C%20saw%20your%20portfolio%20—%20let%27s%20talk%20about%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="view"
        className="group block"
      >
        <motion.h2
          className="display text-[11.5vw] leading-[0.9] md:text-[9vw]"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="block transition-colors duration-300 group-hover:text-[var(--accent)]">
            LET&apos;S CREATE
          </span>
          <span className="outline-text block transition-all duration-300 group-hover:[-webkit-text-stroke:1px_var(--accent)]">
            SOMETHING
          </span>
        </motion.h2>
      </a>

      {/* contact rows */}
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {[
          { k: "EMAIL", v: "cutcultureeditz@gmail.com", href: "mailto:cutcultureeditz@gmail.com" },
          { k: "PHONE / WHATSAPP", v: "+91 90953 99911", href: "https://wa.me/919095399911" },
          { k: "INSTAGRAM", v: "@cutculture__", href: "https://instagram.com/cutculture__" },
        ].map((c, i) => (
          <motion.a
            key={c.k}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            data-cursor="view"
            className="link-draw group border-t pt-5"
            style={{ borderColor: "var(--border)" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mono mb-2 text-[9px] tracking-[0.3em]" style={{ color: "var(--text3)" }}>
              {c.k}
            </p>
            <p className="text-lg transition-colors group-hover:text-[var(--accent)] md:text-xl">{c.v}</p>
          </motion.a>
        ))}
      </div>

      {/* footer */}
      <footer className="mt-24 flex flex-col items-start justify-between gap-4 border-t pt-8 md:flex-row md:items-center" style={{ borderColor: "var(--border)" }}>
        <span className="display text-xl">
          CUT<span style={{ color: "var(--accent)" }}>CULTURE</span>
        </span>
        <span className="mono text-[9px] tracking-widest" style={{ color: "var(--text3)" }}>
          FOUNDED BY HARIVARSHAN R — COIMBATORE, IN
        </span>
        <span className="mono text-[9px] tracking-widest" style={{ color: "var(--text3)" }}>
          LOCAL TIME <LocalClock /> IST
        </span>
        <span className="mono text-[9px] tracking-widest" style={{ color: "var(--text3)" }}>
          © 2026 CUTCULTURE — 00:00:00:00
        </span>
      </footer>
    </section>
  );
}
