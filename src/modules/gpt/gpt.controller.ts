import { Controller, Get } from '@nestjs/common';

@Controller('api/gpt')
export class GptController {
  @Get()
  test() {
    return 'gpt';
  }
}
