import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
