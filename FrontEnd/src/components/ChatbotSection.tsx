import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

export function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI legal assistant. How can I help you today?",
      isUser: false
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      isUser: true
    };

    const botMessage = {
      id: messages.length + 2,
      text: "I understand your legal concern. Let me help you find the right solution. Our experienced lawyers can provide detailed consultation on this matter.",
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

  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F5F5F5] rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-[#5A4FFF]" />
          <span className="text-sm text-gray-600">AI-Powered Legal Consultation</span>
        </div>
        <h1 className="text-4xl mb-3 text-gray-900">Get Instant Legal Advice</h1>
        <p className="text-gray-500">Ask any legal question and get guidance from our AI assistant</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-[400px] overflow-y-auto p-6 bg-[#FAFAFA]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                  message.isUser
                    ? 'bg-gradient-to-r from-[#5A4FFF] to-[#7C64FF] text-white'
                    : 'bg-white text-gray-800 border border-gray-100'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your legal question..."
              className="flex-1 px-4 py-3 bg-[#F5F5F5] rounded-full outline-none focus:ring-2 focus:ring-[#5A4FFF]/30 transition-all text-gray-900 placeholder-gray-400"
            />
            <button
              onClick={handleSend}
              className="w-12 h-12 bg-gradient-to-r from-[#5A4FFF] to-[#7C64FF] rounded-full flex items-center justify-center hover:shadow-lg transition-all"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
