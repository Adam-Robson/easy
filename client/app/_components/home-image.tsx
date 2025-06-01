import { Orbitron } from "next/font/google";
import "@/_styles/home-image.css";
import Image from "next/image";
export type HomeImageType = {
  img: string;
};

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function HomeImage({ img }: { img: string }) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden flex justify-center items-center">
      <div className="relative w-[899px] max-w-full h-full flex justify-center items-center aspect-square">
        <div
          className={`
          lefog-text
          absolute text-[20vw] text-black
          dark:text-white opacity-10 blur-sm
          pointer-events-none select-none z-0
          ${orbitron.className}
        `}
        >
          LE FOG
        </div>

        <Image
          src={`/images/logo/${img}.png`}
          alt="rotating background"
          width={899}
          height={899}
          className={`
          opacity-40
          rotate-slowly
          object-cover object-center
          mx-auto w-full
          max-w-[850px]
          sm:max-w-[650px]
          md:max-w-[750px]
          lg:max-w-[838px]
          xl:max-w-[858px]
          2xl:max-w-[878px]
        `}
        />
      </div>
    </div>
  );
}
