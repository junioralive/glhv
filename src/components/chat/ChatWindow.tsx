import { Message } from '../../types/chat';
import { ChatMessage } from './ChatMessage';

interface ChatWindowProps {
  messages: Message[];
}

export function ChatWindow({ messages }: ChatWindowProps) {
  return (
    <div className="space-y-4 min-h-[400px] max-h-[600px] overflow-y-auto rounded-lg border border-blue-500/30 p-4 backdrop-blur-sm bg-gray-900/30">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">Start a conversation by selecting a model and typing a message.</p>
        </div>
      )}
    </div>
  );
}