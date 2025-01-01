import { Container } from './components/layout/Container';
import { ChatHeader } from './components/chat/ChatHeader';
import { ChatWindow } from './components/chat/ChatWindow';
import { ChatInput } from './components/chat/ChatInput';
import { useChat } from './hooks/useChat';
import { useModels } from './hooks/useModels';

function App() {
  const models = useModels();
  const { messages, selectedModel, isLoading, setSelectedModel, sendMessage, clearChat } = useChat();

  return (
    <Container>
      <div className="space-y-8">
        <ChatHeader
          models={models}
          selectedModel={selectedModel}
          onModelSelect={setSelectedModel}
          onClearChat={clearChat}
        />
        <ChatWindow messages={messages} />
        <ChatInput onSend={sendMessage} disabled={!selectedModel || isLoading} />
      </div>
    </Container>
  );
}

export default App;