import type { Metadata } from "next";
import { Outfit } from "next/font/google"

import "./globals.css";

import "react-toastify/dist/ReactToastify.css";
import Providers from "./providers";

const outfit = Outfit( {subsets: ["latin"] } )


export const metadata: Metadata = {
  title: "Clothes Eccom",
  description: "Clothes Eccom created mainly with Next And Nest JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} bg-gray-200`}
      >
        <Providers>{children} </Providers>
      </body>
    </html>
  );
}
