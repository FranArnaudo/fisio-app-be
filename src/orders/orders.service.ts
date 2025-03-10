import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Healthcare } from 'src/healthcare/entities/healthcare.entity';
import { Service } from 'src/services/entities/service.entity';
import { Area } from 'src/areas/entities/area.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Healthcare)
    private readonly healthcareRepository: Repository<Healthcare>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      // Find related entities
      const patient = await this.patientRepository.findOneBy({ 
        id: createOrderDto.patient.id 
      });
      if (!patient) {
        throw new NotFoundException(`Patient with ID ${createOrderDto.patient.id} not found`);
      }

      const healthcare = await this.healthcareRepository.findOneBy({ 
        id: createOrderDto.healthcare.id 
      });
      if (!healthcare) {
        throw new NotFoundException(`Healthcare with ID ${createOrderDto.healthcare.id} not found`);
      }

      const service = await this.serviceRepository.findOneBy({ 
        id: createOrderDto.service.id 
      });
      if (!service) {
        throw new NotFoundException(`Service with ID ${createOrderDto.service.id} not found`);
      }

      // Create new order instance
      const newOrder = this.orderRepository.create({
        url: createOrderDto.url,
        notes: createOrderDto.notes,
        status: createOrderDto.status || 'Generada',
        patient,
        healthcare,
        service,
        submittedAt: createOrderDto.submittedAt ? new Date(createOrderDto.submittedAt) : null,
        expiresAt: createOrderDto.expiresAt ? new Date(createOrderDto.expiresAt) : null,
      });

      // Handle optional area
      if (createOrderDto.area) {
        const area = await this.areaRepository.findOneBy({ id: createOrderDto.area.id });
        if (area) {
          newOrder.area = area;
        }
      } else if (service.area) {
        // If area not specified but service has an area, use that
        newOrder.area = service.area;
      }

      // Handle appointments if provided
      if (createOrderDto.appointmentIds && createOrderDto.appointmentIds.length > 0) {
        const appointmentIds = createOrderDto.appointmentIds.map(ref => ref.id);
        const appointments = await this.appointmentRepository.findByIds(appointmentIds);
        newOrder.appointments = appointments;
      }

      return await this.orderRepository.save(newOrder);
    } catch (error) {
      console.error('Error creating order:', error);
      throw new HttpException(
        error.message || 'Hubo un error al crear la orden médica',
        error.status || 400,
      );
    }
  }

  async findAll() {
    return this.orderRepository.find({
      relations: ['appointments'],
    });
  }

  async findAllPaginated({
    page = 1,
    limit = 10,
    sort = 'createdAt',
    order = 'DESC',
    patientId = '',
  }: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'ASC' | 'DESC';
    patientId?: string;
  }) {
    try {
      const queryBuilder = this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.patient', 'patient')
        .leftJoinAndSelect('order.healthcare', 'healthcare')
        .leftJoinAndSelect('order.service', 'service')
        .leftJoinAndSelect('order.area', 'area')
        .leftJoinAndSelect('order.appointments', 'appointments');

      if (patientId) {
        queryBuilder.andWhere('patient.id = :patientId', { patientId });
      }

      queryBuilder
        .orderBy(`order.${sort}`, order)
        .skip((page - 1) * limit)
        .take(limit);

      const [data, total] = await queryBuilder.getManyAndCount();
      
      return {
        data,
        total,
      };
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw new HttpException(
        'Hubo un error al obtener las órdenes médicas',
        400,
      );
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['appointments'],
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }

      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw new HttpException(
        error.message || 'Hubo un error al obtener la orden médica',
        error.status || 400,
      );
    }
  }

  async findByPatient(patientId: string) {
    try {
      return this.orderRepository.find({
        where: {
          patient: { id: patientId },
        },
        relations: ['appointments'],
        order: {
          createdAt: 'DESC',
        },
      });
    } catch (error) {
      console.error('Error fetching patient orders:', error);
      throw new HttpException(
        'Hubo un error al obtener las órdenes médicas del paciente',
        400,
      );
    }
  }
  async findByHealthcare(healthcare: string) {
    try {
      return this.orderRepository.find({
        where: {
          healthcare: { id: healthcare },
        },
        relations: ['appointments'],
        order: {
          createdAt: 'DESC',
        },
      });
    } catch (error) {
      console.error('Error fetching patient orders:', error);
      throw new HttpException(
        'Hubo un error al obtener las órdenes médicas del paciente',
        400,
      );
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.findOne(id);
      
      // Handle standard fields
      if (updateOrderDto.url !== undefined) order.url = updateOrderDto.url;
      if (updateOrderDto.notes !== undefined) order.notes = updateOrderDto.notes;
      if (updateOrderDto.status !== undefined) order.status = updateOrderDto.status;
      if (updateOrderDto.submittedAt !== undefined) {
        order.submittedAt = updateOrderDto.submittedAt ? new Date(updateOrderDto.submittedAt) : null;
      }
      if (updateOrderDto.expiresAt !== undefined) {
        order.expiresAt = updateOrderDto.expiresAt ? new Date(updateOrderDto.expiresAt) : null;
      }

      // Handle relationships
      if (updateOrderDto.patient) {
        const patient = await this.patientRepository.findOneBy({ id: updateOrderDto.patient.id });
        if (!patient) {
          throw new NotFoundException(`Patient with ID ${updateOrderDto.patient.id} not found`);
        }
        order.patient = patient;
      }

      if (updateOrderDto.healthcare) {
        const healthcare = await this.healthcareRepository.findOneBy({ id: updateOrderDto.healthcare.id });
        if (!healthcare) {
          throw new NotFoundException(`Healthcare with ID ${updateOrderDto.healthcare.id} not found`);
        }
        order.healthcare = healthcare;
      }

      if (updateOrderDto.service) {
        const service = await this.serviceRepository.findOneBy({ id: updateOrderDto.service.id });
        if (!service) {
          throw new NotFoundException(`Service with ID ${updateOrderDto.service.id} not found`);
        }
        order.service = service;
      }

      if (updateOrderDto.area) {
        const area = await this.areaRepository.findOneBy({ id: updateOrderDto.area.id });
        if (!area) {
          throw new NotFoundException(`Area with ID ${updateOrderDto.area.id} not found`);
        }
        order.area = area;
      }

      // Handle appointments
      if (updateOrderDto.appointmentIds) {
        const appointmentIds = updateOrderDto.appointmentIds.map(ref => ref.id);
        const appointments = await this.appointmentRepository.findByIds(appointmentIds);
        order.appointments = appointments;
      }

      return await this.orderRepository.save(order);
    } catch (error) {
      console.error('Error updating order:', error);
      throw new HttpException(
        error.message || 'Hubo un error al actualizar la orden médica',
        error.status || 400,
      );
    }
  }

  async remove(id: string) {
    try {
      const order = await this.findOne(id);
      return await this.orderRepository.remove(order);
    } catch (error) {
      console.error('Error removing order:', error);
      throw new HttpException(
        error.message || 'Hubo un error al eliminar la orden médica',
        error.status || 400,
      );
    }
  }

  async bulkSubmit(orderIds: string[], submittedDate: Date) {
    try {
      // Find all orders by their IDs
      const orders = await this.orderRepository.findByIds(orderIds);
      
      if (orders.length === 0) {
        throw new NotFoundException('No se encontraron órdenes con los IDs proporcionados');
      }

      // Update each order status and submitted date
      const updatedOrders = orders.map(order => {
        order.status = 'Presentado';
        order.submittedAt = submittedDate;
        return order;
      });

      // Save all updated orders
      const result = await this.orderRepository.save(updatedOrders);
      
      return {
        updatedCount: result.length,
        updatedOrders: result,
      };
    } catch (error) {
      console.error('Error in bulk submit orders:', error);
      throw new HttpException(
        error.message || 'Hubo un error al actualizar las órdenes médicas',
        error.status || 400,
      );
    }
  }
}