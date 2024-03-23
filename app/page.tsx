import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-3xl mb-10">Recursos Humanos</h1>
      <p className="p-regular-20 md:p-regular-24 my-10">
        Controle, gerencie e transforme o futuro da sua empresa com RH
      </p>
      <Image
        src="/assets/images/logo.png"
        alt="Logo"
        width={600}
        height={600}
        className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh] rounded-sm shadow-md shadow-blue-700"
      />
      <Button className="w-60 bg-blue-700 text-white font-bold rounded my-10">
        <Link
          className="transform transition-all duration-3000 hover:scale-125"
          href="/about"
        >
          Venha nos conhecer
        </Link>
      </Button>
    </div>
  );
}
