import { Healthcare } from 'src/healthcare/entities/healthcare.entity';
import { Measurement } from 'src/measurements/entities/measurement.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  dni: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth: Date;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @CreateDateColumn()
  registerDate: Date;

  @OneToMany(() => Measurement, (measurement) => measurement.patient, {
    cascade: true,
  })
  measurements: Measurement[];

  @ManyToMany(() => Healthcare, (healthcare) => healthcare.patients, {
    cascade: false,
  })
  healthcares: Healthcare[];
}
