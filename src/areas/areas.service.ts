import { HttpException, Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from './entities/area.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
  ) {}
  async create(createHealthcareDto: CreateAreaDto) {
    const existingHealthcare = await this.areaRepository.findOneBy({
      name: createHealthcareDto.name,
    });
    if (existingHealthcare) {
      throw new HttpException('Ya existe un área con ese nombre', 400);
    }
    try {
      const created = this.areaRepository.create(createHealthcareDto);
      return this.areaRepository.save(created);
    } catch (error) {
      console.error(error);
      throw new HttpException('Hubo un error creando el área', 400);
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
    const queryBuilder = this.areaRepository.createQueryBuilder('areas');

    if (name) {
      queryBuilder.andWhere('name ILIKE :name', { name: `%${name}%` });
    }

    queryBuilder
      .orderBy(`areas.${sort}`, order)
      .skip((page - 1) * limit)
      .take(limit);

    const response = await queryBuilder.getManyAndCount();
    return {
      data: response[0],
      total: response[1],
    };
  }
  findAll() {
    return `This action returns all areas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} area`;
  }

  remove(id: number) {
    return `This action removes a #${id} area`;
  }
}
