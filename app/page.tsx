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
    <div className="relative flex flex-col justify-center items-center w-full overflow-hidden mt-6 animate-fade-in">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-300 rounded-full transform rotate-45 drop-shadow-md animate-spin-slow"></div>
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full transform -rotate-45 vagaChart animate-spin-slow"></div>

      <div className="relative z-10 flex flex-col justify-center items-center w-full">
        <h1 className="w-full text-center text-5xl font-bold mb-10 text-blue-500">
          Recursos Humanos
        </h1>
        <p className="text-center text-xl text-gray-600 mb-10">
          Controle, gerencie e transforme o futuro da sua empresa com{" "}
          <span className="text-blue-500">RH</span>
        </p>
        <div className="relative w-full max-w-lg md:max-w-1xl animate-bounce-in">
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            layout="responsive"
            width={600}
            height={600}
            className="rounded-xl shadow-lg drop-shadow-2xl shadow-blue-500"
          />
          <div className="absolute rounded-xl inset-x-0 top-0 h-6 bg-gradient-to-t from-blue-100 to-transparent pointer-events-none"></div>
          <div className="absolute rounded-xl inset-x-0 bottom-0 h-16 bg-gradient-to-t from-blue-400 to-transparent pointer-events-none"></div>
        </div>
        <Link href="/about">
          <div className="mt-10 px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold text-xl hover:bg-blue-600 transition-colors duration-300 cursor-pointer">
            Venha nos conhecer
          </div>
        </Link>
      </div>
    </div>
  );
};

