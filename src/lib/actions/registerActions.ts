'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  checkActivationCodeAPI,
  checkEmailAPI,
  registerAPI,
} from '../database-api/credentials';
import { signIn } from '@/auth';

const InviteCodeSchema = z.object({
  code: z.string().min(1, 'Activation code is required'),
});

export type CodeValidationState = {
  success?: boolean;
  errors?: {
    code?: string[];
  };
  message?: string;
};

export async function verifyActivationCode(
  prevState: CodeValidationState,
  formData: FormData
): Promise<CodeValidationState> {
  // Zod form validation.
  const validatedFields = InviteCodeSchema.safeParse({
    code: formData.get('code'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Check activation code with database.
  const code = validatedFields.data.code;
  try {
    const response = await checkActivationCodeAPI(code);

    if (response.ok) {
      return {
        success: true,
      };
    }

    switch (response.status) {
      case 400:
        return {
          errors: { code: ['Invalid activation code'] },
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
  } catch (error) {
    console.error(error);
    return {
      message: 'Internal server error; try again later',
    };
  }
}

const RegisterSchema = z
  .object({
    email: z.string().max(255, 'Email is too long').email('Invalid email'),
    firstName: z
      .string()
      .min(1, 'First name is required')
      .max(255, 'First name is too long'),
    lastName: z
      .string()
      .min(1, 'Last name is required')
      .max(255, 'Last name is too long'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(255, 'Password is too long')
      .refine(
        (value) => /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`-]*$/.test(value),
        'Password contains invalid characters'
      ),
    confirmPassword: z.string(),
    code: z.string().min(1, 'Activation code is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type UserValidationState = {
  errors?: {
    email?: string[];
    firstName?: string[];
    lastName?: string[];
    password?: string[];
    confirmPassword?: string[];
    code?: string[];
  };
  message?: string;
};

export async function verifyRegister(
  prevState: UserValidationState,
  formData: FormData
): Promise<UserValidationState> {
  // Zod form validation.
  const validatedFields = RegisterSchema.safeParse({
    email: formData.get('email'),
    firstName: formData.get('first-name'),
    lastName: formData.get('last-name'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirm-password'),
    code: formData.get('code'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields; failed to register',
    };
  }

  // Check if email is already taken.
  const email = validatedFields.data.email;
  try {
    const response = await checkEmailAPI(email);

    if (!response.ok) {
      switch (response.status) {
        case 400:
          return {
            errors: { email: ['Account already exists on this email'] },
            message: 'Invalid field(s)',
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
  } catch (error) {
    console.error(error);
    return {
      message: 'Internal server error; try again later',
    };
  }

  // Register user in database.
  let response;
  const firstName = validatedFields.data.firstName;
  const lastName = validatedFields.data.lastName;
  const password = validatedFields.data.password;
  const code = validatedFields.data.code;
  try {
    response = await registerAPI(email, firstName, lastName, password, code);
  } catch (error) {
    console.error(error);
    return {
      message: 'Internal server error; try again later',
    };
  }

  if (response.ok) {
    await signIn('credentials', {
      email: email,
      password: password,
    });
  }

  switch (response.status) {
    case 400:
      const { errorFrom }: { errorFrom: string } = await response.json();
      if (errorFrom === 'code') {
        return {
          errors: { code: ['Invalid activation code or username'] },
          message: 'Invalid field(s)',
        };
      } else if (errorFrom === 'email') {
        return {
          errors: { email: ['Account already exists on this email'] },
          message: 'Invalid field(s)',
        };
      } else {
        return {
          message: 'Invalid field(s)',
        };
      }

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
