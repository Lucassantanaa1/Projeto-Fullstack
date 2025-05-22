import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';  // Importa o PrismaService

@Module({
  providers: [PrismaService],
  exports: [PrismaService],  // Expondo o PrismaService para ser usado em outros módulos
})
export class PrismaModule {}
