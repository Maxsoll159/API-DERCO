import {
  Controller,
  Post,
  Get,
  Body,
  Put,
  Param,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Servicio } from './servicio.entity';
import { ServiciosService } from './servicio.service';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post('crear')
  async crear(
    @Body() servicios: Servicio[],
    @Res() response: Response,
    @Req() request: Request,
  ) {
    const data = this.serviciosService.desencriptarToken(
      request.cookies['token-sesion-derco'],
    );

    if (servicios === undefined) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Datos de servicios son vacios o incorrectos',
        error: 'Datos Vacios',
      });
    }

    const responseData = [];

    for (const servicio of servicios) {
      servicio.centro = data.usuario.centro;

      const registrado = await this.serviciosService.verificar(servicio);

      if (registrado === null) {
        const nuevoServicio = await this.serviciosService.crear(servicio);

        responseData.push({
          registradoAnteriormente: false,
          data: nuevoServicio,
        });
      } else {
        responseData.push({
          registradoAnteriormente: true,
          data: registrado,
        });
      }
    }

    return response.status(200).json({
      statusCode: 200,
      message: 'Servicios Creados Correctamente',
      data: responseData,
    });
  }

  @Put('actualizar/:id')
  async actualizar(
    @Param('id') id: number,
    @Body() servicio: Servicio,
    @Res() response: Response,
  ) {
    await this.serviciosService.actualizar(id, servicio);

    response.status(200).json({
      statusCode: 200,
      message: 'Servicio actualizado correctamente',
    });
  }

  @Get('estado/:estado')
  async buscarPorEstado(
    @Param('estado') estado: string,
    @Res() response: Response,
    @Req() request: Request,
  ) {
    const data = this.serviciosService.desencriptarToken(
      request.cookies['token-sesion-derco'],
    );

    const listServicios =
      data.usuario.tipo.id !== 3
        ? await this.serviciosService.buscarPorEstado(
            estado,
            data.usuario.centro,
          )
        : await this.serviciosService.buscarPorEstadoAsesor(
            estado,
            data.usuario.centro,
            data.usuario,
          );

    return response.status(200).json({
      statusCode: 200,
      message: 'Servicios con este estado encontrados',
      data: listServicios,
    });
  }
}
