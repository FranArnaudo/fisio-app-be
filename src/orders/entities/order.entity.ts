import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    ManyToMany, 
    JoinTable,
    CreateDateColumn 
  } from 'typeorm';
  import { Patient } from 'src/patients/entities/patient.entity';
  import { Healthcare } from 'src/healthcare/entities/healthcare.entity';
  import { Appointment } from 'src/appointments/entities/appointment.entity';
  import { Service } from 'src/services/entities/service.entity';
  import { Area } from 'src/areas/entities/area.entity';
  
  @Entity()
  export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ nullable: true })
    url: string;
  
    @Column({ type: 'text', nullable: true })
    notes: string;
  
    @Column({ type: 'varchar', length: 50, default: 'Generada' })
    status: string; // 'Generada', 'Presentado', 'Expired'
    
    @Column({ type: 'date', nullable: true })
    submittedAt: Date;
  
    @ManyToOne(() => Patient, { eager: true })
    patient: Patient;
  
    @ManyToOne(() => Healthcare, { eager: true })
    healthcare: Healthcare;
  
    @ManyToOne(() => Service, { eager: true })
    service: Service;
  
    @ManyToOne(() => Area, { eager: true, nullable: true })
    area: Area;
  
    @ManyToMany(() => Appointment)
    @JoinTable()
    appointments: Appointment[];
  
    @CreateDateColumn()
    createdAt: Date;
  
    @Column({ type: 'date', nullable: true })
    expiresAt: Date;
  }