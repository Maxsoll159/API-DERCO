import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Centro } from '../centros/centro.entity';
import { Permiso } from '../permisos/permiso.entity';
import { TiposUsuario } from '../tipos_usuarios/tiposUsuario.entity';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombres: string;

  @Column({ type: 'varchar' })
  apellidos: string;

  @Column({ type: 'varchar' })
  correo: string;

  @Column({ type: 'varchar' })
  clave: string;

  @Column({ type: 'char', length: 8 })
  dni: string;

  @ManyToOne(() => TiposUsuario, (tiposUsuario) => tiposUsuario.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipo' })
  tipo: TiposUsuario;

  @OneToMany(() => Permiso, (permiso) => permiso.tiposUsuario, {
    nullable: false,
  })
  @JoinColumn({ name: 'permisos' })
  permisos: Permiso[];

  @ManyToOne(() => Centro, (centro) => centro.id, { nullable: false })
  @JoinColumn({ name: 'centro' })
  centro: Centro;

  @Column({
    type: 'char',
    length: 1,
    default: 'A',
  })
  estado: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_registro: string;
}
