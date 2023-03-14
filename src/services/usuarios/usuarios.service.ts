import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  validarCorreo(correo: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      relations: {
        centro: true,
        tipo: {
          permisos: {
            modulo: true,
          },
        },
      },
      where: {
        correo: correo,
        estado: 'A',
      },
    });
  }

  buscarPorTipo(tipoUsuario: number): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      select: {
        id: true,
        nombres: true,
      },
      where: {
        tipo: Equal(tipoUsuario),
      },
    });
  }

  buscarPorId(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOneBy({
      id: id,
    });
  }
}
