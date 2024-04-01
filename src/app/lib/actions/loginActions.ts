'use server';

import { revalidatePath } from 'next/cache';
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
      message: 'Missing fields. Failed to verify login.',
    };
  }

  // Check credentials with database.

  revalidatePath('/login');

  return {
    message: 'Successfully logged in.',
  };
}
