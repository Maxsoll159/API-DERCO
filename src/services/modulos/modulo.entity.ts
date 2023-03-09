import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'modulos' })
export class Modulo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombre: string;

  @Column({ type: 'varchar' })
  url: string;

  @Column({ type: 'varchar' })
  icono: string;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fecha_registro: string;
}
