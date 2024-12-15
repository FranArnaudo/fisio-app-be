import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HealthcareService } from './healthcare.service';
import { CreateHealthcareDto } from './dto/create-healthcare.dto';
import { UpdateHealthcareDto } from './dto/update-healthcare.dto';

@Controller('healthcare')
export class HealthcareController {
  constructor(private readonly healthcareService: HealthcareService) {}

  @Post()
  create(@Body() createHealthcareDto: CreateHealthcareDto) {
    return this.healthcareService.create(createHealthcareDto);
  }

  @Get()
  findAll() {
    return this.healthcareService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthcareService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHealthcareDto: UpdateHealthcareDto) {
    return this.healthcareService.update(+id, updateHealthcareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthcareService.remove(+id);
  }
}
