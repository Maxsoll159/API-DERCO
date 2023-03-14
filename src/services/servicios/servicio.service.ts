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

  verificarServicio(servicio: Servicio, fechaActual: string) {
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

  buscarPorEstado(estado: string, fechaActual: string) {
    return this.servicioService.findBy({
      estado: Equal(estado),
      fechaEntrada: And(
        MoreThanOrEqual(`${fechaActual} 00-00-00`),
        LessThanOrEqual(`${fechaActual} 23-59-59`),
      ),
    });
  }
}
