import StyleGptWrapper from "@/components/style-gpt/StyleGptWrapper";

const styleDemos = [
  "/style-gpt/model-1.webp",
  "/style-gpt/model-2.webp",
  "/style-gpt/model-3.webp",
  "/style-gpt/model-4.webp",
  // "/style-gpt/model-4.webp",
];

export default function StyleGptPage() {
  return (
    <StyleGptWrapper
      title="Style-GPT"
      description="Get AI-curated outfits that perfectly fit your style and body."
      uploadPrompt="Select gender → Choose outfit → Upload your photo → Get perfect fit!"
      demos={styleDemos}
    />
  );
}
