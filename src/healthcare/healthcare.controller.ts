import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HealthcareService } from './healthcare.service';
import { CreateHealthcareDto } from './dto/create-healthcare.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('healthcare')
export class HealthcareController {
  constructor(private readonly healthcareService: HealthcareService) {}

  @Post()
  create(@Body() createHealthcareDto: CreateHealthcareDto) {
    return this.healthcareService.create(createHealthcareDto);
  }
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string,
    @Query('order') order: 'ASC' | 'DESC',
    @Query('name') name: string,
  ) {
    if (page || limit || sort || name || order) {
      return this.healthcareService.findAllPaginated({
        page,
        limit,
        sort,
        name,
        order,
      });
    } else {
      return this.healthcareService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthcareService.findOne(id);
  }

  @Patch(':id/toggle')
  update(@Param('id') id: string) {
    return this.healthcareService.toggle(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthcareService.remove(+id);
  }
}
