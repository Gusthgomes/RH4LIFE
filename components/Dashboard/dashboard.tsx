"use client";
import React from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const Board = async () => {
    const session = useSession();

    if (!session?.data?.user) {
        redirect("/login")
    };

    const getVagas = async () => {
        try {
            const res = await fetch("/api/vagas", {
                method: "GET",
            });

            if (!res.ok) {
                throw new Error("Erro ao buscar vagas");
            };

            return res.json();
        } catch (error) {
            console.log(error)
        }
    };

    const { vaga } = await getVagas();

  return (
    <>
    { /*
    TODO: Criar tipagem para vagas
     */}
        {vaga.map( vagas => (
            <div key={vagas._id} className='w-full border-2 border-blue-600 rounded p-2 my-10 flex flex-col justify-center items-center text-center'>
                <p>{vagas.name}</p>
                <p>{vagas.description}</p>
                <p>{vagas.location}</p>
                <p>{vagas.category}</p>
                <p>{vagas.benefits}</p>
                <p>{vagas.candidates}</p>
                <p>{vagas.screening}</p>
                <p>{vagas.status}</p>
                <div className=''></div>
            </div>
        ))}
    </>
  )
}

export default Board;