import { Globe } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { Button } from "../ui/button";

export default function Hero() {
  return (
    <section className="relative container mx-auto px-4 max-w-screen-2xl min-h-screen flex flex-col justify-center items-center">
      <div className="bg-black absolute top-0 right-0 left-0 w-full text-white h-5 flex items-center justify-center">
        <p className="text-center text-md">EXPERIENCE YOUR ECOM STORE</p>
      </div>

      <div className="flex flex-col justify-center items-center max-w-3xl mx-auto py-12 space-y-4">
        <div className="flex flex-col justify-center items-center gap-5 space-y-4">
          <h1 className="text-3xl md:text-5xl lg:text-7xl text-center font-serif tracking-tight font-normal">
            Test your Store with your target Audience
          </h1>
          <p className="text-zinc-800/60 text-center text-lg md:text-xl lg:text-2xl max-w-xl">
            Analyze your ecommerce store from your customers perspective
          </p>
        </div>

        <div className="mt-10 w-full">
          <InputGroup className="max-w-sm h-16 mx-auto">
            <div className="flex items-center gap-2 p-2 w-full">
              <Globe className="text-neutral-500 text-xl" />
              <InputGroupInput placeholder="Enter your store URL" />
            </div>

            <InputGroupAddon align="block-end">
              <InputGroupButton variant="default" size="sm" className="ml-auto">
                Analyze
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </section>
  );
}
