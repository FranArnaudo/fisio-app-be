import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsDefined, IsNumber } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsDefined({ message: 'Debe ingresar un nombre para el servicio' })
  @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1))
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number = 0;

  @IsString()
  @IsDefined()
  areaId: string;
}
