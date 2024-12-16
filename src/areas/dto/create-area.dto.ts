import { Transform } from 'class-transformer';
import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateAreaDto {
  @IsString()
  @IsDefined({ message: 'Debe ingresar un nombre para el área' })
  @Transform(({ value }) => value.charAt(0).toUpperCase() + value.slice(1))
  name: string;

  @IsOptional()
  @IsBoolean()
  active: boolean = true;
}
