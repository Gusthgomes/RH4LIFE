"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useState} from "react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Register = () => {
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const session = useSession();

  const router = useRouter();

  const { toast } = useToast();

  if (session.data?.user) {
    redirect("/dashboard");
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { email, password };

    const isValidEmail = (email: string) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return emailRegex.test(email);
    };

    const isValidPassword = (password: string) => {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
      return passwordRegex.test(password);
    };

    if (!isValidEmail(email)) {
      toast({
        variant: "destructive",
        title: "Ops!",
        description: "E-mail inválido! Por favor, tente novamente.",
      });
      return;
    }

    if (!isValidPassword(password)) {
      toast({
        variant: "destructive",
        title: "Ops! Parece que algo deu errado",
        description: "Senha inválida. Por favor, tente novamente.",
      });
      setEmail("");
      setPassword("");
      return;
    }

    if (!password || password.length < 6) {
      toast({
        variant: "destructive",
        title: "Sua senha deve possuir no mínimo 6 caracteres!",
        description: "Por favor, tente novamente.",
      });
      setEmail("");
      setPassword("");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
      });

      if (res.status === 400) {
        setError("Usuário já existente no sistema");
        setPassword("");
        setEmail("");

        return;
      }
      if (res.status === 201) {
        toast({
          title: "Usuário cadastrado com sucesso!",
          description: "Você foi redirecionado para a página de login.",
        });
        setEmail("");
        setPassword("");
        router.push("/login");
      }
    } catch (error) {
      setError("Erro ao cadastrar usuário");
      setEmail("");
      setPassword("");
      console.log(error);
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
          Cadastre-se
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
            Cadastrar
          </Button>
          <p className="text-red-600 text-sm my-4 block text-center">
            {error && error}
          </p>
        </form>
        <Link
          className="block text-sm text-center text-white hover:underline-none mt-4"
          href="/login"
        >
          Já possui uma conta ? Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
