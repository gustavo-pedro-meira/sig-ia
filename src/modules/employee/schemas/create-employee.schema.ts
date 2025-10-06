// Schema Zod para validação de criação de funcionários
import { Position, Gender } from 'generated/prisma';
import { createZodDto } from 'nestjs-zod';
import { date, email, string, z } from 'zod'

export const CreateEmployeeSchema = z.object({
    fullName: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Full name cannot be invalid.'
                : 'Must be a string.'
    }),

    username: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Username cannot be invalid.'
                : 'Must be a string.'
    })
    .min(6, { message: 'Username must be at least 6 characters long.'})
    .refine(value => !value.includes(' '), { message: 'Username cannot contain spaces.'})
    .trim(),

    email: z.email('Invalid email format.').nonempty('Email cannot be invalid.'),

    password: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Password cannot be invalid.'
                : 'Must be a string.'
    })
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .refine(value => !value.includes(' '), { message: 'Password cannot contain spaces.' })
    .refine(value => /[#$%&*@!?\-"]/.test(value), { message: 'Password must contain special characters.' })
    .refine(value => /\d/.test(value), { message: 'Password must contain numbers.' })
    .refine(value => /[A-Z]/.test(value), { message: 'Password must contain uppercase letters.' })
    .refine(value => /[a-z]/.test(value), { message: 'Password must contain lowercase letters.' })
    .trim(),

   gender: z.nativeEnum(Gender),
   
   phone: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Phone cannot be empty.'
                : 'Must be a string.'
   }),

   dateOfBirth: z.coerce.date(),

   position: z.nativeEnum(Position),

   expirationDate: z.coerce.date(),

   departmentId: z.string().uuid('Invalid department ID.'),

   score: z.number().min(0).optional(),
})

