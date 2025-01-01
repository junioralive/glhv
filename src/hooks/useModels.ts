import { useState, useEffect } from 'react';
import { fetchModels } from '../lib/api';

export function useModels() {
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    fetchModels().then(setModels).catch(console.error);
  }, []);

  return models;
}