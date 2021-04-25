import { DynamicModule, Module } from '@nestjs/common';
import { AstraService } from './astra.service';
import { AstraConfigOptions } from './interfaces/astra-config.interface';
import { CONFIG_OPTIONS } from './constants';

@Module({})
export class AstraModule {
  static forRoot(options: AstraConfigOptions): DynamicModule {
    return {
      module: AstraModule,
      providers: [{ provide: CONFIG_OPTIONS, useValue: options }, AstraService],
      exports: [AstraService],
    };
  }
}
