import { CargoEmployeeEnum, GenderEmployeeEnum } from 'generated/prisma';
import { date, email, string, z } from 'zod'

export const CreateEmployeeSchema = z.object({
    fullName: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Nome Completo não pode ser inválido.'
                : 'Não é uma string.'
    }),

    username: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Username não pode ser inválido.'
                : 'Não é uma string.'
    })
    .min(6, { message: 'O username não poder ter menos que 6 caracteres.'})
    .refine(value => !value.includes(' '), { message: 'O username não pode conter espaços.'})
    .trim(),

    email: z.email('Formato de email inválido.').nonempty('Email não pode ser inválido.'),

    password: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Password não pode ser inválido.'
                : 'Não é uma string.'
    })
    .min(8, { message: 'A senha não poder ter menos que 8 caracteres.' })
    .refine(value => !value.includes(' '), { message: 'A senha não pode conter espaços.' })
    .refine(value => /[#$%&*@!?"]/.test(value), { message: 'A senha deve conter caracteres especiais.' })
    .refine(value => /\d/.test(value), { message: 'A senha deve conter números.' })
    .refine(value => /[A-Z]/.test(value), { message: 'A senha deve conter letra maiúscula.' })
    .refine(value => /[a-z]/.test(value), { message: 'A senha deve conter letra minúscula.' })
    .trim(),

   gender: z.nativeEnum(GenderEmployeeEnum),
   
   phone: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Número não pode ser vazio.'
                : 'Não é uma string.'
   }),

//    dateOfBirth: z.coerce.date(),

   cargo: z.nativeEnum(CargoEmployeeEnum),

   dateOfBirth: z.string().datetime({
    message: 'Data de nascimento deve estar no formato ISO 8601.',
  }),

  expirationDate: z.string().datetime({
    message: 'Data de expiração deve estar no formato ISO 8601.',
  }),
})

