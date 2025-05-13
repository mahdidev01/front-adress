// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        const res = await fetch("https://booking.youradress.com/module/apirooms/googlelogin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: profile?.email,
            firstname: profile?.given_name,
            lastname: profile?.family_name,
          }),
        });

        const data = await res.json();

        if (data.success) {
          (profile as any).id_customer = data.id_customer;
          (profile as any).secure_key = data.secure_key;
          return true;
        } else {
          console.error("Erreur googlelogin.php:", data);
          return false;
        }
      } catch (error) {
        console.error("Erreur réseau lors du signIn:", error);
        return false;
      }
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id_customer = (token as any).id_customer;
        session.user.secure_key = (token as any).secure_key;
      }
      return session;
    },

    async jwt({ token, profile }) {
      if (profile) {
        token.id_customer = (profile as any).id_customer;
        token.secure_key = (profile as any).secure_key;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
