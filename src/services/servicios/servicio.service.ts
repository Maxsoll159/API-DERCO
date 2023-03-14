import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { And, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Servicio } from './servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioService: Repository<Servicio>,
  ) {}

  obtenerFecha() {
    const fechaActual = new Date();

    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1;
    const dia = fechaActual.getDate();

    return `${anio}-${mes < 10 ? 0 : ''}${mes}-${dia}`;
  }

  verificar(servicio: Servicio, fechaActual: string) {
    return this.servicioService.findOne({
      select: {
        asesor: {
          id: true,
          nombres: true,
        },
      },
      relations: {
        asesor: true,
      },
      where: {
        nombres: servicio.nombres,
        placa: servicio.placa,
        fechaRegistro: And(
          MoreThanOrEqual(new Date(`${fechaActual}T00:00:00`)),
          LessThanOrEqual(new Date(`${fechaActual}T23:59:59`)),
        ),
        estado: '1',
      },
    });
  }

  crear(servicio: Servicio): Promise<Servicio> {
    return this.servicioService.save(servicio);
  }

  actualizar(id: number, servicio: Servicio) {
    this.servicioService.update(id, servicio);
  }

  buscarPorEstado(estado: string, fechaActual: string) {
    return this.servicioService.find({
      select: {
        asesor: {
          id: true,
          nombres: true,
        },
      },
      relations: {
        asesor: true,
      },
      where: {
        estado: estado,
        fechaRegistro: And(
          MoreThanOrEqual(new Date(`${fechaActual}T00:00:00`)),
          LessThanOrEqual(new Date(`${fechaActual}T23:59:59`)),
        ),
      },
    });
  }
}
