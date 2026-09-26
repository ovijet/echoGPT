import React from 'react';
import { TESTIMONIALS } from '../../data/landingData';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            Loved By Developers & Creators
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Loved by 150,000+ Power Users
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            See how top engineers, designers, and researchers stay 10x more productive with EchoGPT.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-card p-8 rounded-3xl flex flex-col justify-between relative group hover:-translate-y-1 transition-all duration-300 border border-slate-200/80 dark:border-slate-800"
            >
              <Quote className="w-8 h-8 text-brand-500/20 absolute top-6 right-6" />

              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">
                  "{t.content}"
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-300 dark:border-slate-700"
                />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{t.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role} at {t.company}</p>
                  <span className="inline-block text-[10px] font-bold text-brand-600 dark:text-brand-400 mt-1">
                    {t.modelBadge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
