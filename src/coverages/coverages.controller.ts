import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CoveragesService } from './coverages.service';
import { CreateCoverageDto } from './dto/create-coverage.dto';
import { UpdateCoverageDto } from './dto/update-coverage.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('coverages')
export class CoveragesController {
  constructor(private readonly coveragesService: CoveragesService) {}

  @Post()
  create(@Body() createCoverageDto: CreateCoverageDto) {
    return this.coveragesService.create(createCoverageDto);
  }

  @Get()
  findAll() {
    return this.coveragesService.findAll();
  }

  @Get('/healthcare/:id')
  findAllFromHealthcare(@Param('id') id: string) {
    return this.coveragesService.findAllFromHealthcare(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCoverageDto: UpdateCoverageDto,
  ) {
    return this.coveragesService.update(+id, updateCoverageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coveragesService.remove(+id);
  }
}
