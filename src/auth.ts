import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import credentials from 'next-auth/providers/credentials';
import { loginAPI } from '@/app/lib/database-api/credentials';
import { z } from 'zod';
import { POSUser } from '@/app/lib/models/user';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string(),
            password: z.string(),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { email, password } = parsedCredentials.data;
        try {
          const response = await loginAPI(email, password);

          if (response.ok) {
            const { user }: { user: POSUser } = await response.json();
            if (user) {
              return {
                id: user.id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                name: `${user.first_name} ${user.last_name}`,
                privilege_type: user.privilege_type,
              };
            } else {
              return null;
            }
          }
        } catch (error) {
          return null;
        }

        // Reaches if credentials are invalid (response.ok is false).
        return null;
      },
    }),
  ],
  callbacks: {
    session({ session, token }) {
      return {
        expires: session?.expires,
        user: {
          ...session?.user,
          first_name: token.first_name,
          last_name: token.last_name,
          privilege_type: token.privilege_type,
          _id: token.id,
        },
      };
    },
    jwt({ token, user }) {
      return {
        ...token,
        first_name: (user as POSUser)?.first_name || token.first_name,
        last_name: (user as POSUser)?.last_name || token.last_name,
        privilege_type:
          (user as POSUser)?.privilege_type || token.privilege_type,
        id: (user as POSUser)?.id || token.id,
      };
    },
  },
});
