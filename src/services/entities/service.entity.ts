import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Area } from 'src/areas/entities/area.entity';
import { Coverage } from 'src/coverages/entities/coverage.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => Area, (area) => area.services)
  area: Area;

  @OneToMany(() => Coverage, (coverage) => coverage.service)
  coverages: Coverage[];
}
