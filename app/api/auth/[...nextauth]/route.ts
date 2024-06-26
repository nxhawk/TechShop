import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { auth } from '@/models/user';
import prisma from '@/libs/prismadb';

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "phone", type: "text"},
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          throw new Error('Invalid Credentials');
        }

        const user = await auth(credentials.phone, credentials.password);

        if (!user) {
            throw new Error('Invalid Credentials');
        }
        return {
            id: user.id,
            name: user.name,
            phone: user.phone,
            email: user.email,
            role: user.role,
            cartId: user.cartId,
            image: user.image?.path || '',
        };

      }
    })
  ],
  callbacks:{
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
          return { ...token, user: { ...token.user, ...session.user } };
      }
      if (user) {
          return {
              ...token,
              user: {
                  id: user.id,
                  name: user.name,
                  phone: user.phone,
                  email: user.email,
                  role: user.role,
                  cartId: user.cartId,
                  image: user.image,
              },
          };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.iat = token.iat;
      session.exp = token.exp;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/signout',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };