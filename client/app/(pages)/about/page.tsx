"use client";
import { motion } from "framer-motion";
import "@/_styles/about.css";
import Image from "next/image";
import PageLayout from "@/_components/layout/page-layout";

export default function AboutPage() {
  return (
    <PageLayout>
      <div
        className={`
      flex flex-col justify-start items-center
      w-full text-center
      p-2
    `}
      >
        <h1 className="title text-4xl font-light leading-tight mb-20">
          About Le Fog
        </h1>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
        >
          <div className="w-full">
            <Image
              src="/images/roaddogs.jpg"
              alt="Portrait or relevant graphic"
              width={400}
              height={200}
              className="rounded-2xl shadow-lg w-full object-cover dark:grayscale"
            />
          </div>

          <div className="space-y-6">
            <p className="text leading-relaxed subpixel-antialiased">
              Le Fog is a music project - created by Adam Robson - blending
              poetic songwriting, minimalist production, and immersive
              soundscapes.
            </p>
            <hr className="max-w-60 mx-auto" />
            <p className="text leading-relaxed subpixel-antialiased">
              The mission is to create honest, frictionless sound environments
              that elevate mood, deepen introspection, and evoke atmosphere.
            </p>
            <hr className="max-w-60 mx-auto" />
            <p className="text leading-relaxed subpixel-antialiased">
              Since 2020, Adam Robson has handled all conceptual design,
              recording, production, and distribution under the Le Fog name,
              releasing four albums to date.
            </p>
          </div>
        </motion.section>
      </div>
    </PageLayout>
  );
}
