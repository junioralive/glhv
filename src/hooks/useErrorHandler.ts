import { useCallback } from 'react';
import { ApiError } from '../lib/api/chat';

export function useErrorHandler() {
  const handleError = useCallback((error: unknown) => {
    if (error instanceof ApiError) {
      console.error(`API Error (${error.status}):`, error.message);
    } else {
      console.error('Error:', error instanceof Error ? error.message : 'Unknown error');
    }
  }, []);

  return { handleError };
}