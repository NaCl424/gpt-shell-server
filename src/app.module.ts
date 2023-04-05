import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/modules/user/user.module';
import { GptModule } from 'src/modules/gpt/gpt.module';
import { PaymentModule } from 'src/modules/payment/payment.module';

import config from './config';
const { mongodb: { host, port, username, password, database } } = config;

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${username}:${password}@${host}:${port}/${database}`
    ),
    UserModule,
    GptModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
