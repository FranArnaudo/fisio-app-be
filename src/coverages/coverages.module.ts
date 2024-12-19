import { Module } from '@nestjs/common';
import { CoveragesService } from './coverages.service';
import { CoveragesController } from './coverages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coverage } from './entities/coverage.entity';
import { Healthcare } from 'src/healthcare/entities/healthcare.entity';
import { Service } from 'src/services/entities/service.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coverage]),
    TypeOrmModule.forFeature([Healthcare]),
    TypeOrmModule.forFeature([Service]),
  ],
  controllers: [CoveragesController],
  providers: [CoveragesService],
})
export class CoveragesModule {}
