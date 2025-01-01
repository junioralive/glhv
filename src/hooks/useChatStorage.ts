import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Message } from '../types/chat';

const COOKIE_KEY = 'chat_session';

interface StoredSession {
  model: string;
  messages: Message[];
}

export function useChatStorage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedModel, setSelectedModel] = useState('');

  useEffect(() => {
    const savedSession = Cookies.get(COOKIE_KEY);
    if (savedSession) {
      try {
        const { model, messages } = JSON.parse(savedSession) as StoredSession;
        setSelectedModel(model);
        setMessages(messages);
      } catch (error) {
        console.error('Failed to load saved session:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedModel || messages.length > 0) {
      Cookies.set(COOKIE_KEY, JSON.stringify({
        model: selectedModel,
        messages,
      }));
    }
  }, [selectedModel, messages]);

  const clearChat = () => {
    setMessages([]);
    Cookies.remove(COOKIE_KEY);
  };

  return {
    messages,
    setMessages,
    selectedModel,
    setSelectedModel,
    clearChat,
  };
}