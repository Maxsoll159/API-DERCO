import { Controller, Post, Get, Body, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Servicio } from './servicio.entity';
import { ServiciosService } from './servicio.service';

@Controller('servicios')
export class ServiciosController {
  constructor(private readonly serviciosService: ServiciosService) {}

  @Post('crear')
  async crear(@Body() servicios: Servicio[], @Res() response: Response) {
    if (servicios === undefined) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Datos de servicios son vacios o incorrectos',
        error: 'Datos Vacios',
      });
    }

    const fechaActual = this.serviciosService.obtenerFecha();

    const responseData = [];

    for (const servicio of servicios) {
      const registrado = await this.serviciosService.verificarServicio(
        servicio,
        fechaActual,
      );

      console.log(registrado.length);

      if (registrado.length === 0) {
        await this.serviciosService.crear(servicio);

        responseData.push({
          registradoAnteriormente: false,
          data: servicio,
        });
      } else {
        responseData.push({
          registradoAnteriormente: true,
          data: servicio,
        });
      }
    }

    return response.status(200).json({
      statusCode: 200,
      message: 'Datos Creados Correctamente',
      data: responseData,
    });
  }

  @Get('estado/:estado')
  async buscarPorEstado(
    @Param('estado') estado: string,
    @Res() response: Response,
  ) {
    const fechaActual = this.serviciosService.obtenerFecha();

    const listServicios = await this.serviciosService.buscarPorEstado(
      estado,
      fechaActual,
    );

    if (listServicios === undefined) {
      return response.status(404).json({
        statusCode: 404,
        message: 'servicios con este estado no encontrados',
        error: 'Servicios No encontrados',
      });
    }

    return response.status(200).json({
      statusCode: 200,
      message: 'Servicios con este estado encontrados',
      data: listServicios,
    });
  }
}
