'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';

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
  let response;
  try {
    response = await fetch(process.env.DB_API_URL + '/login', {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.DB_API_KEY!,
      },
      body: JSON.stringify({
        username: validatedFields.data.username,
        password: validatedFields.data.password,
      }),
    });
  } catch (error) {
    console.error(error);
    return {
      message: 'Internal server error; try again later',
    };
  }

  if (response.ok) {
    redirect('/');
  }

  switch (response.status) {
    case 400:
      return {
        message: 'Incorrect username or password',
      };

    case 401:
      return {
        message: 'Cannot communicate with database; try again later',
      };

    case 500:
      return {
        message: 'Database server error; try again later',
      };

    default:
      return {
        message: 'Unknown error; try again later',
      };
  }
}
