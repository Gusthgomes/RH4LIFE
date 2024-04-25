import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Vaga } from '@/app/vagaChart/page';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface Props {
  vagas: Vaga[];
}

const VagasChart: React.FC<Props> = ({ vagas }) => {

  const vagasAbertas = vagas.filter((vaga) => vaga.status === "Aberta");

  if (vagasAbertas.length === 0) {
    return <div>Não há vagas abertas no momento.</div>;
  }

  const labels = vagasAbertas.map(vaga => vaga.name);
  const candidatesData = vagasAbertas.map(vaga => vaga.candidates);
  const screeningData = vagasAbertas.map(vaga => vaga.screening);

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Filtre por Candidatos ou Em Triagem",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Candidatos',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        data: candidatesData,
        yAxisID: "y",
      },
      {
        label: 'Em Triagem',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        data: screeningData,
        yAxisID: "y1",
      },
    ],
  };

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-[700px] m-auto my-10">
    <h2 className="text-2xl flex items-start font-semibold mb-4">Situação Atual das Vagas em Aberto</h2>
    <Line data={data} options={options}/>
  </div>
  );
};

export default VagasChart;
