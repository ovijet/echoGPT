import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Puzzle, 
  PanelRightOpen, 
  MousePointerClick, 
  Sparkles, 
  ArrowRight,
  Zap,
  CheckCircle2,
  FileText,
  Languages,
  Code,
  MessageSquare,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ExtensionShowcase: React.FC = () => {
  const { setCurrentView } = useApp();
  const { playSound } = useTheme();
  const [activeTab, setActiveTab] = useState<'popup' | 'sidepanel' | 'overlay'>('popup');

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-wider">
            <Globe className="w-4 h-4 text-brand-400" />
            <span>Task 3: Reimagined Chrome Extension</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Bring AI Intelligence to{' '}
            <span className="bg-gradient-to-r from-brand-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Every Web Page You Visit
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            No more switching tabs or copying prompts back and forth. The redesigned EchoGPT Chrome extension operates natively right inside your browsing workflow.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-2xl">
            {[
              { id: 'popup', label: '1. Redesigned Popup UI', icon: Puzzle },
              { id: 'sidepanel', label: '2. Docked Side Panel Mode', icon: PanelRightOpen },
              { id: 'overlay', label: '3. On-Page Context Overlay', icon: MousePointerClick },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    playSound('click');
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Simulated View Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            {activeTab === 'popup' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80">
                
                {/* Left Description */}
                <div className="md:col-span-5 space-y-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Instant Extension Popup
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Compact, Powerful & Model-Flexible
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Click the EchoGPT browser icon anytime to reveal a streamlined chat window with model selection, token counters, and quick task buttons.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>One-click AI model picker (GPT-4o, Claude, DeepSeek)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Quick action presets (Summarize, Fix Grammar, Explain)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Instant page text inclusion switch</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => {
                      playSound('click');
                      setCurrentView('extension-demo');
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
                  >
                    <span>Launch Full Extension Simulator</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Right Interactive Popup Preview Card */}
                <div className="md:col-span-7 flex justify-center">
                  <div className="w-full max-w-sm rounded-2xl bg-slate-950 border border-slate-700 shadow-2xl p-4 overflow-hidden">
                    
                    {/* Extension Header */}
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-brand-400" />
                        <span className="text-xs font-bold text-white">EchoGPT Assistant</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                        Active Page Included
                      </span>
                    </div>

                    {/* Model Bar */}
                    <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800 mb-3">
                      <span className="text-xs text-slate-400">Target Model:</span>
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Claude 3.5 Sonnet
                      </span>
                    </div>

                    {/* Quick Preset Buttons */}
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                      <button className="flex flex-col items-center p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300">
                        <FileText className="w-3.5 h-3.5 text-brand-400 mb-1" />
                        <span>Summarize Page</span>
                      </button>
                      <button className="flex flex-col items-center p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300">
                        <Code className="w-3.5 h-3.5 text-emerald-400 mb-1" />
                        <span>Explain Code</span>
                      </button>
                      <button className="flex flex-col items-center p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300">
                        <Languages className="w-3.5 h-3.5 text-sky-400 mb-1" />
                        <span>Translate</span>
                      </button>
                    </div>

                    {/* Chat Bubble Sample */}
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2 mb-3">
                      <div className="font-semibold text-white flex items-center justify-between">
                        <span>Page Summary</span>
                        <span className="text-[10px] text-slate-500 font-mono">240 tokens</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-400">
                        This webpage outlines EchoGPT 2.0 features, including multi-AI split view and Chrome extension integration.
                      </p>
                    </div>

                    {/* Input Bar */}
                    <div className="relative">
                      <input
                        type="text"
                        readOnly
                        value="Ask a question about this website..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'sidepanel' && (
              <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <h3 className="text-2xl font-bold text-white">
                    Chrome Side Panel Docking
                  </h3>
                  <p className="text-slate-300 text-sm">
                    Keep EchoGPT open pinned to the right edge of Chrome while you read research articles, inspect code repositories, or write documents.
                  </p>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 p-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 rounded-t-xl border-b border-slate-800 text-xs text-slate-400">
                    <Globe className="w-3.5 h-3.5 text-brand-400" />
                    <span className="truncate">https://github.com/facebook/react (Active Tab)</span>
                    <span className="ml-auto px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 text-[10px]">
                      SidePanel Active
                    </span>
                  </div>
                  <div className="grid grid-cols-12 h-64">
                    <div className="col-span-8 p-4 bg-slate-900/60 border-r border-slate-800 text-xs text-slate-400 font-mono">
                      <div className="text-emerald-400 font-bold mb-2">// Active Webpage View</div>
                      <div>const [state, setState] = useState(initialState);</div>
                      <div>useEffect(() {'{'} ... {'}'}, []);</div>
                      <div className="mt-4 text-slate-500">// Reading code on GitHub...</div>
                    </div>
                    <div className="col-span-4 p-3 bg-slate-950 flex flex-col justify-between text-xs">
                      <div className="space-y-2">
                        <div className="font-bold text-brand-300 flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>EchoGPT SidePanel</span>
                        </div>
                        <div className="p-2 rounded bg-slate-900 text-[10px] text-slate-300">
                          Claude 3.5 Sonnet: "This code sets up a standard stateful component..."
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-500 text-center">
                        Synced with active tab context
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'overlay' && (
              <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 space-y-6">
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <h3 className="text-2xl font-bold text-white">
                    Instant Selection Overlay Tooltip
                  </h3>
                  <p className="text-slate-300 text-sm">
                    Highlight any paragraph or code block on any website to immediately reveal the floating EchoGPT quick actions bar.
                  </p>
                </div>

                <div className="p-8 rounded-2xl bg-slate-950 border border-slate-700 relative text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
                  <p className="mb-2">
                    "Quantum algorithms provide quadratic speedup over classical brute-force searching when dealing with unstructured database queries."
                  </p>
                  
                  {/* Floating Action Tooltip Simulator */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 p-2 rounded-xl bg-slate-900 border border-brand-500/50 shadow-2xl shadow-brand-500/20">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-600 text-white text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>EchoGPT</span>
                    </span>
                    <button className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200">
                      Explain
                    </button>
                    <button className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200">
                      Summarize
                    </button>
                    <button className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200">
                      Translate
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
