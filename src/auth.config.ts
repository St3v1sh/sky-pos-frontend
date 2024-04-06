import type { NextAuthConfig } from 'next-auth';
import { POSUser } from '@/app/lib/models/user';

export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/register',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log(auth);
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page.
      }

      const userPrivilegeType = (auth?.user as POSUser)?.privilege_type;
      const isOnManage = nextUrl.pathname.startsWith('/manage');
      if (isOnManage) {
        if (isLoggedIn && userPrivilegeType === 'admin') {
          return true;
        }
        return Response.redirect(new URL('/', nextUrl)); // Redirect employees to home page.
      }

      const isOnLogin = nextUrl.pathname === '/login';
      const isOnRegister = nextUrl.pathname === '/register';
      if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('/', nextUrl)); // Redirect users to home page.
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
