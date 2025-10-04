// Service to handle task expiration logic
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma.service';
import dayjs from 'dayjs';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskExpirationService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron('0 */1 * * * *') // Run every minute
  async updateExpiredTasks(): Promise<void> {
    const now = dayjs();

    // Update tasks where deadline is in the past and status is not already Expired
    await this.prisma.task.updateMany({
      where: {
        deadline: {
          lt: now.toDate(),
        },
        status: {
          not: 'Expired',
        },
      },
      data: {
        status: 'Expired',
      },
    });
  }
}