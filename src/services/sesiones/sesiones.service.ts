import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { UtilsService } from '../util/utils.service';
import { Sesion } from './sesion.entity';
@Injectable()
export class SesionesService {
  constructor(
    @InjectRepository(Sesion)
    private readonly sesionRepository: Repository<Sesion>,
    private readonly usuarioService: UsuariosService,
    private readonly utilsService: UtilsService,
  ) {}

  encriptarToken(sesion: Sesion) {
    return this.utilsService.encriptar(sesion);
  }

  desencriptarToken(token: string) {
    return this.utilsService.desencriptar(token);
  }

  validarUsuario(correo: string): Promise<Usuario> {
    return this.usuarioService.validarCorreo(correo);
  }

  iniciar(sesion: Sesion): Promise<Sesion> {
    return this.sesionRepository.save(sesion);
  }
  cerrar(sesion: Sesion): Promise<Sesion> {
    return this.sesionRepository.remove(sesion);
  }
}
