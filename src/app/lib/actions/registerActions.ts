'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const InviteCodeSchema = z.object({
  code: z.string().min(1, 'Access code is required'),
});

export type State = {
  errors?: {
    code?: string[];
  };
  message?: string | null;
};

export async function verifyInviteCode(
  prevState: State,
  formData: FormData
): Promise<State> {
  // Zod form validation.
  const validatedFields = InviteCodeSchema.safeParse({
    code: formData.get('code'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to verify invite code.',
    };
  }

  // Check access code with database.

  revalidatePath('/register');

  return {
    message: 'Successfully verified invite code.',
  };
}
