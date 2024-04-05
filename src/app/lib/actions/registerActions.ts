'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  checkActivationCodeAPI,
  checkUsernameAPI,
  registerAPI,
} from '../database-api/credentials';

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
    username: z
      .string()
      .min(5, 'Username must be at least 5 characters long')
      .max(255, 'Username is too long'),
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
    username?: string[];
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
    username: formData.get('username'),
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

  // Check if username is already taken.
  const username = validatedFields.data.username;
  try {
    const response = await checkUsernameAPI(username);

    if (!response.ok) {
      switch (response.status) {
        case 400:
          return {
            errors: { username: ['Username is already taken'] },
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
  const password = validatedFields.data.password;
  const code = validatedFields.data.code;
  try {
    response = await registerAPI(username, password, code);
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
        errors: { code: ['Invalid activation code or username'] },
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
