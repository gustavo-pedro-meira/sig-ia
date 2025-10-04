// Schema Zod para validação de atualização de funcionários
import { Position, Gender } from 'generated/prisma';
import { createZodDto } from 'nestjs-zod';
import { date, email, string, z } from 'zod'

export const UpdateEmployeeSchema = z.object({
    fullName: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Full name cannot be invalid.'
                : 'Must be a string.'
    }).optional(),

    username: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Username cannot be invalid.'
                : 'Must be a string.'
    })
    .min(6, { message: 'Username must be at least 6 characters long.'})
    .refine(value => !value.includes(' '), { message: 'Username cannot contain spaces.'})
    .trim()
    .optional(),

    email: z.email('Invalid email format.').nonempty('Email cannot be invalid.').optional(),

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
    .trim()
    .optional(),

   gender: z.nativeEnum(Gender).optional(),
   
   phone: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Phone cannot be empty.'
                : 'Must be a string.'
   })
   .optional(),


   position: z.nativeEnum(Position).optional(),

   dateOfBirth: z.coerce.date().optional(),

  expirationDate: z.coerce.date().optional(),
})

