import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv } from 'crypto';
import { Sesion } from '../sesiones/sesion.entity';

@Injectable()
export class UtilsService {
  constructor(private readonly configService: ConfigService) {}

  encriptar(sesion: Sesion) {
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

  obtenerFechaActual() {
    const fechaActual = new Date();

    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate();

    return `${anio}-${mes < 10 ? 0 : ''}${mes}-${dia}`;
  }
}
