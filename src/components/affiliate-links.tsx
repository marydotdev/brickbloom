import Image from "next/image";
import Link from "next/link";
import { AFFILIATE_LINKS } from "@/lib/constants";

const adList = AFFILIATE_LINKS.sort(() => Math.random() - 0.5);
const ads = adList.slice(0, 4);

export default function AffiliateLinks() {
  return (
    <div className="relative px-4 lg:px-12 w-full mx-auto">
      <div className="pb-12 space-y-4">
        <h4 className="text-2xl font-bold">Our Favorite Lego Sets</h4>
        <p className='text-zinc-600'>If you&apos;re looking to buy a new set, consider purchasing through our affiliate links. We appreciate your support ❤️</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 ">
        {ads.map((link) => (
          <div
            key={link.title}
            className="max-w-md mx-auto px-2 pt-4 pb-4 flex flex-col gap-4 bg-white shadow-inner drop-shadow-xl lg:hover:transform lg:hover:rotate-3 lg:hover:scale-105"
          >
            <Link href={link.url} target="_blank">
              <Image
                src={link.image}
                alt={link.title}
                width={1280}
                height={1280}
                className="h-96  object-cover"
                unoptimized
              />
              <p className="pt-4 text-center">{link.title}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

{/* <div
  key={link.title}
  className="max-w-md px-2 pt-4 pb-12 flex flex-col gap-4 bg-white shadow-inner drop-shadow-xl lg:hover:transform lg:hover:rotate-3 lg:hover:scale-105"
>
  <Link href={`/${link.url}`}>
    <Image
      alt="output image"
      src={link.image}
      width={1280}
      height={1280}
      className="h-full object-cover"
      unoptimized
    />
    <p className="text-center pt-4">{link.title}</p>
  </Link>
</div>; */}
