import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],  // Seu módulo de tarefas
  controllers: [AppController],  // O controlador da raiz
  providers: [AppService],
})
export class AppModule {}
