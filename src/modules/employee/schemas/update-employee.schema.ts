import { CargoEmployeeEnum, GenderEmployeeEnum } from 'generated/prisma';
import { createZodDto } from 'nestjs-zod';
import { date, email, string, z } from 'zod'

export const UpdateEmployeeSchema = z.object({
    fullName: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Nome Completo não pode ser inválido.'
                : 'Não é uma string.'
    }).optional(),

    username: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Username não pode ser inválido.'
                : 'Não é uma string.'
    })
    .min(6, { message: 'O username não poder ter menos que 6 caracteres.'})
    .refine(value => !value.includes(' '), { message: 'O username não pode conter espaços.'})
    .trim()
    .optional(),

    email: z.email('Formato de email inválido.').nonempty('Email não pode ser inválido.').optional(),

    password: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Password não pode ser inválido.'
                : 'Não é uma string.'
    })
    .min(8, { message: 'A senha não poder ter menos que 8 caracteres.' })
    .refine(value => !value.includes(' '), { message: 'A senha não pode conter espaços.' })
    .refine(value => /[#$%&*@!?]/.test(value), { message: 'A senha deve conter caracteres especiais.' })
    .refine(value => /\d/.test(value), { message: 'A senha deve conter números.' })
    .refine(value => /[A-Z]/.test(value), { message: 'A senha deve conter letra maiúscula.' })
    .refine(value => /[a-z]/.test(value), { message: 'A senha deve conter letra minúscula.' })
    .trim()
    .optional(),

   gender: z.nativeEnum(GenderEmployeeEnum).optional(),
   
   phone: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Número não pode ser vazio.'
                : 'Não é uma string.'
   })
   .optional(),


   cargo: z.nativeEnum(CargoEmployeeEnum).optional(),

   dateOfBirth: z.coerce.date(),

  expirationDate: z.coerce.date(),
})

