import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { MeasurementType } from '../../measurement-types/entities/measurement-type.entity';
import { Patient } from '../../patients/entities/patient.entity';

@Entity()
export class Measurement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient, (patient) => patient.measurements, {
    nullable: false, // Ensures a patient is always linked
    onDelete: 'CASCADE', // Automatically deletes measurements if a patient is deleted
  })
  patient: Patient;

  @ManyToOne(() => MeasurementType, { nullable: false, onDelete: 'CASCADE' })
  measurementType: MeasurementType;

  @Column({ type: 'numeric', nullable: true })
  measurement_value: number; // Numeric measurement values

  @Column({ nullable: true })
  measurement_value_text: string; // Text-based measurement values

  @Column({ type: 'jsonb', nullable: true })
  measurement_data: Record<string, any>; // Complex data (e.g., JSON)

  @CreateDateColumn()
  measurement_time: Date;
}
