"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";
import { EnquiryForm } from "./EnquiryForm";
import { SHOW } from "./data";

export function EnquiryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const lenis = useLenis();
  const panelRef = useRef<HTMLDivElement>(null);

  /* Esc se band ho */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /* peeche ka page na khiske */
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    return () => lenis?.start();
  }, [open, lenis]);

  /* focus panel ke andar rakho */
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[110] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/55 p-4 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 26, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative my-auto w-full max-w-lg rounded-[1.75rem] border border-line bg-background shadow-3d outline-none"
          >
            {/* header */}
            <div className="relative overflow-hidden rounded-t-[1.75rem] bg-gradient-to-br from-primary to-secondary px-7 py-6 text-white">
              <span
                aria-hidden
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 15% 20%, #fff 0%, transparent 45%)",
                }}
              />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.22em] uppercase opacity-90">
                    {SHOW.name} {SHOW.year} · Stand {SHOW.stand}
                  </p>
                  <h2
                    id="enquiry-title"
                    className="font-heading mt-1.5 text-2xl font-bold tracking-tight"
                  >
                    Send an enquiry
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close enquiry form"
                  className="-mt-1 -mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-colors hover:bg-white/25"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* body */}
            <div className="px-7 py-7">
              <EnquiryForm source="modal" onDone={onClose} compact />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
