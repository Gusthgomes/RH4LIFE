"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface Vaga {
  _id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  benefits?: string;
  candidates: number;
  screening: number;
  status: string;
  createdAt: string;
}

const Board = () => {
  const [vagas, setVagas] = useState<Vaga[]>([]);

  const session = useSession();

  if (!session?.data?.user?.email) redirect("/login");

  const fetchVagas = async () => {
    try {
      const res = await fetch("/api/vagas", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Erro ao buscar vagas");
      }

      const data = await res.json();

      if (Array.isArray(data.vaga)) {
        setVagas(data.vaga);
      } else {
        console.log("Dados inválidos", data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVagas();
  }, []);

  return (
    <>
      <div className='w-full flex flex-col justify-center items-center rounded-lg'>
        <h2 className="text-3xl font-mono font-semibold flex text-start mr-auto">Vagas em aberto:</h2>
        {vagas.map((vaga) => (
          <div key={vaga._id} className=' w-full max-w-[1280px] rounded border-2 border-blue-500 my-4 h-40 p-3'>
            <div className='flex flex-row justify-center items-center mb-6'>
              <div className='w-1/3 flex flex-col justify-center items-center'>
                <h3 className='text-xl font-mono font-semibold'>Nome: {vaga.name}</h3>
              </div>
              <div className='w-1/3 flex flex-col justify-center items-center'>
                <h3 className='text-xl font-mono font-semibold'>Descrição: {vaga.description}</h3>
              </div>
              <div className='w-1/2 flex flex-col justify-center items-center'>
                <h3 className='text-xl font-mono font-semibold'>Localização: {vaga.location}</h3>
              </div>
            </div>

            <div className='flex flex-row justify-center items-center mb-6'>
              <div className='w-1/3 flex flex-col justify-center items-center'>
                <h3 className='text-xl font-mono font-semibold'>Categoria: {vaga.category}</h3>
              </div>
              <div className='w-1/3 flex flex-col justify-center items-center'>
                <h3 className='text-xl font-mono font-semibold'>Benefícios: {vaga?.benefits}</h3>
              </div>
              <div className='w-1/2 flex flex-col justify-center items-center'>
                <h3 className='text-xl font-mono font-semibold'>Data: {new Date(vaga.createdAt).toLocaleDateString()}</h3>
              </div>
            </div>

            <div className='flex flex-row justify-center items-center mb-6'>
              <div className='w-1/3 flex flex-col justify-center items-center'>
                <h3 className='text-xl font-mono font-semibold'>Candidatos: {vaga.candidates}</h3>
              </div>
              <div className='w-1/3 flex flex-col justify-center items-center'>
                <h3 className='text-xl font-mono font-semibold'>Em Triagem: {vaga.screening}</h3>
              </div>
              <div className='w-1/2 flex flex-col justify-center items-center'>
                <h3 className='text-xl font-mono font-semibold'>Status: {vaga.status}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Board;
