import { Controller, Body, Post, Inject, Res } from '@nestjs/common';
import { GptService } from './gpt.service';
import { GPTChatCompletionsDTO } from './dto';
import { SSEResponse } from 'src/middleware/sse.middleware';

@Controller('api/gpt')
export class GptController {
  @Inject()
  private readonly gptService: GptService;

  @Post('chat/completions')
  async chatCompletions(
    @Body() params: GPTChatCompletionsDTO,
    @Res() res: SSEResponse
  ) {
    return this.gptService.chatCompletions(params, res);
  }
}
