export type ViewType = 'landing' | 'webapp' | 'extension-demo';

export type AIModelId = 
  | 'gpt-4o' 
  | 'claude-3-5-sonnet' 
  | 'gemini-1-5-pro' 
  | 'deepseek-v3' 
  | 'llama-3-3' 
  | 'perplexity-sonar' 
  | 'mistral-large';

export interface AIModel {
  id: AIModelId;
  name: string;
  provider: string;
  badge: string;
  description: string;
  iconName: string;
  color: string;
  badgeBg: string;
  badgeText: string;
  speedRating: number; // 1-100
  intelligenceRating: number; // 1-100
  contextWindow: string;
  costEstimate: string;
  bestFor: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  size: string;
  type: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  modelId?: AIModelId;
  content: string;
  timestamp: string;
  tokens?: number;
  attachments?: Attachment[];
  isStreaming?: boolean;
  reactions?: { likes: number; dislikes: number };
  codeBlocks?: { language: string; code: string }[];
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  primaryModelId: AIModelId;
  secondaryModelId?: AIModelId;
  isSplitView: boolean;
  category: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  category: 'Coding' | 'Writing' | 'Productivity' | 'Analysis' | 'Creative';
  prompt: string;
  icon: string;
  suggestedModel: AIModelId;
  tags: string[];
}

export interface UserSettings {
  theme: 'dark' | 'light';
  primaryModel: AIModelId;
  secondaryModel: AIModelId;
  systemPrompt: string;
  fontSize: 'small' | 'medium' | 'large';
  temperature: number;
  streamResponse: boolean;
  soundEffects: boolean;
  shortcutsEnabled: boolean;
  apiKeys: {
    openai?: string;
    anthropic?: string;
    google?: string;
    deepseek?: string;
  };
}

export interface ExtensionState {
  activeTab: 'chat' | 'page-context' | 'quick-actions' | 'history' | 'settings';
  pageContextEnabled: boolean;
  currentPageTitle: string;
  currentPageUrl: string;
  floatingWidgetVisible: boolean;
  sidePanelDocked: boolean;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  limitations?: string[];
  buttonText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Models' | 'Chrome Extension' | 'Billing & Plans' | 'Privacy & Security';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  modelBadge: string;
}
