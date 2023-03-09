import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Sesion } from './sesion.entity';
import { SesionesController } from './sesiones.controller';
import { SesionesService } from './sesiones.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sesion]), UsuariosModule],
  providers: [SesionesService, UsuariosService],
  controllers: [SesionesController],
  exports: [TypeOrmModule],
})
export class SesionesModule {}
