import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AstraModule } from './astra/astra.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AstraModule.forRoot({
      collection: 'users',
      namespace: 'eddiehub',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
