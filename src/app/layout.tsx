import type { Metadata } from "next";
import { Anton, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Anton({
  weight: "400",
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = IBM_Plex_Mono({
  weight: ["400", "500"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CutCulture — Video Editor & Cinematographer | Coimbatore",
  description:
    "CutCulture by Harivarshan R. Video editing, cinematography, color grading and sound design. Cutting cinematic stories since 2021. Based in Coimbatore, working with clients everywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="grain min-h-full">{children}</body>
    </html>
  );
}
