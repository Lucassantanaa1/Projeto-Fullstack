import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';  // Importa o PrismaClient

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();  // Chama o construtor da classe PrismaClient
  }
}
