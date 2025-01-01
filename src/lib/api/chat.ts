import { config } from '../../config/env';
import { Message } from '../../types/chat';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${config.apiKey}`,
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function streamCompletion(
  model: string,
  messages: Message[],
  onChunk: (chunk: string) => void
): Promise<void> {
  try {
    const response = await fetch(`${config.apiUrl}/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model, // Remove the prefix handling since models already include it
        messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new ApiError(response.status, error.message || `HTTP error ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error('Stream not available');

    const decoder = new TextDecoder();
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              const content = data.choices?.[0]?.delta?.content || '';
              if (content) onChunk(content);
            } catch (error) {
              console.error('Failed to parse chunk:', error);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
  }
}