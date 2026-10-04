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
  metadataBase: new URL("https://blog.genxwhosting.com"),
  title: {
    default: "Gen X Web Hosting Blog",
    template: "%s | Gen X Web Hosting",
  },
  description: "Guides and product updates on hosting, DNS, SSL, email, and AI tools from Gen X Web Hosting.",
  openGraph: {
    title: "Gen X Web Hosting Blog",
    description: "Guides and product updates on hosting, DNS, SSL, email, and AI tools from Gen X Web Hosting.",
    url: "https://blog.genxwhosting.com",
    siteName: "Gen X Web Hosting Blog",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gen X Web Hosting Blog",
    description: "Guides and product updates on hosting, DNS, SSL, email, and AI tools from Gen X Web Hosting.",
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
