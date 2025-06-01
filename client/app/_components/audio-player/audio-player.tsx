"use client";

import { useAudioContext } from "@/_contexts/audio-provider";
import Controls from "@/_components/audio-player/controls";
import Playlist from "@/_components/audio-player/playlist";
import { X } from "@phosphor-icons/react";
import "@/_styles/audio-player.css";

export default function AudioPlayer() {
  const { song, playback, elapsed, duration, togglePlayer } = useAudioContext();

  return (
    <div className="audio-player border-2 border-cyan-50 rounded-lg">
      <div className="border-2 border-cyan-50 rounded-lg p-2">
        <button
          className="absolute right-5 top-5 cursor-pointer z-50"
          onClick={togglePlayer}
        >
          <X size={20} />
        </button>
        <section className="playlist text-sm text-shadow-md">
          <Playlist />
        </section>
        <section className="min-h-32 flex-1 text-center flex flex-col items-center justify-center">
          {playback && (
            <>
              <div className="text-xl font-normal text-shadow-xl">
                {song.title}
              </div>
              <div className="text-lg mt-4 text-shadow-xl">
                {elapsed} / {duration}
              </div>
            </>
          )}
        </section>
        <Controls />
      </div>
    </div>
  );
}
