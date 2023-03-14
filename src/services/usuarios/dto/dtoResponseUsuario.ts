import { Centro } from 'src/services/centros/centro.entity';
import { Modulo } from 'src/services/modulos/modulo.entity';
import { TipoUsuario } from 'src/services/tipos_usuarios/tiposUsuario.entity';

export class DtpResponseUsuario {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  dni: string;
  tipo: TipoUsuario;
  permisos: Modulo[];
  centro: Centro;
}
