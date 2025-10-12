import GptPageWrapper from "@/components/GptPageWrapper";

const indoorDemos = [
  "/dream-space/indoor-1.webp",
  "/dream-space/indoor-2.webp",
  "/dream-space/indoor-3.webp",
  "/dream-space/indoor-4.webp",
  "/dream-space/indoor-5.webp",
];

export default function DreamspacePage() {
  return (
    <GptPageWrapper
      title="Dreamspace-GPT"
      description="Revamp your indoor space with smart AI suggestions."
      uploadPrompt="Upload a photo of your room or indoor space."
      processingAnim="brush"
      demos={indoorDemos}
      apiFn="processIndoorImage"
    />
  );
}
