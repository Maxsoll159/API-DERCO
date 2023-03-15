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
}
