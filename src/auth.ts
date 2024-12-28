import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter"; 
import { prisma } from "@/lib/database"
import authConfig from "./auth.config";

export const {
    handlers: {GET, POST},
    auth, 
    signIn, 
    signOut
} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 hours in seconds
    },
    jwt: {
        maxAge: 24 * 60 * 60, // 24 hours in seconds
    },
    pages: {
        signIn: '/login',
        error: '/error',
    },
    ...authConfig
})