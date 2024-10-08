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
import { useCallback, useEffect, useState, useRef } from "react";
import { GenerateRequest, GenerateResponse } from "@/lib/types";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ImageCard } from "@/components/ImageCard";
import ImageCarousel from "@/components/ImageCarousel";
import LoadingDots from "@/components/ui/loading-dots";
import { getPlaceholderPrompt } from "@/lib/utils";
import { getUserId } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { DownloadShare } from "@/components/DownloadShare";
import { exampleImages } from "@/lib/utils";
import va from "@vercel/analytics";

const galleryImages = exampleImages.sort(() => Math.random() - 0.5);

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
  const abortControllerRef = useRef<AbortController | null>(null);

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
        prompt: prompt,
      });
      setSubmittedURL(redirectUrl);

      form.setValue("prompt", prompt);
    }
  }, [imageUrl, modelLatency, prompt, redirectUrl, id, form]);

  const handleCancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
      setError(new Error("Image generation cancelled"));
      va.track("Cancelled generation");
    }
  }, []);

  const handleSubmit = useCallback(
    async (values: GenerateFormValues) => {
      setIsLoading(true);
      setResponse(null);
      setError(null);

      // Create a new AbortController for this request
      abortControllerRef.current = new AbortController();

      try {
        const request: GenerateRequest = {
          prompt: values.prompt,
        };
        const response = await fetch("/api/generate", {
          method: "POST",
          body: JSON.stringify(request),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok || response.status !== 200) {
          const text = await response.text();
          throw new Error(
            `Failed to generate image: ${response.status}, ${text}`
          );
        }

        const data = await response.json();
        const userId = getUserId();
        const userImages = JSON.parse(localStorage.getItem(userId) || "[]");
        userImages.push({
          ...data,
          prompt: values.prompt,
        });
        localStorage.setItem(userId, JSON.stringify(userImages));

        va.track("Generated image", {
          prompt: values.prompt,
        });

        router.push(`/${data.id}`);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          // Handle abort error
          setError(new Error("Image generation cancelled"));
        } else {
          va.track("Failed to generate", {
            prompt: values.prompt,
          });
          if (error instanceof Error) {
            setError(error);
          }
        }
      } finally {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    },
    [router]
  );

  return (
    <Container>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mt-2 md:mt-4">
        <div className="col-span-1 flex flex-col h-full justify-start gap-4 md:gap-8 pt-4 md:pt-12">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-xl md:text-3xl font-bold mb-2 md:mb-4">
              Imagine <i>any</i> lego set.
            </h1>
            <p className="text-lg md:text-xl">
              Try it now, completely free. Include the word &quot;lego&quot; in
              your prompt to get the best results.
            </p>
          </div>
          <div className="w-full max-w-md mx-auto">
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
                            className="resize-none text-lg"
                            {...field}
                          />
                        </FormControl>
                        <div className="h-2">
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <div className="w-full flex flex-col">
                    <div className="w-full flex items-center justify-between">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex justify-center max-w-[200px] w-full"
                      >
                        {isLoading ? (
                          <LoadingDots style="large" color="#fff" />
                        ) : (
                          "Generate"
                        )}
                      </Button>
                      {isLoading ? (
                        <Button
                          type="button"
                          variant={"destructive"}
                          onClick={handleCancel}
                        >
                          Cancel
                        </Button>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="h-8 mt-2 flex items-center">
                      {" "}
                      {/* Fixed height container */}
                      {isLoading ? (
                        <>
                          <p className="text-sm text-gray-500 mr-2">
                            Generating...
                          </p>
                        </>
                      ) : (
                        <div className="invisible">Placeholder</div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </div>
          <div className="w-full max-w-md mx-auto -mt-6 md:mt-0 md:h-20">
            {error ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            ) : (
              <div className="invisible">Error placeholder</div>
            )}
          </div>
          <div className="w-full max-w-md mx-auto">
            <p className="text-xs md:text-sm">
              Brickbloom uses a fine tuned model of SDXL that was trained on
              lego sets. View the open source code on{" "}
              <a
                href="https://github.com/marydotdev/brickbloom"
                target="_blank"
                className="hover:underline"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>
        <div className="col-span-1 flex flex-col h-full justify-end">
          <div>
            <div>
              {response ? (
                <div className="flex flex-col justify-center relative h-auto items-center">
                  <div className="p-4">
                    <ImageCard
                      imageURL={response.image_url}
                      prompt={response.prompt}
                      id={response.id}
                    />
                    <DownloadShare
                      imageURL={response.image_url}
                      prompt={response.prompt}
                      id={response.id}
                    />
                  </div>
                </div>
              ) : (
                <div className="max-w-lg mx-auto">
                  <ImageCarousel images={galleryImages} />
                  <div className="pb-12" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Body;
