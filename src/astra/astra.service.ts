import { Inject, Injectable } from '@nestjs/common';
import { AstraConfigOptions } from './interfaces/astra-config.interface';
import { createClient } from '@astrajs/collections';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AstraService {
  constructor(
    @Inject('CONFIG_OPTIONS') private readonly options: AstraConfigOptions,
    private readonly config: ConfigService,
  ) {}

  private async createCollection(options: AstraConfigOptions) {
    const client = await createClient({
      astraDatabaseId: this.config.get('ASTRA_DB_ID'),
      astraDatabaseRegion: this.config.get('ASTRA_DB_REGION'),
      applicationToken: this.config.get('ASTRA_DB_APPLICATION_TOKEN'),
      baseUrl: options.baseUrl,
    });
    return client.namespace(options.namespace).collection(options.collection);
  }

  public async get(value: string) {
    const collection = await this.createCollection(this.options);
    return await collection.get(value);
  }

  public async post(object: any) {
    const collection = await this.createCollection(this.options);
    return await collection.create(object);
  }
}
