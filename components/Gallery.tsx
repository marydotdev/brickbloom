"use client"

import { useEffect, useState } from "react";
import { getUserId } from "@/lib/utils";
import { ImageCard } from "@/components/ImageCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type Image = {
  image_url: string;
  prompt: string;
  id: string;
};

const Gallery = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const userId = getUserId(); // Retrieve the userId
    const savedImages = JSON.parse(localStorage.getItem(userId) || "[]");
    const reversedImages = savedImages.reverse();
    setImages(reversedImages);
    console.log(savedImages)
  }, []);

  return (
    <div className="relative max-w-screen-2xl mx-auto w-full justify-items-center px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative max-w-md px-2 py-4 flex flex-col gap-4 bg-white lg:hover:transform  lg:hover:scale-105 transition-all duration-100 ease-in-out"
        >
          <a href={`/${image.id}`}>
            <ImageCard
              imageURL={image.image_url}
              prompt={image.prompt}
              id={image.id}
            />
          </a>
          <div className='absolute bottom-4'>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size={"icon"}>
                  <span className="sr-only">Delete</span>
                  <Trash className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription className='pt-2'>
                    This action cannot be undone. Are you sure you want to
                    delete this image forever?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="">
                  <DialogClose asChild>
                    <div className="flex gap-2">
                      <Button type="button" variant="destructive">
                        Delete
                      </Button>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </div>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
