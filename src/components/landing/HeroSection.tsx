import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { AI_MODELS } from '../../data/aiModels';
import { 
  Sparkles, 
  ArrowRight, 
  Puzzle, 
  Bot, 
  Columns2, 
  Zap, 
  CheckCircle2, 
  Send,
  Code2,
  Brain,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const { setCurrentView, createNewChat } = useApp();
  const { playSound } = useTheme();
  
  const [heroPrompt, setHeroPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[1].id); // Claude 3.5 Sonnet default

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroPrompt.trim()) return;
    playSound('send');
    createNewChat(heroPrompt, selectedModel);
    setCurrentView('webapp');
  };

  const quickPrompts = [
    { text: 'Compare React 19 RSC vs Client Components', model: 'claude-3-5-sonnet', icon: Code2 },
    { text: 'Solve Grover\'s Quantum Algorithm step-by-step', model: 'deepseek-v3', icon: Brain },
    { text: 'Summarize breaking AI market trends 2026', model: 'perplexity-sonar', icon: Globe },
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-gradient-mesh">
      
      {/* Background ambient glow shapes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Floating Ecosystem Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs font-semibold text-brand-600 dark:text-brand-300 border border-brand-500/30 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-500 animate-spin" />
            <span>Redesigned 2.0 Ecosystem: Multi-AI Web App & Chrome Extension</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
          </div>
        </motion.div>

        {/* Main Dynamic Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            One Interface.{' '}
            <span className="bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              All World-Class AI Models.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Access <strong className="text-slate-900 dark:text-white">GPT-4o, Claude 3.5 Sonnet, DeepSeek V3</strong>, and <strong className="text-slate-900 dark:text-white">Gemini Pro</strong> in a unified web app and Chrome extension. Compare answers side-by-side with sub-100ms latency.
          </motion.p>

          {/* Model Pill Logos */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 pt-2"
          >
            {AI_MODELS.map((model) => (
              <span
                key={model.id}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${model.badgeBg} ${model.badgeText} border border-slate-200/50 dark:border-slate-800`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: model.color }} />
                <span>{model.name}</span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Live Interactive Hero Chat Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 max-w-3xl mx-auto"
        >
          <div className="glass-panel rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative">
            
            {/* Top Bar of Mini Interactive Playground */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200/60 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 ml-2">
                  Live Multi-AI Prompt Tester
                </span>
              </div>

              {/* Model Switcher Dropdown */}
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-500 dark:text-slate-400 font-medium">Model:</label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value as any)}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {AI_MODELS.map(m => (
                    <option key={m.id} value={m.id}>{m.name} ({m.provider})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Prompt Input Form */}
            <form onSubmit={handleHeroSubmit} className="space-y-3">
              <div className="relative">
                <textarea
                  value={heroPrompt}
                  onChange={(e) => setHeroPrompt(e.target.value)}
                  placeholder="Ask anything across GPT-4o, Claude 3.5, or DeepSeek... (e.g. 'Refactor this code' or 'Explain quantum computing')"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-300 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all resize-none"
                />

                <button
                  type="submit"
                  disabled={!heroPrompt.trim()}
                  className="absolute right-3 bottom-3 flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 text-white font-semibold text-xs shadow-md disabled:opacity-40 hover:scale-105 active:scale-95 transition-all"
                >
                  <span>Run Prompt</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Quick Prompt Pill Shortcuts */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Try:</span>
                {quickPrompts.map((qp, idx) => {
                  const Icon = qp.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setHeroPrompt(qp.text);
                        setSelectedModel(qp.model as any);
                        playSound('click');
                      }}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-brand-50 dark:hover:bg-brand-950/40 text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 transition-colors"
                    >
                      <Icon className="w-3 h-3 text-brand-500" />
                      <span className="truncate max-w-[200px]">{qp.text}</span>
                    </button>
                  );
                })}
              </div>
            </form>

          </div>
        </motion.div>

        {/* CTAs & Social Proof Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => {
              playSound('click');
              setCurrentView('webapp');
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-brand-600 via-purple-600 to-pink-600 hover:from-brand-500 hover:to-pink-500 shadow-xl shadow-brand-500/25 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Bot className="w-5 h-5" />
            <span>Launch Web App Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              playSound('click');
              setCurrentView('extension-demo');
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-slate-800 dark:text-white glass-card hover:bg-slate-200/50 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Puzzle className="w-5 h-5 text-brand-500" />
            <span>Explore Chrome Extension</span>
          </button>
        </motion.div>

        {/* Stat Highlights */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { label: 'Top AI Models', value: '7 Flagships', icon: Zap },
            { label: 'Latency Benchmark', value: '< 100ms Edge', icon: Sparkles },
            { label: 'Active Users', value: '150,000+', icon: CheckCircle2 },
            { label: 'Dual Split View', value: 'Side-by-Side', icon: Columns2 },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="glass-card p-4 rounded-2xl text-center">
                <div className="flex justify-center mb-2">
                  <Icon className="w-5 h-5 text-brand-500" />
                </div>
                <div className="font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
