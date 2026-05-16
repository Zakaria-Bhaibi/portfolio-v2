import type { Metadata } from "next";
import { Geist, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Zakaria Bhaibi — Full Stack Developer",
  description:
    "Full stack web developer based in Morocco. Building bold, fast, and accessible digital experiences with React, Next.js, Python, and more.",
  keywords: ["Zakaria Bhaibi", "Full Stack Developer", "Web Developer", "React", "Next.js", "Morocco"],
  authors: [{ name: "Zakaria Bhaibi" }],
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    title: "Zakaria Bhaibi — Full Stack Developer",
    description: "Building bold digital experiences from Morocco to the world.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${sora.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen flex flex-col bg-background text-on-surface antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
