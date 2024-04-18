import { connectToDatabase } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Vagas from "@/models/Vagas";

interface Props {
    params: {
        id: string
    };
};

export const PUT = async (req: NextRequest, { params }: Props) => {
    const { id } = params;
    const { newCandidate: candidates, newScreening: screening, newStatus: status } = await req.json();

    // Valores aceitáveis para o campo status
    const validStatus = ['Aberta', 'Fechada'];

    // Verifica se o status recebido é válido
    if (!validStatus.includes(status)) {
        return NextResponse.json({ message: 'Status inválido' }, { status: 400 });
    }

    await connectToDatabase();

    try {
        const vaga = await Vagas.findByIdAndUpdate(id, { candidates, screening, status }, { new: true });

        if (!vaga) {
            return NextResponse.json({ message: 'Vaga não encontrada' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Vaga atualizada com sucesso', vaga }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Erro ao atualizar a vaga' }, { status: 500 });
    }
};


export const GET = async (req: NextRequest, { params }: Props) => {
    const { id } = params;
    await connectToDatabase();
    const vaga = await Vagas.findOne({ _id: id });
    return NextResponse.json({ vaga }, { status: 200 });
};