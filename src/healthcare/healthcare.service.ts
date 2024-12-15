import { Injectable } from '@nestjs/common';
import { CreateHealthcareDto } from './dto/create-healthcare.dto';
import { UpdateHealthcareDto } from './dto/update-healthcare.dto';

@Injectable()
export class HealthcareService {
  create(createHealthcareDto: CreateHealthcareDto) {
    return 'This action adds a new healthcare';
  }

  findAll() {
    return `This action returns all healthcare`;
  }

  findOne(id: number) {
    return `This action returns a #${id} healthcare`;
  }

  update(id: number, updateHealthcareDto: UpdateHealthcareDto) {
    return `This action updates a #${id} healthcare`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthcare`;
  }
}
