import type { Metadata } from "next";
import { Hanken_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";

import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://genxwhosting.com"),
  title: {
    default: "Blog | Gen X Web Hosting",
    template: "%s | Gen X Web Hosting",
  },
  description: "Professional High-Performance Hosting Blog dedicated to technical depth, architectural insights, and proven strategies for IT professionals.",
  openGraph: {
    title: "Blog | Gen X Web Hosting",
    description: "Professional High-Performance Hosting Blog dedicated to technical depth, architectural insights, and proven strategies for IT professionals.",
    url: "https://genxwhosting.com",
    siteName: "Gen X Web Hosting",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Gen X Web Hosting",
    description: "Professional High-Performance Hosting Blog dedicated to technical depth, architectural insights, and proven strategies for IT professionals.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${hankenGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <TopNavBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
