// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // Criar uma nova tarefa
  async create(dto: CreateTaskDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title: dto.title,
        status: 'pendente', // Status padrão
      },
    });
  }

  // Buscar todas as tarefas
  async findAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  // Buscar uma tarefa específica por ID
  async findOne(id: number): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }

    return task;
  }

  // Atualizar uma tarefa existente
  async update(id: number, dto: UpdateTaskDto): Promise<Task> {
    await this.findOne(id); // Garante que a tarefa existe antes de tentar atualizar

    return this.prisma.task.update({
      where: { id },
      data: dto,
    });
  }

  // Remover uma tarefa
  async remove(id: number): Promise<void> {
    await this.findOne(id); // Verifica se a tarefa existe antes de deletar

    await this.prisma.task.delete({
      where: { id },
    });
  }
}
