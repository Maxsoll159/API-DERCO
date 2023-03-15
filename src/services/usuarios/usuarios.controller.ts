import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsuariosService } from './usuarios.service';

@Controller('Usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get('/tipo/:id')
  async buscarPorTipo(@Param('id') id: number, @Res() response: Response) {
    const listUsuarios = await this.usuariosService.buscarPorTipo(id);

    if (listUsuarios === undefined) {
      return response.status(404).json({
        statusCode: 404,
        message: 'No existen usuario de este tipo',
        error: 'Usuarios No encontrado',
      });
    }

    return response.status(200).json({
      statusCode: 200,
      message: 'Usuarios encontrados',
      data: listUsuarios,
    });
  }
}
