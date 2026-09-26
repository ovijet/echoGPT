import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ViewType, ChatSession, AIModelId, UserSettings, ExtensionState, ChatMessage, Attachment } from '../types';
import { INITIAL_MOCK_CHATS } from '../data/mockChats';

interface AppContextType {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  chatSessions: ChatSession[];
  activeChatId: string;
  activeChat: ChatSession | undefined;
  setActiveChatId: (id: string) => void;
  primaryModelId: AIModelId;
  setPrimaryModelId: (modelId: AIModelId) => void;
  secondaryModelId: AIModelId;
  setSecondaryModelId: (modelId: AIModelId) => void;
  isSplitView: boolean;
  setIsSplitView: (split: boolean) => void;
  toggleSplitView: () => void;
  createNewChat: (initialPrompt?: string, targetModelId?: AIModelId) => string;
  sendMessage: (content: string, attachments?: Attachment[]) => void;
  deleteChat: (id: string) => void;
  togglePinChat: (id: string) => void;
  clearAllChats: () => void;
  isPromptLibraryOpen: boolean;
  setIsPromptLibraryOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  extensionState: ExtensionState;
  setExtensionState: React.Dispatch<React.SetStateAction<ExtensionState>>;
  toggleExtensionOverlay: () => void;
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: 'dark',
  primaryModel: 'claude-3-5-sonnet',
  secondaryModel: 'gpt-4o',
  systemPrompt: 'You are EchoGPT, an elite multi-AI assistant specializing in clean code, crisp analysis, and helpful problem solving.',
  fontSize: 'medium',
  temperature: 0.7,
  streamResponse: true,
  soundEffects: true,
  shortcutsEnabled: true,
  apiKeys: {},
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem('echogpt_chats');
    return saved ? JSON.parse(saved) : INITIAL_MOCK_CHATS;
  });
  const [activeChatId, setActiveChatId] = useState<string>(() => {
    return chatSessions[0]?.id || 'chat-1';
  });
  const [primaryModelId, setPrimaryModelId] = useState<AIModelId>('claude-3-5-sonnet');
  const [secondaryModelId, setSecondaryModelId] = useState<AIModelId>('gpt-4o');
  const [isSplitView, setIsSplitView] = useState<boolean>(false);
  
  const [isPromptLibraryOpen, setIsPromptLibraryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [settings, setSettings] = useState<UserSettings>(() => {
    const saved = localStorage.getItem('echogpt_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [extensionState, setExtensionState] = useState<ExtensionState>({
    activeTab: 'chat',
    pageContextEnabled: true,
    currentPageTitle: 'EchoGPT - Modern Multi-AI Ecosystem',
    currentPageUrl: 'https://echogpt.live/',
    floatingWidgetVisible: false,
    sidePanelDocked: false,
  });

  useEffect(() => {
    localStorage.setItem('echogpt_chats', JSON.stringify(chatSessions));
  }, [chatSessions]);

  useEffect(() => {
    localStorage.setItem('echogpt_settings', JSON.stringify(settings));
  }, [settings]);

  const activeChat = chatSessions.find(c => c.id === activeChatId) || chatSessions[0];

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const toggleSplitView = () => {
    setIsSplitView(prev => !prev);
  };

  const toggleExtensionOverlay = () => {
    setExtensionState(prev => ({
      ...prev,
      floatingWidgetVisible: !prev.floatingWidgetVisible
    }));
  };

  const createNewChat = (initialPrompt?: string, targetModelId?: AIModelId): string => {
    const newId = `chat-${Date.now()}`;
    const modelToUse = targetModelId || primaryModelId;
    const newSession: ChatSession = {
      id: newId,
      title: initialPrompt ? (initialPrompt.length > 30 ? initialPrompt.slice(0, 30) + '...' : initialPrompt) : 'New Conversation',
      messages: [],
      primaryModelId: modelToUse,
      secondaryModelId: secondaryModelId,
      isSplitView: isSplitView,
      category: 'General',
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setChatSessions(prev => [newSession, ...prev]);
    setActiveChatId(newId);

    if (initialPrompt) {
      setTimeout(() => {
        sendMessageToChat(newId, initialPrompt, modelToUse, isSplitView ? secondaryModelId : undefined);
      }, 50);
    }

    return newId;
  };

  const sendMessageToChat = (
    chatId: string, 
    content: string, 
    pModel: AIModelId, 
    sModel?: AIModelId,
    attachments?: Attachment[]
  ) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      sender: 'user',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachments,
    };

    setChatSessions(prev => prev.map(chat => {
      if (chat.id === chatId) {
        const title = chat.messages.length === 0 ? (content.length > 30 ? content.slice(0, 30) + '...' : content) : chat.title;
        return {
          ...chat,
          title,
          updatedAt: new Date().toISOString(),
          messages: [...chat.messages, userMsg],
        };
      }
      return chat;
    }));

    // Simulate AI model response generation
    setTimeout(() => {
      const primaryResponseText = generateMockAIResponse(pModel, content);
      const primaryAiMsg: ChatMessage = {
        id: `msg-${Date.now()}-p`,
        sender: 'ai',
        modelId: pModel,
        content: primaryResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tokens: Math.floor(Math.random() * 200) + 150,
      };

      setChatSessions(prev => prev.map(chat => {
        if (chat.id === chatId) {
          const updatedMessages = [...chat.messages, primaryAiMsg];

          // If dual split view is enabled, add secondary AI message as well!
          if (isSplitView && sModel) {
            const secondaryResponseText = generateMockAIResponse(sModel, content, true);
            const secondaryAiMsg: ChatMessage = {
              id: `msg-${Date.now()}-s`,
              sender: 'ai',
              modelId: sModel,
              content: secondaryResponseText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              tokens: Math.floor(Math.random() * 200) + 120,
            };
            return {
              ...chat,
              messages: [...updatedMessages, secondaryAiMsg],
            };
          }

          return {
            ...chat,
            messages: updatedMessages,
          };
        }
        return chat;
      }));
    }, 800);
  };

  const sendMessage = (content: string, attachments?: Attachment[]) => {
    if (!activeChatId) return;
    sendMessageToChat(activeChatId, content, primaryModelId, isSplitView ? secondaryModelId : undefined, attachments);
  };

  const deleteChat = (id: string) => {
    setChatSessions(prev => {
      const filtered = prev.filter(c => c.id !== id);
      if (activeChatId === id && filtered.length > 0) {
        setActiveChatId(filtered[0].id);
      }
      return filtered;
    });
  };

  const togglePinChat = (id: string) => {
    setChatSessions(prev => prev.map(c => c.id === id ? { ...c, isPinned: !c.isPinned } : c));
  };

  const clearAllChats = () => {
    setChatSessions([]);
    createNewChat('Hello EchoGPT! What can you help me with today?');
  };

  return (
    <AppContext.Provider value={{
      currentView,
      setCurrentView,
      chatSessions,
      activeChatId,
      activeChat,
      setActiveChatId,
      primaryModelId,
      setPrimaryModelId,
      secondaryModelId,
      setSecondaryModelId,
      isSplitView,
      setIsSplitView,
      toggleSplitView,
      createNewChat,
      sendMessage,
      deleteChat,
      togglePinChat,
      clearAllChats,
      isPromptLibraryOpen,
      setIsPromptLibraryOpen,
      isSettingsOpen,
      setIsSettingsOpen,
      settings,
      updateSettings,
      extensionState,
      setExtensionState,
      toggleExtensionOverlay,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

function generateMockAIResponse(modelId: AIModelId, prompt: string, isSecondary = false): string {
  const lower = prompt.toLowerCase();
  
  if (lower.includes('code') || lower.includes('react') || lower.includes('typescript') || lower.includes('function') || lower.includes('component')) {
    if (modelId === 'claude-3-5-sonnet') {
      return `### Claude 3.5 Sonnet Solution

Here is a clean, production-ready implementation tailored to your request:

\`\`\`tsx
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export const EchoFeatureCard = ({ title, description }: { title: string; description: string }) => {
  const [active, setActive] = useState(false);

  return (
    <div 
      onClick={() => setActive(!active)}
      className={\`p-6 rounded-2xl border transition-all duration-300 cursor-pointer \${
        active 
          ? 'bg-indigo-600/10 border-indigo-500 shadow-lg shadow-indigo-500/10' 
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
      }\`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg text-white">{title}</h3>
        <Sparkles className="w-5 h-5 text-indigo-400" />
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
};
\`\`\`

#### Why this approach works:
- **State isolation:** Component maintains independent active toggles.
- **Micro-interactions:** Smooth CSS transition on border and glow effects.`;
    } else if (modelId === 'gpt-4o') {
      return `### OpenAI GPT-4o Implementation

Here is an optimized version focusing on extreme performance and accessibility:

\`\`\`tsx
import React, { useMemo } from 'react';

export function HighPerfCard({ title, content }: { title: string; content: string }) {
  const formattedContent = useMemo(() => content.trim(), [content]);

  return (
    <div className="relative group overflow-hidden p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <h4 className="text-lg font-bold text-slate-100 tracking-tight">{title}</h4>
      <p className="mt-2 text-slate-400 text-sm">{formattedContent}</p>
    </div>
  );
}
\`\`\`

- Uses \`useMemo\` for memoized string formatting.
- Gradient border shine on hover.`;
    }
  }

  if (modelId === 'deepseek-v3') {
    return `### DeepSeek V3 Step-by-Step Analysis

Analyzing input query: "${prompt.slice(0, 45)}..."

1. **Root Requirement:** The prompt seeks a precise structural breakdown with minimal overhead.
2. **Key Metric:** Optimizing response speed while maximizing informational density.
3. **Execution Strategy:**
   - Identified 3 core leverage points.
   - Reduced redundant verbosity by 40%.
   - Validated logic constraints against zero-shot benchmarks.

Everything looks mathematically consistent! Let me know if you want a formal proof or algorithmic complexity breakdown.`;
  }

  if (modelId === 'perplexity-sonar') {
    return `### Perplexity Live Web Grounded Answer

🔍 **Searched the web for:** "${prompt.slice(0, 40)}"

**Key Grounded Insights (2026):**
1. **Industry Adoption:** Multi-AI unified interfaces have seen a 340% increase in developer adoption over single-vendor subscriptions.
2. **Key Sources Cited:**
   - *TechCrunch 2026 AI Report* - [techcrunch.com/ai-multimodel]
   - *GitHub Developer Survey* - [github.blog/insights-2026]
3. **Summary:** Users prefer having instant model switching and side-panel context summaries right inside their existing browser tabs.`;
  }

  if (isSecondary) {
    return `### Response from ${modelId.toUpperCase()}

Here is my perspective on your request regarding "${prompt}":

- **Core Focus:** High clarity and direct answer.
- **Recommendation:** Combine this output with the primary model's response in the split-view layout to evaluate the optimal strategy!`;
  }

  return `### Response from ${modelId.toUpperCase()}

Thank you for your prompt: **"${prompt}"**

EchoGPT has processed this request using **${modelId}** with sub-100ms streaming latency. 

Here is what you need to know:
1. **Key Insight:** Multi-AI capabilities allow you to cross-verify answers across different LLM architectures.
2. **Actionable Step:** You can toggle Split View at any time in the header bar to run another model in parallel.
3. **Chrome Extension Shortcut:** Highlight any part of this response to send it to the EchoGPT extension side-panel!`;
}
