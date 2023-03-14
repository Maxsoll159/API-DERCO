import { Controller, Post, Get, Body, Put, Param, Res } from '@nestjs/common';
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
      const registrado = await this.serviciosService.verificar(
        servicio,
        fechaActual,
      );

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
      message: 'Datos Creados Correctamente',
      data: responseData,
    });
  }

  @Put('actualizar/:id')
  actualizar(@Param('id') id: number, @Body() servicio: Servicio) {
    return this.serviciosService.actualizar(id, servicio);
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

    return response.status(200).json({
      statusCode: 200,
      message: 'Servicios con este estado encontrados',
      data: listServicios,
    });
  }
}
