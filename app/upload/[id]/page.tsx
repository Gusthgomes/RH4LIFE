"use client";
import EditVaga from '@/components/EditVaga/EditVaga';
import React, { useEffect, useState } from 'react';

interface Props {
  params: {
    id: string;
  };
}

const getVagasById = async (id: string) => {
  try {
    const response = await fetch(`/api/vagas/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar as vagas!")
    };

    return response.json();

  } catch (error) {
    console.log(error);
    throw error; // Rethrow para tratar em outros lugares, se necessário
  }
};

const UpdateVaga = ({ params }: Props) => {
  const { id } = params;
  const [vagaData, setVagaData] = useState<any>(null);

  useEffect(() => {
    const fetchVagaData = async () => {
      try {
        const data = await getVagasById(id);
        console.log(data)
        setVagaData(data.vaga);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVagaData();
  }, [id]);

  if (!vagaData) {
    return <div>Carregando...</div>;
  }

  const { candidates, screening, status } = vagaData;

  return <EditVaga id={id} candidates={candidates} screening={screening} status={status} />;
};

export default UpdateVaga;
