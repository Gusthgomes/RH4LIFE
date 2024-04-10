"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  name: z.string().min(3, "O nome da vaga deve ter no mínimo 3 caracteres").max(50, "O nome da vaga deve ter no máximo 50 caracteres"),
  description: z.string().min(3, "A descrição da vaga deve ter no mínimo 3 caracteres").max(500, "A descrição da vaga deve ter no máximo 500 caracteres"),
  location: z.string().min(3, "A localização da vaga deve ter no mínimo 3 caracteres").max(50, "A localização da vaga deve ter no máximo 50 caracteres"),
  category: z.string(),
  benefits: z.string().max(500, "Os benefícios da vaga devem ter no máximo 500 caracteres"),
})

type FormData = z.infer<typeof schema>;

const Vagas = () => {

  const router = useRouter();

  const session = useSession();

  const { toast } = useToast();

  if (!session.data) {
    redirect("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    const { name, description, location, category, benefits } = data;

    try {
      const response = await fetch("/api/vagas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          name, 
          description, 
          location, 
          category, 
          benefits
        }),
      });

      if (response.status === 500) {
        toast({
          variant: "destructive",
          title: "Erro ao criar a vaga!",
        });
        router.refresh();
      };

      if (response.status === 201) {
        toast({
          title: "Vaga criada com sucesso!",
          description: "Aguardando candidaturas...",
        });
        router.push("/dashboard");
      };

    } catch (error: string | any) {
      toast({
        variant: "destructive",
        title: "Ops! Erro interno no servidor",
      });
      console.log("Error: ", error)
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow-lg shadow-blue-700 overflow-hidden">
      <form className="px-8 py-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nome
          </label>
          <input
          {...register("name")}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="text"
            id="name"
            name="name"
            placeholder="Digite o nome da vaga"
            required
          />
          <p className="my-2">{errors.name?.message}</p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Descrição
          </label>
          <textarea
          {...register("description")}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="description"
            name="description"
            rows={4}
            placeholder="Digite a descrição da vaga"          
            required
          />
          <p className="my-2">{errors.description?.message}</p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Localização
          </label>
          <input
          {...register("location")}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="text"
            id="location"
            name="location"
            placeholder="Digite a localização da vaga"
            required
          />
          <p className="my-2">{errors.location?.message}</p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Categoria
          </label>
          <select
          {...register("category")}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="category"
            name="category"
            required
          >
            <option className=" placeholder-gray-400" value="">Selecione uma categoria</option>
            <option className=" placeholder-gray-400" value="Florestal">Florestal</option>
            <option className=" placeholder-gray-400" value="Químicos">Químicos</option>
            <option className=" placeholder-gray-400" value="Civíl Cultura">Civíl Cultura</option>
            <option className=" placeholder-gray-400" value="Contrução Pesada">Contrução Pesada</option>
            <option className=" placeholder-gray-400" value="Stefani">Stefani</option>
          </select>
          <p className="my-2">{errors.category?.message}</p>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="benefits">
            Benefícios
          </label>
          <input
          {...register("benefits")}
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="text"
            id="benefits"
            name="benefits"
            placeholder="Digite os benefícios da vaga"
          />
          <p className="my-2">{errors.benefits?.message}</p>
        </div>
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          type="submit"
        >
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default Vagas;
