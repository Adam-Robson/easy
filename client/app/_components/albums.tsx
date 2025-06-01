"use client";

import Image from "next/image";
import { useState } from "react";
import { collections as albums } from "@/_data/collections";
import { motion, AnimatePresence } from "framer-motion";
import { CollectionType, SongType } from "@/_types/audio-provider";
import { X } from "@phosphor-icons/react";
import "@/_styles/albums.css"
export default function Albums() {
  const [selectedAlbum, setSelectedAlbum] = useState<CollectionType | null>(
    null
  );

  const overlayVariants = {
    initial: { opacity: 0 },
    hover: { opacity: 1 },
  };

  const textVariants = {
    initial: { y: 10, opacity: 0 },
    hover: { y: 0, opacity: 1 },
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
        {albums.map((album: CollectionType) => (
          <motion.div
              key={album.id}
              className={`
                relative aspect-square overflow-hidden
                rounded-lg shadow-md cursor-pointer
                mx-auto w-[clamp(200px,25vw,350px)]
                `}
              animate="initial"
              whileHover="hover"
              onClick={() => setSelectedAlbum(album)}
          >
            <Image
              src={`/images/collections/${album.title}.png`}
              alt={album.title}
              width={700}
              height={700}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <motion.div
                variants={overlayVariants}
                className={`
                  absolute inset-0 flex flex-col
                  justify-center items-center
                  bg-black/40 backdrop-blur-md
              
                `}
            >
              <motion.span
                variants={textVariants}
                className="text-blue-50 text-xl font-normal text-center px-2 mb-4"
              >
                {album.title}
              </motion.span>
              <motion.span
                variants={textVariants}
                className="text-blue-50 text-sm font-normal text-center px-2"
              >
                <p className="italic">released: </p>
                {album.releaseDate}
              </motion.span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`
              fixed inset-0 bg-black/50 backdrop-blur-md
              bg-opacity-50 flex items-center
              justify-center p-4 z-50  
            `}
            onClick={() => setSelectedAlbum(null)}
          >
            <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: 20 }}
                className={`
                  collection-hero relative
                  bg-blue-100 p-4 rounded-lg
                  max-w-lg w-full overflow-auto
                  max-h-[80vh]
                `}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4 subpixel-antialiased">
                {selectedAlbum.title}
              </h2>
              <ul className="list-decimal pl-6 space-y-1 font-normal subpixel-antialiased">
                {selectedAlbum.tracks.map((track: SongType, index: number) => (
                  <li key={index} className="text-base/5">
                    {track.title} {"|"} {track.duration}
                  </li>
                ))}
              </ul>
              <button
              className={`
                mt-4 px-4 py-2 rounded
                cursor-pointer absolute
                top-0 right-0 x
              `}
                onClick={() => setSelectedAlbum(null)}
              >
                <X />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
