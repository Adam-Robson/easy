"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { navLinks } from "@/_data/navlinks";
import { useEffect, useState } from "react";
import "@/_styles/navigation.css";

export default function Navigation() {
  const pathname = usePathname();

  const baseClasses = `
    flex justify-between items-center gap-2
    p-2 text-xl font-medium rounded-md 
  `;

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`
        fixed z-50 flex flex-col gap-2 p-2
        w-fit right-2 top-1/4 sm:top-4 sm:right-auto
        rounded-lg
      `}
    >
      {navLinks
        .filter((path) => path.path !== pathname)
        .map(({ name, path, icon: Icon }) => {

          return (
            <div
              key={name}
              className="w-full flex flex-col justify-between items-between"
            >
              <Link
                href={path}
                className={`
                  ${baseClasses}
                  group no-underline flex justify-between items-center
                `}
              >
                <span className="py-4 navlink tracking-tight">
                  {name}
                </span>
                <Icon
                  size={32}
                  className={`
                    phosphor-icon
                    ml-2 opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  `}
                />
              </Link>
            </div>
          );
        })}
    </motion.nav>
  );
}
