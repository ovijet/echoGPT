import React from 'react';
import { LANDING_FEATURES } from '../../data/landingData';
import { 
  Boxes, 
  Columns2, 
  Globe, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ElementType> = {
  Boxes,
  Columns2,
  Globe,
  Sparkles,
  ShieldCheck,
  Zap,
};

export const FeaturesSection: React.FC = () => {
  const { setCurrentView } = useApp();

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">
            Engineered For Excellence
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why Use 5 AI Apps When You Can Have{' '}
            <span className="bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              One Master Hub?
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            EchoGPT bridges the gap between fragmented AI providers, offering unified prompt history, side-by-side benchmarking, and browser-wide intelligence.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LANDING_FEATURES.map((feature, idx) => {
            const Icon = iconMap[feature.iconName] || Sparkles;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Decorative background glow on hover */}
                <div className={`absolute -right-12 -top-12 w-32 h-32 bg-gradient-to-br ${feature.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300/50 dark:border-slate-700">
                      {feature.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-500 transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentView('webapp')}
                    className="flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-500 transition-colors"
                  >
                    <span>Test Feature</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                  <span className="text-[10px] text-slate-400 font-mono">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
