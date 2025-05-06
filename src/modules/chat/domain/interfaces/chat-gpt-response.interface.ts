export interface ChatGptResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}
