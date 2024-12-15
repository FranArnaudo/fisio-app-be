import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Servicetype } from '../../servicetype/entities/servicetype.entity';
import { Area } from '../../areas/entities/area.entity';
import { Healthcare } from '../../healthcare/entities/healthcare.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Servicetype, (servicetype) => servicetype.services)
  servicetype: Servicetype;

  @ManyToOne(() => Area, (area) => area.services)
  area: Area;

  @ManyToOne(() => Healthcare, (healthcare) => healthcare.services)
  healthcare: Healthcare;

  @Column('numeric')
  price: number;

  @Column('numeric')
  copay: number;
}
