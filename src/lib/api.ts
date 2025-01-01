import { config } from '../config/env';
import { Message } from '../types/chat';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${config.apiKey}`,
};

export async function fetchModels(): Promise<string[]> {
  const response = await fetch(`${config.apiUrl}/models`, { headers });
  if (!response.ok) throw new Error('Failed to fetch models');
  const data = await response.json();
  return data.data.map((model: { id: string }) => `${model.id}`);
}

export async function streamCompletion(
  model: string,
  messages: Message[],
  onChunk: (chunk: string) => void
) {
  const response = await fetch(`${config.apiUrl}/chat/completions`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model,
      messages,
      stream: true,
    }),
  });

  if (!response.ok) throw new Error('Failed to generate response');
  
  const reader = response.body?.getReader();
  if (!reader) throw new Error('Stream not available');

  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = decoder.decode(value);
    const lines = chunk.split('\n').filter(line => line.trim() !== '');
    
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = JSON.parse(line.slice(6));
        const content = data.choices[0]?.delta?.content || '';
        if (content) onChunk(content);
      }
    }
  }
}