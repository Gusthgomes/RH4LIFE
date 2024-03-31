"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

const Vagas = () => {
  const session = useSession();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    category: '',
    benefits: '',
  });

  if (!session.data) {
    redirect("/login");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Enviar os dados do formulário para o backend
      const response = await fetch('/api/vagas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Vaga criada com sucesso');
        // Limpar o formulário após o envio bem-sucedido
        setFormData({
          name: '',
          description: '',
          location: '',
          category: '',
          benefits: '',
        });
      } else {
        throw new Error('Erro ao criar vaga');
      }
    } catch (error) {
      console.error('Erro ao criar vaga:', error);
    }
  };

  
  return (
    <div className="max-w-md mx-auto bg-white rounded shadow-lg shadow-blue-700 overflow-hidden">
      <form className="px-8 py-6" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nome
          </label>
          <input
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="text"
            id="name"
            name="name"
            placeholder="Digite o nome da vaga"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Descrição
          </label>
          <textarea
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="description"
            name="description"
            rows={4}
            placeholder="Digite a descrição da vaga"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
            Localização
          </label>
          <input
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="text"
            id="location"
            name="location"
            placeholder="Digite a localização da vaga"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Categoria
          </label>
          <select
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option className=" placeholder-gray-400" value="">Selecione uma categoria</option>
            <option className=" placeholder-gray-400" value="Florestal">Florestal</option>
            <option className=" placeholder-gray-400" value="Químicos">Químicos</option>
            <option className=" placeholder-gray-400" value="Civíl Cultura">Civíl Cultura</option>
            <option className=" placeholder-gray-400" value="Contrução Pesada">Contrução Pesada</option>
            <option className=" placeholder-gray-400" value="Stefani">Stefani</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="benefits">
            Benefícios
          </label>
          <input
            className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            type="text"
            id="benefits"
            name="benefits"
            placeholder="Digite os benefícios da vaga"
            value={formData.benefits}
            onChange={handleChange}
          />
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
