"use client"
import Image from "next/image";
import Link from "next/link";
import { AFFILIATE_LINKS } from "@/lib/utils";

const adList = AFFILIATE_LINKS.sort(() => Math.random() - 0.5);
const ads = adList.slice(0, 6);

export default function AffiliateLinks() {
  return (
    <div className="w-full bg-zinc-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-16">
          {ads.map((link) => (
            <div key={link.title} className="">
              <Link href={link.url} target="_blank">
                <div className="relative max-w-md p-4 bg-white rounded-xl flex justify-start items-center gap-6">
                  <Image
                    alt={link.title}
                    src={link.image}
                    width={100}
                    height={100}
                    className="h-full object-cover"
                  />
                  <div className="pt-6">
                    <p className="text-center text-lg balanced">
                      {link.title}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
    </div>
  );
}
