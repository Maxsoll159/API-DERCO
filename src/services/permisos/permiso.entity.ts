import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Modulo } from '../modulos/modulo.entity';
import { TipoUsuario } from '../tipos_usuarios/tiposUsuario.entity';

@Entity({ name: 'permisos' })
export class Permiso {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Modulo, (modulo) => modulo.id, { nullable: false })
  @JoinColumn({ name: 'modulo' })
  modulo: Modulo;

  @ManyToOne(() => TipoUsuario, (tiposUsuario) => tiposUsuario.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipos_usuario' })
  tiposUsuario: TipoUsuario;

  @Column({
    type: 'char',
    length: 1,
    default: 'A',
  })
  estado: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'fecha_registro',
  })
  fechaRegistro: string;
}
