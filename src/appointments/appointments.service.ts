import { HttpException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Between, Repository } from 'typeorm';
import * as dayjs from 'dayjs';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}
  create(createAppointmentDto: CreateAppointmentDto) {
    let created;
    try {
      const newAppointment =
        this.appointmentRepository.create(createAppointmentDto);
      created = this.appointmentRepository.save(newAppointment);
    } catch (error) {
      console.log(error);
      throw new HttpException('Hubo un error creando el turno', 400);
    }
    return created;
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
      console.log(
        '🚀Fran ~ file: appointments.service.ts:47 ~ findForCalendar ~ appointments:',
        appointments,
      );
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
