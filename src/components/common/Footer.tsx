import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  CheckCircle2, 
  Send,
  Heart,
  Globe,
  Share2,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const Footer: React.FC = () => {
  const { setCurrentView } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 }
    });
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-purple-600 text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                EchoGPT
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              The unified multi-AI workspace & Chrome extension. Unleash GPT-4o, Claude 3.5 Sonnet, DeepSeek V3, and Gemini Pro in one seamless interface.
            </p>

            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Edge Nodes & Models Operational</span>
            </div>
          </div>

          {/* Column 1: Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Ecosystem</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => setCurrentView('webapp')} className="hover:text-white transition-colors">
                  Web App Chat UI
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('extension-demo')} className="hover:text-white transition-colors">
                  Chrome Extension
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('webapp')} className="hover:text-white transition-colors">
                  Dual Split-View Mode
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('webapp')} className="hover:text-white transition-colors">
                  Prompt Templates Library
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Flagship Models */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">AI Models</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>OpenAI GPT-4o</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Anthropic Claude 3.5</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>DeepSeek V3 / R1</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Google Gemini 1.5 Pro</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span>Perplexity Live Web</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Stay Ahead</h4>
            <p className="text-slate-400 text-xs">
              Get weekly multi-AI prompt engineering tips and model release updates.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enter your email..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1 rounded-lg bg-brand-600 hover:bg-brand-500 text-white transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed successfully!</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom copyright & socials */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 EchoGPT Ecosystem. Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for global creators & developers.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </span>
            <span className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Community</span>
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <Globe className="w-3.5 h-3.5" />
              <span>English (US)</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
