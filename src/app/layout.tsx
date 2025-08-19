import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinWise - Your Smart Financial Companion",
  description: "FinWise - Your Smart Financial Companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <Toaster position="top-center" />
        <body className={inter.className}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </body>
      </UserProvider>
    </html>
  );
}
