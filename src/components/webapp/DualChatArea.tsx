import React from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { AI_MODELS, getModelById } from '../../data/aiModels';
import { Scale } from 'lucide-react';

export const DualChatArea: React.FC = () => {
  const { 
    activeChat, 
    primaryModelId, 
    setPrimaryModelId, 
    secondaryModelId, 
    setSecondaryModelId 
  } = useApp();
  const { playSound } = useTheme();

  if (!activeChat) return null;

  const primaryModelObj = getModelById(primaryModelId);
  const secondaryModelObj = getModelById(secondaryModelId);

  // Filter AI responses per model
  const primaryMessages = activeChat.messages.filter(
    m => m.sender === 'user' || (m.sender === 'ai' && (m.modelId === primaryModelId || !m.modelId))
  );

  const secondaryMessages = activeChat.messages.filter(
    m => m.sender === 'user' || (m.sender === 'ai' && m.modelId === secondaryModelId)
  );

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-100 dark:bg-slate-950 overflow-hidden">
      
      {/* Dual Header Switcher Bar */}
      <div className="p-3 bg-purple-500/10 border-b border-purple-500/20 flex items-center justify-center gap-2 text-xs font-bold text-purple-600 dark:text-purple-300">
        <Scale className="w-4 h-4 text-purple-500 animate-pulse" />
        <span>Dual Split-View Live Comparison Mode Active</span>
      </div>

      {/* Split Columns Container */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-300 dark:divide-slate-800 overflow-hidden">
        
        {/* Left Column: Primary AI Model */}
        <div className="flex flex-col h-full overflow-hidden bg-white/60 dark:bg-slate-900/40">
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between glass-card">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryModelObj.color }} />
              <select
                value={primaryModelId}
                onChange={(e) => {
                  setPrimaryModelId(e.target.value as any);
                  playSound('click');
                }}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-xs font-bold border border-slate-300 dark:border-slate-700"
              >
                {AI_MODELS.map(m => (
                  <option key={m.id} value={m.id}>{m.name} (Model 1)</option>
                ))}
              </select>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-bold">
              Primary
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {primaryMessages.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs">
                No messages yet. Send a prompt to compare {primaryModelObj.name}!
              </div>
            ) : (
              primaryMessages.map(msg => (
                <div key={msg.id} className="space-y-1">
                  <div className="text-[10px] font-semibold text-slate-400 flex items-center justify-between">
                    <span>{msg.sender === 'user' ? 'You' : primaryModelObj.name}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-600 text-white'
                      : 'glass-card border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Secondary AI Model */}
        <div className="flex flex-col h-full overflow-hidden bg-white/60 dark:bg-slate-900/40">
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between glass-card">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: secondaryModelObj.color }} />
              <select
                value={secondaryModelId}
                onChange={(e) => {
                  setSecondaryModelId(e.target.value as any);
                  playSound('click');
                }}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-xs font-bold border border-slate-300 dark:border-slate-700"
              >
                {AI_MODELS.map(m => (
                  <option key={m.id} value={m.id}>{m.name} (Model 2)</option>
                ))}
              </select>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-500 font-bold">
              Secondary
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {secondaryMessages.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs">
                No messages yet. Send a prompt to compare {secondaryModelObj.name}!
              </div>
            ) : (
              secondaryMessages.map(msg => (
                <div key={msg.id} className="space-y-1">
                  <div className="text-[10px] font-semibold text-slate-400 flex items-center justify-between">
                    <span>{msg.sender === 'user' ? 'You' : secondaryModelObj.name}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'glass-card border border-purple-500/20 text-slate-800 dark:text-slate-200'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
