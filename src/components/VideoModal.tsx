"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project, embedFor } from "@/data/projects";

export default function VideoModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  const vertical = project?.ratio === "9/16";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[180] flex items-center justify-center p-4 md:p-12"
          style={{ background: "rgba(0,0,0,0.92)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.15 } }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          onClick={onClose}
        >
          {/* top bar */}
          <div className="mono absolute left-6 top-5 flex items-center gap-3 text-[10px]" style={{ color: "var(--text2)" }}>
            <span className="rec-dot" />
            NOW PLAYING — {project.title.toUpperCase()} / {project.client.toUpperCase()}
          </div>
          <button
            onClick={onClose}
            data-cursor="view"
            className="mono absolute right-6 top-4 rounded-full border px-4 py-2 text-[10px] tracking-widest transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            style={{ borderColor: "var(--border)", color: "var(--text2)" }}
          >
            CLOSE ✕
          </button>

          <motion.div
            className="relative w-full overflow-hidden rounded-md"
            style={{
              maxWidth: vertical ? "min(52vh, 420px)" : "min(170vh, 1200px)",
              aspectRatio: vertical ? "9/16" : "16/9",
              background: "var(--surface)",
              border: "1px solid var(--border)",
            }}
            initial={{ scale: 0.96, y: 16 }}
            animate={{ scale: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ scale: 0.97, y: 8, transition: { duration: 0.15 } }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={embedFor(project)}
              className="h-full w-full"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title={project.title}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
