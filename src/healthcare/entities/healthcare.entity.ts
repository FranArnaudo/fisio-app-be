import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Service } from 'src/service/entities/service.entity';

@Entity()
export class Healthcare {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('numeric', { array: true })
  sessionPriceByArea: number[];

  @Column('numeric', { array: true })
  copayByArea: number[];

  @Column('boolean', { default: true })
  active: boolean;

  @ManyToMany(() => Patient, (patient) => patient.healthcares, {
    onDelete: 'NO ACTION',
  })
  patients: Patient[];

  @OneToMany(() => Service, (service) => service.healthcare)
  services: Service[];
}
