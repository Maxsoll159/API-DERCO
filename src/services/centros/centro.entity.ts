import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'centros' })
export class Centro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'char', length: 4 })
  codigo: string;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  texto: string;

  @Column({ type: 'varchar' })
  distrito: string;

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
