import { Injectable } from '@nestjs/common';
// import { Configuration, OpenAIApi, CreateCompletionResponse } from 'openai';
import axios from 'axios';
import { GPTChatCompletionsDTO } from './dto';
import { SSEResponse } from 'src/middleware/sse.middleware';

const OpenAIKey = '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';

@Injectable()
export class GptService {
  async chatCompletions(params: GPTChatCompletionsDTO, response: SSEResponse) {
    axios.request({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OpenAIKey}`
      },
      data: {
        ...params,
        "stream": true,
      },
      responseType: 'stream',
      proxy: {
        protocol: 'http',
        host: '127.0.0.1',
        port: 7890
      }
    })
    .then(res => {
      res.data.on('data', data => {
        response.sse(data);
        const lines = data.toString().split('\n').filter(line => line.trim() !== '');
        for (const line of lines) {
            const message = line.replace(/^data: /, '');
            if (message === '[DONE]') {
                // Stream finished
                console.log('Stream DONE');
                setTimeout(() => {
                  response.end();  
                }, 200);
                return;
            }
            try {
                const parsed = JSON.parse(message);
                console.log(parsed.choices[0].delta?.content || '');
            } catch(error) {
                console.error('Could not JSON parse stream message', message, error);
                response.end();
            }
        }
      });
    })
    .catch(error => {
      response.write(`An error occurred during OpenAI request', ${error.message}`);
      response.end();
    });
  }
}
