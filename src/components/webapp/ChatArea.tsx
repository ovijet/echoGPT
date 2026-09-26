import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { AI_MODELS, getModelById } from '../../data/aiModels';
import { PromptInput } from './PromptInput';
import { DualChatArea } from './DualChatArea';
import { 
  Sparkles, 
  Columns2, 
  Copy, 
  Check, 
  Download, 
  Trash2, 
  Bot, 
  User, 
  ThumbsUp, 
  ThumbsDown,
  Code
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ChatArea: React.FC = () => {
  const { 
    activeChat, 
    primaryModelId, 
    setPrimaryModelId, 
    isSplitView, 
    toggleSplitView,
    deleteChat,
    activeChatId
  } = useApp();
  const { playSound } = useTheme();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!activeChat) return null;

  const activeModelObj = getModelById(primaryModelId);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    playSound('click');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportChat = () => {
    playSound('click');
    const exportText = activeChat.messages
      .map(m => `[${m.timestamp}] ${m.sender.toUpperCase()} (${m.modelId || 'User'}):\n${m.content}\n`)
      .join('\n---\n\n');
    
    const blob = new Blob([exportText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeChat.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_chat.md`;
    a.click();

    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
  };

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] bg-white dark:bg-slate-950 overflow-hidden">
      
      {/* Header Bar */}
      <div className="h-14 px-4 sm:px-6 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 glass-panel">
        
        {/* Model Picker */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeModelObj.color }} />
            <select
              value={primaryModelId}
              onChange={(e) => {
                setPrimaryModelId(e.target.value as any);
                playSound('click');
              }}
              className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300/70 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {AI_MODELS.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.provider})
                </option>
              ))}
            </select>
          </div>

          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md hidden sm:inline-block ${activeModelObj.badgeBg} ${activeModelObj.badgeText}`}>
            {activeModelObj.badge}
          </span>
        </div>

        {/* Header Action Tools */}
        <div className="flex items-center gap-2">
          {/* Split Mode Toggle Button */}
          <button
            onClick={() => {
              playSound('toggle');
              toggleSplitView();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              isSplitView
                ? 'bg-purple-600 text-white border-purple-500 shadow-md'
                : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
            }`}
          >
            <Columns2 className="w-4 h-4" />
            <span className="hidden sm:inline">Dual Split Mode</span>
          </button>

          {/* Export Chat Button */}
          <button
            onClick={handleExportChat}
            title="Export Chat as Markdown"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Delete Chat */}
          <button
            onClick={() => {
              playSound('click');
              deleteChat(activeChatId);
            }}
            title="Delete Conversation"
            className="p-2 rounded-xl text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Stream Area */}
      {isSplitView ? (
        <DualChatArea />
      ) : (
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeChat.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-4 text-slate-400">
              <div className="p-4 rounded-3xl bg-brand-500/10 text-brand-500 shadow-xl animate-bounce">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                How can EchoGPT help you today?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Enter any coding problem, request an architecture review, or launch a side-by-side model comparison using the toggle above.
              </p>
            </div>
          ) : (
            activeChat.messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const msgModel = msg.modelId ? getModelById(msg.modelId) : activeModelObj;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 sm:gap-4 max-w-4xl mx-auto ${
                    isUser ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {/* Sender Avatar */}
                  <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                    isUser 
                      ? 'bg-slate-800 text-white' 
                      : 'bg-gradient-to-tr from-brand-600 to-purple-600 text-white'
                  }`}>
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  {/* Message Bubble Container */}
                  <div className={`space-y-1.5 max-w-[85%] sm:max-w-[80%]`}>
                    
                    {/* Header info */}
                    <div className={`flex items-center gap-2 text-xs text-slate-400 ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {isUser ? 'You' : msgModel.name}
                      </span>
                      {!isUser && msg.tokens && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                          {msg.tokens} tokens
                        </span>
                      )}
                      <span className="text-[10px]">{msg.timestamp}</span>
                    </div>

                    {/* Bubble */}
                    <div className={`p-4 sm:p-5 rounded-2xl text-sm leading-relaxed ${
                      isUser
                        ? 'bg-brand-600 text-white rounded-tr-none shadow-md shadow-brand-600/10'
                        : 'glass-card text-slate-900 dark:text-slate-100 rounded-tl-none border border-slate-200/80 dark:border-slate-800'
                    }`}>
                      <FormattedMessageContent content={msg.content} />
                    </div>

                    {/* AI Message Action toolbar */}
                    {!isUser && (
                      <div className="flex items-center gap-2 pt-1 text-slate-400 text-xs">
                        <button
                          onClick={() => handleCopy(msg.content, msg.id)}
                          className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-white transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                              <span className="text-emerald-500 font-semibold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        <button className="flex items-center gap-1 hover:text-brand-500 transition-colors">
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button className="flex items-center gap-1 hover:text-rose-500 transition-colors">
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Input Container */}
      <PromptInput />

    </div>
  );
};

function FormattedMessageContent({ content }: { content: string }) {
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-3 font-sans">
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
          const lang = match ? match[1] || 'code' : 'code';
          const codeText = match ? match[2] : part.slice(3, -3);

          return (
            <div key={index} className="my-3 rounded-xl overflow-hidden bg-slate-950 text-slate-100 border border-slate-800 font-mono text-xs">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
                <div className="flex items-center gap-2">
                  <Code className="w-3.5 h-3.5 text-brand-400" />
                  <span className="uppercase text-[10px] font-bold">{lang}</span>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(codeText)}
                  className="hover:text-white transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <pre className="p-4 overflow-x-auto text-xs leading-relaxed">
                <code>{codeText}</code>
              </pre>
            </div>
          );
        }

        return (
          <div key={index} className="whitespace-pre-wrap leading-relaxed">
            {part}
          </div>
        );
      })}
    </div>
  );
}
