import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RH Analytics",
  description: "Controle de vagas e contratações",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="mx-auto max-w-5xl text-2xl gap-2 mb-10">
          <Navbar />
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
