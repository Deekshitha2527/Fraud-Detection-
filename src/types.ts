export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Blocked';

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  merchant: string;
  category: string;
  timestamp: string;
  user_id: string;
  ip_address: string;
  location: string;
  device: string;
  risk_score: number; // 0-100
  risk_level: RiskLevel;
  flags: string[];
}

export interface DashboardStats {
  totalAnalyzed: number;
  flaggedCount: number;
  blockedCount: number;
  totalVolume: number;
  safeCount: number;
  fraudPercentage: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}
