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
  @JoinColumn({ name: 'tipos_usuario' })
  tiposUsuario: TiposUsuario;
}
