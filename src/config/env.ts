export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'https://glhf.chat/api/openai/v1',
  apiKey: import.meta.env.VITE_API_KEY || '',
} as const;

// Validate environment variables
if (!config.apiKey) {
  console.error('VITE_API_KEY is not set in .env file');
}