import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { PROMPT_TEMPLATES } from '../../data/promptTemplates';
import { 
  BookOpen, 
  X, 
  Search, 
  Sparkles, 
  Code2, 
  Brain, 
  Globe, 
  Palette, 
  FileText,
  ArrowRight,
  Check
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Code2,
  Brain,
  Globe,
  Palette,
  FileText,
};

export const PromptLibraryModal: React.FC = () => {
  const { isPromptLibraryOpen, setIsPromptLibraryOpen, createNewChat } = useApp();
  const { playSound } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isPromptLibraryOpen) return null;

  const categories = ['All', 'Coding', 'Analysis', 'Productivity', 'Creative', 'Writing'];

  const filteredTemplates = PROMPT_TEMPLATES.filter(template => {
    const matchesCat = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleUsePrompt = (prompt: string, suggestedModel: any, templateId: string) => {
    playSound('click');
    setCopiedId(templateId);
    setTimeout(() => {
      createNewChat(prompt, suggestedModel);
      setIsPromptLibraryOpen(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      
      <div className="w-full max-w-3xl glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Prompt Engineering Library
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Curated high-impact prompts for code refactoring, logic analysis, and content synthesis.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPromptLibraryOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Categories */}
        <div className="p-4 border-b border-slate-200/60 dark:border-slate-800/60 space-y-3 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompt templates by topic, language, or model..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid List */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No matching prompt templates found.
            </div>
          ) : (
            filteredTemplates.map((item) => {
              const Icon = iconMap[item.icon] || Sparkles;

              return (
                <div
                  key={item.id}
                  className="glass-card p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3 group hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                      Target: {item.suggestedModel}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 font-mono leading-relaxed">
                    "{item.prompt}"
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-300 font-semibold">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleUsePrompt(item.prompt, item.suggestedModel, item.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-transform hover:scale-105"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Prompt Loaded!</span>
                        </>
                      ) : (
                        <>
                          <span>Use Prompt</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
};
