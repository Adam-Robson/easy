"use client";
import { Howl, Howler } from "howler";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  SongType,
  AudioContextType,
  AudioProviderPropsType,
} from "@/_types/audio-provider";
import { playlist } from "@/_data/playlist";

const AudioContext = createContext<AudioContextType | null>(null);

const formatTime = (seconds: number): string => {
  if (!seconds || !Number.isFinite(seconds) || seconds < 0) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export function AudioProvider({
  children,
  initialVolume = 0.5,
  initialIndex = 0,
}: AudioProviderPropsType) {
  const [currentIndex, setCurrentIndex] = useState<number>(initialIndex);
  const [playback, setPlayback] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(initialVolume);
  const [elapsed, setElapsed] = useState<string>("00:00");
  const [duration, setDuration] = useState<string>("00:00");
  const [visible, setVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const songRef = useRef<Howl | null>(null);
  const volumeSliderRef = useRef<HTMLInputElement>(null);
  const frameRef = useRef<number>(0);

  const song: SongType = useMemo(() => playlist[currentIndex], [currentIndex]);

  const initializeHowl = useCallback(
    (songUrl: string): Howl => {
      try {
        const newSong = new Howl({
          src: [songUrl],
          html5: true,
          preload: "metadata",
          autoplay: false,
          loop: false,
          volume: volume,
          onload: () => {
            const durationSeconds = newSong.duration() as number;
            setDuration(formatTime(durationSeconds));
            setError(null);
          },
          onloaderror: (_id: number, error: unknown) => {
            setError(`Failed to load audio: ${error}`);
            console.error("Audio load error:", error);
          },
          onplayerror: (_id: number, error: unknown) => {
            setError(`Failed to play audio: ${error}`);
            console.error("Audio play error:", error);
          },
          onplay: () => setPlayback(true),
          onpause: () => setPlayback(false),
          onend: () => {
            setPlayback(false);
            setElapsed("00:00");
            songRef.current?.stop();
          },
          onstop: () => {
            setPlayback(false);
            setElapsed("00:00");
          },
        });

        return newSong;
      } catch (error) {
        setError(`Failed to initialize audio: ${error}`);
        console.error("Howl initialization error:", error);
        throw error;
      }
    },
    [volume]
  );

  const handleSongChange: (newIndex: number) => void = useCallback(
    (newIndex: number) => {
      if (newIndex < 0 || newIndex >= playlist.length) {
        setError("Invalid song index");
        return;
      }

      try {
        if (songRef.current) {
          songRef.current.unload();
        }

        setCurrentIndex(newIndex);
        const selectedSong = playlist[newIndex]?.url;

        if (!selectedSong) {
          setError("Invalid song URL");
          return;
        }

        songRef.current = initializeHowl(selectedSong);
        if (playback) {
          songRef.current.play();
        }
      } catch (error) {
        setError(`Failed to change song: ${error}`);
        console.error("Song change error:", error);
      }
    },
    [initializeHowl, playback]
  );

  const handleVolumeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(event.target.value);
      setVolume(newVolume);
      if (songRef.current) {
        songRef.current.volume(newVolume);
      }
    },
    []
  );

  const handlePlayback = useCallback(async () => {
    console.log("handlePlayback triggered");
    console.log("Current song:", song);
    console.log("songRef.current before:", songRef.current);

    if (!songRef.current) {
      try {
        console.log("Initializing songRef with:", song.url);
        const howl = initializeHowl(song.url);
        if (!howl) throw new Error("initializeHowl returned undefined");
        songRef.current = howl;
        console.log("songRef.current initialized:", songRef.current);
      } catch (e) {
        console.error("Failed to initialize Howl:", e);
        return;
      }
    }

    try {
      if (Howler.ctx.state === "suspended") {
        await Howler.ctx.resume();
      }

      if (songRef.current.playing()) {
        songRef.current.pause();
      } else {
        songRef.current.play();
      }
    } catch (error) {
      setError(`Playback error: ${error}`);
      console.error("Play/Pause error:", error);
    }
  }, [initializeHowl, song]);

  const handleNextSong = useCallback(() => {
    const nextIndex = currentIndex < playlist.length - 1 ? currentIndex + 1 : 0;
    handleSongChange(nextIndex);
  }, [currentIndex, handleSongChange]);

  const handlePreviousSong = useCallback(() => {
    const nextIndex = currentIndex > 0 ? currentIndex - 1 : playlist.length - 1;
    handleSongChange(nextIndex);
  }, [currentIndex, handleSongChange]);

  const handleVolume = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleVolumeChange?.(event);
      const value = ((volume ?? 0) * 100).toFixed(2);
      event.target.style.backgroundSize = `${value}% 100%`;
    },
    [volume, handleVolumeChange]
  );

  const togglePlayer = useCallback(() => {
    setVisible((prev) => !prev);
  }, [setVisible]);

  useEffect(() => {
    if (volumeSliderRef?.current) {
      const value = ((volume ?? 0) * 100).toFixed(2);
      volumeSliderRef.current.style.backgroundSize = `${value}% 100%`;
    }
  }, [volume, volumeSliderRef]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (songRef.current) {
        songRef.current.volume(volume);
      }
    }, 200);
    return () => clearTimeout(handler);
  }, [volume]);

  useEffect(() => {
    const updateElapsed = () => {
      if (playback && songRef.current) {
        const currentSeconds = songRef.current.seek() as number;
        setElapsed(formatTime(currentSeconds));
      }
      frameRef.current = requestAnimationFrame(updateElapsed);
    };

    if (playback) {
      updateElapsed();
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [playback]);

  const contextValue = useMemo(
    () => ({
      playlist,
      song,
      currentIndex,
      playback,
      volume,
      elapsed,
      duration,
      error,
      setVolume,
      handleVolumeChange,
      handlePlayback,
      handleSongChange,
      handlePreviousSong,
      handleNextSong,
      handleVolume,
      volumeSliderRef,
      togglePlayer,
      visible,
    }),
    [
      song,
      currentIndex,
      playback,
      volume,
      elapsed,
      duration,
      error,
      setVolume,
      handleVolumeChange,
      handlePlayback,
      handleSongChange,
      handlePreviousSong,
      handleNextSong,
      handleVolume,
      volumeSliderRef,
      togglePlayer,
      visible,
    ]
  );

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}

export const useAudioContext = () => {
  const context = useContext(AudioContext);
  if (context === null) {
    throw new Error("useAudioContext must be used within AudioProvider");
  }
  return context;
};
