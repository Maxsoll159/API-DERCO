import { DtpResponseUsuario } from 'src/services/usuarios/dto/dtoResponseUsuario';

export class DtoResponseSesion {
  id: number;
  ip: string;
  usuario: DtpResponseUsuario;
}
