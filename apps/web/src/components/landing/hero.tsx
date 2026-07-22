"use client";
import { Globe } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const WORDS = ["Test", "Validate", "Optimize", "Audit", "Elevate"];

export default function Hero() {
  const [URL, setURL] = useState("");
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative container mx-auto flex min-h-[85vh] max-w-screen-2xl flex-col items-center justify-center px-4 py-10 sm:min-h-screen sm:px-6 sm:py-16 md:py-20 lg:px-8">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-size-[4rem_3rem] sm:bg-size-[6rem_4rem]"></div>

      <div className="mx-auto flex w-full max-w-xs flex-col items-center justify-center space-y-6 py-6 sm:max-w-xl sm:space-y-8 sm:py-12 md:max-w-3xl lg:max-w-5xl 2xl:max-w-6xl">
        <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
          <h1 className="max-w-xs text-center font-serif text-2xl leading-[1.15] font-normal tracking-tight sm:max-w-xl sm:text-4xl sm:leading-[1.2] md:max-w-3xl md:text-6xl lg:max-w-4xl lg:text-7xl lg:leading-[1.15] 2xl:text-8xl">
            <span className="relative inline-grid grid-cols-1 overflow-hidden align-bottom">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={WORDS[index]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="col-start-1 row-start-1 inline-block"
                >
                  {WORDS[index]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            your Store with your target Audience
          </h1>
          <p className="max-w-xs text-center text-xs text-zinc-800/70 sm:max-w-lg sm:text-base md:max-w-2xl md:text-xl lg:text-2xl">
            Analyze your ecommerce store from your customers perspective
          </p>
        </div>

        <div className="mt-4 flex w-full justify-center sm:mt-8 md:mt-10">
          <InputGroup className="h-12 w-full max-w-xs transition-all sm:h-14 sm:max-w-md md:h-16 md:max-w-lg lg:max-w-xl">
            <div className="flex w-full items-center gap-2 p-2 sm:p-3">
              <Globe className="shrink-0 text-base text-neutral-500 sm:text-xl" />
              <InputGroupInput
                onChange={(e) => setURL(e.target.value)}
                placeholder="Enter your store URL"
                className="text-xs sm:text-sm md:text-base"
              />
            </div>

            <InputGroupAddon align="block-end">
              <InputGroupButton
                variant="default"
                size="sm"
                className="ml-auto h-8 cursor-pointer px-3 text-xs sm:h-10 sm:px-5 sm:text-sm"
                onClick={() => {
                  router.push(
                    `/analyze/${encodeURIComponent(URL.replace("https://", "").replace("/", ""))}`,
                  );
                }}
              >
                Analyze
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-center text-xs text-neutral-500 sm:text-sm md:text-base">
            <span className="text-black/70">Works with any online store.</span>
          </p>
          <ul className="flex flex-wrap justify-center gap-2 px-2 text-xs text-black/40 sm:gap-3 sm:text-sm">
            <li>Amboras</li>
            <li>Shopify</li>
            <li>Wix</li>
            <li>WooCommerce</li>
            <li>Squarespace</li>
            <li>BigCartel</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
