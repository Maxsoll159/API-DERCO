import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';

@Entity({ name: 'servicios' })
export class Servicio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombres: string;

  @Column({ type: 'char', length: 6 })
  placa: string;

  @Column({ type: 'varchar', name: 'vehiculo_kilometraje', nullable: true })
  vehiculoKilometraje: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'asesor' })
  asesor: Usuario;

  @Column({
    type: 'char',
    length: 1,
  })
  estado: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'fecha_entrada',
  })
  fechaEntrada: string;
}