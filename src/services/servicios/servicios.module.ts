import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from '../util/utils.module';
import { UtilsService } from '../util/utils.service';
import { Servicio } from './servicio.entity';
import { ServiciosService } from './servicio.service';
import { ServiciosController } from './servicios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Servicio]), UtilsModule],
  providers: [ServiciosService, UtilsService],
  controllers: [ServiciosController],
})
export class ServiciosModule {}
