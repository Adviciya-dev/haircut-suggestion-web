import { fileToBase64 } from "./utils";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY!;
const MODEL = "gemini-2.5-flash-image-preview";

const HAIRCUT_PROMPT = `Analyze the uploaded image of a person. Generate exactly four distinct, realistic hairstyle variations (e.g., short bob, long waves, curly fade, straight pixie) suited to their face shape. Do not alter clothing, background, or facial features. Return four PNG images as base64-encoded strings.`;

const INDOOR_PROMPT = `Analyze the uploaded indoor room photo. Generate exactly four distinct, realistic redesign variations (e.g., modern decor, cozy lighting, minimalist furniture, vibrant accents) suited to the space. Keep the core structure, walls, and layout intact. Do not change the room's identity. Return four PNG images as base64-encoded strings.`;

const VEHICLE_PROMPT = `Analyze the uploaded vehicle photo (car or bike). Generate exactly four distinct, realistic modification variations (e.g., bulkier alloy rims, side lips, ultra-grounded stance, extra-dark cooling tint, sporty spoiler, mild front facelift) suited to the model. Keep the vehicle identity, number plate, and shape intact. Do not overhaul the design. Return four PNG images as base64-encoded strings.`;

interface InlineData {
  mimeType: string;
  data: string;
}

interface Part {
  inlineData?: InlineData;
}

async function generateContent(prompt: string, file: File): Promise<string[]> {
  const base64Image = await fileToBase64(file);
  const requestBody = {
    contents: [
      {
        parts: [
          { text: prompt },
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

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    if (response.status === 400)
      throw new Error("Invalid image or request. Try another photo.");
    if (response.status === 429)
      throw new Error("Rate limit reached. Try later.");
    throw new Error("Processing failed. Please try again.");
  }

  const data = await response.json();
  if (!data.candidates?.[0]?.content?.parts) {
    throw new Error("Unexpected response from AI. Retry.");
  }

  const parts = data.candidates[0].content.parts;
  const images: string[] = parts
    .filter((part: Part) => part.inlineData?.mimeType?.startsWith("image/"))
    .map(
      (part: Part) =>
        `data:${part.inlineData!.mimeType};base64,${part.inlineData!.data}`
    );

  if (images.length !== 4) {
    throw new Error("Could not generate all variations. Retry.");
  }

  return images;
}

export async function processHaircutImage(file: File): Promise<string[]> {
  if (!GEMINI_API_KEY) throw new Error("API key missing.");
  return generateContent(HAIRCUT_PROMPT, file);
}

export async function processIndoorImage(file: File): Promise<string[]> {
  if (!GEMINI_API_KEY) throw new Error("API key missing.");
  return generateContent(INDOOR_PROMPT, file);
}

export async function processVehicleImage(file: File): Promise<string[]> {
  if (!GEMINI_API_KEY) throw new Error("API key missing.");
  return generateContent(VEHICLE_PROMPT, file);
}
