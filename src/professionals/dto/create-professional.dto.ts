import { IsString, IsOptional, IsEmail, IsUUID } from 'class-validator';

export class CreateProfessionalDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsUUID()
  areaId?: string; // Foreign key to Area
}
