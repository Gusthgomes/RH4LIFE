import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import { connectToDatabase } from "@/utils/db";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";

type Credential = {
  email: string;
  password: string;
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials: Credential) {
        await connectToDatabase();

        const { email, password } = credentials;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid email or password!");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid email or password!");
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
