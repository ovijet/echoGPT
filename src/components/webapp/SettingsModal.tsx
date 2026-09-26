import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { AI_MODELS } from '../../data/aiModels';
import { 
  Settings, 
  X, 
  Key, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Trash2, 
  Check, 
  ShieldCheck,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SettingsModal: React.FC = () => {
  const { isSettingsOpen, setIsSettingsOpen, settings, updateSettings, clearAllChats } = useApp();
  const { theme, setTheme, soundEnabled, toggleSound, playSound } = useTheme();

  const [activeTab, setActiveTab] = useState<'general' | 'keys' | 'system'>('general');
  const [savedMessage, setSavedMessage] = useState(false);

  if (!isSettingsOpen) return null;

  const handleSave = () => {
    playSound('click');
    setSavedMessage(true);
    confetti({ particleCount: 30, spread: 40, origin: { y: 0.6 } });
    setTimeout(() => {
      setSavedMessage(false);
      setIsSettingsOpen(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      
      <div className="w-full max-w-2xl glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-brand-500/10 text-brand-500">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Workspace & Model Settings
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Configure your API keys, system prompts, theme, and model preferences.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs Bar */}
        <div className="flex items-center gap-2 px-5 pt-3 border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'general'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>General & UI</span>
          </button>

          <button
            onClick={() => setActiveTab('keys')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'keys'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>API Keys (BYOK)</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-t-xl text-xs font-bold border-b-2 transition-colors ${
              activeTab === 'system'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Default System Prompt</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {activeTab === 'general' && (
            <div className="space-y-6">
              
              {/* Theme Picker */}
              <div className="space-y-2">
                <label className="font-bold text-slate-900 dark:text-white block">Theme Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setTheme('dark');
                      playSound('toggle');
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-900 text-white border-brand-500 shadow-md'
                        : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                  >
                    <Moon className="w-4 h-4 text-brand-400" />
                    <span>Dark Cyberpunk Mode</span>
                  </button>

                  <button
                    onClick={() => {
                      setTheme('light');
                      playSound('toggle');
                    }}
                    className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all ${
                      theme === 'light'
                        ? 'bg-white text-slate-900 border-brand-500 shadow-md'
                        : 'bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                  >
                    <Sun className="w-4 h-4 text-amber-500" />
                    <span>Light Mode</span>
                  </button>
                </div>
              </div>

              {/* Sound Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900 dark:text-white">Audio Feedback FX</span>
                  <p className="text-[11px] text-slate-500">Play subtle bleeps on AI stream response & clicks</p>
                </div>
                <button
                  onClick={toggleSound}
                  className={`p-2 rounded-xl transition-colors ${
                    soundEnabled ? 'bg-brand-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-600'
                  }`}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>

              {/* Default Model */}
              <div className="space-y-2">
                <label className="font-bold text-slate-900 dark:text-white block">Default Starting AI Model</label>
                <select
                  value={settings.primaryModel}
                  onChange={(e) => updateSettings({ primaryModel: e.target.value as any })}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-semibold text-slate-900 dark:text-white"
                >
                  {AI_MODELS.map(m => (
                    <option key={m.id} value={m.id}>{m.name} - {m.provider}</option>
                  ))}
                </select>
              </div>

              {/* Reset History */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all chat conversations?')) {
                      clearAllChats();
                      setIsSettingsOpen(false);
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 text-rose-500 font-bold hover:bg-rose-500/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Clear All Conversation History</span>
                </button>
              </div>

            </div>
          )}

          {activeTab === 'keys' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>API Keys are encrypted locally in your browser storage and never transmitted to our backend.</span>
              </div>

              {['OpenAI (GPT-4o)', 'Anthropic (Claude 3.5)', 'Google Gemini', 'DeepSeek'].map((prov, idx) => (
                <div key={idx} className="space-y-1.5">
                  <label className="font-bold text-slate-900 dark:text-white">{prov} Key</label>
                  <input
                    type="password"
                    placeholder={`sk-... enter your ${prov} API key`}
                    className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-white"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-3">
              <label className="font-bold text-slate-900 dark:text-white block">
                Global System Prompt Instruction
              </label>
              <textarea
                value={settings.systemPrompt}
                onChange={(e) => updateSettings({ systemPrompt: e.target.value })}
                rows={5}
                className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
              <p className="text-[11px] text-slate-500">
                This instruction is injected into every new conversation to tailor the AI persona to your coding & writing preferences.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40">
          <span className="text-[11px] text-slate-400">EchoGPT v2.0 Workspace</span>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md transition-transform hover:scale-105"
          >
            {savedMessage ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Settings Saved!</span>
              </>
            ) : (
              <span>Save & Apply Settings</span>
            )}
          </button>
        </div>

      </div>

    </div>
  );
};
