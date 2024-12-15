import { Injectable } from '@nestjs/common';
import { CreateServicetypeDto } from './dto/create-servicetype.dto';
import { UpdateServicetypeDto } from './dto/update-servicetype.dto';

@Injectable()
export class ServicetypeService {
  create(createServicetypeDto: CreateServicetypeDto) {
    return 'This action adds a new servicetype';
  }

  findAll() {
    return `This action returns all servicetype`;
  }

  findOne(id: number) {
    return `This action returns a #${id} servicetype`;
  }

  update(id: number, updateServicetypeDto: UpdateServicetypeDto) {
    return `This action updates a #${id} servicetype`;
  }

  remove(id: number) {
    return `This action removes a #${id} servicetype`;
  }
}
