import Image from "next/image";
import React from "react";

export default function Feature({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-3 py-6 sm:space-y-4 sm:py-10 md:py-14">
      <p className="px-4 text-center font-serif text-xl font-medium sm:text-2xl md:text-3xl lg:text-4xl">
        {title}
      </p>
      {description && (
        <p className="max-w-lg px-4 text-center text-xs leading-relaxed text-zinc-600 sm:text-sm md:text-base dark:text-zinc-400">
          {description}
        </p>
      )}
      <div className="relative mx-auto flex w-full max-w-xs flex-col items-center justify-center px-4 sm:max-w-md md:max-w-xl lg:max-w-2xl">
        <Image
          src="/feature_bg.jpg"
          width={600}
          height={400}
          alt={title || "feature image"}
          className="h-auto w-full rounded-xl object-cover shadow-sm"
        />
        {image && (
          <Image
            src={image}
            width={600}
            height={400}
            alt={title || "feature image"}
            className="absolute top-1/2 left-1/2 h-auto w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-sm"
          />
        )}
      </div>
    </div>
  );
}
