import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthcareDto } from './create-healthcare.dto';

export class UpdateHealthcareDto extends PartialType(CreateHealthcareDto) {}
