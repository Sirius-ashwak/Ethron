import React, { useState, useEffect, useRef } from 'react';
import { Send, Brain, Zap, User, Bot, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  agentName?: string;
  agentAvatar?: string;
  isThinking?: boolean;
}

interface AgentChatProps {
  onClose: () => void;
}

export default function AgentChat({ onClose }: AgentChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: 'Hello! I\'m Mira, your GeoAI analyst. I can help you understand global crisis patterns, predict emerging threats, and suggest intervention strategies. What would you like to know?',
      timestamp: new Date(),
      agentName: 'Mira',
      agentAvatar: '🌍'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isAgentThinking, setIsAgentThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsAgentThinking(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        {
          content: 'Based on current data patterns, I\'m detecting a 73% probability of food security crisis expansion in West Africa within the next 6 weeks. The convergence of drought conditions, supply chain disruptions, and economic instability creates a perfect storm scenario.',
          agentName: 'Mira',
          agentAvatar: '🌍'
        },
        {
          content: 'I recommend immediate deployment of 400kg dry food supplies to the Mogadishu region. My analysis shows this intervention could prevent escalation to critical hunger levels for approximately 2,500 people.',
          agentName: 'Aasha',
          agentAvatar: '🤝'
        },
        {
          content: 'Climate models indicate unusual monsoon patterns in South Asia. Historical correlation analysis suggests 89% likelihood of agricultural disruption if current trends continue. Preventive measures should be implemented within 2 weeks.',
          agentName: 'Nova',
          agentAvatar: '🌡️'
        }
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        content: randomResponse.content,
        timestamp: new Date(),
        agentName: randomResponse.agentName,
        agentAvatar: randomResponse.agentAvatar
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsAgentThinking(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl shadow-2xl border border-white/10 w-full max-w-4xl h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="w-8 h-8 text-purple-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">AI Agent Console</h2>
                <p className="text-sm text-gray-400">Conversational crisis intelligence</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-3xl ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-cyan-500' 
                        : 'bg-gradient-to-br from-purple-500 to-pink-500'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-lg">{message.agentAvatar}</span>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`rounded-2xl p-4 ${
                      message.type === 'user'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white'
                    }`}>
                      {message.type === 'agent' && (
                        <div className="flex items-center space-x-2 mb-2">
                          <Bot className="w-4 h-4 text-purple-400" />
                          <span className="text-sm font-medium text-purple-400">{message.agentName}</span>
                        </div>
                      )}
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Thinking Indicator */}
            {isAgentThinking && (
              <div className="flex justify-start">
                <div className="max-w-3xl">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white animate-pulse" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
                        <span className="text-sm font-medium text-purple-400">AI Agent thinking...</span>
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <div className="p-6 border-t border-white/10">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about global crisis patterns, predictions, or intervention strategies..."
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                rows={2}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                Press Enter to send
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isAgentThinking}
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 mt-3">
            {[
              'Show crisis predictions',
              'Analyze food security',
              'Climate risk assessment',
              'Intervention recommendations'
            ].map((action) => (
              <button
                key={action}
                onClick={() => setInputValue(action)}
                className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-xs text-gray-300 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}