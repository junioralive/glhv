import { ChevronDown } from 'lucide-react';

interface ModelSelectProps {
  models: string[];
  selectedModel: string;
  onModelSelect: (model: string) => void;
}

export function ModelSelect({ models, selectedModel, onModelSelect }: ModelSelectProps) {
  return (
    <div className="relative">
      <select
        value={selectedModel}
        onChange={(e) => onModelSelect(e.target.value)}
        className="w-full appearance-none bg-gray-900/50 border border-blue-500/30 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
      >
        <option value="">Select a model</option>
        {models.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}