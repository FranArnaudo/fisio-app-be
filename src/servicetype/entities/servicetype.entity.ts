import { Service } from 'src/service/entities/service.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Servicetype {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: number;

  @OneToMany(() => Service, (service) => service.servicetype)
  services: Service[];
}
