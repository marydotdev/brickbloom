import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import { AFFILIATE_LINKS } from "@/lib/utils"; // Import affiliate links
import Image from "next/image"; // Import Next.js Image component

const ads = AFFILIATE_LINKS; // Use affiliate links instead of reviews

// Remove the reviews array and firstRow/secondRow logic
const firstRow = ads.slice(0, ads.length / 2);
const secondRow = ads.slice(ads.length / 2);

// Update ReviewCard to display affiliate link data
const ReviewCard = ({
  image,
  title,
  url,
}: {
  image: string;
  title: string;
  url: string;
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "relative w-72 flex items-center justify-center overflow-hidden p-4 transition-transform duration-200 transform md:hover:scale-110"
      )}
    >
      <Image
        src={image}
        alt={title}
        width={300} // Set appropriate width
        height={200} // Set appropriate height
        className="max-w-full max-h-48 object-contain"
      />
    </a>
  );
};

export function AffiliateMarquee() {
  return (
    <div className="my-12 relative flex gap-12 h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
      <Marquee pauseOnHover className="[--duration:80s] sm:[--duration:200s]">
        {firstRow.map((ad) => (
          <ReviewCard key={ad.title} {...ad} />
        ))}
      </Marquee>

      <Marquee
        reverse
        pauseOnHover
        className="[--duration:80s] sm:[--duration:200s]"
      >
        {secondRow.map((ad) => (
          <ReviewCard key={ad.title} {...ad} />
        ))}
      </Marquee>
      {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div> */}
    </div>
  );
}
