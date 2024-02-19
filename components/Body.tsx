"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { GenerateRequest, GenerateResponse } from "@/lib/types";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {ImageCard} from "@/components/ImageCard";
import { getPlaceholderPrompt } from "@/lib/utils";

import { useRouter } from "next/navigation";


const generateFormSchema = z.object({
  prompt: z.string().min(3).max(160),
});

type GenerateFormValues = z.infer<typeof generateFormSchema>;

const Body = ({
  imageUrl,
  prompt,
  redirectUrl,
  modelLatency,
  id,
  promptValue,
}: {
  imageUrl?: string;
  prompt?: string;
  redirectUrl?: string;
  modelLatency?: number;
  id?: string;
  promptValue?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<GenerateResponse | null>(null);
  const [submittedURL, setSubmittedURL] = useState<string | null>(null);
  const [placeholderPrompt, setPlaceholderPrompt] = useState("");
  useEffect(() => {
    if (promptValue) {
      setPlaceholderPrompt("");
    } else {
      setPlaceholderPrompt(getPlaceholderPrompt());
    }
  }, [promptValue]);

  const router = useRouter();

  const form = useForm<GenerateFormValues>({
    resolver: zodResolver(generateFormSchema),
    mode: "onChange",

    // Set default values so that the form inputs are controlled components.
    defaultValues: {
      prompt: "",
    },
  });

  useEffect(() => {
    if (imageUrl && prompt && redirectUrl && modelLatency && id) {
      setResponse({
        image_url: imageUrl,
        model_latency_ms: modelLatency,
        id: id,
      });
      setSubmittedURL(redirectUrl);

      form.setValue("prompt", prompt);
    }
  }, [imageUrl, modelLatency, prompt, redirectUrl, id, form]);

  const handleSubmit = useCallback(
    async (values: GenerateFormValues) => {
      setIsLoading(true);
      setResponse(null);

      try {
        const request: GenerateRequest = {
          prompt: values.prompt,
        };
        const response = await fetch("/api/generate", {
          method: "POST",
          body: JSON.stringify(request),
        });

        // Handle API errors.
        if (!response.ok || response.status !== 200) {
          const text = await response.text();
          throw new Error(
            `Failed to generate image: ${response.status}, ${text}`
          );
        }

        const data = await response.json();

        // va.track("Generated image", {
        //   prompt: values.prompt,
        // });

        router.push(`/${data.id}`);
      } catch (error) {
        // va.track("Failed to generate", {
        //   prompt: values.prompt,
        // });
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  return (
    <div className="flex justify-center items-center flex-col w-full p-4 pb-12">
      <div className="max-w-screen-xl w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-4">
        <div className="col-span-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder={placeholderPrompt}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex justify-center
                 max-w-[200px] w-full"
                >
                  {isLoading ? (
                    <p>loading ...</p>
                  ) : response ? (
                    "✨ Regenerate"
                  ) : (
                    "Generate"
                  )}
                </Button>

                {error && (
                  <Alert variant="destructive">
                    <div className="h-4 w-4 rounded-full" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            </form>
          </Form>
        </div>
        <div className="col-span-1">
          {submittedURL && (
            <>
              <div>
                <div className="flex flex-col justify-center relative h-auto items-center">
                  {response ? (
                    <ImageCard
                      imageURL={response.image_url}
                      prompt={form.getValues("prompt")}
                      time={(response.model_latency_ms / 1000).toFixed(2)}
                    />
                  ) : (
                    <div className="relative flex flex-col justify-center items-center gap-y-2 w-[510px] border border-gray-300 rounded shadow group p-2 mx-auto animate-pulse bg-gray-400 aspect-square max-w-full" />
                  )}
                </div>
                {response && (
                  <div className="flex justify-center gap-5 mt-4">
                    <Button
                      // onClick={() =>
                      //   downloadImage(response.image_url, "brickbloom")
                      // }
                    >
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      // onClick={() => {
                      //   navigator.clipboard.writeText(
                      //     `https://brickblooom.com/${id || ""}`
                      //   );
                      //   toast.success("Link copied to clipboard");
                      // }}
                    >
                      Share
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
