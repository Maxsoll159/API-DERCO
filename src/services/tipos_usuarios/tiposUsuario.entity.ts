import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permiso } from '../permisos/permiso.entity';

@Entity({ name: 'tipos_usuario' })
export class TiposUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @OneToMany(() => Permiso, (permiso) => permiso.tiposUsuario, {
    nullable: false,
  })
  @JoinColumn({ name: 'permisos' })
  permisos: Permiso[];
}
