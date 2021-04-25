import { Injectable } from '@nestjs/common';
import { AstraService } from './astra/astra.service';

@Injectable()
export class AppService {
  constructor(private readonly astra: AstraService) {}
  async getHello() {
    return await this.astra.get('test');
  }
}
