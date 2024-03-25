import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth";
import AuthProvider from "@/utils/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RH Analytics",
  description: "Controle de vagas e contratações",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <div className="mx-auto max-w-5xl text-2xl gap-2 mb-10">
            <Navbar />
            {children}
            <Toaster />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
