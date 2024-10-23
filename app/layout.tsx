import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@smastrom/react-rating/style.css";
import ReduxProvider from "@/lib/ReduxProvider"; // Import the new ReduxProvider component
import { Toaster } from "react-hot-toast";

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
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Toaster />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
