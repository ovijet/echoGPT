import React, { useState } from 'react';
import { PRICING_PLANS } from '../../data/landingData';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PricingSection: React.FC = () => {
  const { setCurrentView } = useApp();
  const { playSound } = useTheme();
  const [isYearly, setIsYearly] = useState(true);

  const handleSelectPlan = (planId: string) => {
    playSound('click');
    if (planId === 'pro' || planId === 'team') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    setCurrentView('webapp');
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
            Simple & Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            One Subscription. Unlimited AI Freedom.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Choose the plan that fits your workflow. Cancel or change plans anytime.
          </p>
        </div>

        {/* Monthly / Yearly Toggle */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex items-center p-1 rounded-2xl bg-slate-200/80 dark:bg-slate-800 border border-slate-300/60 dark:border-slate-700">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                !isYearly
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isYearly
                  ? 'bg-gradient-to-r from-brand-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <span>Annual Billing</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-extrabold text-[10px]">
                SAVE 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`glass-card rounded-3xl p-8 flex flex-col justify-between relative transition-transform duration-300 ${
                  plan.isPopular
                    ? 'border-2 border-brand-500 shadow-2xl scale-105 z-10 bg-gradient-to-b from-brand-500/5 via-transparent to-transparent'
                    : 'border border-slate-200 dark:border-slate-800'
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-600 to-purple-600 text-white text-xs font-bold shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 min-h-[32px]">
                    {plan.tagline}
                  </p>

                  {/* Price display */}
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                      / month {isYearly && price > 0 ? '(billed annually)' : ''}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Included Capabilities:
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-3.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-brand-600 via-purple-600 to-pink-600 text-white hover:scale-105'
                      : 'bg-slate-900 text-white dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
