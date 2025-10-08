import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: "Haircut-GPT | AI-Powered Hairstyle Generator",
  description:
    "Transform your look with AI-generated hairstyle suggestions. Upload a photo and explore new styles instantly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={poppins.className} role="main">
        {children}
      </body>
    </html>
  );
}
