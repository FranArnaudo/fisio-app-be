import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// import { UpdateProfessionalDto } from './dto/update-professional.dto';

@UseGuards(JwtAuthGuard)
@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Post()
  create(@Body() createProfessionalDto: CreateProfessionalDto) {
    return this.professionalsService.create(createProfessionalDto);
  }

  @Get('dropdown')
  findForDropdown() {
    return this.professionalsService.findForDropdown();
  }
  // @Get()
  // findAll() {
  //   return this.professionalsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.professionalsService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProfessionalDto: UpdateProfessionalDto) {
  //   return this.professionalsService.update(id, updateProfessionalDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.professionalsService.remove(+id);
  // }
}
