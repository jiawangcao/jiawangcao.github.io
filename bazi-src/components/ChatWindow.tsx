import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage } from '../types';

interface ChatWindowProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, onSendMessage, isLoading }) => {
  const [inputText, setInputText] = React.useState('');
  const [currentThinkingIndex, setCurrentThinkingIndex] = React.useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // 思考文字滚动效果
  useEffect(() => {
    const thinkingMsg = messages.find(msg => msg.isThinking);
    if (thinkingMsg && thinkingMsg.thinkingTexts) {
      const interval = setInterval(() => {
        setCurrentThinkingIndex(prev => (prev + 1) % thinkingMsg.thinkingTexts!.length);
      }, 2000); // 每2秒切换一次文字
      return () => clearInterval(interval);
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[800px] bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-slate-950/50 p-4 border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-amber-500 font-serif tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          天機對話 (Destiny Chat)
        </h3>
        <span className="text-xs text-slate-500">Based on 《三命通会》《滴天髓》</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.isThinking ? (
              // 思考中的特殊显示
              <div className="max-w-[85%] md:max-w-[75%] bg-slate-800/80 border border-amber-700/50 rounded-2xl rounded-tl-none p-6 shadow-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></div>
                  </div>
                  <span className="text-amber-400 text-sm font-bold">推演中...</span>
                </div>
                <div className="relative min-h-[2rem] flex items-center transition-all duration-500">
                  {msg.thinkingTexts && (
                    <p className="text-slate-400 text-sm font-serif animate-fade-in leading-relaxed">
                      📖 {msg.thinkingTexts[currentThinkingIndex]}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-2xl p-4 md:p-6 shadow-lg leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-amber-900/30 border border-amber-800/50 text-amber-100 rounded-tr-none'
                    : 'bg-slate-800/80 border border-slate-700 text-slate-200 rounded-tl-none font-serif'
                }`}
              >
                {msg.role === 'user' ? (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                ) : (
                  <div className="prose prose-invert prose-amber prose-sm md:prose-base max-w-none">
                    <ReactMarkdown
                      components={{
                          h1: ({node, ...props}) => <h1 className="text-amber-500 text-xl font-bold border-b border-amber-900/50 pb-2 mb-4" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-amber-400 text-lg font-bold mt-6 mb-3" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-amber-300 text-base font-bold mt-4 mb-2" {...props} />,
                          strong: ({node, ...props}) => <strong className="text-amber-200 font-bold" {...props} />,
                          p: ({node, ...props}) => <p className="mb-3 text-slate-300 leading-7" {...props} />,
                          li: ({node, ...props}) => <li className="text-slate-300 marker:text-amber-700 mb-1" {...props} />,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-slate-800/50 border border-slate-700 rounded-2xl rounded-tl-none p-4 flex items-center space-x-2">
                <div className="w-2 h-2 bg-amber-500/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-amber-500/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-amber-500/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your response... (e.g. Yes, that event happened in 2018)"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 text-slate-200 placeholder-slate-600 transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="bg-amber-700 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-amber-900/20"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};
