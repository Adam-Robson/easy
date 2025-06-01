"use client";

import { useAudioContext } from "@/_contexts/audio-provider";
import { motion, AnimatePresence } from "framer-motion";
import { Radio } from "@phosphor-icons/react";
import AudioPlayer from "@/_components/audio-player/audio-player";
import "@/_styles/audio-player-button.css";

export default function AudioPlayerButton() {
  const { togglePlayer, visible } = useAudioContext();

  return (
    <>
      <button
        onClick={togglePlayer}
        className={`
          radio-icon
          cursor-pointer
        `}
      >
        <Radio size={60} />
      </button>

      <AnimatePresence>
        {visible && (
          <motion.div
            key="player"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              closed: {
                clipPath: "inset(50% 0% 50% 0%)",
                scaleY: 0,
                opacity: 0,
                transition: { duration: 0.8, ease: [0.86, 0, 0.07, 1] },
              },
              open: {
                clipPath: "inset(0% 0% 0% 0%)",
                scaleY: 1,
                opacity: 1,
                transition: { duration: 0.8, ease: [0.86, 0, 0.07, 1] },
              },
            }}
            style={{
              transformOrigin: "center bottom",
              perspective: 1000,
            }}
            className="player-panel"
          >
            <AudioPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
