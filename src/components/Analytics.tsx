import React, { useEffect, useState } from 'react';
import { DashboardStats } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';

const RISK_DISTRIBUTION = [
  { name: 'Low Risk', value: 8500, color: '#10b981' },
  { name: 'Medium Risk', value: 1200, color: '#f59e0b' },
  { name: 'High Risk', value: 300, color: '#f43f5e' },
];

const MONTHLY_TRENDS = [
  { name: 'Jan', fraud: 400, safe: 2400 },
  { name: 'Feb', fraud: 300, safe: 1398 },
  { name: 'Mar', fraud: 200, safe: 9800 },
  { name: 'Apr', fraud: 278, safe: 3908 },
  { name: 'May', fraud: 189, safe: 4800 },
  { name: 'Jun', fraud: 239, safe: 3800 },
];

export default function Analytics() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetch('/api/transactions')
      .then(r => r.json())
      .then(data => {
        setStats(data.stats);
      });
  }, []);

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Analytics Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Transactions" value={stats?.totalAnalyzed.toLocaleString() || "..."} />
        <StatCard title="Safe Transactions" value={stats?.safeCount.toLocaleString() || "..."} color="emerald" />
        <StatCard title="Fraud Cases" value={(stats ? stats.flaggedCount + stats.blockedCount : 0).toLocaleString() || "..."} color="rose" />
        <StatCard title="Fraud Percentage" value={stats ? `${stats.fraudPercentage}%` : "..."} color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-[#111623] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-medium text-slate-900 dark:text-white mb-6">Risk Distribution</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={RISK_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {RISK_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'var(--tw-colors-slate-900, #0f172a)', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-[#111623] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-medium text-slate-900 dark:text-white mb-6">Monthly Fraud vs Safe Trends</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_TRENDS} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" dark:stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--tw-colors-slate-900, #0f172a)', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }} cursor={{fill: 'transparent'}} />
                <Legend />
                <Bar dataKey="safe" stackId="a" fill="#10b981" />
                <Bar dataKey="fraud" stackId="a" fill="#f43f5e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color = "slate" }: { title: string, value: string, color?: "slate"|"rose"|"emerald"|"amber" }) {
  const getColors = () => {
    switch(color) {
        case 'rose': return 'text-rose-600 dark:text-rose-400';
        case 'emerald': return 'text-emerald-600 dark:text-emerald-400';
        case 'amber': return 'text-amber-600 dark:text-amber-400';
        default: return 'text-slate-900 dark:text-white';
    }
  }
  return (
    <div className="bg-white dark:bg-[#111623] border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-sm">
      <div className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">{title}</div>
      <div className={`text-3xl font-semibold tracking-tight ${getColors()}`}>{value}</div>
    </div>
  )
}
