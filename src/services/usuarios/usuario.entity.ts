import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Centro } from '../centros/centro.entity';
import { TiposUsuario } from '../tipos_usuarios/tiposUsuario.entity';

@Entity({ name: 'usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombres: string;

  @Column({ type: 'varchar' })
  apellidos: string;

  @Column({ type: 'varchar', unique: true })
  correo: string;

  @Column({ type: 'varchar' })
  clave: string;

  @Column({ type: 'char', length: 8, unique: true })
  dni: string;

  @ManyToOne(() => TiposUsuario, (tiposUsuario) => tiposUsuario.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'tipo' })
  tipo: TiposUsuario;

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
    name: 'fecha_registro',
  })
  fechaRegistro: Date;
}
