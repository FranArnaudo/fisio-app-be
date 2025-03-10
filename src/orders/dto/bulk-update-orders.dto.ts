import { IsArray, IsDateString, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderId {
  @IsString()
  id: string;
}

export class BulkUpdateOrdersDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderId)
  orderIds: OrderId[];

  @IsDateString()
  submittedAt: string;
}