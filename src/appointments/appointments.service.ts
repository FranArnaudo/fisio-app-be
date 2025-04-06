import { HttpException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Between, Repository } from 'typeorm';
// appointments.service.ts
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('America/Argentina/Buenos_Aires');
@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    try {
      // Ensure the appointment datetime is interpreted in Argentina timezone
      const appointmentDate = dayjs.tz(createAppointmentDto.appointmentDatetime, 'America/Argentina/Buenos_Aires').toDate();
      
      const newAppointment = this.appointmentRepository.create({
        ...createAppointmentDto,
        appointmentDatetime: appointmentDate,
      });
      
      return this.appointmentRepository.save(newAppointment);
    } catch (error) {
      console.log(error);
      throw new HttpException('Hubo un error creando el turno', 400);
    }
  }
  

  findAll() {
    try {
      return this.appointmentRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException('Hubo un error buscando los turnos', 400);
    }
  }

  async findForCalendar(start: string, end: string) {
    try {
      const appointments = await this.appointmentRepository.find({
        where: {
          appointmentDatetime: Between(
            new Date(start),
            new Date(dayjs(end).add(1, 'd').subtract(1, 'm').toISOString()),
          ),
        },
      });
   
      const mappedAppointments = await Promise.all(
        appointments.map((appointment) => ({
          id: appointment.id,
          start: new Date(appointment.appointmentDatetime),
          end: new Date(
            dayjs(appointment.appointmentDatetime)
              .add(appointment.duration, 'm')
              .toISOString(),
          ),
          title: `${appointment.patient.firstname} ${appointment.patient.lastname} - ${appointment.professional.firstname} ${appointment.professional.lastname}`,
          resource: appointment,
        })),
      );
      return mappedAppointments;
    } catch (error) {
      console.log(error);
      throw new HttpException('Hubo un error buscando los turnos', 400);
    }
  }

  async findByPatient(patientId: string): Promise<Appointment[]> {
    try {
      return this.appointmentRepository.find({
        where: {
          patient: {
            id: patientId,
          },
        },
        order: {
          appointmentDatetime: 'DESC', 
        },
      });
    } catch (error) {
      throw new HttpException('Hubo un error buscando los turnos del paciente', 400);
    }
  }

  async findByProfessional(professionalId: string): Promise<Appointment[]> {
    try {
      return this.appointmentRepository.find({
        where: {
          professional: {
            id: professionalId,
          },
        },
        order: {
          appointmentDatetime: 'DESC',
        },
        relations: ['patient', 'professional'],
      });
    } catch (error) {
      console.error('Error finding appointments by professional:', error);
      throw new HttpException('Hubo un error buscando los turnos del profesional', 400);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    try {
      const updatedAppointment = this.appointmentRepository.update(
        id,
        updateAppointmentDto,
      );
      return updatedAppointment;
    } catch (error) {
      console.log(error);
      throw new HttpException('Hubo al actualizar el turno', 400);
    }
  }

  remove(id: string) {
    try {
      const deletedAppointment = this.appointmentRepository.delete(
        id,
      );
      return deletedAppointment;
    } catch (error) {
      console.log(error);
      throw new HttpException('Hubo un error al eliminar el turno', 400);
    }
  }
}