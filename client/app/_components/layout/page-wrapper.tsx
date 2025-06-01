"use client";

import { motion } from "framer-motion";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      key="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`
        relative min-h-screen
        max-w-screen-lg w-full mx-auto
        flex flex-col justify-between 
        items-center z-0
        `}
    >
      {children}
    </motion.div>
  );
}
