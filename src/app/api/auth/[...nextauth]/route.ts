import NextAuth from "next-auth";
import MicrosoftProvider from "next-auth/providers/microsoft";

const handler = NextAuth({
  providers: [
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return user.email?.endsWith("@uconn.edu") || false;
    },
  },
});

export { handler as GET, handler as POST };

// import NextAuth from "next-auth";

// const handler = NextAuth({
//     providers:[]
// });

// export {handler as GET, handler as POST};