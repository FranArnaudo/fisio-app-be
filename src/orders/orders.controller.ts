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
  HttpException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { BulkUpdateOrdersDto } from './dto/bulk-update-orders.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
    
  @Post('bulk-submit')
  bulkSubmit(@Body() bulkUpdateOrdersDto: BulkUpdateOrdersDto) {
    try {
      const orderIds = bulkUpdateOrdersDto.orderIds.map(order => order.id);
      const submittedDate = new Date(bulkUpdateOrdersDto.submittedAt);
      
      return this.ordersService.bulkSubmit(orderIds, submittedDate);
    } catch (error) {
      console.error(error);
      throw new HttpException('Hubo un error al presentar las órdenes médicas', 400);
    }
  }
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return this.ordersService.create(createOrderDto);
    } catch (error) {
      console.error(error);
      throw new HttpException('Hubo un error al crear la orden médica', 400);
    }
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sort') sort: string = 'createdAt',
    @Query('order') order: 'ASC' | 'DESC' = 'DESC',
    @Query('patientId') patientId: string,
  ) {
    if (page || limit || sort || patientId || order) {
      return this.ordersService.findAllPaginated({
        page,
        limit,
        sort,
        order,
        patientId,
      });
    } else {
      return this.ordersService.findAll();
    }
  }

  @Get('patient/:id')
  findByPatient(@Param('id') id: string) {
    return this.ordersService.findByPatient(id);
  }

  @Get('healthcare/:id')
  findByHealthcare(@Param('id') id: string) {
    return this.ordersService.findByHealthcare(id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }

}