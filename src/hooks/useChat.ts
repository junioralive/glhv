import { useState } from 'react';
import { Message } from '../types/chat';
import { streamCompletion } from '../lib/api';
import { useChatStorage } from './useChatStorage';
import { useErrorHandler } from './useErrorHandler';

export function useChat() {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setMessages, selectedModel, setSelectedModel, clearChat } = useChatStorage();
  const { handleError } = useErrorHandler();

  const sendMessage = async (content: string) => {
    if (!selectedModel) return;
  
    const newMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);
  
    let assistantMessageContent = '';
    try {
      await streamCompletion(
        selectedModel,
        [...messages, newMessage],
        (chunk) => {
          assistantMessageContent += chunk;
  
          setMessages((prev) => {
            // Ensure only the latest assistant message is updated
            const updatedMessages = [...prev];
            if (updatedMessages.length === 0 || updatedMessages[updatedMessages.length - 1].role !== 'assistant') {
              updatedMessages.push({ role: 'assistant', content: assistantMessageContent });
            } else {
              updatedMessages[updatedMessages.length - 1].content = assistantMessageContent;
            }
            return updatedMessages;
          });
        }
      );
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return {
    messages,
    selectedModel,
    isLoading,
    setSelectedModel,
    sendMessage,
    clearChat,
  };
}
