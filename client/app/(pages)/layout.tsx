"use client";

import { useThemeProvider } from "@/_contexts/theme-provider";
import Header from "@/_components/layout/header";
import Footer from "@/_components/layout/footer";
import HomeImage from "@/_components/home-image";

export default function Layout() {
  const { theme } = useThemeProvider();

  const image = theme === "dark" ? "main_white" : "main";

  return (
    <>
      <Header />
      <HomeImage img={image} />
      <Footer />
    </>
  );
}
