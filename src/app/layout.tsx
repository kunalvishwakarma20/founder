import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Be_Vietnam_Pro } from "next/font/google";
import Head from "next/head";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const be_vietnam_pro = Be_Vietnam_Pro({ subsets: ["latin"], weight: "400" });
export const metadata: Metadata = {
  title: "FoundrGuide",
  description:
    "FoundrGuide is an AI-powered platform designed to provide personalized book summaries and tailored advice for startup founders and small business owners. Leverage insights from top books, articles, and expert knowledge to solve your business challenges, make informed decisions, and accelerate your success.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <title>FoundrGuide</title>
        </Head>
        <body className={be_vietnam_pro.className}>
          <div className="mx-auto bg-white">
            <main className="pt-0">
              {children}
              <Toaster />
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
