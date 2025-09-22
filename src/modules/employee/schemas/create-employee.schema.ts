import { z } from 'zod'

export const CreateEmployeeSchema = z.object({
    name: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Esse campo não pode ser inválido.'
                : 'Não é uma string.'
    })
    .nonempty('O nome completo é obrigatório.'),

    username: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Esse campo não pode ser inválido.'
                : 'Não é uma string.'
    })
    .min(6, { message: 'O username não poder ter menos que 6 caracteres.'})
    .refine(value => !value.includes(' '), { message: 'O username não pode conter espaços.'})
    .trim(),

    password: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Esse campo não pode ser inválido.'
                : 'Não é uma string.'
    })
    .min(8, { message: 'A senha não poder ter meno que 8 caracteres.' })
    .refine(value => !value.includes(' '), { message: 'A senha não pode conter espaços.' })
    .refine(value => /#$%&*@!?/.test(value), { message: 'A senha deve conter caracteres especiais.' })
    .refine(value => /\d/.test(value), { message: 'A senha deve conter números.' })
    .refine(value => /[A-Z]/.test(value), { message: 'A senha deve conter letra maiúscula.' })
    .refine(value => /[a-z]/.test(value), { message: 'A senha deve conter letra minúscula.' })
    .trim(),


})

