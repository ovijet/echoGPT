import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { 
  Plus, 
  Search, 
  Pin, 
  MessageSquare, 
  Trash2, 
  BookOpen, 
  Settings, 
  Columns2
} from 'lucide-react';

export const ChatSidebar: React.FC<{ isOpen: boolean; setIsOpen: (open: boolean) => void }> = ({ isOpen, setIsOpen }) => {
  const { 
    chatSessions, 
    activeChatId, 
    setActiveChatId, 
    createNewChat, 
    deleteChat, 
    togglePinChat,
    isSplitView,
    toggleSplitView,
    setIsPromptLibraryOpen,
    setIsSettingsOpen
  } = useApp();
  const { playSound } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredSessions = chatSessions.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pinnedSessions = filteredSessions.filter(s => s.isPinned);
  const recentSessions = filteredSessions.filter(s => !s.isPinned);

  const handleSelectChat = (id: string) => {
    playSound('click');
    setActiveChatId(id);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleNewChat = () => {
    playSound('click');
    createNewChat();
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <aside className={`fixed md:relative z-30 h-[calc(100vh-4rem)] flex flex-col glass-panel border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 ${
      isOpen ? 'w-72 left-0' : '-left-72 md:left-0 md:w-20 lg:w-72'
    }`}>
      
      {/* Top Header & New Chat */}
      <div className="p-3.5 space-y-3 border-b border-slate-200/60 dark:border-slate-800/80">
        
        <button
          onClick={handleNewChat}
          className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-[1.02] active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span className={`${isOpen ? 'block' : 'hidden lg:block'}`}>New Conversation</span>
        </button>

        {/* Dual Split View Toggle Pill */}
        <button
          onClick={() => {
            playSound('toggle');
            toggleSplitView();
          }}
          className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
            isSplitView
              ? 'bg-purple-500/15 border-purple-500/50 text-purple-600 dark:text-purple-300'
              : 'bg-slate-100 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <Columns2 className={`w-4 h-4 ${isSplitView ? 'text-purple-500' : 'text-slate-400'}`} />
            <span className={`${isOpen ? 'block' : 'hidden lg:block'}`}>Dual Split View</span>
          </div>
          <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ${isSplitView ? 'bg-purple-500 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400'}`}>
            {isSplitView ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* Search Input */}
        <div className={`relative ${isOpen ? 'block' : 'hidden lg:block'}`}>
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
        </div>

      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        
        {/* Pinned Section */}
        {pinnedSessions.length > 0 && (
          <div className="space-y-1">
            <div className={`px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider ${isOpen ? 'block' : 'hidden lg:block'}`}>
              Pinned Chats
            </div>
            {pinnedSessions.map((session) => {
              const isActive = session.id === activeChatId;
              return (
                <div
                  key={session.id}
                  onClick={() => handleSelectChat(session.id)}
                  className={`group relative flex items-center justify-between p-2 rounded-xl cursor-pointer text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Pin className="w-3.5 h-3.5 text-brand-500 shrink-0 rotate-45" />
                    <span className={`truncate ${isOpen ? 'block' : 'hidden lg:block'}`}>{session.title}</span>
                  </div>

                  <div className={`hidden group-hover:flex items-center gap-1 ${isOpen ? 'block' : 'hidden lg:block'}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePinChat(session.id);
                      }}
                      title="Unpin"
                      className="p-1 hover:text-amber-500 text-slate-400"
                    >
                      <Pin className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(session.id);
                      }}
                      title="Delete"
                      className="p-1 hover:text-rose-500 text-slate-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Recent Section */}
        <div className="space-y-1">
          <div className={`px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider ${isOpen ? 'block' : 'hidden lg:block'}`}>
            Recent Conversations
          </div>
          {recentSessions.length === 0 ? (
            <div className={`px-2 py-4 text-center text-xs text-slate-400 ${isOpen ? 'block' : 'hidden lg:block'}`}>
              No conversations found
            </div>
          ) : (
            recentSessions.map((session) => {
              const isActive = session.id === activeChatId;
              return (
                <div
                  key={session.id}
                  onClick={() => handleSelectChat(session.id)}
                  className={`group relative flex items-center justify-between p-2 rounded-xl cursor-pointer text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20 shadow-sm'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <MessageSquare className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-brand-500' : 'text-slate-400'}`} />
                    <span className={`truncate ${isOpen ? 'block' : 'hidden lg:block'}`}>{session.title}</span>
                  </div>

                  <div className={`hidden group-hover:flex items-center gap-1 ${isOpen ? 'block' : 'hidden lg:block'}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePinChat(session.id);
                      }}
                      title="Pin Chat"
                      className="p-1 hover:text-brand-500 text-slate-400"
                    >
                      <Pin className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(session.id);
                      }}
                      title="Delete Chat"
                      className="p-1 hover:text-rose-500 text-slate-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Bottom Actions Footer */}
      <div className="p-3 border-t border-slate-200/60 dark:border-slate-800/80 space-y-2">
        <button
          onClick={() => {
            playSound('click');
            setIsPromptLibraryOpen(true);
          }}
          className="w-full p-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
        >
          <BookOpen className="w-4 h-4 text-purple-500" />
          <span className={`${isOpen ? 'block' : 'hidden lg:block'}`}>Prompt Library</span>
        </button>

        <button
          onClick={() => {
            playSound('click');
            setIsSettingsOpen(true);
          }}
          className="w-full p-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 flex items-center gap-2.5 transition-colors"
        >
          <Settings className="w-4 h-4 text-slate-500" />
          <span className={`${isOpen ? 'block' : 'hidden lg:block'}`}>Workspace Settings</span>
        </button>
      </div>

    </aside>
  );
};
