import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { SesionesService } from './services/sesiones/sesiones.service';

@Injectable()
export class AppSesionMiddleware implements NestMiddleware {
  constructor(private readonly sesionesService: SesionesService) {}

  use(request: Request, response: Response, next: NextFunction) {
    const token = request.cookies['token-sesion-derco'];
    const ip =
      request.header('x-forwarded-for') ||
      request.socket.remoteAddress ||
      request.ip;

    if (token === undefined) {
      return response.status(401).json({
        statusCode: 401,
        message: 'No has iniciado sesión',
      });
    }

    const sesion = this.sesionesService.desencriptar(token);

    if (sesion.ip !== ip) {
      return response
        .status(401)
        .clearCookie('token-sesion-derco', {
          sameSite: 'none',
          secure: true,
          httpOnly: true,
        })
        .json({
          statusCode: 401,
          message: 'La sesion es incorrecta , inicie de nuevo',
        });
    }

    const verificarPermiso = sesion.usuario.tipo.permisos.find((permiso) => {
      console.log(permiso);
      return permiso.modulo.url === request.url;
    });

    if (verificarPermiso === undefined) {
      return response.status(403).json({
        statusCode: 403,
        message: 'Usuario no autorizado',
      });
    }

    return next();
  }
}
