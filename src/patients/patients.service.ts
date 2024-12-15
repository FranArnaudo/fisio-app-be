import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    try {
      const patient = this.patientRepository.create(createPatientDto);
      return await this.patientRepository.save(patient);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.patientRepository.find();
  }

  async findAllPaginated({
    page = 1,
    limit = 10,
    sort = 'firstname',
    order = 'ASC',
    name = '',
  }: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'ASC' | 'DESC';
    name?: string;
  }) {
    const queryBuilder = this.patientRepository.createQueryBuilder('patient');

    if (name) {
      queryBuilder.andWhere(
        "CONCAT(patient.firstname, ' ', patient.lastname) ILIKE :name",
        { name: `%${name}%` },
      );
    }

    queryBuilder
      .orderBy(`patient.${sort}`, order)
      .skip((page - 1) * limit)
      .take(limit);

    const response = await queryBuilder.getManyAndCount();
    return {
      data: response[0],
      total: response[1],
    };
  }

  async findOne(id: string) {
    return await this.patientRepository.findOne({ where: { id } });
  }

  async findForDropdown(): Promise<
    { id: string; value: string; text: string }[]
  > {
    const patients = await this.patientRepository.find();
    console.log('🚀Fran ~ file: patients.service.ts:67 ~ patients:', patients);
    return patients.map((patient) => ({
      id: patient.id,
      value: patient.id,
      text: `${patient.firstname} ${patient.lastname}`,
    }));
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    await this.patientRepository.update(id, updatePatientDto);
    return this.patientRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const patient = await this.findOne(id);
    if (!patient) {
      throw new Error(`Patient with ID ${id} not found`);
    }
    return await this.patientRepository.remove(patient);
  }
}
