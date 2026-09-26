import React from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Sparkles, 
  MessageSquare, 
  Puzzle, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX, 
  ArrowRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentView, setCurrentView, toggleExtensionOverlay } = useApp();
  const { theme, toggleTheme, soundEnabled, toggleSound, playSound } = useTheme();

  const handleNavClick = (view: 'landing' | 'webapp' | 'extension-demo') => {
    playSound('click');
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-purple-600 to-pink-500 shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <div className="absolute inset-0 rounded-xl bg-brand-500/20 filter blur-md group-hover:blur-lg transition-all duration-300 -z-10" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-brand-600 to-purple-600 dark:from-white dark:via-brand-400 dark:to-purple-400 bg-clip-text text-transparent">
                EchoGPT
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                2.0
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Multi-AI Workspace & Extension
            </p>
          </div>
        </div>

        {/* View Switcher Pills */}
        <nav className="flex items-center p-1 rounded-xl bg-slate-200/60 dark:bg-slate-900/80 border border-slate-300/40 dark:border-slate-800/80 shadow-inner">
          <button
            onClick={() => handleNavClick('landing')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              currentView === 'landing'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Landing</span>
          </button>

          <button
            onClick={() => handleNavClick('webapp')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              currentView === 'webapp'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Web App</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </button>

          <button
            onClick={() => handleNavClick('extension-demo')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
              currentView === 'extension-demo'
                ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Puzzle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chrome</span> Extension
          </button>
        </nav>

        {/* Right Action Icons & Primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleSound();
              playSound('toggle');
            }}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-brand-500" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => {
              toggleTheme();
              playSound('toggle');
            }}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Extension Quick Overlay Trigger */}
          <button
            onClick={() => {
              playSound('click');
              toggleExtensionOverlay();
            }}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300/60 dark:border-slate-700 transition-all"
          >
            <Puzzle className="w-3.5 h-3.5 text-brand-500" />
            <span>Test Floating Extension</span>
          </button>

          {/* Action CTA */}
          {currentView === 'landing' ? (
            <button
              onClick={() => handleNavClick('webapp')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 shadow-md shadow-brand-500/20 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Open Web App</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-200/70 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
            >
              <span>Back to Home</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
