// src/tasks/dto/create-task.dto.ts
import { IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;
}
