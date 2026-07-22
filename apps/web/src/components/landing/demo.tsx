"use client";
import Image from "next/image";
import React from "react";

export default function Demo() {
  return (
    <section className="container mx-auto space-y-6 px-4 py-10 sm:space-y-8 sm:px-6 sm:py-16 md:py-20 lg:px-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="max-w-xs text-center font-serif text-2xl leading-[1.15] font-normal tracking-tight sm:max-w-xl sm:text-4xl sm:leading-[1.2] md:max-w-3xl md:text-6xl lg:text-7xl lg:leading-[1.15]">
          See how Stride works
        </h1>
      </div>
      <div className="relative mx-auto flex w-full max-w-xl flex-col items-center justify-center overflow-hidden rounded-xl md:max-w-4xl">
        <Image
          src={"/demo_bg.jpg"}
          width={500}
          height={500}
          alt="demo video background"
          className="w-full rounded-xl object-contain"
        />

        <video
          className="absolute top-1/2 left-1/2 aspect-video w-[90%] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-md sm:w-[85%] md:w-[80%]"
          src="https://c4qrl532oo.ufs.sh/f/s0GPcE56MbtBi7h0wIJYeG3K1B8V4stuLkdD9Mw0AmyoIhCN"
          title="Video of stride in action"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          controls
        />
      </div>
    </section>
  );
}
