import NextAuth from "next-auth";
import MicrosoftProvider from "next-auth/providers/azure-ad";

const handler = NextAuth({
  providers: [
    MicrosoftProvider({
      clientId: process.env.MICROSOFT_CLIENT_ID!,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      return user.email?.endsWith("@uconn.edu") || false;
    },
  },
});

export { handler as GET, handler as POST };
// Pre-Setup for Microsoft Auth. Revert Here if this all breaks.