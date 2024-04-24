"use client";
import React, { useState, useEffect } from 'react';
import VagasChart from '@/components/VagasChart/VagasChart';
import { Vaga } from '@/components/Dashboard/dashboard';

const vagaChart: React.FC = () => {
  const [vagas, setVagas] = useState<Vaga[]>([]);

  useEffect(() => {
    const fetchVagas = async () => {
        try {
            const res = await fetch("/api/vagas");
            if (!res.ok) {
                throw new Error("Erro ao buscar vagas");
            }
            const data = await res.json();
            console.log("Dados recebidos:", data);
            
            if (Array.isArray(data.vaga.vaga)) {
                setVagas(data.vaga.vaga);
            } else {
                console.log("Dados inválidos", data);
            }

            console.log("Vagas:", vagas)
        } catch (error) {
            console.log(error);
        }
    };
    
    fetchVagas(); 
  }, []);

  return (
    <div className="container mx-auto p-4">
      <VagasChart vagas={vagas} />
    </div>
  );
};

export default vagaChart;
