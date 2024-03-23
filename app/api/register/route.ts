import User from "@/models/User";
import { connectToDatabase } from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  await connectToDatabase();

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return new NextResponse("Usuário já existente no sistema", {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const newUser = new User({
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("Usuário cadastrado com sucesso", {
      status: 201,
    });
  } catch (error: string | any) {
    return new NextResponse(error, {
      status: 500,
    });
  }
};
