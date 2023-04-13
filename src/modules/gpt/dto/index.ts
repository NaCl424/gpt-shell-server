export class GPTChatCompletionsDTO {
  model: string;
  messages: any[];
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string | any[];
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: any;
  user?: string;
}
