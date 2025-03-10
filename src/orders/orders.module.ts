import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import { Healthcare } from 'src/healthcare/entities/healthcare.entity';
import { Service } from 'src/services/entities/service.entity';
import { Area } from 'src/areas/entities/area.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Patient,
      Healthcare,
      Service,
      Area,
      Appointment,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}