import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // Caminho relativo correto

@Module({
  imports: [PrismaModule], // Importe o PrismaModule aqui
  providers: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
