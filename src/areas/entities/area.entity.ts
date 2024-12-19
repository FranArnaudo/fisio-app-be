import { Professional } from 'src/professionals/entities/professional.entity';
import { Service } from 'src/services/entities/service.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  active: boolean;

  @OneToMany(() => Professional, (professional) => professional.area)
  professionals: Professional[];

  @OneToMany(() => Service, (service) => service.area)
  services: Service[];
}
