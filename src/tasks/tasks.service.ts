import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  @Cron('*/2 * * * * *')
  holaCadaSegundo() {
    console.log('verificando servicios pasados');
  }
}
