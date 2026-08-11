import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-loaded",
});

export const metadata: Metadata = {
  title: "GLAZE",
  description: "Korean skincare, curated",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <svg
          aria-hidden
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        >
          <defs>
            <symbol id="465907804" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </symbol>
          </defs>
        </svg>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
