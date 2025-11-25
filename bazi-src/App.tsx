import React, { useState } from 'react';
import { Chat } from "@google/genai";
import { UserInput, Gender, CalculationResult, LoadingState, ChatMessage } from './types';
import { calculateBaziData, createDestinyChat, sendChatMessageWithRetry } from './services/geminiService';
import { BaziDisplay } from './components/BaziDisplay';
import { ChatWindow } from './components/ChatWindow';
import { LoadingScreen } from './components/LoadingScreen';
import { sanitizeUserInput, validateInput } from './utils/security';

// UI Components
const InputField = ({ label, children }: { label: string, children?: React.ReactNode }) => (
  <div className="flex flex-col space-y-2">
    <label className="text-amber-500/80 text-sm font-bold tracking-wide uppercase">{label}</label>
    {children}
  </div>
);

const App: React.FC = () => {
  const [input, setInput] = useState<UserInput>({
    name: '',
    birthYear: '1995',
    birthMonth: '06',
    birthDay: '15',
    birthTime: '12:00',
    birthPlace: 'Beijing, China',
    gender: Gender.MALE,
  });

  // State for the 2-step process
  const [baziResult, setBaziResult] = useState<CalculationResult | null>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [loading, setLoading] = useState<LoadingState>({ isLoading: false, message: '' });
  // 新增状态：用于控制聊天输入框的锁定，但不触发全屏加载
  const [isChatting, setIsChatting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof UserInput, value: string) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBaziResult(null);
    setChatSession(null);
    setMessages([]);
    setError(null);

    // Step 1: Calculate Bazi (Instant Local Calculation now)
    try {
      setLoading({ isLoading: true, message: '正在进行精密排盘... Calculating Chart...' });

      // 1. Get Technical Data (Now Synchronous/Instant)
      const data = await calculateBaziData(input);
      setBaziResult(data);

      // Delay slightly just for visual transition, then start AI
      setTimeout(async () => {
        try {
          setLoading({ isLoading: true, message: '大师推演中... Consulting the Oracles...' });

          // 2. Initialize Chat
          const { chat, initialMessage } = createDestinyChat(input, data);
          setChatSession(chat);

          // 3. Send Initial Message (The detailed prompt) - with retry
          const response = await sendChatMessageWithRetry(chat, initialMessage);
          const responseText = response.text || "Thinking...";

          // Add the Model's first response to the visible chat
          setMessages([
            {
              id: Date.now().toString(),
              role: 'model',
              content: responseText
            }
          ]);
          setLoading({ isLoading: false, message: '' });
        } catch (aiErr: any) {
          setError(aiErr.message || "AI Analysis Failed.");
          setLoading({ isLoading: false, message: '' });
        }
      }, 800);

    } catch (err: any) {
      setError(err.message || "Unknown error occurred during calculation.");
      setLoading({ isLoading: false, message: '' });
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!chatSession) return;

    // 第一步：验证输入
    if (!validateInput(text)) {
      setError("输入内容无效或包含不允许的内容，请重新输入。");
      setTimeout(() => setError(null), 3000);
      return;
    }

    // 第二步：清理用户输入，防止 prompt injection
    const sanitizedText = sanitizeUserInput(text);
    if (sanitizedText.trim().length === 0) {
      setError("输入内容无效，请重新输入。");
      setTimeout(() => setError(null), 3000);
      return;
    }

    // Add User Message
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: sanitizedText };
    setMessages(prev => [...prev, userMsg]);

    // 添加思考中的消息（带古籍滚动文字）
    const thinkingMsg: ChatMessage = { 
      id: 'thinking-' + Date.now().toString(), 
      role: 'model', 
      content: '',
      isThinking: true,
      thinkingTexts: [
        '正在翻阅《滴天髓》...',
        '查考《三命通会》之论述...',
        '参照《渊海子平》之义理...',
        '研读《穷通宝典》之精要...',
        '对比《千里命稿》之断例...',
        '思索《子平真诠》之心法...',
        '验证《神峰通考》之要诀...',
      ]
    };
    setMessages(prev => [...prev, thinkingMsg]);

    // 锁定输入框，防止并发请求
    setIsChatting(true);

    try {
      const response = await sendChatMessageWithRetry(chatSession, sanitizedText);
      const modelText = response.text || "I am meditating on your answer...";

      // 移除思考消息，添加真实回复
      setMessages(prev => {
        const filtered = prev.filter(msg => msg.id !== thinkingMsg.id);
        return [...filtered, { id: (Date.now() + 1).toString(), role: 'model', content: modelText }];
      });
    } catch (err) {
      console.error("Chat Error", err);
      setMessages(prev => prev.filter(msg => msg.id !== thinkingMsg.id));
      setError("对话出错，请重试。");
      setTimeout(() => setError(null), 3000);
    } finally {
      // 解锁输入框
      setIsChatting(false);
    }
  };

  const handleReset = () => {
    setBaziResult(null);
    setChatSession(null);
    setMessages([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-serif ink-bg selection:bg-amber-900 selection:text-amber-100">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">

        {/* Header */}
        <header className="text-center mb-12 space-y-4">
          <div className="inline-block p-4 rounded-full border border-amber-900/50 bg-slate-900/50 mb-4 shadow-lg shadow-amber-900/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
              <path d="M2 12h20"></path>
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 tracking-tight pb-2">
            天機 • 命理
          </h1>
          <p className="text-slate-400 text-lg tracking-wide">
            Professional AI Bazi Consultant
          </p>
        </header>

        {/* Main Content Area */}
        <main>
          {!baziResult && !loading.isLoading && (
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto transition-all duration-500 hover:border-amber-900/50 animate-fade-in-up">
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Gender Toggle */}
                <div className="flex justify-center space-x-8 mb-8">
                  {[Gender.MALE, Gender.FEMALE].map((g) => (
                    <label key={g} className="cursor-pointer group">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={input.gender === g}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="hidden"
                      />
                      <div className={`
                        w-24 h-24 rounded-full flex items-center justify-center border-2 transition-all duration-300
                        ${input.gender === g
                          ? 'border-amber-500 bg-amber-900/20 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                          : 'border-slate-700 text-slate-600 hover:border-slate-500'}
                      `}>
                        <span className="text-2xl font-bold">{g}</span>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField label="出生年 Year">
                    <input
                      type="number"
                      value={input.birthYear}
                      onChange={(e) => handleInputChange('birthYear', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-md p-3 text-center text-lg focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                      placeholder="1995"
                      required
                    />
                  </InputField>
                  <InputField label="出生月 Month">
                    <select
                      value={input.birthMonth}
                      onChange={(e) => handleInputChange('birthMonth', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-md p-3 text-center text-lg focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                        <option key={m} value={m.toString().padStart(2, '0')}>{m}月</option>
                      ))}
                    </select>
                  </InputField>
                  <InputField label="出生日 Day">
                    <select
                      value={input.birthDay}
                      onChange={(e) => handleInputChange('birthDay', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-md p-3 text-center text-lg focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 appearance-none"
                    >
                      {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                        <option key={d} value={d.toString().padStart(2, '0')}>{d}日</option>
                      ))}
                    </select>
                  </InputField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="出生时间 Time">
                    <input
                      type="time"
                      value={input.birthTime}
                      onChange={(e) => handleInputChange('birthTime', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-md p-3 text-center text-lg focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                      required
                    />
                  </InputField>
                  <InputField label="出生地点 City/Province">
                    <input
                      type="text"
                      value={input.birthPlace}
                      onChange={(e) => handleInputChange('birthPlace', e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-md p-3 text-center text-lg focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                      placeholder="e.g. Beijing"
                      required
                    />
                  </InputField>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold py-4 rounded-lg shadow-lg transform transition hover:-translate-y-1 hover:shadow-amber-900/50 tracking-[0.2em] text-xl"
                >
                  开始批命 (Analyze)
                </button>
              </form>
            </div>
          )}

          {loading.isLoading && (
            <LoadingScreen message={loading.message} />
          )}

          {error && (
            <div className="text-center p-8 bg-red-900/20 border border-red-800 rounded-xl max-w-xl mx-auto animate-fade-in">
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-amber-500 underline hover:text-amber-400"
              >
                Try Again
              </button>
            </div>
          )}

          {baziResult && !loading.isLoading && (
            <div className="space-y-8 animate-fade-in">
              <BaziDisplay bazi={baziResult.bazi} />

              <ChatWindow
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={loading.isLoading || isChatting}
              />

              <div className="text-center pt-8">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 border border-slate-600 text-slate-400 rounded-full hover:bg-slate-800 hover:text-white transition-colors"
                >
                  测算他人 (New Reading)
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10 opacity-20">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-amber-900/30 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-slate-800/30 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
};

export default App;