import React, { useEffect, useState } from 'react';
import { Activity, ShieldAlert, ShieldBan, Search, Cpu, Play, Download } from 'lucide-react';
import { cn } from '../lib/utils';
import { Transaction, DashboardStats } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';

const mockChartData = [
  { name: '00:00', total: 1200, fraud: 15 },
  { name: '04:00', total: 900, fraud: 10 },
  { name: '08:00', total: 4500, fraud: 45 },
  { name: '12:00', total: 6800, fraud: 120 },
  { name: '16:00', total: 8400, fraud: 89 },
  { name: '20:00', total: 5200, fraud: 34 },
  { name: '24:00', total: 2100, fraud: 12 },
];

export default function Overview() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    fetch('/api/transactions')
      .then(r => r.json())
      .then(data => {
        setTransactions(data.transactions);
        setStats(data.stats);
        if (data.transactions.length > 0) {
          setSelectedTx(data.transactions[1]); // Default to the high risk one
        }
      });
      
    // Simulate live monitoring by adding a safe transaction every 15s
    const interval = setInterval(() => {
       setTransactions(prev => {
          const newTx: Transaction = {
            id: `TXN-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
            amount: Math.round(Math.random() * 200 * 100) / 100,
            currency: "USD",
            merchant: ["Amazon", "Uber", "Starbucks", "Netflix"][Math.floor(Math.random()*4)],
            category: "General",
            timestamp: new Date().toISOString(),
            user_id: `usr_${Math.floor(Math.random()*1000)}`,
            ip_address: "192.168.1.1",
            location: "Local",
            device: "Mobile",
            risk_score: Math.floor(Math.random() * 15),
            risk_level: "Low",
            flags: []
          };
          return [newTx, ...prev].slice(0, 10); // Keep last 10
       });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedTx) {
      setAiAnalysis('');
    }
  }, [selectedTx]);

  const analyzeWithAI = async () => {
    if (!selectedTx) return;
    setAnalyzing(true);
    setAiAnalysis('');
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ txId: selectedTx.id })
      });
      const data = await res.json();
      if (data.analysis) {
        setAiAnalysis(data.analysis);
      } else {
        setAiAnalysis("Analysis failed or AI key not configured.");
      }
    } catch (err) {
      setAiAnalysis("Error communicating with AI service.");
    } finally {
      setAnalyzing(false);
    }
  };

  const downloadReport = () => {
    if (!selectedTx) return;
    const doc = new jsPDF();
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("FraudGuard", 20, 20);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Fraud Detection Analysis Report", 20, 28);
    
    doc.setDrawColor(200);
    doc.line(20, 32, 190, 32);
    
    doc.setTextColor(0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Transaction Details", 20, 45);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Transaction ID: ${selectedTx.id}`, 20, 55);
    doc.text(`Date & Time: ${new Date(selectedTx.timestamp).toLocaleString()}`, 20, 62);
    doc.text(`Amount: $${selectedTx.amount.toFixed(2)}`, 20, 69);
    doc.text(`Transaction Type: ${selectedTx.category}`, 20, 76);
    
    doc.text(`Merchant: ${selectedTx.merchant}`, 110, 55);
    doc.text(`Location: ${selectedTx.location}`, 110, 62);
    doc.text(`Device Information: ${selectedTx.device}`, 110, 69);
    doc.text(`IP Address: ${selectedTx.ip_address}`, 110, 76);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("AI Prediction Result", 20, 95);
    
    doc.setFontSize(11);
    if (selectedTx.risk_level === 'High' || selectedTx.risk_level === 'Blocked') doc.setTextColor(200, 0, 0);
    else if (selectedTx.risk_level === 'Medium') doc.setTextColor(200, 150, 0);
    else doc.setTextColor(0, 150, 0);
    
    doc.setFont("helvetica", "bold");
    doc.text(`Risk Level: ${selectedTx.risk_level} Risk`, 20, 105);
    doc.text(`Risk Score: ${selectedTx.risk_score}/100`, 20, 112);
    doc.text(`Fraud Detected: ${selectedTx.risk_score > 50 ? 'Yes' : 'No'}`, 110, 105);
    doc.text(`Confidence Score: ${(Math.max(selectedTx.risk_score, 100 - selectedTx.risk_score) * 0.95).toFixed(1)}%`, 110, 112);
    doc.setTextColor(0);

    doc.setFont("helvetica", "bold");
    doc.text("Risk Factors & Flags:", 20, 128);
    doc.setFont("helvetica", "normal");
    let yPos = 135;
    if (selectedTx.flags.length > 0) {
      selectedTx.flags.forEach(flag => {
        doc.text(`• ${flag}`, 25, yPos);
        yPos += 7;
      });
    } else {
       doc.text("No significant risk factors flagged by rules engine.", 25, yPos);
       yPos += 7;
    }
    
    if (aiAnalysis) {
      yPos += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Analysis Summary (Gemini AI):", 20, yPos);
      doc.setFont("helvetica", "normal");
      yPos += 7;
      const splitText = doc.splitTextToSize(aiAnalysis, 170);
      doc.text(splitText, 20, yPos);
      yPos += (splitText.length * 6);
    }

    yPos += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Recommendations:", 20, yPos);
    doc.setFont("helvetica", "normal");
    yPos += 7;
    if (selectedTx.risk_score > 70) {
      doc.text("• Block the transaction immediately.", 25, yPos);
      doc.text("• Restrict user account and require 2FA identity validation.", 25, yPos + 7);
    } else if (selectedTx.risk_score > 30) {
      doc.text("• Place transaction under manual review queue.", 25, yPos);
      doc.text("• Monitor user account for further anomalous activity.", 25, yPos + 7);
    } else {
      doc.text("• Proceed with authorization normally.", 25, yPos);
    }
    
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text("Generated by FraudGuard Fraud Detection System", 105, 280, { align: 'center' });
    doc.text(`Report generated on: ${new Date().toLocaleString()}`, 105, 285, { align: 'center' });
    
    doc.save(`fraud-report-${selectedTx.id}.pdf`);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'High': return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      case 'Blocked': return 'bg-red-600/10 text-red-600 dark:text-red-500 border-red-600/20';
      default: return 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Live Monitoring</h1>
        <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 text-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Engine Active
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Processed" value={stats ? `$${(stats.totalVolume / 1000000).toFixed(2)}M` : '...'} trend="+12%" icon={<Activity className="text-blue-500 dark:text-blue-400" />} />
        <KPICard title="Analyzed TXs" value={stats?.totalAnalyzed.toLocaleString() || '...'} trend="+5.2%" icon={<Search className="text-indigo-500 dark:text-indigo-400" />} />
        <KPICard title="High Risk Flags" value={stats?.flaggedCount.toString() || '...'} trend="-2.1%" icon={<ShieldAlert className="text-amber-500 dark:text-amber-400" />} />
        <KPICard title="Blocked Attacks" value={stats?.blockedCount.toString() || '...'} trend="+14.5%" icon={<ShieldBan className="text-rose-600 dark:text-rose-500" />} block />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#111623] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-medium text-slate-900 dark:text-white">Transaction Velocity & Anomalies</h2>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" dark:stroke="#1e293b" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--tw-colors-slate-900, #0f172a)', borderColor: 'var(--tw-colors-slate-800, #1e293b)', borderRadius: '8px', color: '#fff' }} 
                />
                <Area type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                <Area type="monotone" dataKey="fraud" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorFraud)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Analysis Panel */}
        <div className="bg-white dark:bg-gradient-to-b dark:from-[#111623] dark:to-[#0A0D14] border border-slate-200 dark:border-rose-500/10 rounded-2xl p-6 relative overflow-hidden group shadow-sm">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent opacity-50 dark:opacity-100" />
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Cpu className="text-rose-500 dark:text-rose-400 w-5 h-5" />
              <h2 className="text-base font-medium text-slate-900 dark:text-white">AI Fraud Assistant</h2>
            </div>
            {selectedTx && (
              <button onClick={downloadReport} title="Download Report" className="text-slate-400 hover:text-rose-500 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            )}
          </div>

          {selectedTx ? (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-black/20 rounded-lg border border-slate-200 dark:border-white/5 space-y-1">
                <div className="text-xs text-slate-500 uppercase tracking-wide">Selected Profile</div>
                <div className="font-mono text-sm text-blue-600 dark:text-blue-400">{selectedTx.id}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className={cn("px-2 py-0.5 rounded-md text-xs border font-medium", getRiskColor(selectedTx.risk_level))}>
                    {selectedTx.risk_level} Risk
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">Score: {selectedTx.risk_score}/100</span>
                </div>
              </div>
              
              {selectedTx.flags.length > 0 && (
                <div className="space-y-1">
                  <div className="text-xs font-medium text-slate-500">Why flagged?</div>
                  <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 pl-4 list-disc marker:text-rose-500">
                    {selectedTx.flags.map((flag, idx) => (
                      <li key={idx}>{flag}</li>
                    ))}
                  </ul>
                </div>
              )}

              {aiAnalysis ? (
                 <div className="space-y-2">
                  <div className="text-xs font-medium text-slate-500">Assistant says:</div>
                  <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 p-4 bg-rose-50 dark:bg-rose-500/5 rounded-lg border border-rose-100 dark:border-rose-500/10 shadow-inner">
                    {aiAnalysis}
                  </div>
                </div>
              ) : (
                <button 
                  onClick={analyzeWithAI}
                  disabled={analyzing}
                  className="w-full flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-500 text-white py-2.5 rounded-lg text-sm font-medium transition-all shadow-md disabled:opacity-50 mt-4"
                >
                  {analyzing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analyzing via Gemini...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Play className="w-4 h-4" /> Ask AI Why Flagged
                    </span>
                  )}
                </button>
              )}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-sm text-slate-500">
              Select a transaction below.
            </div>
          )}
        </div>
      </div>

      {/* Transaction Feed */}
      <div className="bg-white dark:bg-[#111623] border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
          <h2 className="text-base font-medium text-slate-900 dark:text-white">Live Monitoring Stream</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-black/20 border-b border-slate-200 dark:border-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">Tx ID / Time</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Merchant & Location</th>
                <th className="px-6 py-4 font-medium">Risk Score</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {transactions.map((tx) => (
                <tr 
                  key={tx.id} 
                  onClick={() => setSelectedTx(tx)}
                  className={cn(
                    "hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer",
                    selectedTx?.id === tx.id ? "bg-slate-50 dark:bg-white/5 border-l-2 border-rose-500" : "border-l-2 border-transparent"
                  )}
                >
                  <td className="px-6 py-4">
                    <div className="font-mono text-slate-700 dark:text-slate-300">{tx.id}</div>
                    <div className="text-xs text-slate-500 mt-1">{new Date(tx.timestamp).toLocaleTimeString()}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-700 dark:text-slate-300">{tx.merchant}</div>
                    <div className="text-xs text-slate-500 mt-1">{tx.location}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-slate-200 dark:bg-black/40 rounded-full h-1.5 max-w-[60px]">
                        <div 
                          className={cn("h-1.5 rounded-full", tx.risk_score > 70 ? "bg-rose-500" : tx.risk_score > 30 ? "bg-amber-400" : "bg-emerald-400")} 
                          style={{ width: `${Math.min(tx.risk_score, 100)}%` }} 
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{tx.risk_score}/100</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2.5 py-1 text-xs rounded-md border font-medium shadow-sm inline-flex", getRiskColor(tx.risk_level))}>
                      {tx.risk_level}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, trend, icon, block }: { title: string, value: string, trend: string, icon: React.ReactNode, block?: boolean }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className={cn("bg-white dark:bg-[#111623] shadow-sm border rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden", block ? "border-rose-200 dark:border-rose-500/20 dark:shadow-[0_0_20px_rgba(244,63,94,0.05)]" : "border-slate-200 dark:border-white/5")}>
      {block && <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 dark:bg-rose-500/5 rounded-full blur-3xl opacity-50 dark:opacity-100" />}
      <div className="flex justify-between items-start mb-4">
        <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</div>
        <div className="p-2 bg-slate-50 dark:bg-black/20 rounded-lg border border-slate-100 dark:border-white/5">
          {icon}
        </div>
      </div>
      <div>
        <div className="text-2xl font-semibold text-slate-900 dark:text-white tracking-tight">{value}</div>
        <div className="flex items-center gap-2 mt-2">
          <span className={cn("text-xs font-medium", isPositive ? "text-emerald-500 dark:text-emerald-400" : "text-amber-500 dark:text-amber-400")}>
            {trend}
          </span>
          <span className="text-xs text-slate-500">vs last 24h</span>
        </div>
      </div>
    </div>
  );
}
