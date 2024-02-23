import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { AFFILIATE_LINKS } from "@/lib/utils";


const ads = AFFILIATE_LINKS;

export default function LinksCarousel() {
  return (
    <Carousel opts={{ dragFree: true }} className="w-full max-w-7xl mx-auto">
      <CarouselContent className="-ml-1 flex items-center">
        <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4">
          <div className="p-1">
            <Link href={ads[0].url} target="_blank" className="flex-shrink-0 ">
              <Image
                alt={ads[0].title}
                src={ads[0].image}
                width={200}
                height={200}
                className="w-36 md:w-48 transform scale-95 hover:scale-100"
              />
            </Link>
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4">
          <div className="p-1">
            <div className="flex-shrink-0 h-full flex flex-col justify-between gap-2">
              <Link href={ads[1].url} target="_blank">
                <Image
                  alt={ads[1].title}
                  src={ads[1].image}
                  width={200}
                  height={200}
                  className="w-36 md:w-48 transform scale-95 hover:scale-100"
                />
              </Link>
              <Link href={ads[2].url} target="_blank" className="">
                <Image
                  alt={ads[2].title}
                  src={ads[2].image}
                  width={200}
                  height={200}
                  className="w-36 md:w-48 transform scale-95 hover:scale-100"
                />
              </Link>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4">
          <div className="p-1">
            <Link href={ads[3].url} target="_blank" className="flex-shrink-0 ">
              <Image
                alt={ads[3].title}
                src={ads[3].image}
                width={200}
                height={200}
                className="w-36 md:w-48 transform scale-95 hover:scale-100"
              />
            </Link>
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4">
          <div className="p-1">
            <div className="flex-shrink-0 h-full flex flex-col justify-between gap-2">
              <Link href={ads[4].url} target="_blank">
                <Image
                  alt={ads[4].title}
                  src={ads[4].image}
                  width={200}
                  height={200}
                  className="w-36 md:w-48 transform scale-95 hover:scale-100"
                />
              </Link>
              <Link href={ads[5].url} target="_blank" className="">
                <Image
                  alt={ads[5].title}
                  src={ads[5].image}
                  width={200}
                  height={200}
                  className="w-36 md:w-48 transform scale-95 hover:scale-100"
                />
              </Link>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4">
          <div className="p-1">
            <Link href={ads[6].url} target="_blank" className="flex-shrink-0 ">
              <Image
                alt={ads[6].title}
                src={ads[6].image}
                width={200}
                height={200}
                className="w-36 md:w-48 transform scale-95 hover:scale-100"
              />
            </Link>
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4">
          <div className="p-1">
            <div className="flex-shrink-0 h-full flex flex-col justify-between gap-2">
              <Link href={ads[7].url} target="_blank">
                <Image
                  alt={ads[7].title}
                  src={ads[7].image}
                  width={200}
                  height={200}
                  className="w-36 md:w-48 transform scale-95 hover:scale-100"
                />
              </Link>
              <Link href={ads[8].url} target="_blank" className="">
                <Image
                  alt={ads[8].title}
                  src={ads[8].image}
                  width={200}
                  height={200}
                  className="w-36 md:w-48 transform scale-95 hover:scale-100"
                />
              </Link>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4">
          <div className="p-1">
            <Link href={ads[9].url} target="_blank" className="flex-shrink-0 ">
              <Image
                alt={ads[9].title}
                src={ads[9].image}
                width={200}
                height={200}
                className="w-36 md:w-48 transform scale-95 hover:scale-100"
              />
            </Link>
          </div>
        </CarouselItem>
        <CarouselItem className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/4">
          <div className="p-1">
            <div className="flex-shrink-0 h-full flex flex-col justify-between gap-2">
              <Link href={ads[10].url} target="_blank">
                <Image
                  alt={ads[10].title}
                  src={ads[10].image}
                  width={200}
                  height={200}
                  className="w-36 md:w-48 transform scale-95 hover:scale-100"
                />
              </Link>
              <Link href={ads[11].url} target="_blank" className="">
                <Image
                  alt={ads[11].title}
                  src={ads[11].image}
                  width={200}
                  height={200}
                  className="w-36 md:w-48 transform scale-95 hover:scale-100"
                />
              </Link>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
