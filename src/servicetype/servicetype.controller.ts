import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServicetypeService } from './servicetype.service';
import { CreateServicetypeDto } from './dto/create-servicetype.dto';
import { UpdateServicetypeDto } from './dto/update-servicetype.dto';

@Controller('servicetype')
export class ServicetypeController {
  constructor(private readonly servicetypeService: ServicetypeService) {}

  @Post()
  create(@Body() createServicetypeDto: CreateServicetypeDto) {
    return this.servicetypeService.create(createServicetypeDto);
  }

  @Get()
  findAll() {
    return this.servicetypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicetypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServicetypeDto: UpdateServicetypeDto) {
    return this.servicetypeService.update(+id, updateServicetypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicetypeService.remove(+id);
  }
}
