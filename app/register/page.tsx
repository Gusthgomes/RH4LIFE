"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  const { toast } = useToast();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

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
      return;
    }

    if (!password || password.length < 6) {
      toast({
        variant: "destructive",
        title: "Sua senha deve possuir np mínimo 6 caracteres!",
        description: "Por favor, tente novamente.",
      });
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 400) {
        setError("Usuário já existente no sistema");
        return;
      }
      if (res.status === 201) {
        toast({
          title: "Usuário cadastrado com sucesso!",
          description: "Você foi redirecionado para a página de login.",
        });
        router.push("/login");
      }
    } catch (error) {
      setError("Erro ao cadastrar usuário");
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-blue-400 p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8 hover:text-5xl duration-300">
          Cadastre-se
        </h1>
        <form onSubmit={submitHandler}>
          <Input
            type="email"
            placeholder="Digite o seu e-mail aqui.."
            className="rounded outline-none w-full p-2 mb-4 text-center"
            required
          />
          <Input
            type="password"
            placeholder="Digite a sua senha aqui.."
            className="rounded outline-none w-full p-2 mb-4 text-center"
            required
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
          className="block text-sm text-center text-blue-500 hover:underline-none mt-4"
          href="/login"
        >
          Já possui uma conta ? Login
        </Link>

        <h2 className="block text-md text-center text-blue-500 mt-2">- OU -</h2>
      </div>
    </div>
  );
};

export default Register;
