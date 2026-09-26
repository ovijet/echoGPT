import type { PricingPlan, FAQItem, Testimonial } from '../types';

export const LANDING_FEATURES = [
  {
    id: 'f1',
    iconName: 'Boxes',
    title: 'All Top AI Models in One Hub',
    description: 'Switch effortlessly between OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, DeepSeek V3, Google Gemini 1.5, Meta Llama 3.3, and Perplexity Live Search.',
    tag: 'Multi-AI Synergy',
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'f2',
    iconName: 'Columns2',
    title: 'Dual Model Side-by-Side Mode',
    description: 'Run your prompts through two AI models simultaneously. Compare logic, speed, code clarity, and accuracy side-by-side with synchronized scrolling.',
    tag: 'Exclusive Feature',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    id: 'f3',
    iconName: 'Globe',
    title: 'Ubiquitous Chrome Extension',
    description: 'Bring EchoGPT into any browser tab. Highlight text, summarize web pages, rewrite emails, and access side-panel AI assistance anywhere on the web.',
    tag: 'Web Ecosystem',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'f4',
    iconName: 'Sparkles',
    title: 'Smart Prompt & Context Tools',
    description: 'Built-in library of high-impact prompt engineering templates, system prompt customizer, file attachments, and instant tone transformers.',
    tag: 'Productivity Boost',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'f5',
    iconName: 'ShieldCheck',
    title: 'Enterprise Privacy & Custom Keys',
    description: 'Zero data retention policy for enterprise users. Bring your own API keys (BYOK) or use our unified seamless high-capacity plan.',
    tag: 'Security First',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'f6',
    iconName: 'Zap',
    title: 'Sub-100ms Global Edge Routing',
    description: 'Intelligent request routing routes your prompt to the fastest active edge datacenter, delivering lightning streaming speeds.',
    tag: 'Ultra Fast',
    gradient: 'from-rose-500 to-red-600'
  }
];

