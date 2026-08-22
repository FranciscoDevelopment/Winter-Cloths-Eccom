import type { Metadata } from "next";

import localFont from "next/font/local";
import { Outfit } from "next/font/google"
import "./globals.css";
// react-toastify does not provide TypeScript declarations for its CSS file.
// @ts-expect-error CSS side-effect import
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
