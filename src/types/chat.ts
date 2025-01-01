export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatSession {
  id: string;
  model: string;
  messages: Message[];
  createdAt: string;
}

export interface Model {
  id: string;
  name: string;
}