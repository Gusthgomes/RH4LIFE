import React from 'react';
import { Bar } from 'react-chartjs-2';

interface Vaga {
  name: string;
  candidates: number;
  screening: number;
  status: string;
}

interface Props {
  vagas: Vaga[];
}

const VagasChart: React.FC<Props> = ({ vagas }) => {

    const vagasAbertas = vagas.filter((vaga) => vaga.status === "Aberta");

  const labels = vagasAbertas.map(vaga => vaga.name);
  const candidatesData = vagasAbertas.map(vaga => vaga.candidates);
  const screeningData = vagasAbertas.map(vaga => vaga.screening);

  const data = {
    labels: vagasAbertas.map(vaga => vaga.name),
    datasets: [
      {
        label: 'Candidatos',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: vagasAbertas.map(vaga => vaga.candidates),
      },
      {
        label: 'Em Triagem',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: vagasAbertas.map(vaga => vaga.screening),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-[800px] m-auto">
      <h2 className="text-xl font-semibold mb-4">Situação Atual das Vagas em Aberto</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default VagasChart;
