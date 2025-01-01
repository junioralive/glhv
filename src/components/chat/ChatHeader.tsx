import { Trash2 } from 'lucide-react';
import { ModelSelect } from './ModelSelect';

interface ChatHeaderProps {
  models: string[];
  selectedModel: string;
  onModelSelect: (model: string) => void;
  onClearChat: () => void;
}

export function ChatHeader({ 
  models, 
  selectedModel, 
  onModelSelect, 
  onClearChat 
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1 max-w-xs">
        <ModelSelect
          models={models}
          selectedModel={selectedModel}
          onModelSelect={onModelSelect}
        />
      </div>
      <button
        onClick={onClearChat}
        className="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-colors"
        aria-label="Clear chat"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}