import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from './app.config';
import { AppSesionMiddleware } from './app.middleware';
import { DatabaseConfig } from './db/db.config';
import { ServiciosModule } from './services/servicios/servicios.module';
import { SesionesModule } from './services/sesiones/sesiones.module';
import { SesionesService } from './services/sesiones/sesiones.service';
import { UsuariosModule } from './services/usuarios/usuarios.module';
import { UsuariosService } from './services/usuarios/usuarios.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    ScheduleModule.forRoot(),
    SesionesModule,
    UsuariosModule,
    ServiciosModule,
    TasksModule,
  ],
  providers: [SesionesService, UsuariosService],
  controllers: [],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppSesionMiddleware)
      .exclude({
        path: '/sesiones/iniciar',
        method: RequestMethod.POST,
      })
      .forRoutes('/*');
  }
}
