import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professional } from './entities/professional.entity';
import { CreateProfessionalDto } from './dto/create-professional.dto';

@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
  ) {}

  async create(
    createProfessionalDto: CreateProfessionalDto,
  ): Promise<Professional> {
    const professional = this.professionalRepository.create(
      createProfessionalDto,
    );
    return await this.professionalRepository.save(professional);
  }

  async findForDropdown(): Promise<
    { id: string; value: string; text: string }[]
  > {
    const professionals = await this.professionalRepository.find();
    return professionals.map((professional) => ({
      id: professional.id,
      value: professional.id,
      text: `${professional.firstname} ${professional.lastname}`,
    }));
  }
  async findByUsername(username: string): Promise<Professional> {
    return await this.professionalRepository.findOne({
      where: { username },
      relations: ['area'],
    });
  }
}
