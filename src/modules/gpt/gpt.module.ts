import { Module, MiddlewareConsumer } from '@nestjs/common';
import { GptController } from './gpt.controller';
import { GptService } from './gpt.service';
import { SSEMiddleware } from 'src/middleware/sse.middleware';

@Module({
  controllers: [GptController],
  providers: [GptService]
})
export class GptModule {
  configure(consumer: MiddlewareConsumer) {  
    consumer
      .apply(SSEMiddleware)
      .forRoutes('api/gpt');  
  }
}
