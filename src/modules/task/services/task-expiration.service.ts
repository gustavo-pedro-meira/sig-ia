// Service to handle task expiration logic
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../infra/database/prisma.service';
import dayjs from 'dayjs';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskExpirationService {
  private readonly logger = new Logger(TaskExpirationService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron('0 */1 * * * *')  // Executa a cada minuto
  async updateExpiredTasks(): Promise<void> {
    const now = dayjs();
    
    try {
      // Atualiza apenas tarefas que não estão concluídas nem já expiradas
      const result = await this.prisma.task.updateMany({
        where: {
          deadline: {
            lt: now.toDate(),  // Deadline já passou
          },
          status: {
            notIn: ['Expired', 'Completed'],  // Não expira tarefas concluídas ou já expiradas
          },
        },
        data: {
          status: 'Expired',
        },
      });

      // Log apenas se houve atualizações
      if (result.count > 0) {
        this.logger.log(`${result.count} tarefa(s) marcada(s) como expirada(s)`);
      }
    } catch (error) {
      this.logger.error('Erro ao atualizar tarefas expiradas:', error);
    }
  }
}