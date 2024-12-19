import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Healthcare } from '../../healthcare/entities/healthcare.entity';
import { Service } from 'src/services/entities/service.entity';

@Entity()
export class Coverage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Service, (service) => service.coverages)
  service: Service;

  @ManyToOne(() => Healthcare, (healthcare) => healthcare.coverages)
  healthcare: Healthcare;

  @Column('numeric')
  amount: number;

  @Column('numeric')
  copay: number;
}
