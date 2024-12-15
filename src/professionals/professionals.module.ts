import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { ProfessionalsService } from './professionals.service';
import { ProfessionalsController } from './professionals.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Professional])],
  controllers: [ProfessionalsController],
  providers: [ProfessionalsService],
  exports: [ProfessionalsService], // Export the TypeOrmModule so it can be used in AuthModule
})
export class ProfessionalsModule {}
