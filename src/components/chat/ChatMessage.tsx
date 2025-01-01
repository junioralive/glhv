import { Bot, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Message } from '../../types/chat';
import ReactMarkdown from 'react-markdown';

interface ExtraProps {
  inline?: boolean;
}

interface CodeProps extends React.HTMLAttributes<HTMLElement>, ExtraProps {}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';

  return (
    <div
      className={cn(
        'flex gap-4 p-4 rounded-lg',
        isBot ? 'bg-blue-950/30' : 'bg-gray-900/50'
      )}
    >
      <div className="flex-shrink-0">
        {isBot ? (
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-medium text-gray-200">
          {isBot ? 'Assistant' : 'You'}
        </p>
        <div className="prose prose-invert max-w-none text-white"> {/* Ensures all text is white */}
          <ReactMarkdown
            components={{
              code: ({ inline, children, ...props }: CodeProps) => (
                <code
                  className={cn(
                    'bg-gray-800 text-gray-100 px-1.5 py-0.5 rounded',
                    { 'block p-2': !inline }
                  )}
                  {...props}
                >
                  {children}
                </code>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
