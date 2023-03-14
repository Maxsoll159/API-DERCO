import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permiso } from '../permisos/permiso.entity';

@Entity({ name: 'tipos_usuario' })
export class TipoUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({
    type: 'char',
    length: 1,
    default: 'A',
  })
  estado: string;

  @OneToMany(() => Permiso, (permiso) => permiso.tiposUsuario, {
    nullable: false,
  })
  @JoinColumn({ name: 'permisos' })
  permisos: Permiso[];

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'fecha_registro',
  })
  fechaRegistro: string;
}
