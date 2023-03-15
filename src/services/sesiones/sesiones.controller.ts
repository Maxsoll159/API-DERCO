import {
  Controller,
  Body,
  Headers,
  Post,
  Get,
  Delete,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DtoCredencialesUsuario } from '../usuarios/dto/dtoCredencialesUsuario';
import { Sesion } from './sesion.entity';
import { SesionesService } from './sesiones.service';

@Controller('sesiones')
export class SesionesController {
  constructor(private readonly sesionesService: SesionesService) {}

  @Post('iniciar')
  async iniciar(
    @Body() dtoCredencialesUsuario: DtoCredencialesUsuario,
    @Headers('X-Forwarded-For') ip: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    let token = request.cookies['token-sesion-derco'];

    if (token !== undefined) {
      return response.status(200).json({
        statuscode: 200,
        message: 'Ya tienes una sesión iniciada',
        data: this.sesionesService.desencriptarToken(token),
      });
    }

    if (
      dtoCredencialesUsuario.correo === undefined ||
      dtoCredencialesUsuario.clave === undefined
    ) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Correo y/o Contraseña estan vacios',
        error: 'Datos Vacios',
      });
    }

    const usuario = await this.sesionesService.validarUsuario(
      dtoCredencialesUsuario.correo,
    );

    if (usuario === null || usuario.clave !== dtoCredencialesUsuario.clave) {
      return response.status(400).json({
        statusCode: 401,
        message: 'Correo y/o Contraseña son incorrectos',
        error: 'Usuario no autorizado',
      });
    }

    const sesion = new Sesion();

    sesion.ip = ip || request.socket.remoteAddress;
    sesion.usuario = usuario;

    const sesionGuardada = await this.sesionesService.iniciar(sesion);

    delete sesionGuardada.usuario.clave;

    token = this.sesionesService.encriptarToken(sesionGuardada);

    if (sesionGuardada === null) {
      return response.status(500).json({
        statusCode: 500,
        message: 'Error interno al intentar iniciar sesión',
        error: 'Error del Servidor',
      });
    }

    response
      .status(200)
      .cookie('token-sesion-derco', token, {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      })
      .json({
        statusCode: 200,
        message: 'Sesion iniciada correctamente',
        data: sesionGuardada,
      });
  }

  @Get('verificar')
  verificar(@Req() request: Request, @Res() response: Response) {
    const token = request.cookies['token-sesion-derco'];

    response.status(200).json({
      statusCode: 200,
      message: 'Sesion ya iniciada',
      data: this.sesionesService.desencriptarToken(token),
    });
  }

  @Delete('cerrar')
  cerrar(@Req() request: Request, @Res() response: Response) {
    const token = request.cookies['token-sesion-derco'];
    const data = this.sesionesService.desencriptarToken(token);

    const resultCerrar = this.sesionesService.cerrar(data);

    if (resultCerrar === null) {
      return response.status(500).json({
        statusCode: 500,
        message: 'Error interno al intentar cerrar sesión',
        error: 'Error del Servidor',
      });
    }

    response
      .clearCookie('token-sesion-derco', {
        sameSite: 'none',
        secure: true,
        httpOnly: true,
      })
      .status(200)
      .json({
        statusCode: 200,
        message: 'Sesion cerrada correctamente',
      });
  }
}
