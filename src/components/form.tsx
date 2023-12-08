"use client";

import { generate } from "@/lib/actions";
import useEnterSubmit from "@/lib/use-enter-submit";
import { SendHorizonal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
// @ts-ignore
import { useFormStatus } from "react-dom";
import LoadingCircle from "./loading-circle";
import { cn, getPlaceholderPrompt } from "@/lib/utils";
import { useRouter } from "next/navigation";
import va from "@vercel/analytics";


export default function Form({
  promptValue,
}: {
  promptValue?: string;
}) {
  const router = useRouter();
  const [prompt, setPrompt] = useState(promptValue || "");
  const [placeholderPrompt, setPlaceholderPrompt] = useState("");
  useEffect(() => {
    if (promptValue) {
      setPlaceholderPrompt("");
    } else {
      setPlaceholderPrompt(getPlaceholderPrompt());
    }
  }, [promptValue]);

  const { formRef, onKeyDown } = useEnterSubmit();

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    if (promptValue && textareaRef.current) {
      textareaRef.current.select();
    }
  }, [promptValue]);

  return (
    <form
      ref={formRef}
      className="mx-auto flex w-full max-w-xl animate-fade-up items-center space-x-2 rounded-lg border border-gray-200 bg-white px-1 py-2 opacity-0 shadow-md sm:px-2 sm:py-4"
      style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      action={(data) => {
        va.track("generate prompt", {
          prompt: prompt,
        });
        generate(data).then((id) => {
          router.push(`/${id}`);
        });
      }}
    >
      <textarea
        id="prompt"
        name="prompt"
        ref={textareaRef}
        value={prompt}
        autoFocus
        autoComplete="off"
        placeholder={placeholderPrompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Tab" && e.currentTarget.value === "") {
            setPrompt(placeholderPrompt);
            e.preventDefault();
          }
          onKeyDown(e);
        }}
        className="flex-1 resize-none outline-none"
      />
      <SubmitButton />
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(
        "group rounded-lg p-2.5",
        pending
          ? "cursor-disabled bg-gray-100"
          : "transition-all hover:bg-gray-100 active:bg-gray-200"
      )}
      disabled={pending}
    >
      {pending ? (
        <LoadingCircle />
      ) : (
        <SendHorizonal className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
      )}
    </button>
  );
};
