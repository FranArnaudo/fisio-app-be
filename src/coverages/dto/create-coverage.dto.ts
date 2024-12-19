import { Transform } from 'class-transformer';
import { IsNumber, IsDefined } from 'class-validator';

export class CreateCoverageDto {
  @IsDefined({ message: 'Debe ingresar el ID de servicio' })
  @Transform(({ value }) => ({ id: value }))
  service: { id: string };

  @IsDefined({ message: 'Debe ingresar el ID de obra social' })
  @Transform(({ value }) => ({ id: value }))
  healthcare: { id: string };

  @IsDefined({ message: 'Debe ingresar el monto' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  amount: number;

  @IsDefined({ message: 'Debe ingresar el copago' })
  @IsNumber({}, { message: 'El copago debe ser un número' })
  copay: number;
}
