import { HttpException, Injectable } from '@nestjs/common';
import { CreateCoverageDto } from './dto/create-coverage.dto';
import { UpdateCoverageDto } from './dto/update-coverage.dto';
import { Healthcare } from 'src/healthcare/entities/healthcare.entity';
import { Coverage } from './entities/coverage.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/services/entities/service.entity';

@Injectable()
export class CoveragesService {
  constructor(
    @InjectRepository(Healthcare)
    private readonly healthcareRepository: Repository<Healthcare>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Coverage)
    private readonly coverageRepository: Repository<Coverage>,
  ) {}
  async create(createCoverageDto: CreateCoverageDto) {
    const existingHealthcare = await this.healthcareRepository.findOneBy({
      id: createCoverageDto.healthcare.id,
    });
    if (!existingHealthcare.id) {
      throw new HttpException('La obra social no existe', 404);
    }
    const existingService = await this.serviceRepository.findOneBy({
      id: createCoverageDto.service.id,
    });
    if (!existingService.id) {
      throw new HttpException('El servicio no existe', 404);
    }
    const coverage = this.coverageRepository.create({
      ...createCoverageDto,
    });
    coverage.healthcare = existingHealthcare;
    return this.coverageRepository.save(coverage);
  }

  findAll() {
    return `This action returns all coverages`;
  }

  async findAllFromHealthcare(id: string) {
    const healthcare = await this.healthcareRepository.findOneBy({ id: id });
    if (!healthcare.id)
      throw new HttpException('La obra social no existe', 404);
    const coverages = await this.coverageRepository.find({
      where: { healthcare: { id: id } },
      relations: ['service'],
    });
    return { healthcare, coverages };
  }
  findOne(id: number) {
    return `This action returns a #${id} coverage`;
  }

  update(id: number, updateCoverageDto: UpdateCoverageDto) {
    return `This action updates a #${id} coverage`;
  }

  remove(id: number) {
    return `This action removes a #${id} coverage`;
  }
}
