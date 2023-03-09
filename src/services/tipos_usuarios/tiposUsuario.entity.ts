import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tipos_usuario' })
export class TiposUsuario {
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

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_registro: string;
}
