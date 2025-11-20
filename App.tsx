
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { CarbonExplorer } from './components/CarbonExplorer';
import { TargetTracker } from './components/TargetTracker';
import { ReportingCenter } from './components/ReportingCenter';
import { SettingsPage } from './components/SettingsPage';
import { ScenarioModeling } from './components/ScenarioModeling';
import { ComplianceHub } from './components/ComplianceHub';
import { Menu, Leaf } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'carbon':
        return <CarbonExplorer />;
      case 'targets':
        return <TargetTracker />;
      case 'scenarios':
        return <ScenarioModeling />;
      case 'reports':
        return <ReportingCenter />;
      case 'compliance':
        return <ComplianceHub />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground animate-in fade-in">
             <div className="bg-muted p-6 rounded-full mb-4">
                <Menu className="w-8 h-8" />
             </div>
             <h2 className="text-xl font-semibold text-foreground">Coming Soon</h2>
             <p className="text-muted-foreground max-w-md text-center mt-2">This module is currently under development for Phase 2.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-background font-sans text-foreground transition-colors duration-300">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
         <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-auto transition-transform duration-200 ease-in-out`}>
         <Sidebar 
            activeTab={activeTab} 
            setActiveTab={(tab) => { setActiveTab(tab); setIsMobileMenuOpen(false); }}
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
         />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-card border-b border-border p-4 flex items-center justify-between sticky top-0 z-30">
           <div className="flex items-center gap-1 select-none">
              <div className="relative flex items-center">
                <span className="text-xl font-bold text-primary tracking-tighter">eco</span>
                <Leaf className="absolute -top-1 -right-2.5 w-3 h-3 text-primary fill-primary/20 rotate-12" />
              </div>
              <span className="text-xl font-semibold text-foreground tracking-tight ml-2.5">Sight</span>
           </div>
           <button onClick={() => setIsMobileMenuOpen(true)} className="text-muted-foreground hover:bg-muted p-2 rounded-lg">
              <Menu className="w-6 h-6" />
           </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
