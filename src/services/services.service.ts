import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Area } from 'src/areas/entities/area.entity';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Area)
    private areaRepository: Repository<Area>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const { areaId, ...serviceData } = createServiceDto;

    // Check if a service with the same name already exists
    const existingService = await this.serviceRepository.findOneBy({
      name: serviceData.name,
    });
    if (existingService) {
      throw new HttpException('Ya existe un servicio con ese nombre', 400);
    }

    try {
      // Find the related Area entity
      const area = await this.areaRepository.findOne({
        where: { id: areaId },
      });

      if (!area) {
        throw new NotFoundException(
          `No se encontró el área con el ID proporcionado: ${areaId}`,
        );
      }

      // Create and save the Service entity
      const createdService = this.serviceRepository.create({
        ...serviceData,
        area,
      });

      return await this.serviceRepository.save(createdService);
    } catch (error) {
      console.error('Error creating service:', error.message);
      throw new HttpException('Hubo un error creando el servicio', 500);
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
    const queryBuilder = this.serviceRepository
      .createQueryBuilder('services')
      .leftJoinAndSelect('services.area', 'area');

    if (name) {
      queryBuilder.andWhere('name ILIKE :name', { name: `%${name}%` });
    }

    queryBuilder
      .orderBy(`services.${sort}`, order)
      .skip((page - 1) * limit)
      .take(limit);

    const response = await queryBuilder.getManyAndCount();
    return {
      data: response[0],
      total: response[1],
    };
  }

  findAll() {
    return this.serviceRepository.find();
  }

  async findForDropdown(id?: string) {
    let services = [];
    if (id) {
      services = await this.serviceRepository
        .createQueryBuilder('service')
        .leftJoin('service.coverages', 'coverage')
        .leftJoin('coverage.healthcare', 'healthcare')
        .where('healthcare.id IS NULL OR healthcare.id != :id', { id })
        .getMany();
    } else {
      services = await this.serviceRepository.find();
    }
    return services.map((service) => ({
      id: service.id,
      text: service.name,
      value: service.id,
    }));
  }
  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
