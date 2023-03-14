import { Centro } from './services/centros/centro.entity';
import { Modulo } from './services/modulos/modulo.entity';
import { Permiso } from './services/permisos/permiso.entity';
import { Servicio } from './services/servicios/servicio.entity';
import { Sesion } from './services/sesiones/sesion.entity';
import { TipoUsuario } from './services/tipos_usuarios/tiposUsuario.entity';
import { Usuario } from './services/usuarios/usuario.entity';

export const AppConfig = () => ({
  port: parseInt(process.env.PORT) || 3000,
  cors: process.env.SV_CORS === 'true',
  keyTokenIv: Buffer.from(process.env.SV_KEY_TOKEN_IV, 'hex'),
  keyTokenPassword: Buffer.from(process.env.SV_KEY_TOKEN_PASSWORD, 'hex'),
  database: {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    entities: [Modulo, Permiso, Servicio, TipoUsuario, Centro, Usuario, Sesion],
    migrations: ['/db/migrations'],
    migrationsTableName: 'migrations',
    synchronize: true,
  },
});
