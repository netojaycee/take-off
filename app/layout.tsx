import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@smastrom/react-rating/style.css'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Take Off Ecommerce Store",
  description: "Sell and buy goods at the comfort of your home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
