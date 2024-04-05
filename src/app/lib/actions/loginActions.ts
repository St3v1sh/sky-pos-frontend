'use server';

import { z } from 'zod';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const LoginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export type State = {
  errors?: {
    username?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function verifyLogin(
  prevState: State,
  formData: FormData
): Promise<State> {
  // Zod form validation.
  const validatedFields = LoginSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Check credentials with database.
  try {
    await signIn('credentials', formData, { redirectTo: '/' });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            message: 'Incorrect username or password',
          };

        default:
          return {
            message: 'Unknown error; try again later',
          };
      }
    }
    throw error;
  }

  return {
    message: 'Unknown error; try again later',
  };

  // // Check credentials with database.
  // let response;
  // const username = validatedFields.data.username;
  // const password = validatedFields.data.password;
  // try {
  //   response = await loginAPI(username, password);
  // } catch (error) {
  //   console.error(error);
  //   return {
  //     message: 'Internal server error; try again later',
  //   };
  // }

  // if (response.ok) {
  //   redirect('/');
  // }

  // switch (response.status) {
  //   case 400:
  //     return {
  //       message: 'Incorrect username or password',
  //     };

  //   case 401:
  //     return {
  //       message: 'Cannot communicate with database; try again later',
  //     };

  //   case 500:
  //     return {
  //       message: 'Database server error; try again later',
  //     };

  //   default:
  //     return {
  //       message: 'Unknown error; try again later',
  //     };
  // }
}
