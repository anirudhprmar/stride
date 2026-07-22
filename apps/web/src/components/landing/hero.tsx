"use client";
import { Globe } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
  const [URL, setURL] = useState("");
  const router = useRouter();
  return (
    <section className="relative container mx-auto flex min-h-screen max-w-screen-2xl flex-col items-center justify-center px-4">
      <div className="absolute top-0 right-0 left-0 flex h-5 w-full items-center justify-center bg-black text-white">
        <p className="text-md text-center">EXPERIENCE YOUR ECOM STORE</p>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center justify-center space-y-4 py-12">
        <div className="flex flex-col items-center justify-center gap-5 space-y-4">
          <h1 className="text-center font-serif text-3xl font-normal tracking-tight md:text-5xl lg:text-7xl">
            Test your Store with your target Audience
          </h1>
          <p className="max-w-xl text-center text-lg text-zinc-800/60 md:text-xl lg:text-2xl">
            Analyze your ecommerce store from your customers perspective
          </p>
        </div>

        <div className="mt-10 w-full">
          <InputGroup className="mx-auto h-16 max-w-sm">
            <div className="flex w-full items-center gap-2 p-2">
              <Globe className="text-xl text-neutral-500" />
              <InputGroupInput
                onChange={(e) => setURL(e.target.value)}
                placeholder="Enter your store URL"
              />
            </div>

            <InputGroupAddon align="block-end">
              <InputGroupButton
                variant="default"
                size="sm"
                className="ml-auto"
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
      </div>
    </section>
  );
}
