import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Coverage } from 'src/coverages/entities/coverage.entity';

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

  @OneToMany(() => Coverage, (coverage) => coverage.healthcare)
  coverages: Coverage[];
}
