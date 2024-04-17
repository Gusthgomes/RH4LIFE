import { connectToDatabase } from '@/utils/db';
import Vagas from '@/models/Vagas';
import { NextRequest, NextResponse } from 'next/server';

interface VagaData {
  name: string;
  description: string;
  location: string;
  category: string;
  benefits?: string;
}

export const POST = async (req: NextRequest) => {
  const data: VagaData = await req.json();

    const { name, description, location, category, benefits }: VagaData = data;
  await connectToDatabase();

  const newVaga = new Vagas({
    name,
    description,
    location,
    category,
    benefits,
  });

  try {
    await newVaga.save();
    return new NextResponse("Vaga criada com sucesso", { status: 201 });
  } catch (error: string | any) {
    return new NextResponse("Erro ao criar a vaga", { status: 500 });
  };
};

export const GET = async () => {
  await connectToDatabase();
  const vaga = await Vagas.find();
  return NextResponse.json({ vaga });
};

export const DELETE = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams.get("id");
  await connectToDatabase();
  await Vagas.findByIdAndDelete(id);
  return new NextResponse("Vaga deletada com sucesso!", { status : 200 });
};
