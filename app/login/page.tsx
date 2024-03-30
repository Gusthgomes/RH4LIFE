"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Login = () => {
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const session = useSession();

  const router = useRouter();

  const { toast } = useToast();

  if (session.data?.user) {
    redirect("/dashboard");
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Ops! Algo deu errado ao logar",
        description: "E-mail ou senha inválido. Por favor, tente novamente.",
      });
      console.log(result);
    } else {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between p-12">
      <div className="bg-blue-400 p-8 rounded shadow-md w-96">
        <div className="relative w-full max-w-lg">
          <Image
            src="/assets/images/table.png"
            alt="Logo"
            layout="responsive"
            width={60}
            height={300}
            className="rounded shadow-lg mb-2"
          />
        </div>
        <h1 className="text-4xl text-center text-white font-semibold mb-8 hover:text-5xl duration-1000">
          Login
        </h1>
        <form onSubmit={submitHandler}>
          <Input
            type="email"
            placeholder="Digite o seu e-mail aqui.."
            className="rounded outline-none w-full p-2 mb-4 text-center"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Digite a sua senha aqui.."
            className="rounded outline-none w-full p-2 mb-4 text-center"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            className="mx-4 w-72 bg-blue-700 text-white py-2 rounded hover:bg-blue-800 scale-125 duration-200"
          >
            Login
          </Button>
          <p className="text-red-600 text-sm my-4 block text-center">
            {error && error}
          </p>
        </form>
        <Link
          className="block text-sm text-center text-white hover:underline-none mt-4"
          href="/register"
        >
          Não possui uma conta ? Cadastre-se
        </Link>
        <h2 className="block text-white text-center mt-2"> - OU -</h2>
        <Button className="mx-4 w-72 mt-4 bg-blue-700 text-white py-2 rounded hover:bg-blue-800 scale-125 duration-200" onClick={() => {signIn("google")}}>Login com Google</Button>
      </div>
    </div>
  );
};
export default Login;
