import { Controller, Get } from '@nestjs/common';

@Controller('api/payment')
export class PaymentController {
  @Get()
  test() {
    return 'payment';
  }
}
