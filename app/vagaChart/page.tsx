"use client";
import React, { useState, useEffect } from 'react';
import VagasChart from '@/components/VagasChart/VagasChart';

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

// VagaChart.tsx
const VagaChart: React.FC = () => {
  const [vagas, setVagas] = useState<Vaga[]>([]);

  const fetchVagas = async () => {
    try {
      const response = await fetch("/api/vagas");

      if (!response.ok) {
        throw new Error("Erro ao buscar as vagas!");
      }

      const data = await response.json();

      console.log("Dados: ", data);

      if (Array.isArray(data.vaga) && data.vaga.length > 0) {
        setVagas(data.vaga);
      } else {
        console.log("Dados inválidos", data);
      }

    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    fetchVagas();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <VagasChart vagas={vagas} />
    </div>
  );
};


export default VagaChart;
