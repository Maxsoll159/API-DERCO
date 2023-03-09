import { Centro } from 'src/services/centros/centro.entity';
import { Modulo } from 'src/services/modulos/modulo.entity';
import { TiposUsuario } from 'src/services/tipos_usuarios/tiposUsuario.entity';

export class DtpResponseUsuario {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  dni: string;
  tipo: TiposUsuario;
  permisos: Modulo[];
  centro: Centro;
}
