"use client";

import React from "react";
import { CustomerTestimonials } from "@/components/customer-testimonials";

export default function WhyStride() {
  return (
    <section className="container mx-auto my-10 max-w-7xl rounded-3xl bg-zinc-50/50 px-4 py-20 sm:px-6 sm:py-28 lg:px-8 dark:bg-zinc-950/40">
      {/* Header */}
      <div className="mb-12 flex flex-col items-center space-y-2 text-center">
        <h2 className="max-w-xs text-center font-serif text-2xl leading-[1.15] font-normal tracking-tight sm:max-w-xl sm:text-4xl sm:leading-[1.2] md:max-w-3xl md:text-6xl lg:text-7xl lg:leading-[1.15]">
          Why Stride
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed font-normal text-zinc-500 sm:text-base dark:text-zinc-400">
          Real stories, merchant reviews, and business voices showing why
          viewing your store from your buyer's perspective is essential.
        </p>
      </div>

      <CustomerTestimonials />
    </section>
  );
}
