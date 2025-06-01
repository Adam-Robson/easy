"use client";

import Link from "next/link";
import { ReactNode } from "react";
import ThemeToggle from "@/_components/theme-toggle";
import { House } from "@phosphor-icons/react";

type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex flex-col p-2">
      <header className="flex justify-between items-center px-6 py-4 w-full">
        <button>
          <Link
            href="/"
            className={`
              toggle-theme
              rounded focus:outline-none
              text-sm p-2 z-50 cursor-pointer
              absolute top-4 left-4
            `}
          >
            <House size={32} />
          </Link>
        </button>
        <ThemeToggle />
      </header>

      <main
        className={`
          flex flex-col justify-start
          items-center w-full
          text-center p-2
        `}
      >
        {children}
      </main>
    </div>
  );
}
