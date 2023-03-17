import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  And,
  FindOptionsWhere,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Centro } from '../centros/centro.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { UtilsService } from '../util/utils.service';
import { Servicio } from './servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private readonly servicioService: Repository<Servicio>,
    private readonly utilsService: UtilsService,
  ) {}

  desencriptarToken(token: string) {
    return this.utilsService.desencriptar(token);
  }

  obtenerFechaActual() {
    return this.utilsService.obtenerFechaActual();
  }

  verificar(servicio: Servicio) {
    const fechaActual = this.obtenerFechaActual();

    return this.servicioService.findOne({
      select: {
        asesor: {
          id: true,
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
        centro: {
          id: servicio.centro.id,
        },
      },
    });
  }

  crear(servicio: Servicio): Promise<Servicio> {
    return this.servicioService.save(servicio);
  }

  actualizar(id: number, servicio: Servicio) {
    return this.servicioService.update(id, servicio);
  }

  buscarPorEstado(estado: string, centro: Centro) {
    const fechaActual = this.obtenerFechaActual();

    return this.servicioService.find({
      select: {
        asesor: {
          id: true,
        },
      },
      relations: {
        asesor: true,
      },
      where: {
        estado: estado,
        centro: {
          id: centro.id,
        },
        fechaRegistro: And(
          MoreThanOrEqual(new Date(`${fechaActual}T00:00:00`)),
          LessThanOrEqual(new Date(`${fechaActual}T23:59:59`)),
        ),
      },
    });
  }

  buscarPorEstadoAsesor(estado: string, centro: Centro, asesor: Usuario) {
    const fechaActual = this.obtenerFechaActual();

    return this.servicioService.find({
      select: {
        asesor: {
          id: true,
        },
      },
      relations: {
        asesor: true,
      },
      where: {
        estado: estado,
        centro: {
          id: centro.id,
        },
        fechaRegistro: And(
          MoreThanOrEqual(new Date(`${fechaActual}T00:00:00`)),
          LessThanOrEqual(new Date(`${fechaActual}T23:59:59`)),
        ),
        asesor: {
          id: asesor.id,
        },
      },
    });
  }
}
