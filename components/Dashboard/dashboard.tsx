"use client"
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { CiEdit } from "react-icons/ci";
import { Button } from '../ui/button';
import { RemoveBtn } from '../RemoveBtn/RemoveBtn';
import Link from 'next/link';

export interface Vaga {
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
      const res = await fetch("/api/vagas");

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

  if(vagas.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center gap-10 my-3'>
          <h2 className='text-3xl font-mono'>Nenhuma vaga está em aberto!</h2>
          <p className='text-sm mb-3'>Aguardando novas vagas...</p>
          <div className="spinner-border w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
          <Link className='w-40 bg-blue-500 rounded p-2 font-mono text-2xl text-white text-center drop-shadow-lg' href="/vagas">Abrir vaga</Link>
      </div>
    )
  }
 
  return (
    <>
      <div className='w-[80% mx-auto flex flex-col justify-center items-center rounded-lg md:mx-0 md:w-auto ml-2 mr-2'>
        <h2 className="text-base md:text-3xl font-mono md:font-semibold flex text-start mr-auto ml-2">Vagas em aberto:</h2>
        {vagas.map((vaga) => (
          <div key={vaga._id} className='w-full flex flex-col justify-center items-center my-3 font-mono'>
          <div className="w-full max-w-[1280px] gap-10 border-2 border-white shadow-xl bg-blue-400 rounded p-2">
              <div className="flex flex-col items-center justify-center my-2">
                  <p className="text-lg">Nome: {vaga.name}</p>
                  <p className="text-lg">Descrição: {vaga.description}</p>
                  <p className="text-lg">Categoria: {vaga.category}</p>
                  <p className="text-lg">Benefícios: {vaga?.benefits}</p>
                  <p className="text-lg">Local: {vaga.location}</p>
              </div>
              <div className="flex flex-row items-center justify-around mb-2">
                  <p className="text-lg">Status: {vaga?.status}</p>
                  <p className="text-lg">Data: {new Date(vaga.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex flex-row items-center justify-around mb-2">
                  <p className="text-lg">Candidatos: {vaga.candidates}</p>
                  <p className="text-lg">Em Triagem: {vaga.screening}</p>
              </div>
              <div className="flex flex-row items-center justify-around mb-2">
              <Link
                  href={`/upload/${vaga._id}`}
                  className="my-2 bg-blue-600 rounded hover:bg-blue-700 w-12 h-10 flex items-center justify-center"
                >
                  <CiEdit size={17} color="#FFF" className="my-2" />
                </Link>
                <RemoveBtn id={vaga._id} setVagas={setVagas}/>
              </div>
          </div>
      </div>
        ))}
      </div>
    </>
  );
};

export default Board;
