import { Module } from '@nestjs/common';
import { ServicetypeService } from './servicetype.service';
import { ServicetypeController } from './servicetype.controller';

@Module({
  controllers: [ServicetypeController],
  providers: [ServicetypeService],
})
export class ServicetypeModule {}
