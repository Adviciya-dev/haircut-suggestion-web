import { fileToBase64 } from "./utils";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash-image-preview";
const PROMPT = `Analyze the uploaded image of a person. Generate exactly four distinct, realistic hairstyle variations (e.g., short bob, long waves, curly fade, straight pixie) suited to their face shape. Do not alter clothing, background, or facial features. Return four PNG images as base64-encoded strings.`;

export async function processImageWithAI(file: File): Promise<string[]> {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "Please ensure your API key is configured correctly. Unable to connect to the AI service."
    );
  }

  const base64Image = await fileToBase64(file);
  const requestBody = {
    contents: [
      {
        parts: [
          { text: PROMPT },
          {
            inline_data: {
              mime_type: file.type,
              data: base64Image.split(",")[1],
            },
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
    },
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error(
          "There was an issue with the request. Please try uploading a different image or check your settings."
        );
      }
      if (response.status === 429) {
        throw new Error(
          "You've reached your usage limit for now. Please try again later or upgrade your plan."
        );
      }
      throw new Error(
        `Something went wrong while generating hairstyles. Please try again. If the issue persists, contact support.`
      );
    }

    const data = await response.json();

    if (!data.candidates?.[0]?.content?.parts) {
      throw new Error(
        "The AI service returned an unexpected response. Please try again."
      );
    }

    const parts = data.candidates[0].content.parts;

    const images: string[] = parts
      .filter((part: { inlineData?: { mimeType?: string } }) =>
        part.inlineData?.mimeType?.startsWith("image/")
      )
      .map(
        (
          part: { inlineData?: { mimeType?: string; data?: string } },
         
        ) => {
          return `data:${part.inlineData?.mimeType};base64,${part.inlineData?.data}`;
        }
      );

    if (images.length !== 4) {
      throw new Error(
        "The AI couldn't generate all four hairstyle variations this time. Please try uploading the image again."
      );
    }

    return images;
  } catch (error: unknown) {
 
    throw new Error(
      error instanceof Error
        ? error.message
        : "Failed to generate hairstyle variations. Please check your upload and try again."
    );
  }
}
