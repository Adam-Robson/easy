import { ReactNode } from "react";

export type IconType = {
  children: ReactNode;
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
  color?: string;
  size?: string | number;
  mirrored?: boolean;
  style?: React.CSSProperties;
};
