import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MeasurementTypesService } from './measurement-types.service';
import { CreateMeasurementTypeDto } from './dto/create-measurement-type.dto';
import { UpdateMeasurementTypeDto } from './dto/update-measurement-type.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('measurement-types')
export class MeasurementTypesController {
  constructor(private readonly measurementTypesService: MeasurementTypesService) {}

  @Post()
  create(@Body() createMeasurementTypeDto: CreateMeasurementTypeDto) {
    return this.measurementTypesService.create(createMeasurementTypeDto);
  }

  @Get()
  findAll() {
    return this.measurementTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.measurementTypesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeasurementTypeDto: UpdateMeasurementTypeDto) {
    return this.measurementTypesService.update(+id, updateMeasurementTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.measurementTypesService.remove(+id);
  }
}
