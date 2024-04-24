"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface Props {
    id: string;
    candidates: number;
    screening: number;
    status: string;
}

const EditVaga = ({ id, candidates, screening, status}: Props) => {

      const router = useRouter();

      const [newCandidates, setNewCandidates] = useState<number>(candidates);
        const [newScreening, setNewScreening] = useState<number>(screening);
        const [newStatus, setNewStatus] = useState<string>(status);

        const validStatus = ['Aberta', 'Fechada'];

        const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
        
            try {
                const res = await fetch(`/api/vagas/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        newCandidate: newCandidates,
                        newScreening: newScreening,
                        newStatus: newStatus
                    }),
                });
        
                const data = await res.json();
        
                if (!res.ok) {
                    throw new Error(data.message || 'Erro ao atualizar a vaga');
                }
        
                alert("Vaga atualizada com Sucesso!");
                router.push("/dashboard");
        
            } catch (error) {
                console.error(error);
            }
        };

    return (
        <div className='w-full max-w-[1280px] gap-2 flex flex-col rounded bg-blue-400 border-2 border-white shadow-md'>
          <h2 className='text-4xl font-mono text-center my-3'>Atualizando status da vaga</h2>
          <form onSubmit={handleSubmit} className='w-[600px] max-w-[1280px] flex flex-col rounded items-center justify-center gap-3 m-auto py-2'>
              <label className='text-2xl font-mono items-start my-1'>Número de candidatos:</label>
              <input value={newCandidates} onChange={ (e) => setNewCandidates(Number(e.target.value))} placeholder='3' type='number' required disabled={newStatus === "Fechada" ? true : false} className='w-[300px] text-center rounded text-black border-2 border-black pl-2'/>
    
              <label className='text-2xl font-mono items-start my-1'>Em triagem:</label>
              <input value={newScreening} onChange={ (e) => setNewScreening(Number(e.target.value))} placeholder='2' type='number' required disabled={newStatus === "Fechada" ? true : false} className='w-[300px] text-center rounded text-black border-2 border-black pl-2'/>
    
              <select
                className="w-[300px] text-center px-3 py-2 placeholder-gray-400 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                value={newStatus}
                onChange={(e) => {
                    const selectedStatus = e.target.value;
                    
                    if (validStatus.includes(selectedStatus)) {
                        setNewStatus(selectedStatus);
                    }
                }}
            >
                <option className=" placeholder-gray-400" value="">Selecione um status</option>
                {validStatus.map((status) => (
                    <option key={status} className=" placeholder-gray-400" value={status}>{status}</option>
                ))}
            </select>



              <Button className='w-full rounded text-mono text-2xl text-white'>Atualizar</Button>
          </form>
        </div>
      )
}

export default EditVaga