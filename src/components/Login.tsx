import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { ShieldCheck, Lock, Mail, User } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../ThemeContext';

export function Login() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      login(name || 'Admin User', email || 'admin@fraudguard.local');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-300 transition-colors">
      <div className="w-full max-w-md p-8 bg-white dark:bg-[#111623] rounded-2xl shadow-xl dark:border dark:border-white/5 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.15)] mb-4">
            <ShieldCheck className="w-7 h-7 text-rose-500" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">FraudGuard</h1>
          <p className="text-sm text-slate-500 mt-1">{isRegister ? 'Create an admin account' : 'Sign in to access dashboard'}</p>
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
          {isRegister && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-slate-400" />
              </div>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                placeholder="admin@fraudguard.local"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-slate-400" />
              </div>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-medium transition-all shadow-md mt-6 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating...
              </>
            ) : (
              isRegister ? 'Create Account' : 'Sign In'
            )}
          </button>
        </form>

        <div className="relative z-10 mt-6 text-center">
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-sm text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
          >
            {isRegister ? 'Already have an account? Sign In' : 'Need an admin account? Register'}
          </button>
        </div>
      </div>
    </div>
  );
}
