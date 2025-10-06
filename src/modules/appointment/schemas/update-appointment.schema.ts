// Schema Zod para validação de atualização de compromissos
import { AppointmentStatus } from 'generated/prisma';
import { createZodDto } from 'nestjs-zod';
import { date, string, z } from 'zod'

export const UpdateAppointmentSchema = z.object({
    reason: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Reason cannot be invalid.'
                : 'Must be a string.'
    }).min(3, { message: 'Reason must be at least 3 characters long.' }).trim().optional(),

    description: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Description cannot be invalid.'
                : 'Must be a string.'
    }).min(3, { message: 'Description must be at least 3 characters long.' }).trim().optional(),

    location: z.string({
        error: (issue) =>
            issue.input === undefined
                ? 'Location cannot be empty.'
                : 'Must be a string.'
    }).min(3, { message: 'Location must be at least 3 characters long.' }).trim().optional(),

    deadline: z.coerce.date().optional(),

    status: z.nativeEnum(AppointmentStatus).optional(),

    userId: z.string().uuid('Invalid user ID.').optional().nullable(),

    userIdResponsible: z.string().uuid('Invalid responsible employee ID.').optional().nullable(),
})