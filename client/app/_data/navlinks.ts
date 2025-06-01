import {
  ApproximateEquals,
  EnvelopeSimple,
  House,
  VinylRecord,
} from "@phosphor-icons/react";
import { ForwardRefExoticComponent } from "react";
import { IconProps } from "@phosphor-icons/react";

export type Navlink = {
  name: string;
  path: string;
  icon: ForwardRefExoticComponent<IconProps>;
};

export const navLinks: Navlink[] = [
  { name: "home", path: "/", icon: House },
  { name: "about", path: "/about", icon: ApproximateEquals },
  { name: "collections", path: "/collections", icon: VinylRecord },
  { name: "contact", path: "/contact", icon: EnvelopeSimple },
];
