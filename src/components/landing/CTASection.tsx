import React from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, ArrowRight, Puzzle, Bot } from 'lucide-react';

export const CTASection: React.FC = () => {
  const { setCurrentView } = useApp();
  const { playSound } = useTheme();

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-16 bg-gradient-to-r from-brand-900 via-purple-900 to-slate-900 border border-brand-500/30 text-white shadow-2xl">
          
          {/* Background ambient lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-purple-300 backdrop-blur text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>Ready for Next-Gen Multi-AI?</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Transform Your Workflow with EchoGPT 2.0 Today
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Get instant access to GPT-4o, Claude 3.5 Sonnet, DeepSeek V3, and Gemini Pro in one beautiful web app and Chrome extension.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => {
                  playSound('send');
                  setCurrentView('webapp');
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-xl hover:scale-105 transition-all"
              >
                <Bot className="w-5 h-5 text-brand-600" />
                <span>Launch Web App Free</span>
                <ArrowRight className="w-5 h-5 text-slate-900" />
              </button>

              <button
                onClick={() => {
                  playSound('click');
                  setCurrentView('extension-demo');
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/80 backdrop-blur hover:scale-105 transition-all"
              >
                <Puzzle className="w-5 h-5 text-brand-400" />
                <span>Install Chrome Extension</span>
              </button>
            </div>

            <div className="text-xs text-slate-400 font-medium pt-2">
              ✓ No credit card required • Instant 1-click setup • 7 Flagship AI models
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
