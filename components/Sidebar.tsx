
import React from 'react';
import { LayoutDashboard, Leaf, Target, FileText, Settings, Zap, Globe, Moon, Sun, ShieldCheck } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isDarkMode, toggleTheme }) => {
  const navItems = [
    { id: 'dashboard', label: 'Executive Summary', icon: LayoutDashboard },
    { id: 'carbon', label: 'Carbon Explorer', icon: Leaf },
    { id: 'targets', label: 'Target Tracker', icon: Target },
    { id: 'scenarios', label: 'Scenario Modeling', icon: Zap },
    { id: 'reports', label: 'Reporting', icon: FileText },
    { id: 'compliance', label: 'Compliance Hub', icon: ShieldCheck },
  ];

  // Shared class definitions for consistency
  const baseNavItemClass = "group w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-sidebar-primary";
  const activeClass = "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm";
  const inactiveClass = "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-sm";

  return (
    <aside className="w-72 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0 text-sidebar-foreground transition-colors duration-300 z-20">
      {/* Header */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border/50">
        <div className="flex items-center gap-1 select-none cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="relative flex items-center">
            <span className="text-3xl font-bold text-sidebar-primary tracking-tighter">eco</span>
            <Leaf className="absolute -top-1.5 -right-3.5 w-4 h-4 text-sidebar-primary fill-sidebar-primary/20 rotate-12" />
          </div>
          <span className="text-2xl font-semibold text-sidebar-foreground tracking-tight ml-3.5">Sight</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`${baseNavItemClass} ${
                isActive ? activeClass : inactiveClass
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-colors duration-200 ${
                isActive 
                  ? 'text-sidebar-primary-foreground' 
                  : 'text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground'
              }`} />
              <span>{item.label}</span>
              {isActive && (
                 <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary-foreground/30" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-sidebar-border/50 space-y-1">
        <button 
          onClick={toggleTheme}
          className={`${baseNavItemClass} ${inactiveClass} justify-between`}
        >
          <div className="flex items-center gap-3">
             {isDarkMode ? 
                <Moon className="w-5 h-5 text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground" /> : 
                <Sun className="w-5 h-5 text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground" />
             }
             <span>{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
          <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 border border-transparent ${
              isDarkMode ? 'bg-sidebar-primary' : 'bg-sidebar-border'
          }`}>
             <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full transition-all duration-300 shadow-sm ${
                 isDarkMode ? 'left-[18px]' : 'left-0.5'
             }`} />
          </div>
        </button>

        <button 
          onClick={() => setActiveTab('settings')}
          className={`${baseNavItemClass} ${activeTab === 'settings' ? activeClass : inactiveClass}`}
        >
          <Settings className={`w-5 h-5 shrink-0 transition-colors duration-200 ${
             activeTab === 'settings'
             ? 'text-sidebar-primary-foreground'
             : 'text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground'
          }`} />
          <span>Settings</span>
        </button>
        
        {/* User Profile */}
        <div className="mt-4 pt-4 border-t border-sidebar-border/50">
            <div className="flex items-center gap-3 px-2 rounded-lg hover:bg-sidebar-accent/50 p-2 cursor-pointer transition-colors">
                <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-primary font-bold text-xs border border-sidebar-border ring-2 ring-background">
                    JD
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-semibold text-sidebar-foreground truncate">Jane Doe</span>
                    <span className="text-xs text-sidebar-foreground/60 truncate">Sustainability Lead</span>
                </div>
            </div>
        </div>
      </div>
    </aside>
  );
};
