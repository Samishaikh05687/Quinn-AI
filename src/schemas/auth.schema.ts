import { ZodType, z } from 'zod';

// Reusable email schema
const emailSchema = z.string().email({ message: 'You did not enter a valid email' });

// Reusable password schema with refined validation for strong password rules
const passwordSchema = z
  .string()
  .min(8, { message: 'Your password must be at least 8 characters long' })
  .max(64, { message: 'Your password cannot be longer than 64 characters' })
  .refine(
    (value) => /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(value ?? ''),
    {
      message:
        'Password must include an uppercase letter, a lowercase letter, a number, and a special character',
    }
  );

// User registration type
export type UserRegistrationProps = {
  type: string;
  fullname: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

// User registration schema
export const UserRegistrationSchema: ZodType<UserRegistrationProps> = z
  .object({
    type: z.string().nonempty({ message: 'Type is required' }),
    fullname: z
      .string()
      .min(4, { message: 'Your full name must be at least 4 characters long' }),
    email: emailSchema,
    confirmEmail: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    otp: z.string().regex(/^\d{6}$/, { message: 'You must enter a 6-digit code' }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine((schema) => schema.email === schema.confirmEmail, {
    message: 'Your emails do not match',
    path: ['confirmEmail'],
  });

// User login type
export type UserLoginProps = {
  email: string;
  password: string;
};

// User login schema
export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Change password type
export type ChangePasswordProps = {
  password: string;
  confirmPassword: string;
};

// Change password schema
export const ChangePasswordSchema: ZodType<ChangePasswordProps> = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
