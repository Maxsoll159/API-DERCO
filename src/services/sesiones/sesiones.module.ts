import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { UsuariosService } from '../usuarios/usuarios.service';
import { UtilsModule } from '../util/utils.module';
import { UtilsService } from '../util/utils.service';
import { Sesion } from './sesion.entity';
import { SesionesController } from './sesiones.controller';
import { SesionesService } from './sesiones.service';

@Module({
  imports: [UtilsModule, TypeOrmModule.forFeature([Sesion]), UsuariosModule],
  providers: [SesionesService, UsuariosService, UtilsService],
  controllers: [SesionesController],
  exports: [TypeOrmModule],
})
export class SesionesModule {}
