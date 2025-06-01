"use client";

import { IconContext } from "@phosphor-icons/react";
import { IconType } from "@/_types/icon-provider";

export function IconProvider({
  children,
  weight = "bold",
  color = "currentColor",
  size = 32,
  mirrored = false,
  style,
}: IconType) {
  return (
    <IconContext.Provider
      value={{
        weight,
        color,
        size,
        mirrored,
        style,
      }}
    >
      {children}
    </IconContext.Provider>
  );
}
