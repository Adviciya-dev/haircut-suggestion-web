import Image from "next/image";

export default function AllowedImages() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h3 className="text-3xl font-semibold text-gray-900">
          Image Guidelines
        </h3>
        <p className="text-red-500 mt-4">
          Multiple people not allowed in the photo
        </p>
        <div className="mt-6 flex justify-center gap-6">
          <Image
            src="/wrong.jpg"
            alt="Unallowed pose "
            width={200}
            height={200}
            className="rounded-lg"
          />
          <Image
            src="/tick.png"
            alt="Allowed pose "
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
