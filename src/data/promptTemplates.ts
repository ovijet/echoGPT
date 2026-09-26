import type { PromptTemplate } from '../types';

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'p1',
    title: 'Code Refactoring & Types',
    description: 'Transform legacy JS/TS code into highly structured, performant modular code.',
    category: 'Coding',
    prompt: 'Refactor the following code to adhere to strict TypeScript standards, modern functional patterns, and optimal performance. Add comprehensive inline annotations and error handling.',
    icon: 'Code2',
    suggestedModel: 'claude-3-5-sonnet',
    tags: ['TypeScript', 'Clean Code', 'Performance']
  },
  {
    id: 'p2',
    title: 'Step-by-Step Logic Reasoning',
    description: 'Break down complex logic, mathematical proofs, or system problems step by step.',
    category: 'Analysis',
    prompt: 'Analyze this problem with deep chain-of-thought reasoning. Explicitly state assumptions, formulas used, intermediate steps, and potential edge-case failures.',
    icon: 'Brain',
    suggestedModel: 'deepseek-v3',
    tags: ['Math', 'Chain of Thought', 'Logic']
  },
  {
    id: 'p3',
    title: 'Live Web Fact Check & News',
    description: 'Perform real-time internet search with citations and authoritative sources.',
    category: 'Productivity',
    prompt: 'Research the following topic using live web search. Provide key facts, recent statistics from 2026, and explicitly cite authoritative sources.',
    icon: 'Globe',
    suggestedModel: 'perplexity-sonar',
    tags: ['Web Search', 'Fact Checking', 'Citations']
  },
  {
    id: 'p4',
    title: 'Creative UI/UX Design System',
    description: 'Generate modern Tailwind CSS layout concepts, color palettes, and animation specs.',
    category: 'Creative',
    prompt: 'Design a sleek, glassmorphic UI component layout using React and Tailwind CSS. Include dark mode styles, smooth micro-interactions, and high contrast typography.',
    icon: 'Palette',
    suggestedModel: 'gpt-4o',
    tags: ['UI/UX', 'Tailwind', 'React']
  },
  {
    id: 'p5',
    title: 'Large File Summarizer',
    description: 'Extract key insights, action items, and executive summaries from long documents.',
    category: 'Writing',
    prompt: 'Synthesize this document into a 3-minute executive briefing. Highlight primary objectives, key metric takeaways, risk factors, and recommended next steps.',
    icon: 'FileText',
    suggestedModel: 'gemini-1-5-pro',
    tags: ['Summarization', 'Executive Brief', 'Docs']
  }
];
