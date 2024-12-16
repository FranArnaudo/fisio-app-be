import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Service } from 'src/service/entities/service.entity';

@Entity()
export class Healthcare {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('boolean', { default: true })
  active: boolean;

  @OneToMany(() => Patient, (patient) => patient.healthcares, {
    onDelete: 'NO ACTION',
  })
  patients: Patient[];

  @OneToMany(() => Service, (service) => service.healthcare)
  services: Service[];
}
