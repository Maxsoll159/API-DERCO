import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Modulo } from '../modulos/modulo.entity';
import { TiposUsuario } from '../tipos_usuarios/tiposUsuario.entity';

@Entity({ name: 'permisos' })
export class Permiso {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Modulo, (modulo) => modulo.id, { nullable: false })
  @JoinColumn({ name: 'modulo' })
  modulo: Modulo;

  @ManyToOne(() => TiposUsuario, (tiposUsuario) => tiposUsuario.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipo_usuario' })
  tiposUsuario: TiposUsuario;

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
