import { Patient } from 'src/patients/entities/patient.entity';
import { Professional } from 'src/professionals/entities/professional.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient, { eager: true }) // Eager loading ensures the patient is always included
  patient: Patient;

  @ManyToOne(() => Professional, { eager: true }) // Eager loading ensures the professional is always included
  professional: Professional;

  @Column({ type: 'timestamp' })
  appointmentDatetime: Date;

  @Column({ type: 'varchar', length: 20 })
  status: string; // e.g., "scheduled", "completed", "canceled"

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date; // Automatically set when the entity is created

  @Column({ type: 'integer' })
  duration: number;
}
