import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

@Injectable()
export class ChatService {
  async getChatGptResponse(message: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;

    const openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: apiKey,
    });

    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'deepseek-chat',
    });
    // const response = await axios.post<ChatGptResponse>(
    //   // 'https://api.openai.com/v1/chat/completions',
    //   {
    //     model: 'deepseek-chat',
    //     messages: [{ role: 'user', content: message }],
    //     stream: false,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${apiKey}`,
    //       'Content-Type': 'application/json',
    //     },
    //   },
    // );

    const reply = response.choices[0].message.content;
    return reply as string;
  }
}
