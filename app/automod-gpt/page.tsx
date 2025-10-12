import GptPageWrapper from "@/components/GptPageWrapper";

const vehicleDemos = [
  "/auto-mod/auto-mod-1.webp",
  "/auto-mod/auto-mod-2.webp",
  "/auto-mod/auto-mod-3.webp",
  "/auto-mod/auto-mod-4.webp",
  "/auto-mod/auto-mod-5.webp",
];

export default function AutoModPage() {
  return (
    <GptPageWrapper
      title="AutoMod-GPT"
      description="Enhance your vehicle with subtle, stylish modifications."
      uploadPrompt="Upload a photo of your car or bike."
      processingAnim="wheel"
      demos={vehicleDemos}
      apiFn="processVehicleImage"
    />
  );
}
