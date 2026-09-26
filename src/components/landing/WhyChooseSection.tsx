import React from 'react';
import { COMPARISON_MATRIX } from '../../data/landingData';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';

export const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Clear Value Comparison
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            EchoGPT vs Single Model Subscriptions
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Stop overpaying for multiple $20/mo subscriptions. Get every flagship model, dual-model comparison, and browser extension tools in one plan.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80">
                  <th className="p-4 sm:p-5 text-sm font-bold text-slate-900 dark:text-white">Feature / Capability</th>
                  <th className="p-4 sm:p-5 text-sm font-bold text-brand-600 dark:text-brand-400 bg-brand-500/10">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-brand-500" />
                      <span>EchoGPT 2.0</span>
                    </div>
                  </th>
                  <th className="p-4 sm:p-5 text-sm font-semibold text-slate-500 dark:text-slate-400">ChatGPT Plus</th>
                  <th className="p-4 sm:p-5 text-sm font-semibold text-slate-500 dark:text-slate-400">Claude Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800 text-xs sm:text-sm">
                {COMPARISON_MATRIX.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 sm:p-5 font-semibold text-slate-900 dark:text-slate-200">
                      {row.feature}
                    </td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-brand-500/5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{row.echoGpt}</span>
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500 dark:text-slate-400">
                      {row.chatGptPlus.includes('Not') ? (
                        <span className="flex items-center gap-1.5 text-rose-500">
                          <XCircle className="w-4 h-4 shrink-0" />
                          <span>{row.chatGptPlus}</span>
                        </span>
                      ) : (
                        row.chatGptPlus
                      )}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500 dark:text-slate-400">
                      {row.claudePro.includes('Not') || row.claudePro.includes('No') ? (
                        <span className="flex items-center gap-1.5 text-rose-500">
                          <XCircle className="w-4 h-4 shrink-0" />
                          <span>{row.claudePro}</span>
                        </span>
                      ) : (
                        row.claudePro
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
