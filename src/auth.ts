import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import credentials from 'next-auth/providers/credentials';
import { loginAPI } from '@/app/lib/database-api/credentials';
import { z } from 'zod';

export type User = {
  id: string;
  username: string;
  password: string;
  privilege_type: string;
  created_at: string;
};

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            username: z.string(),
            password: z.string(),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { username, password } = parsedCredentials.data;
        try {
          const response = await loginAPI(username, password);

          if (response.ok) {
            const { user }: { user: User } = await response.json();
            if (user) {
              return user;
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
});
