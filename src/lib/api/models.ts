import { config } from '../../config/env';
import { ApiError } from './chat';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${config.apiKey}`,
};

export async function fetchModels(): Promise<string[]> {
  try {
    const response = await fetch(`${config.apiUrl}/models`, { headers });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new ApiError(response.status, error.message || `HTTP error ${response.status}`);
    }
    
    const data = await response.json();
    // Models already come with the hf: prefix, so we return them as is
    return data.data.map((model: { id: string }) => model.id);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch models');
  }
}