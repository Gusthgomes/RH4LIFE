import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider, { CredentialsConfig } from "next-auth/providers/credentials";
import User from "@/models/User";
import { connectToDatabase } from "@/utils/db";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth/next";
import { Account, User as AuthUser } from "next-auth";

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
          throw new Error("E-mail ou senha inválidos!");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("E-mail ou senha inválidos!");
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account}: { user: AuthUser, account: Account}) {
      if( account?.provider == "credentials") {
        return true;
      };
      if (account?.provider == "google") {
        await connectToDatabase();
        try {
          const existUser = await User.findOne({email: user.email});
          if(!existUser) {
            const newUser = new User ({
              email: user.email,
            })

            await newUser.save();
            return true;
          }
          return true;
        } catch (error) {
          console.log("Erro: ", error)
        }
      }
    },
  },
};

// @ts-ignore
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
