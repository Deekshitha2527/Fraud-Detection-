import React, { useState } from 'react';
import { Activity, ShieldAlert, History, BarChart3, Settings, LogOut, ShieldCheck, Moon, Sun, Menu, X, FileSearch, BookOpen } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useTheme } from '../ThemeContext';
import { cn } from '../lib/utils';
import Overview from './Overview';
import TransactionHistory from './TransactionHistory';
import Analytics from './Analytics';
import ManualAnalysis from './ManualAnalysis';
import Documentation from './Documentation';

type ViewMode = 'overview' | 'history' | 'analytics' | 'manual' | 'documentation' | 'settings';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [activeView, setActiveView] = useState<ViewMode>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NavItem = ({ icon, label, id }: { icon: React.ReactNode, label: string, id: ViewMode }) => (
    <button
      onClick={() => { setActiveView(id); setMobileMenuOpen(false); }}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
        activeView === id 
          ? "bg-rose-500/10 text-rose-500 dark:text-rose-400" 
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200"
      )}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-300 font-sans selection:bg-rose-500/30 flex transition-colors">
      
      {/* Mobile Nav Toggle */}
      <div className="md:hidden fixed top-0 inset-x-0 h-16 bg-white dark:bg-[#0A0D14]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
          </div>
          <span className="font-semibold text-slate-900 dark:text-white">FraudGuard</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-500">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-[#111623] border-r border-slate-200 dark:border-white/5 flex flex-col transition-transform duration-300 md:translate-x-0",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-200 dark:border-white/5 header-brand hidden md:flex">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.15)]">
            <ShieldAlert className="w-5 h-5 text-rose-500" />
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">FraudGuard</h1>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">Dashboards</div>
          <NavItem id="overview" icon={<Activity className="w-4 h-4" />} label="Live Overview" />
          <NavItem id="analytics" icon={<BarChart3 className="w-4 h-4" />} label="Analytics" />
          <NavItem id="history" icon={<History className="w-4 h-4" />} label="Transactions" />
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-6 px-4">Tools</div>
          <NavItem id="manual" icon={<FileSearch className="w-4 h-4" />} label="Manual Analysis" />
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-6 px-4">Resources</div>
          <NavItem id="documentation" icon={<BookOpen className="w-4 h-4" />} label="Project Documentation" />
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-white/5 space-y-2">
          <button
             onClick={toggleTheme}
             className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>

          <div className="mt-4 flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-slate-900 dark:text-white truncate">{user?.name}</div>
              <div className="text-xs text-slate-500 truncate">{user?.email}</div>
            </div>
            <button onClick={logout} className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 min-h-screen">
        {activeView === 'overview' && <Overview />}
        {activeView === 'history' && <TransactionHistory />}
        {activeView === 'analytics' && <Analytics />}
        {activeView === 'manual' && <ManualAnalysis />}
        {activeView === 'documentation' && <Documentation />}
      </main>
    </div>
  );
}
