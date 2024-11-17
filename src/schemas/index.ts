import * as z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .refine(
      (email) => email.endsWith('@uconn.edu') || email === 'chaubeyamogh@gmail.com',
      {
        message: 'Email must end with @uconn.edu',
      }
    ),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .refine((email) => email.endsWith('@uconn.edu'), {
      message: 'Email must end with @uconn.edu',
    }),
  password: z.string().min(6, {
    message: 'Minimum 6 characters required',
  }),
  name: z.string().min(1, {
    message: 'Name is required',
  }),
});
