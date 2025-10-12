import GptPageWrapper from "@/components/GptPageWrapper";

const haircutDemos = [
  "/haricut/buzz.webp",
  "/haricut/model.jpg",
  "/haricut/fade.webp",
  "/haricut/bruce-wayne.webp",
  "/haricut/long.webp",
  "/haricut/spike.webp",
];

export default function HaircutPage() {
  return (
    <GptPageWrapper
      title="Haircut-GPT"
      description="Transform your look with AI-generated hairstyle suggestions."
      uploadPrompt="Upload a clear portrait photo of yourself."
      processingAnim="scissor"
      demos={haircutDemos}
      apiFn="processHaircutImage"
    />
  );
}
