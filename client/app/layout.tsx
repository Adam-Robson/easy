import type { Metadata } from "next";
import { Fira_Sans, Fira_Code, Fira_Mono } from "next/font/google";
import Providers from "@/_components/providers";
import PageWrapper from "@/_components/layout/page-wrapper";
import "./globals.css";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  variable: "--fira-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--fira-code",
  weight: ["300", "400", "500", "600", "700"],
});

const firaMono = Fira_Mono({
  subsets: ["latin"],
  variable: "--fira-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Le Fog",
  description: "This is the website for a band, Le Fog.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${firaSans.variable} 
          ${firaCode.variable} 
          ${firaMono.variable} 
          subpixel-antialiased
        `}
      >
        <Providers>
          <PageWrapper>{children}</PageWrapper>
        </Providers>
      </body>
    </html>
  );
}
