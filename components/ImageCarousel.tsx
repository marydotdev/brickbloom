import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";


export default function ImageCarousel({ images }: { images: { key:string; description:string;}[] }) {
  return (
    <Carousel
    // plugins={[
    //   Autoplay({
    //     delay: 4000,
    //     stopOnInteraction: false,
    //     loop: true,
    //   }),
    // ]}
    >
      {/* <CarouselPrevious /> */}
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div
              className="p-4"
            >
              <div className="max-w-md mx-auto px-4 pt-4 pb-8 flex flex-col bg-white shadow-inner drop-shadow-xl">
                <Image
                  alt="Generated image"
                  src={`/gallery/${image.key}.png`}
                  width={480}
                  height={480}
                  className="h-full object-cover"
                />
                <div className="flex flex-col gap-4 pt-6">
                  <p className="text-center text-lg">{image.description}</p>
                  {/* <p className='text-center text-lg'>{time}</p> */}
                </div>
              </div>
            </div>
            {/* <ImageCard imageURL={`/gallery/${image}.png`} prompt={"a lego"} time={"0"} /> */}
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselNext /> */}
    </Carousel>
  );
}
