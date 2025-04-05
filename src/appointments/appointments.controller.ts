import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    try {
      return this.appointmentsService.create(createAppointmentDto);
    } catch (error) {
      console.log(error);
      throw new HttpException('Hubo un error creando el turno', 400);
    }
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get('calendar')
  findForCalendar(@Query('start') start: string, @Query('end') end: string) {
    return this.appointmentsService.findForCalendar(start, end);
  }

  @Get('patient/:id')
  findByPatient(@Param('id') id: string){
    return this.appointmentsService.findByPatient(id);
  }

  @Get('professional/:id')
  findByProfessional(@Param('id') id: string){
    return this.appointmentsService.findByProfessional(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}