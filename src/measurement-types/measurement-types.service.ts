import { Injectable } from '@nestjs/common';
import { CreateMeasurementTypeDto } from './dto/create-measurement-type.dto';
import { UpdateMeasurementTypeDto } from './dto/update-measurement-type.dto';

@Injectable()
export class MeasurementTypesService {
  create(createMeasurementTypeDto: CreateMeasurementTypeDto) {
    return 'This action adds a new measurementType';
  }

  findAll() {
    return `This action returns all measurementTypes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} measurementType`;
  }

  update(id: number, updateMeasurementTypeDto: UpdateMeasurementTypeDto) {
    return `This action updates a #${id} measurementType`;
  }

  remove(id: number) {
    return `This action removes a #${id} measurementType`;
  }
}
