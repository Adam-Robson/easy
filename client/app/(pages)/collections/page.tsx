"use client";

import Albums from "@/_components/albums";
import PageLayout from "@/_components/layout/page-layout";

export default function CollectionsPage() {
  return (
    <PageLayout>
      <div
        className={`
      flex flex-col justify-start items-center
      w-full text-center
      p-2
    `}
      >
        <h1 className="title text-3xl font-light leading-tight mb-20">
          Le Fog Collections
        </h1>
        <section className="flex justify-center items-center px-4 w-full">
          <Albums />
        </section>
      </div>
    </PageLayout>
  );
}
