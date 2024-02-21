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
import { ImageSkeleton} from "@/components/ImageSkeleton";
import LoadingDots from "@/components/ui/loading-dots";
import { getPlaceholderPrompt } from "@/lib/utils";
import { getUserId } from "@/lib/utils";

import { useRouter } from "next/navigation";
import ImageCarousel from './ImageCarousel';

  // const exampleImages = [
  //   '0hHdwLH',
  //   '2NKuGRl',
  //   '3lEdhRl',
  //   'Edski1u',
  //   'IhpM99Y',
  //   'LUmcEyM',
  //   'O6ctATM',
  //   'SwHDM0s',
  //   'T9NyCGp',
  //   'X93VfEI',
  //   'XxsAoIM',
  //   'obV2izq',
  //   'qJxE8uM',
  //   'sy5h2qX',
  // ];

  const exampleImages = [
    {
      key: "0hHdwLH",
      description: "a lego taylor swift sculpture",
    },
    {
      key: "2NKuGRl",
      description: "a lego fruit basket",
    },
    {
      key: "3lEdhRl",
      description: "a lego pizza",
    },
    {
      key: "Edski1u",
      description: "a lego taxi",
    },
    {
      key: "IhpM99Y",
      description: "a lego christmas tree",
    },
    {
      key: "LUmcEyM",
      description: "lego winter wonderland",
    },
    {
      key: "O6ctATM",
      description: "a lego horse",
    },
    {
      key: "SwHDM0s",
      description: "a lego coral reef",
    },
    {
      key: "T9NyCGp",
      description: "a lego Polaroid photo",
    },
    {
      key: "X93VfEI",
      description: "a lego portrait of the mona lisa",
    },
    {
      key: "XxsAoIM",
      description: "A lego anatomical heart",
    },
    {
      key: "obV2izq",
      description: "a lego swamp monster",
    },
    {
      key: "qJxE8uM",
      description: "a lego steampunk airship",
    },
    {
      key: "sy5h2qX",
      description: "a lego elf",
    },
  ];

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
  const [lastPrompt, setLastPrompt] = useState(""); // Step 1: Add state to store the last prompt

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
        prompt: prompt,
      });
      setSubmittedURL(redirectUrl);

      form.setValue("prompt", prompt);
    }
  }, [imageUrl, modelLatency, prompt, redirectUrl, id, form]);

  const handleSubmit = useCallback(
    async (values: GenerateFormValues) => {
      setIsLoading(true);
      setResponse(null);
      setLastPrompt(values.prompt); // Step 2: Store the last prompt in state

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
        const userId = getUserId(); // Retrieve the userId

        // Retrieve existing images for the user, or initialize an empty array
        const userImages = JSON.parse(localStorage.getItem(userId) || "[]");
        // Add the new image data along with the prompt
        userImages.push({
          ...data,
          prompt: values.prompt, // Include the prompt in the object
        });
        localStorage.setItem(userId, JSON.stringify(userImages)); // Save back to localStorage

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
        <div className="col-span-1 flex flex-col h-full justify-start gap-12 pt-12 border-2 border-blue-200">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">
              Generate Lego inspired AI images
            </h1>
            <p className="text-lg">Try it now, completely free</p>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="w-full flex justify-between">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex justify-center
                 max-w-[200px] w-full"
                    >
                      {isLoading ? (
                        <LoadingDots style="large" color="#fff" />
                      ) : response ? (
                        "Regenerate"
                      ) : (
                        "Generate"
                      )}
                    </Button>
                    <Button
                      type="submit"
                      onClick={() => form.reset()}
                      className="inline-flex justify-center
                 max-w-[200px] w-full"
                    >
                      Clear
                    </Button>
                  </div>

                  {/* {error && (
                    <Alert variant="destructive">
                      <div className="h-4 w-4 rounded-full" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{error.message}</AlertDescription>
                    </Alert>
                  )} */}
                </div>
              </form>
            </Form>
          </div>
          <div className="w-full max-w-md mx-auto">
            <div className="pt-8">
              {isLoading ? (
                <div className="w-full flex justify-between items-center">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-300"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : response ? (
                <div className="w-full flex justify-end">
                  {(response.model_latency_ms / 1000).toFixed(2)}
                </div>
              ) : (
                " "
              )}
            </div>
            {error && (
              <Alert variant="destructive">
                <div className="h-4 w-4 rounded-full" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
        <div className="col-span-1 flex flex-col h-full justify-end border-2 border-blue-200">
          <div>
            <div>
              {response ? (
                <div className="flex flex-col justify-center relative h-auto items-center">
                  <div className="p-4">
                    <ImageCard
                      imageURL={response.image_url}
                      prompt={response.prompt}
                      time={(response.model_latency_ms / 1000).toFixed(0)}
                    />
                  </div>
                </div>
              ) :
              isLoading ? (
                <ImageSkeleton />
              ) : (
                !submittedURL && (
                  <ImageCarousel images={exampleImages} />
                )
              )}
              {/* // :
              // (
              //   <ImageCarousel images={exampleImages} />
              // )} */}
            </div>
            {/* {response && (
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
              )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
