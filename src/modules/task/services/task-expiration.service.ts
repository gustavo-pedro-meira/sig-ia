// Service to handle task expiration logic
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma.service';
import dayjs from 'dayjs';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskExpirationService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron('0 */1 * * * *')
  async updateExpiredTasks(): Promise<void> {
    const now = dayjs();

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