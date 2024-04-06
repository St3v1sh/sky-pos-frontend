import type { NextAuthConfig } from 'next-auth';
import { POSUser } from '@/lib/models/user';
import credentials from 'next-auth/providers/credentials';
import { loginAPI } from '@/lib/database-api/credentials';
import { z } from 'zod';

type UserResponseData = {
  user: POSUser;
};

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // Dashboard route.
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page.
      }

      // Manage route.
      const userPrivilegeType = (auth?.user as POSUser)?.privilege_type;
      const isOnManage = nextUrl.pathname.startsWith('/manage');
      if (isOnManage) {
        if (isLoggedIn && userPrivilegeType === 'admin') {
          return true;
        }
        if (!isLoggedIn) {
          return false; // Redirect unauthenticated users to login page.
        }
        return Response.redirect(new URL('/', nextUrl)); // Redirect employees to home page.
      }

      // Login and register routes.
      const isOnLogin = nextUrl.pathname === '/login';
      const isOnRegister = nextUrl.pathname === '/register';
      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        const { callbackUrl } = Object.fromEntries(nextUrl.searchParams);
        return Response.redirect(new URL(callbackUrl || '/', nextUrl)); // Redirect users to their requested page.
      }
      return true;
    },
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
            const { user }: UserResponseData = await response.json();
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
} satisfies NextAuthConfig;
