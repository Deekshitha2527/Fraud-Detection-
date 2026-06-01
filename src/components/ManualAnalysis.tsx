import React, { useState } from 'react';
import { FileSearch, ShieldAlert, Cpu, Download, Info, CheckCircle2, AlertTriangle, XCircle, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import jsPDF from 'jspdf';

interface AnalysisForm {
  amount: number;
  type: string;
  location: string;
  device: string;
  frequency: string; // e.g. "Low", "Medium", "High"
  accountAge: number; // in days
  previousFraud: boolean;
  time: string;
}

interface AnalysisResult {
  score: number;
  level: string;
  probability: number;
  summary: string;
  factors: string[];
  recommendations: string[];
}

export default function ManualAnalysis() {
  const [form, setForm] = useState<AnalysisForm>({
    amount: 0,
    type: 'Purchase',
    location: '',
    device: 'Web Browser',
    frequency: 'Low',
    accountAge: 30,
    previousFraud: false,
    time: '12:00',
  });
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setResult(null);

    setTimeout(() => {
      let score = 10;
      const factors: string[] = [];
      const recommendations: string[] = [];

      if (form.amount > 5000) {
        score += 30;
        factors.push("High transaction amount (over $5,000)");
        recommendations.push("Verify identity with 2FA or phone call.");
      } else if (form.amount > 1000) {
        score += 15;
        factors.push("Unusually large transaction amount");
      }

      if (form.location.toLowerCase().includes('unknown') || form.location.toLowerCase().includes('proxy') || form.location.toLowerCase().includes('vpn')) {
        score += 25;
        factors.push("Transaction originates from a suspicious or hidden location");
        recommendations.push("Cross-reference IP location with billing address.");
      }

      if (form.device === 'New/Unknown Device') {
        score += 20;
        factors.push("New or unrecognized device detected");
        recommendations.push("Require device verification via email code before processing.");
      }

      if (form.frequency === 'High') {
        score += 25;
        factors.push("High frequency of transactions in a short period (Velocity flag)");
        recommendations.push("Implement a temporary cooldown or soft-lock on the account.");
      }

      if (form.accountAge < 7) {
        score += 15;
        factors.push("Account is very new (under 7 days)");
      }

      if (form.previousFraud) {
        score += 40;
        factors.push("User has a previous history of fraudulent activity");
        recommendations.push("Manually review all transactions from this user moving forward.");
      }

      const isNightTime = () => {
        const hour = parseInt(form.time.split(':')[0] || '0', 10);
        return hour >= 0 && hour <= 5;
      };

      if (isNightTime()) {
        score += 10;
        factors.push("Transaction placed during irregular hours (Night time)");
      }

      score = Math.min(Math.max(score, 0), 100);

      let level = 'Low';
      if (score > 70) level = 'High';
      else if (score > 30) level = 'Medium';

      let summary = "";
      if (level === 'High') {
        summary = `The transaction has been classified as High Risk due to a combination of high-risk indicators. Manual intervention is strongly advised.`;
        if (recommendations.length === 0) recommendations.push("This transaction should be reviewed and potentially blocked before approval.");
      } else if (level === 'Medium') {
         summary = `The transaction has been classified as Medium Risk. Some suspicious patterns were detected.`;
         if (recommendations.length === 0) recommendations.push("Monitor the account for further unusual activity.");
      } else {
         summary = `The transaction appears standard and poses Low Risk. No significant suspicious indicators were detected.`;
         if (recommendations.length === 0) recommendations.push("Proceed with standard processing.");
      }

      setResult({
        score,
        level,
        probability: parseFloat((score * 0.95).toFixed(1)),
        summary,
        factors: factors.length > 0 ? factors : ["No significant risk factors detected."],
        recommendations
      });
      setAnalyzing(false);
    }, 1500);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-emerald-500';
      case 'Medium': return 'text-amber-500';
      case 'High': return 'text-rose-500';
      default: return 'text-slate-500';
    }
  };
  
  const getRiskBg = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-emerald-500';
      case 'Medium': return 'bg-amber-500';
      case 'High': return 'bg-rose-500';
      default: return 'bg-slate-500';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'Low': return <CheckCircle2 className="w-12 h-12 text-emerald-500" />;
      case 'Medium': return <AlertTriangle className="w-12 h-12 text-amber-500" />;
      case 'High': return <XCircle className="w-12 h-12 text-rose-500" />;
      default: return <Info className="w-12 h-12 text-slate-500" />;
    }
  };

  const downloadReport = () => {
    if (!result) return;
    const doc = new jsPDF();
    
    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("FraudGuard", 20, 20);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Fraud Detection Analysis Report", 20, 28);
    
    // Divider
    doc.setDrawColor(200);
    doc.line(20, 32, 190, 32);
    
    // Details
    doc.setTextColor(0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Transaction Details", 20, 45);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Amount: $${form.amount.toFixed(2)}`, 20, 55);
    doc.text(`Transaction Type: ${form.type}`, 20, 62);
    doc.text(`Location: ${form.location || 'N/A'}`, 20, 69);
    doc.text(`Device Information: ${form.device}`, 20, 76);
    doc.text(`Time: ${form.time}`, 110, 55);
    doc.text(`Account Age: ${form.accountAge} days`, 110, 62);
    doc.text(`Frequency Level: ${form.frequency}`, 110, 69);
    doc.text(`Previous Fraud History: ${form.previousFraud ? 'Yes' : 'No'}`, 110, 76);

    // Analysis Result
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Manual Analysis Result", 20, 95);
    
    doc.setFontSize(11);
    if (result.level === 'High') doc.setTextColor(200, 0, 0); // Red
    else if (result.level === 'Medium') doc.setTextColor(200, 150, 0); // Orange
    else doc.setTextColor(0, 150, 0); // Green
    
    doc.setFont("helvetica", "bold");
    doc.text(`Risk Level: ${result.level} Risk`, 20, 105);
    doc.text(`Risk Score: ${result.score}/100`, 20, 112);
    doc.text(`Fraud Probability: ${result.probability}%`, 110, 105);
    doc.setTextColor(0);
    
    // Summary
    doc.setFont("helvetica", "bold");
    doc.text("Analysis Summary:", 20, 125);
    doc.setFont("helvetica", "normal");
    const splitSummary = doc.splitTextToSize(result.summary, 170);
    doc.text(splitSummary, 20, 132);
    
    let yPos = 135 + (splitSummary.length * 6);
    
    // Factors
    doc.setFont("helvetica", "bold");
    doc.text("Risk Factors Detected:", 20, yPos);
    doc.setFont("helvetica", "normal");
    yPos += 7;
    result.factors.forEach(factor => {
      doc.text(`• ${factor}`, 25, yPos);
      yPos += 7;
    });

    yPos += 5;
    
    // Recommendations
    doc.setFont("helvetica", "bold");
    doc.text("Recommendations:", 20, yPos);
    doc.setFont("helvetica", "normal");
    yPos += 7;
    result.recommendations.forEach(rec => {
      doc.text(`• ${rec}`, 25, yPos);
      yPos += 7;
    });

    // Footer
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text("Generated by FraudGuard Fraud Detection System", 105, 280, { align: 'center' });
    doc.text(`Report generated on: ${new Date().toLocaleString()}`, 105, 285, { align: 'center' });

    doc.save(`analysis-report-${Date.now()}.pdf`);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Manual Analysis</h1>
          <p className="text-sm text-slate-500 mt-1">Run rule-based evaluations independent of AI.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Form Details */}
        <div className="bg-white dark:bg-[#111623] border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-medium text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-blue-500" />
            Transaction Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Transaction Amount ($)</label>
              <input
                type="number"
                value={form.amount}
                onChange={e => setForm({...form, amount: parseFloat(e.target.value) || 0})}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all font-mono"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Transaction Type</label>
              <select
                value={form.type}
                onChange={e => setForm({...form, type: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
              >
                <option>Purchase</option>
                <option>Transfer</option>
                <option>Withdrawal</option>
                <option>Refund</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Location</label>
              <input
                type="text"
                placeholder="e.g. New York, VPN"
                value={form.location}
                onChange={e => setForm({...form, location: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Device Type</label>
              <select
                value={form.device}
                onChange={e => setForm({...form, device: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
              >
                <option>Web Browser</option>
                <option>Mobile App</option>
                <option>New/Unknown Device</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Transaction Frequency</label>
              <select
                value={form.frequency}
                onChange={e => setForm({...form, frequency: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Transaction Time (HH:MM)</label>
              <input
                type="time"
                value={form.time}
                onChange={e => setForm({...form, time: e.target.value})}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Account Age (Days)</label>
              <input
                type="number"
                value={form.accountAge}
                onChange={e => setForm({...form, accountAge: parseInt(e.target.value) || 0})}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all font-mono"
              />
            </div>
            
            <div className="space-y-1 flex items-end pb-2">
               <label className="flex items-center gap-2 cursor-pointer group">
                 <input 
                   type="checkbox" 
                   checked={form.previousFraud}
                   onChange={e => setForm({...form, previousFraud: e.target.checked})}
                   className="w-4 h-4 rounded text-rose-500 focus:ring-rose-500/50 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-black/20"
                 />
                 <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">Has Previous Fraud History</span>
               </label>
            </div>
          </div>

          <button 
            onClick={handleAnalyze}
            disabled={analyzing}
            className="w-full mt-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {analyzing ? (
               <>
                 <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 Running Rules Engine...
               </>
            ) : (
               <>
                 <ShieldAlert className="w-4 h-4" />
                 Analyze Transaction
               </>
            )}
          </button>
        </div>

        {/* Results Panel */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-b dark:from-[#111623] dark:to-[#0A0D14] border border-slate-200 dark:border-white/5 shadow-sm p-6 min-h-[500px] flex flex-col">
          {!result && !analyzing ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4 border border-slate-200 dark:border-white/5">
                <Cpu className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">Awaiting Analysis</h3>
              <p className="text-sm text-slate-500 mt-2 max-w-[250px]">Enter transaction profiles manually and run the rules engine to generate a risk report.</p>
            </div>
          ) : analyzing ? (
             <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] relative">
                  <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 border-t-blue-500 animate-spin" />
                  <FileSearch className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">Processing Weights...</h3>
                <p className="text-sm text-slate-500 mt-2">Applying predefined fraud heuristics.</p>
             </div>
          ) : result && (
             <div className="flex-1 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex items-start justify-between mb-8">
                 <div className="flex gap-4 items-center">
                    {getRiskIcon(result.level)}
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Risk Score: <span className={getRiskColor(result.level)}>{result.score}/100</span>
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn("px-2.5 py-0.5 rounded text-xs font-medium border", getRiskColor(result.level), `border-${getRiskColor(result.level).split('-')[1]}-500/20`, `bg-${getRiskColor(result.level).split('-')[1]}-500/10`)}>
                          {result.level} Risk
                        </span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                           Probability: <span className="font-medium text-slate-700 dark:text-slate-300">{result.probability}%</span>
                        </span>
                      </div>
                    </div>
                 </div>
                 
                 <button 
                  onClick={downloadReport}
                  className="p-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-slate-300 flex flex-col items-center gap-1 group"
                  title="Download PDF Report"
                 >
                   <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform text-rose-500" />
                   <span className="text-[10px] font-semibold">PDF</span>
                 </button>
               </div>

               {/* Meter */}
               <div className="mb-8">
                 <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
                   <span>Safe (0)</span>
                   <span>Review (50)</span>
                   <span>Critical (100)</span>
                 </div>
                 <div className="h-3 w-full bg-slate-100 dark:bg-black/40 rounded-full overflow-hidden relative">
                   <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-500 opacity-20 w-full" />
                   <div 
                     className={cn("h-full rounded-full relative transition-all duration-1000", getRiskBg(result.level))} 
                     style={{ width: `${result.score}%` }} 
                   >
                     <div className="absolute inset-0 bg-white/20 w-full animate-pulse" />
                   </div>
                 </div>
               </div>

               <div className="space-y-6">
                 <div>
                   <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-2">Analysis Summary</h4>
                   <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 p-3 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/5">
                     {result.summary}
                   </p>
                 </div>

                 <div>
                   <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                     <AlertTriangle className="w-4 h-4 text-amber-500" /> Risk Factors
                   </h4>
                   <ul className="space-y-2">
                     {result.factors.map((factor, i) => (
                       <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                         <ChevronRight className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                         <span>{factor}</span>
                       </li>
                     ))}
                   </ul>
                 </div>

                 <div>
                   <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                     <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Recommendations
                   </h4>
                   <ul className="space-y-2 pb-4">
                     {result.recommendations.map((rec, i) => (
                       <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                         <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                         </div>
                         <strong className="font-medium text-slate-900 dark:text-white">{rec}</strong>
                       </li>
                     ))}
                   </ul>
                 </div>
               </div>

             </div>
          )}
        </div>

      </div>
    </div>
  );
}
