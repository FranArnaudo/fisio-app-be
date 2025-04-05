import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Professional } from './entities/professional.entity';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';

@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
  ) {}

  async create(
    createProfessionalDto: CreateProfessionalDto,
  ): Promise<Professional> {
    try {
      // Check if username is already taken
      const existingUser = await this.professionalRepository.findOne({
        where: { username: createProfessionalDto.username }
      });
      
      if (existingUser) {
        throw new HttpException('El nombre de usuario ya está en uso', 400);
      }
      
      // Hash the password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createProfessionalDto.password, salt);
      
      // Create professional with hashed password
      const professional = this.professionalRepository.create({
        ...createProfessionalDto,
        password: hashedPassword,
      });
      
      // Verify admin password
      const admin = await this.professionalRepository.findOneBy({email:'francisco.arnaudo.dev@gmail.com'})
      if(!admin || !(await bcrypt.compare(createProfessionalDto.adminPassword, admin.password))){
        throw new HttpException('No es posible crear el profesional. Contraseña de administrador inválida.', 401);
      }
      
      return await this.professionalRepository.save(professional);
    } catch (error) {
      // Pass through HttpExceptions
      if (error instanceof HttpException) {
        throw error;
      }
      // Otherwise create a general error
      throw new HttpException('Error al crear el profesional', 500);
    }
  }

  async findAll(): Promise<Professional[]> {
    try {
      return await this.professionalRepository.find({
        relations: ['area'],
      });
    } catch (error) {
      throw new HttpException('Error al obtener los profesionales', 500);
    }
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
    try {
      const queryBuilder = this.professionalRepository
        .createQueryBuilder('professional')
        .leftJoinAndSelect('professional.area', 'area')
        .where('professional.deleted = false');

      if (name) {
        queryBuilder.andWhere(
          "CONCAT(professional.firstname, ' ', professional.lastname) ILIKE :name",
          { name: `%${name}%` },
        );
      }

      // Ensure the sort field exists on the entity
      const validSortFields = ['firstname', 'lastname', 'username', 'email', 'phone'];
      const sortField = validSortFields.includes(sort) ? sort : 'firstname';

      queryBuilder
        .orderBy(`professional.${sortField}`, order)
        .skip((page - 1) * limit)
        .take(limit);

      const response = await queryBuilder.getManyAndCount();
      
      return {
        data: response[0],
        total: response[1],
      };
    } catch (error) {
      console.error('Error in findAllPaginated:', error);
      throw new HttpException('Error al obtener los profesionales', 500);
    }
  }

  async findForDropdown(): Promise<
    { id: string; value: string; text: string }[]
  > {
    try {
      const professionals = await this.professionalRepository.find({where:{deleted: false}});
      return professionals.map((professional) => ({
        id: professional.id,
        value: professional.id,
        text: `${professional.firstname} ${professional.lastname}`,
      }));
    } catch (error) {
      throw new HttpException('Error al obtener el listado de profesionales', 500);
    }
  }

  async findOne(id: string): Promise<Professional> {
    try {
      const professional = await this.professionalRepository.findOne({
        where: { id },
        relations: ['area'],
      });
      
      if (!professional) {
        throw new HttpException('Profesional no encontrado', 404);
      }
      
      return professional;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al obtener el profesional', 500);
    }
  }

  async findByUsername(username: string): Promise<Professional> {
    try {
      const professional = await this.professionalRepository.findOne({
        where: { username },
        relations: ['area'],
      });
      
      if (!professional) {
        throw new HttpException('Profesional no encontrado', 404);
      }
      
      return professional;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al obtener el profesional', 500);
    }
  }

  async update(id: string, updateProfessionalDto: UpdateProfessionalDto): Promise<Professional> {
    try {
      const professional = await this.findOne(id);
      
      // Handle password update separately to hash it
      if (updateProfessionalDto.password) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(updateProfessionalDto.password, salt);
        updateProfessionalDto.password = hashedPassword;
      }
      
      // Remove adminPassword if it exists in the DTO as we don't need to update it
      if ('adminPassword' in updateProfessionalDto) {
        delete updateProfessionalDto.adminPassword;
      }
      
      await this.professionalRepository.update(id, updateProfessionalDto);
      return this.findOne(id);
    } catch (error) {
      console.log("🚀 ~ ProfessionalsService ~ update ~ error:", error)
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al actualizar el profesional', 500);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    try {
      const result = await this.professionalRepository.update({id},{deleted:true});
      
      if (result.affected === 0) {
        throw new HttpException('Profesional no encontrado', 404);
      }
      
      return { message: 'Profesional eliminado con éxito' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException('Error al eliminar el profesional', 500);
    }
  }
}