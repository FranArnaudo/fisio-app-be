import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
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
    const admin = await this.professionalRepository.findOneBy({email:'francisco.arnaudo.dev@gmail.com'})

    if(! (await bcrypt.compare(createProfessionalDto.adminPassword, admin.password))){
      throw new HttpException('No es posible crear el profesional', 401);
    }
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
