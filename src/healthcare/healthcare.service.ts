import { HttpException, Injectable } from '@nestjs/common';
import { CreateHealthcareDto } from './dto/create-healthcare.dto';
import { Healthcare } from './entities/healthcare.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HealthcareService {
  constructor(
    @InjectRepository(Healthcare)
    private readonly healthcareRepository: Repository<Healthcare>,
  ) {}
  async create(createHealthcareDto: CreateHealthcareDto) {
    const existingHealthcare = await this.healthcareRepository.findOneBy({
      name: createHealthcareDto.name,
    });
    if (existingHealthcare) {
      throw new HttpException('Ya existe una obra social con ese nombre', 400);
    }
    try {
      const created = this.healthcareRepository.create(createHealthcareDto);
      return this.healthcareRepository.save(created);
    } catch (error) {
      console.error(error);
      throw new HttpException('Hubo un error creando la obra social', 400);
    }
  }

  async findAllPaginated({
    page = 1,
    limit = 10,
    sort = 'name',
    order = 'ASC',
    name = '',
  }: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'ASC' | 'DESC';
    name?: string;
  }) {
    const queryBuilder =
      this.healthcareRepository.createQueryBuilder('healthcare');

    if (name) {
      queryBuilder.andWhere('name ILIKE :name', { name: `%${name}%` });
    }

    queryBuilder
      .orderBy(`healthcare.${sort}`, order)
      .skip((page - 1) * limit)
      .take(limit);

    const response = await queryBuilder.getManyAndCount();
    return {
      data: response[0],
      total: response[1],
    };
  }
  findAll() {
    return `This action returns all healthcare`;
  }

  findOne(id: number) {
    return `This action returns a #${id} healthcare`;
  }

  async toggle(id: string) {
    try {
      const existingHealthcare = await this.healthcareRepository.findOneBy({
        id: id,
      });
      if (!existingHealthcare) {
        throw new HttpException('La obra social no existe', 404);
      }
      this.healthcareRepository.update(existingHealthcare.id, {
        active: !existingHealthcare.active,
      });
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Hubo un error al activar o desactivar la obra social',
        400,
      );
    }
  }

  remove(id: number) {
    return `This action removes a #${id} healthcare`;
  }
}
