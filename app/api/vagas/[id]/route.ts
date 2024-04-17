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
    const { newCandidate: candidates, newScreening: screening } = await req.json();
    await connectToDatabase();
    await Vagas.findByIdAndUpdate(id, { candidates, screening } );
    return NextResponse.json({message: "Vaga atualizada com sucesso"}, { status: 200})
};

export const GET = async (req: NextRequest, { params }: Props) => {
    const { id } = params;
    await connectToDatabase();
    const vaga = await Vagas.findOne({ _id: id });
    return NextResponse.json({ vaga }, { status: 200 });
};