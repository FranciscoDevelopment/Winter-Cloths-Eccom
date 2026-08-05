import type { Metadata } from "next";

import localFont from "next/font/local";
import { Outfit } from "next/font/google"
import "./globals.css";

const outfit = Outfit( {subsets: ["latin"] } )

/*
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
*/

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
        {children}
      </body>
    </html>
  );
}
