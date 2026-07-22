import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export interface TestimonialItem {
  id: number;
  headline: string;
  quote: string;
  author: string;
  role: string;
  platform: string;
  sourceName: string;
  linkUrl: string;
  avatar: string;
  badgeColor: string;
}

export const PROOF_REVIEWS: TestimonialItem[] = [
  {
    id: 1,
    headline: '"Revenue Beyond Expectations"',
    quote:
      "After talking to support, we realized we hadn't understood the app's full functionality and potential value. After getting a walkthrough, it helped increase our revenue beyond expectations.",
    author: "Out Of The Grey Coffee",
    role: "Coffee Shop Owner",
    platform: "@shopify",
    sourceName: "Shopify App Store",
    linkUrl: "https://apps.shopify.com/",
    avatar: "O",
    badgeColor:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  },
  {
    id: 2,
    headline: '"Uncovered Opportunities"',
    quote:
      "A retailer reviewing an analytics tool said it helped them uncover revenue, growth, and retention opportunities through customer segmentation, even just days into using it.",
    author: "Modaselle",
    role: "Retailer",
    platform: "@shopify",
    sourceName: "Shopify App Reviews",
    linkUrl: "https://apps.shopify.com/",
    avatar: "M",
    badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    id: 3,
    headline: '"Frictionless Customer Experience"',
    quote:
      "Tied better customer experience directly to revenue, saying it provides an easier experience for customers—and that's what's needed to increase revenue.",
    author: "Shop Miss A",
    role: "E-commerce Merchant",
    platform: "@shopify",
    sourceName: "Shopify App Store",
    linkUrl: "https://apps.shopify.com/",
    avatar: "S",
    badgeColor:
      "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
  },
  {
    id: 4,
    headline: '"Direct Buyer Edge"',
    quote:
      "Even against big competitors, the edge comes from really knowing your buyers—talking to customers directly, asking why they buy, what else they'd purchase if you carried it, and whether your prices feel competitive.",
    author: "Former E-commerce Owner",
    role: "Store Owner & Practitioner",
    platform: "@practicalecommerce",
    sourceName: "Practical Ecommerce",
    linkUrl: "https://www.practicalecommerce.com/",
    avatar: "P",
    badgeColor:
      "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  },
  {
    id: 5,
    headline: '"Struggling vs. Profitable"',
    quote:
      "Businesses fail when leadership assumes they know best without ever asking the people actually shopping the site—she called this the line between businesses that are 'just getting by' and those that are profitable.",
    author: "Merchant Columnist",
    role: "Columnist & Store Owner",
    platform: "@practicalecommerce",
    sourceName: "Practical Ecommerce",
    linkUrl: "https://www.practicalecommerce.com/",
    avatar: "C",
    badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300",
  },
  {
    id: 6,
    headline: '"Tailored Real Buyer Value"',
    quote:
      "The more you understand your customers, the better you can tailor products to give them real value, support them, and keep learning from them—because customers understand buyers better than the business does.",
    author: "Paul Jarvis",
    role: "Author of Company of One",
    platform: "@goodreads",
    sourceName: "Goodreads Highlights",
    linkUrl:
      "https://www.goodreads.com/work/quotes/61664182-company-of-one-why-staying-small-is-the-next-big-thing-for-business",
    avatar: "G",
    badgeColor:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300",
  },
];

const firstRow = PROOF_REVIEWS.slice(0, 3);
const secondRow = PROOF_REVIEWS.slice(3, 6);

const ReviewCard = ({ item }: { item: TestimonialItem }) => {
  return (
    <figure
      className={cn(
        "relative flex w-85 shrink-0 cursor-pointer flex-col justify-between space-y-4 overflow-hidden rounded-[24px] border p-6 transition-all duration-200 sm:w-95",
        // light styles
        "border-zinc-200/80 bg-white shadow-sm hover:bg-zinc-50/80 hover:shadow-md",
        // dark styles
        "dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800/80",
      )}
    >
      <div className="space-y-2">
        <h4 className="font-serif text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
          {item.headline}
        </h4>
        <blockquote className="text-xs leading-relaxed text-zinc-600 italic sm:text-sm dark:text-zinc-300">
          "{item.quote}"
        </blockquote>
      </div>

      <div className="flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800/80">
        <div className="flex items-center gap-2.5">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${item.badgeColor}`}
          >
            {item.avatar}
          </div>
          <div>
            <figcaption className="text-xs font-semibold text-zinc-900 dark:text-white">
              {item.author}
            </figcaption>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
              {item.role} <span className="font-normal">{item.platform}</span>
            </p>
          </div>
        </div>

        <Link
          href={item.linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <span>View</span>
          <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
    </figure>
  );
};

export function CustomerTestimonials() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4">
      <Marquee pauseOnHover className="[--duration:35s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.id} item={review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="mt-4 [--duration:35s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.id} item={review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-linear-to-r from-white dark:from-zinc-950"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-linear-to-l from-white dark:from-zinc-950"></div>
    </div>
  );
}