export const COMPARISON_MATRIX = [
  {
    feature: 'Access to GPT-4o & Claude 3.5 Sonnet',
    echoGpt: 'Included in 1 Plan',
    chatGptPlus: 'Only GPT-4o ($20/mo)',
    claudePro: 'Only Claude ($20/mo)'
  },
  {
    feature: 'DeepSeek V3 / R1 & Gemini 1.5 Pro',
    echoGpt: 'Included',
    chatGptPlus: 'Not Available',
    claudePro: 'Not Available'
  },
  {
    feature: 'Dual Model Side-by-Side Battle',
    echoGpt: 'Native Feature',
    chatGptPlus: 'Not Available',
    claudePro: 'Not Available'
  },
  {
    feature: 'Browser Side-Panel & Context Overlay',
    echoGpt: 'Full Chrome Extension',
    chatGptPlus: 'Basic Web Only',
    claudePro: 'Basic Web Only'
  },
  {
    feature: 'Live Web Search with Cited Sources',
    echoGpt: 'Perplexity Grounding',
    chatGptPlus: 'SearchGPT Limited',
    claudePro: 'No Live Web'
  },
  {
    feature: 'Custom API Key Integration (BYOK)',
    echoGpt: 'Supported',
    chatGptPlus: 'No',
    claudePro: 'No'
  },
  {
    feature: 'Total Monthly Value',
    echoGpt: 'All-in-One ($19/mo)',
    chatGptPlus: '$20/mo (Single AI)',
    claudePro: '$20/mo (Single AI)'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Starter Explorer',
    tagline: 'Perfect for trying multi-AI power',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      '50 prompts/day across GPT-4o & Claude 3.5',
      'Basic Chrome Extension popup',
      'Access to standard prompt templates',
      'Standard response speed',
      'Community Discord Support'
    ],
    buttonText: 'Get Started Free'
  },
  {
    id: 'pro',
    name: 'Pro Power User',
    tagline: 'Unlimited access for creators & developers',
    monthlyPrice: 19,
    yearlyPrice: 14,
    isPopular: true,
    badge: 'Most Popular - Save 25%',
    features: [
      'Unlimited prompts for ALL 7 flagship AI models',
      'Side-by-Side dual model comparison chat',
      'Full Chrome Extension: Side-panel & web overlay',
      'Massive 2M context window support (Gemini Pro)',
      'Live Web Search grounding via Perplexity',
      'Priority edge routing & zero queue time',
      'Export chats to Markdown, PDF & JSON'
    ],
    buttonText: 'Start 7-Day Free Trial'
  },
  {
    id: 'team',
    name: 'Team & Startup',
    tagline: 'Collaborative AI workspace for teams',
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      'Everything in Pro for up to 5 seats',
      'Shared prompt template workspace',
      'Centralized billing & seat allocation',
      'Custom System Prompt profiles for teams',
      'SOC2 Compliant data protection',
      'Dedicated Customer Success Manager'
    ],
    buttonText: 'Create Team Workspace'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is EchoGPT and how does it work?',
    answer: 'EchoGPT is a unified multi-AI platform and Chrome extension that brings the world\'s leading AI models—including OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, DeepSeek V3, Google Gemini 1.5 Pro, and Perplexity Search—into a single seamless interface. Instead of paying multiple $20/month subscriptions, EchoGPT gives you instant access to all top models with split-view comparison tools and browser-wide assistance.'
  },
  {
    id: 'faq-2',
    category: 'Models',
    question: 'Can I compare two different AI models at the same time?',
    answer: 'Yes! EchoGPT features an exclusive Dual-Model Split View mode. You can enter a single prompt, and watch both Claude 3.5 Sonnet and GPT-4o (or any model combination) stream their responses side-by-side with synchronized scrolling.'
  },
  {
    id: 'faq-3',
    category: 'Chrome Extension',
    question: 'How does the Chrome Extension work on websites?',
    answer: 'The EchoGPT Chrome Extension provides a popup, a docked Chrome Sidepanel, and an on-page text selection menu. Whenever you highlight text on any website, document, or code repository, an EchoGPT quick action tooltip appears allowing you to summarize, rewrite, explain code, or ask follow-up questions without leaving your active tab.'
  },
  {
    id: 'faq-4',
    category: 'Privacy & Security',
    question: 'Is my data private? Are prompts used for AI training?',
    answer: 'No. EchoGPT enforces strict privacy boundaries. Your prompts and attachments are routed through zero-retention API endpoints, meaning your private code, corporate documents, and chat histories are NEVER used to train public AI models.'
  },
  {
    id: 'faq-5',
    category: 'Billing & Plans',
    question: 'Can I bring my own API keys (BYOK)?',
    answer: 'Absolutedly! Pro and Team members can choose to use our hosted high-speed API keys or input their own personal API keys for OpenAI, Anthropic, Google Gemini, or DeepSeek.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Chen',
    role: 'Staff Frontend Engineer',
    company: 'Vercel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    content: 'EchoGPT changed how I write code. Being able to compare Claude 3.5 Sonnet\'s architectural advice against GPT-4o in split-view in one browser tab saves me hours every single week.',
    rating: 5,
    modelBadge: 'Uses Claude + GPT-4o'
  },
  {
    id: 't2',
    name: 'Marcus Vance',
    role: 'Founder & Product Designer',
    company: 'DesignFlow',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    content: 'The Chrome Extension side-panel is insane. I highlight client briefs or raw specs anywhere on Figma or Github, hit summarize, and get structured requirements in 3 seconds.',
    rating: 5,
    modelBadge: 'Uses Chrome Extension'
  },
  {
    id: 't3',
    name: 'Dr. Elena Rostova',
    role: 'AI Researcher & Data Scientist',
    company: 'Stanford AI Lab',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    content: 'DeepSeek V3 logic reasoning alongside Perplexity live web search makes EchoGPT the ultimate research workstation. I replaced 4 separate subscriptions with this 1 app.',
    rating: 5,
    modelBadge: 'Uses DeepSeek + Perplexity'
  }
];
