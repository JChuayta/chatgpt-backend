import { Injectable } from '@nestjs/common';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface ChatGptResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}

@Injectable()
export class ChatService {
  async getChatGptResponse(message: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await axios.post<ChatGptResponse>(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const reply = response.data.choices[0].message.content;
    return reply;
  }
}
