import Form from "@/components/form";

import { CountDisplay, GeneratedCount } from "./generated-count";
import { Suspense } from "react";

export default function HomeForm({
  prompt,
}: {
  prompt?: string;
}) {
  return (
    <div className="z-10 w-full mx-auto max-w-xl px-2.5 xl:px-0 py-4 xl:py-8">
      <Form promptValue={prompt} />
      {/* <Suspense fallback={<CountDisplay />}>
        <GeneratedCount />
      </Suspense> */}
    </div>
  );
}
