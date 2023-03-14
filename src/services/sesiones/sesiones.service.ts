import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { createCipheriv, createDecipheriv } from 'crypto';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Sesion } from './sesion.entity';
@Injectable()
export class SesionesService {
  constructor(
    @InjectRepository(Sesion)
    private readonly sesionRepository: Repository<Sesion>,
    private readonly usuarioService: UsuariosService,
    private readonly configService: ConfigService,
  ) {}

  encriptarToken(sesion: Sesion) {
    const cipher = createCipheriv(
      'aes-256-ctr',
      this.configService.get('keyTokenPassword'),
      this.configService.get('keyTokenIv'),
    );

    const tokenBuffer = Buffer.concat([
      cipher.update(JSON.stringify(sesion)),
      cipher.final(),
    ]);

    return tokenBuffer.toString('base64');
  }

  desencriptar(token: string): Sesion {
    const decipher = createDecipheriv(
      'aes-256-ctr',
      this.configService.get('keyTokenPassword'),
      this.configService.get('keyTokenIv'),
    );

    const datosDesencriptado = Buffer.concat([
      decipher.update(Buffer.from(token, 'base64')),
      decipher.final(),
    ]).toString();

    return JSON.parse(datosDesencriptado);
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
