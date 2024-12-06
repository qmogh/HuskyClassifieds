import * as z from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    // .refine(
    //   (email) => email.endsWith('@uconn.edu') || email === 'chaubeyamogh@gmail.com',
    //   {
    //     message: 'Email must end with @uconn.edu',
    //   }
    // ),
});

// export const RegisterSchema = z.object({
//   email: z
//     .string()
//     .email({ message: 'Please enter a valid email address' })
//     .refine((email) => email.endsWith('@uconn.edu'), {
//       message: 'Email must end with @uconn.edu',
//     }),
//   password: z.string().min(6, {
//     message: 'Minimum 6 characters required',
//   }),
//   name: z.string().min(1, {
//     message: 'Name is required',
//   }),
// });

export const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
  description: z.string().min(1, {
    message: "Please describe your item, or any contact information.",
  }),
  price: z.number().nonnegative({
    message: "Price must be 0 or more. If free, put 0.",
  }),
  imageUrl: z.string().url({
    message: "Please provide a valid URL of your image.",
  }),
})