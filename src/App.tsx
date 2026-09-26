import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Landing Components
import { HeroSection } from './components/landing/HeroSection';
import { FeaturesSection } from './components/landing/FeaturesSection';
import { ModelShowcase } from './components/landing/ModelShowcase';
import { ExtensionShowcase } from './components/landing/ExtensionShowcase';
import { WhyChooseSection } from './components/landing/WhyChooseSection';
import { PricingSection } from './components/landing/PricingSection';
import { FAQSection } from './components/landing/FAQSection';
import { TestimonialsSection } from './components/landing/TestimonialsSection';
import { CTASection } from './components/landing/CTASection';

// Web App Components
import { ChatSidebar } from './components/webapp/ChatSidebar';
import { ChatArea } from './components/webapp/ChatArea';
import { PromptLibraryModal } from './components/webapp/PromptLibraryModal';
import { SettingsModal } from './components/webapp/SettingsModal';

// Extension Components
import { ExtensionSimulator } from './components/extension/ExtensionSimulator';
import { Sparkles, X } from 'lucide-react';

function AppContent() {
  const { currentView, extensionState, toggleExtensionOverlay } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1 flex flex-col">
        {currentView === 'landing' && (
          <div className="animate-fade-in">
            <HeroSection />
            <FeaturesSection />
            <ModelShowcase />
            <ExtensionShowcase />
            <WhyChooseSection />
            <PricingSection />
            <FAQSection />
            <TestimonialsSection />
            <CTASection />
            <Footer />
          </div>
        )}

        {currentView === 'webapp' && (
          <div className="flex-1 flex overflow-hidden relative">
            <ChatSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <ChatArea />
            <PromptLibraryModal />
            <SettingsModal />
          </div>
        )}

        {currentView === 'extension-demo' && (
          <div className="animate-fade-in flex-1 flex flex-col">
            <ExtensionSimulator />
            <Footer />
          </div>
        )}
      </main>

      {/* Global Floating Extension Widget Overlay Simulation */}
      {extensionState.floatingWidgetVisible && (
        <div className="fixed bottom-6 right-6 z-50 w-80 glass-panel rounded-2xl border border-brand-500/50 shadow-2xl p-4 bg-slate-950 text-white animate-bounce-subtle space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              <span className="font-bold text-xs">EchoGPT Extension Floating Tool</span>
            </div>
            <button onClick={toggleExtensionOverlay} className="hover:text-rose-400">
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            This floating widget simulates how EchoGPT stays dockable over any active website.
          </p>

          <div className="flex justify-end gap-2">
            <button
              onClick={toggleExtensionOverlay}
              className="px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs"
            >
              Got it
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}
