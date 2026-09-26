import React, { useState } from 'react';
import { AI_MODELS } from '../../data/aiModels';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Sparkles, 
  Zap, 
  Brain, 
  Cpu, 
  Globe, 
  Flame, 
  Compass, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const modelIcons: Record<string, React.ElementType> = {
  Sparkles,
  Zap,
  Cpu,
  Brain,
  Globe,
  Flame,
  Compass,
};

export const ModelShowcase: React.FC = () => {
  const { setCurrentView, createNewChat } = useApp();
  const { playSound } = useTheme();
  const [selectedId, setSelectedId] = useState(AI_MODELS[0].id);

  const activeModel = AI_MODELS.find(m => m.id === selectedId) || AI_MODELS[0];
  const Icon = modelIcons[activeModel.iconName] || Sparkles;

  const handleLaunchModel = () => {
    playSound('click');
    createNewChat(`Hi! Let's build something great using ${activeModel.name}.`, activeModel.id);
    setCurrentView('webapp');
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
            Flagship Model Roster
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Compare AI Superpowers in Real-Time
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Every model excels at something different. EchoGPT gives you instant access to all of them so you never settle for generic outputs.
          </p>
        </div>

        {/* Model Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {AI_MODELS.map((model) => {
            const MIcon = modelIcons[model.iconName] || Sparkles;
            const isSelected = model.id === selectedId;
            return (
              <button
                key={model.id}
                onClick={() => {
                  setSelectedId(model.id);
                  playSound('click');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xl scale-105'
                    : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <MIcon className="w-4 h-4" style={{ color: isSelected ? undefined : model.color }} />
                <span>{model.name}</span>
                {model.isNew && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed Model Card Inspector */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModel.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200/80 dark:border-slate-800 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Info & Description */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div 
                    className="p-3.5 rounded-2xl text-white shadow-lg"
                    style={{ backgroundColor: activeModel.color }}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                        {activeModel.name}
                      </h3>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${activeModel.badgeBg} ${activeModel.badgeText}`}>
                        {activeModel.badge}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Provided by {activeModel.provider}
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeModel.description}
                </p>

                {/* Best For Tags */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                    Recommended Superpowers
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModel.bestFor.map((bf, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-xs font-medium text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/80"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{bf}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleLaunchModel}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-white shadow-lg transition-transform hover:scale-105"
                  style={{ backgroundColor: activeModel.color }}
                >
                  <span>Chat with {activeModel.name} Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Right Column: Performance Benchmark Radar Bars */}
              <div className="lg:col-span-5 glass-card p-6 rounded-2xl space-y-5 border border-slate-200/60 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200/60 dark:border-slate-800 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-brand-500" />
                  <span>Performance Benchmark</span>
                </h4>

                {/* Speed Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600 dark:text-slate-400">Inference Speed</span>
                    <span className="text-slate-900 dark:text-white font-mono">{activeModel.speedRating}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700" 
                      style={{ width: `${activeModel.speedRating}%`, backgroundColor: activeModel.color }}
                    />
                  </div>
                </div>

                {/* Intelligence Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600 dark:text-slate-400">Logic & Reasoning</span>
                    <span className="text-slate-900 dark:text-white font-mono">{activeModel.intelligenceRating}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-700" 
                      style={{ width: `${activeModel.intelligenceRating}%`, backgroundColor: activeModel.color }}
                    />
                  </div>
                </div>

                {/* Specs Cards */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <Layers className="w-3.5 h-3.5 text-brand-500" />
                      <span>Context Window</span>
                    </div>
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      {activeModel.contextWindow}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <Coins className="w-3.5 h-3.5 text-amber-500" />
                      <span>Token Cost</span>
                    </div>
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {activeModel.costEstimate}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
