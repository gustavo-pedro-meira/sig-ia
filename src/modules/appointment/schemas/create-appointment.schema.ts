// Schema Zod para validação de criação de compromissos
import { AppointmentStatus } from 'generated/prisma';
import { createZodDto } from 'nestjs-zod';
import { date, string, z } from 'zod'

export const CreateAppointmentSchema = z.object({
    reason: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Reason cannot be invalid.'
                : 'Must be a string.'
    }).min(3, { message: 'Reason must be at least 3 characters long.' }).trim(),

    description: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Description cannot be invalid.'
                : 'Must be a string.'
    }).min(3, { message: 'Description must be at least 3 characters long.' }).trim(),

    location: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Location cannot be empty.'
                : 'Must be a string.'
    }).min(3, { message: 'Location must be at least 3 characters long.' }).trim(),

    deadline: z.coerce.date(),

    status: z.nativeEnum(AppointmentStatus).optional(),

    hour: z.number().min(0).max(23).optional(),

    minute: z.number().min(0).max(59).optional(),

    userId: z.string().uuid('Invalid user ID.').optional().nullable(),

    userIdResponsible: z.string().uuid('Invalid responsible employee ID.').nullable(),
})