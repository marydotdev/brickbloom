import Form from "@/components/form";
import PhotoBooth from "@/components/photo-booth";
import { CountDisplay, GeneratedCount } from "./generated-count";
import { Suspense } from "react";

export default function FormRSC({
  prompt,
  image,
}: {
  prompt?: string;
  image: string | null;
}) {
  return (
    <div className="z-10 w-full max-w-xl px-2.5 xl:px-0">
      <Form promptValue={prompt} />
      <Suspense fallback={<CountDisplay />}>
        <GeneratedCount />
      </Suspense>
      <PhotoBooth image={image} />
    </div>
  );
}
