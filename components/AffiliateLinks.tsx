import Image from "next/image";
import Link from "next/link";
import { AFFILIATE_LINKS } from "@/lib/utils";

const ads = AFFILIATE_LINKS;

export default function AffiliateLinks() {
  return (
    <div className="w-full py-12 px-4">
      <div className="w-full flex gap-4 md:gap-12 overflow-x-scroll horizontal-scroll">
        <div className="p-1 flex-shrink-0 flex flex-col justify-center">
          <Link href={ads[0].url} target="_blank" className="flex-shrink-0">
            <Image
              alt={ads[0].title}
              src={ads[0].image}
              width={200}
              height={200}
              className="w-48 md:w-64 transform scale-95 hover:scale-100"
            />
          </Link>
        </div>
        <div className="p-1 flex-shrink-0">
          <div className="flex-shrink-0 h-full flex flex-col justify-center gap-2">
            <Link href={ads[1].url} target="_blank">
              <Image
                alt={ads[1].title}
                src={ads[1].image}
                width={200}
                height={200}
                className="w-48 md:w-64 transform scale-95 hover:scale-100"
              />
            </Link>
            <Link href={ads[2].url} target="_blank" className="">
              <Image
                alt={ads[2].title}
                src={ads[2].image}
                width={200}
                height={200}
                className="w-48 md:w-64 transform scale-95 hover:scale-100"
              />
            </Link>
          </div>
        </div>
        <div className="p-1 flex-shrink-0 flex flex-col justify-center">
          <Link href={ads[3].url} target="_blank" className="flex-shrink-0 ">
            <Image
              alt={ads[3].title}
              src={ads[3].image}
              width={200}
              height={200}
              className="w-48 md:w-64 transform scale-95 hover:scale-100"
            />
          </Link>
        </div>
        <div className="p-1 flex-shrink-0">
          <div className="flex-shrink-0 h-full flex flex-col justify-center gap-2">
            <Link href={ads[4].url} target="_blank">
              <Image
                alt={ads[4].title}
                src={ads[4].image}
                width={200}
                height={200}
                className="w-48 md:w-64 transform scale-95 hover:scale-100"
              />
            </Link>
            <Link href={ads[5].url} target="_blank" className="">
              <Image
                alt={ads[5].title}
                src={ads[5].image}
                width={200}
                height={200}
                className="w-48 md:w-64 transform scale-95 hover:scale-100"
              />
            </Link>
          </div>
        </div>
        <div className="p-1 flex-shrink-0 flex flex-col justify-center">
          <Link href={ads[6].url} target="_blank" className="flex-shrink-0 ">
            <Image
              alt={ads[6].title}
              src={ads[6].image}
              width={200}
              height={200}
              className="w-48 md:w-64 transform scale-95 hover:scale-100"
            />
          </Link>
        </div>
        <div className="p-1 flex-shrink-0">
          <div className="flex-shrink-0 h-full flex flex-col justify-center gap-2">
            <Link href={ads[7].url} target="_blank">
              <Image
                alt={ads[7].title}
                src={ads[7].image}
                width={200}
                height={200}
                className="w-48 md:w-64 transform scale-95 hover:scale-100"
              />
            </Link>
            <Link href={ads[8].url} target="_blank" className="">
              <Image
                alt={ads[8].title}
                src={ads[8].image}
                width={200}
                height={200}
                className="w-48 md:w-64 transform scale-95 hover:scale-100"
              />
            </Link>
          </div>
        </div>
        <div className="p-1 flex-shrink-0 flex flex-col justify-center">
          <Link href={ads[9].url} target="_blank" className="flex-shrink-0 ">
            <Image
              alt={ads[9].title}
              src={ads[9].image}
              width={200}
              height={200}
              className="w-48 md:w-64 transform scale-95 hover:scale-100"
            />
          </Link>
        </div>
        <div className="p-1 flex-shrink-0">
          <div className="flex-shrink-0 h-full flex flex-col justify-center gap-2">
            <Link href={ads[10].url} target="_blank">
              <Image
                alt={ads[10].title}
                src={ads[10].image}
                width={200}
                height={200}
                className="w-48 md:w-64 transform scale-95 hover:scale-100"
              />
            </Link>
            <Link href={ads[11].url} target="_blank" className="">
              <Image
                alt={ads[11].title}
                src={ads[11].image}
                width={200}
                height={200}
                className="w-48 md:w-64 transform scale-95 hover:scale-100"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="pt-12 md:pt-24 max-w-2xl mx-auto">
        <p className="text-zinc-400 text-xs md:text-sm text-center balanced w-fit mx-auto">
          As part of the Amazon Associates Program we earn from qualifying
          purchases made through featured links.
        </p>
      </div>
    </div>
  );
}
