"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="relative flex flex-col justify-center items-center w-full overflow-hidden mt-2">
      {/* Semicírculo inferior esquerdo */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full transform rotate-45"></div>
      {/* Semicírculo superior direito */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full transform -rotate-45"></div>

      <div className="relative z-10 flex flex-col justify-center items-center w-full">
        <h1 className="w-full text-center text-5xl font-bold mb-10 text-blue-500">
          Recursos Humanos
        </h1>
        <p className="text-center text-xl text-gray-600 mb-10">
          Controle, gerencie e transforme o futuro da sua empresa com{" "}
          <span className="text-blue-500">RH</span>
        </p>
        <div className="relative w-full max-w-lg">
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            layout="responsive"
            width={600}
            height={600}
            className="rounded shadow-lg"
          />
          <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-t from-blue-100 to-transparent pointer-events-none"></div>
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-blue-400 to-transparent pointer-events-none"></div>
        </div>
        <Link href="/about">
          <div className="mt-10 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold text-xl hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
            Venha nos conhecer
          </div>
        </Link>
      </div>
    </div>
  );
}
