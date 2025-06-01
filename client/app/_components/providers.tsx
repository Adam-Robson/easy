"use client";
import { ThemeProvider } from "@/_contexts/theme-provider";
import { AudioProvider } from "@/_contexts/audio-provider";
import { IconProvider } from "@/_contexts/icon-provider";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AudioProvider>
        <IconProvider>{children}</IconProvider>
      </AudioProvider>
    </ThemeProvider>
  );
}
