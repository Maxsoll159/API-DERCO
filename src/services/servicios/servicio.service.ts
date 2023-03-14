import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  And,
  Equal,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Servicio } from './servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioService: Repository<Servicio>,
  ) {}

  obtenerFecha() {
    const fechaActual = new Date();

    return `${fechaActual.getFullYear()}-${
      fechaActual.getUTCMonth() + 1
    }-${fechaActual.getDate()}`;
  }

  verificar(servicio: Servicio, fechaActual: string) {
    return this.servicioService.find({
      where: {
        nombres: servicio.nombres,
        placa: servicio.placa,
        fechaEntrada: And(
          MoreThanOrEqual(`${fechaActual} 00-00-00`),
          LessThanOrEqual(`${fechaActual} 23-59-59`),
        ),
        estado: '1',
      },
    });
  }

  crear(servicio: Servicio) {
    return this.servicioService.save(servicio);
  }

  actualizar(id: number, servicio: Servicio) {
    this.servicioService.update(id, servicio);
  }

  buscarPorEstado(estado: string, fechaActual: string) {
    return this.servicioService.find({
      relations: {
        asesor: true,
      },
      where: {
        estado: Equal(estado),
        fechaRegistro: And(
          MoreThanOrEqual(`${fechaActual} 00-00-00`),
          LessThanOrEqual(`${fechaActual} 23-59-59`),
        ),
      },
    });
  }
}
