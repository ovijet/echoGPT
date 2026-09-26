import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import type { Attachment } from '../../types';
import { 
  Send, 
  Paperclip, 
  Mic, 
  MicOff, 
  BookOpen, 
  X, 
  Code, 
  FileText, 
  Wand2,
  Globe
} from 'lucide-react';

export const PromptInput: React.FC = () => {
  const { sendMessage, setIsPromptLibraryOpen } = useApp();
  const { playSound } = useTheme();

  const [promptText, setPromptText] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim() && attachments.length === 0) return;

    playSound('send');
    sendMessage(promptText, attachments);
    setPromptText('');
    setAttachments([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = Array.from(files).map((file, idx) => ({
      id: `att-${Date.now()}-${idx}`,
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      type: file.type || 'document'
    }));

    setAttachments(prev => [...prev, ...newAttachments]);
    playSound('click');
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const toggleMic = () => {
    playSound('toggle');
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setPromptText(prev => prev ? `${prev} (Voice Dictation: Explain React RSC state management)` : 'Explain React 19 RSC state management with optimistic UI.');
        setIsRecording(false);
      }, 2500);
    }
  };

  const quickActions = [
    { label: 'Summarize', prefix: 'Summarize the following content in bullet points: ', icon: FileText },
    { label: 'Refactor Code', prefix: 'Refactor this code to production-grade TypeScript with strict type annotations: ', icon: Code },
    { label: 'Improve Tone', prefix: 'Rewrite this text to be professional, compelling, and concise: ', icon: Wand2 },
    { label: 'Web Fact Check', prefix: 'Research the latest 2026 facts about: ', icon: Globe },
  ];

  return (
    <div className="p-3 sm:p-4 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
      
      <div className="max-w-4xl mx-auto space-y-2">
        
        {/* Quick Tools Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
          <span className="text-slate-400 font-bold uppercase tracking-wider shrink-0 mr-1">Quick Actions:</span>
          {quickActions.map((qa, idx) => {
            const Icon = qa.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setPromptText(qa.prefix);
                  playSound('click');
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-brand-50 dark:hover:bg-brand-950/40 border border-slate-200 dark:border-slate-800 transition-colors shrink-0"
              >
                <Icon className="w-3 h-3 text-brand-500" />
                <span>{qa.label}</span>
              </button>
            );
          })}
        </div>

        {/* Attachments list preview */}
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {attachments.map(att => (
              <div
                key={att.id}
                className="flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-500/10 border border-brand-500/20 text-xs text-brand-600 dark:text-brand-300"
              >
                <Paperclip className="w-3.5 h-3.5" />
                <span className="font-semibold truncate max-w-[150px]">{att.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">({att.size})</span>
                <button onClick={() => removeAttachment(att.id)} className="hover:text-rose-500">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Recording status banner */}
        {isRecording && (
          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-semibold animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span>Listening to voice dictation...</span>
            </div>
            <button onClick={toggleMic} className="text-xs underline">Stop</button>
          </div>
        )}

        {/* Form Input Box */}
        <form onSubmit={handleSubmit} className="relative glass-panel rounded-2xl p-2 border border-slate-300/80 dark:border-slate-800 focus-within:border-brand-500 transition-all shadow-md">
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your prompt here... (Shift + Enter for new line)"
            rows={2}
            className="w-full px-3 py-2 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none resize-none"
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            className="hidden"
          />

          <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 dark:border-slate-800/60 px-2">
            
            {/* Left Tools */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                title="Attach Files / Images"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={toggleMic}
                title="Voice Dictation"
                className={`p-1.5 rounded-lg transition-colors ${
                  isRecording ? 'text-rose-500 bg-rose-500/10' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsPromptLibraryOpen(true)}
                title="Prompt Templates Library"
                className="p-1.5 rounded-lg text-slate-500 hover:text-purple-500 hover:bg-purple-500/10 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
              </button>
            </div>

            {/* Right Submit */}
            <button
              type="submit"
              disabled={!promptText.trim() && attachments.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white font-bold text-xs shadow-md disabled:opacity-40 hover:scale-105 active:scale-95 transition-all"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>

          </div>
        </form>

      </div>

    </div>
  );
};
