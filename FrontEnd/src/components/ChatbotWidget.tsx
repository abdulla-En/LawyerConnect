import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Minimize2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

interface ChatbotWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatbotWidget({ isOpen, onClose }: ChatbotWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI legal assistant. How can I help you today?",
      isUser: false
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      isUser: true
    };

    const responses = [
      "I understand your legal concern. Let me help you find the right solution.",
      "That's a great question. Based on legal best practices, here's what you should know...",
      "I can help you with that. Our experienced lawyers specialize in this area.",
      "Let me provide you with some guidance on this matter. Have you considered...",
      "This is an important legal issue. I recommend consulting with one of our specialized lawyers for detailed advice."
    ];

    const botMessage = {
      id: messages.length + 2,
      text: responses[Math.floor(Math.random() * responses.length)],
      isUser: false
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white">AI Legal Assistant</h3>
              <p className="text-xs text-blue-200">Online • Ready to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <Minimize2 className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[400px] overflow-y-auto p-5 bg-[#FAFAFA]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
                  message.isUser
                    ? 'bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] text-white rounded-tr-sm'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-5 py-3 bg-white border-t border-gray-100">
          <div className="flex gap-2 mb-3 overflow-x-auto">
            <button
              onClick={() => setInput('What are my rights as an employee?')}
              className="px-3 py-1.5 bg-[#F5F5F5] hover:bg-gray-200 rounded-full text-xs text-gray-700 whitespace-nowrap transition-colors"
            >
              Employment Rights
            </button>
            <button
              onClick={() => setInput('How do I start a business?')}
              className="px-3 py-1.5 bg-[#F5F5F5] hover:bg-gray-200 rounded-full text-xs text-gray-700 whitespace-nowrap transition-colors"
            >
              Start a Business
            </button>
            <button
              onClick={() => setInput('What is a contract?')}
              className="px-3 py-1.5 bg-[#F5F5F5] hover:bg-gray-200 rounded-full text-xs text-gray-700 whitespace-nowrap transition-colors"
            >
              Contracts
            </button>
          </div>

          {/* Input */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              className="flex-1 px-4 py-3 bg-[#F5F5F5] rounded-full outline-none focus:ring-2 focus:ring-[#1A2A6C]/30 transition-all text-sm placeholder-gray-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                input.trim()
                  ? 'bg-gradient-to-r from-[#1A2A6C] to-[#2B3E8C] hover:shadow-md'
                  : 'bg-gray-200'
              }`}
            >
              <Send className={`w-4 h-4 ${input.trim() ? 'text-white' : 'text-gray-400'}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
