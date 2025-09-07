// src/tasks/dto/update-task.dto.ts
import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum TaskStatus {
  PENDENTE = 'pendente',
  FEITO = 'feito',
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
