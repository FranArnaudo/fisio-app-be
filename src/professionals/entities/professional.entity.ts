import { Area } from '../../areas/entities/area.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Professional {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  firstname: string;

  @Column({ length: 100 })
  lastname: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 255 })
  password: string; // This will store the hashed password

  @Column({ length: 50, nullable: true })
  phone?: string;

  @Column({ length: 255, nullable: true })
  email?: string;
  
  @Column({ length: 255, nullable: true })
  colorHex?: string;

  @ManyToOne(() => Area, (area) => area.professionals, { nullable: true })
  area?: Area; // Foreign key to the Area entity
}
