import { Inject, Injectable } from '@nestjs/common';
import { AstraConfigOptions } from './interfaces/astra-config.interface';
import { createClient } from '@astrajs/collections';
import { ConfigService } from '@nestjs/config';
import { CONFIG_OPTIONS } from './constants';

@Injectable()
export class AstraService {
  private configObject;
  private collection;
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: AstraConfigOptions,
    private readonly config: ConfigService,
  ) {
    // async () => {
    if (this.config.get('STARGATE_URL')) {
      this.configObject = {
        baseUrl: config.get('STARGATE_URL'),
        baseApiPath: this.config.get('STARGATE_BASE_API_PATH'),
        authToken: this.config.get('ASTRA_DB_APPLICATION_TOKEN'),
      };
    } else {
      this.configObject = {
        astraDatabaseId: this.config.get('ASTRA_DB_ID'),
        astraDatabaseRegion: this.config.get('ASTRA_DB_REGION'),
        applicationToken: this.config.get('ASTRA_DB_APPLICATION_TOKEN'),
      };
    }
  }

  private async prepareCollection() {
    console.log(this.configObject);
    const client = await createClient(this.configObject);
    console.log(client);
    // this.collection = client
    //   .namespace(this.options.namespace)
    //   .collection(this.options.collection);
  }

  public async get(id: string) {
    await this.prepareCollection();
    return await this.collection.get(id);
  }

  public async create(object: any) {
    try {
      await this.prepareCollection();
      return await this.collection.create('test', { ...object });
    } catch (e) {
      console.log(e);
    }
  }
}
