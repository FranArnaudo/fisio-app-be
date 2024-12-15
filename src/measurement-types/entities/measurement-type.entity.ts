import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Area } from '../../areas/entities/area.entity';

@Entity()
export class MeasurementType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  unit: string;

  @Column({ type: 'numeric', nullable: true })
  normal_min_value: number;

  @Column({ type: 'numeric', nullable: true })
  normal_max_value: number;

  @Column({ default: 'numeric' })
  data_type: string; // e.g., 'numeric', 'text', 'jsonb'

  @ManyToOne(() => Area, { nullable: false, onDelete: 'CASCADE' })
  area: Area;
}
