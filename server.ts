import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

// Fixed set of initial mock transactions
let mockTransactions = [
  {
    id: "TXN-84B29A",
    amount: 145.50,
    currency: "USD",
    merchant: "Amazon.com",
    category: "Retail",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    user_id: "usr_992x1",
    ip_address: "192.168.1.45",
    location: "Seattle, WA, US",
    device: "iPhone 13 Pro",
    risk_score: 12,
    risk_level: "Low",
    flags: []
  },
  {
    id: "TXN-99X101",
    amount: 4500.00,
    currency: "USD",
    merchant: "CryptoEx",
    category: "Finance",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    user_id: "usr_771b4",
    ip_address: "45.22.11.99",
    location: "Moscow, RU",
    device: "Unknown Linux",
    risk_score: 89,
    risk_level: "High",
    flags: ["Unusual location", "High amount for user", "New device"]
  },
  {
    id: "TXN-22B44C",
    amount: 12.99,
    currency: "USD",
    merchant: "Spotify",
    category: "Subscription",
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    user_id: "usr_102a9",
    ip_address: "10.0.0.12",
    location: "Austin, TX, US",
    device: "MacBook Pro",
    risk_score: 2,
    risk_level: "Low",
    flags: []
  },
  {
    id: "TXN-44V91Z",
    amount: 12999.00,
    currency: "USD",
    merchant: "Rolex Authorized Dealer",
    category: "Luxury",
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    user_id: "usr_404c2",
    ip_address: "142.250.190.46",
    location: "London, UK",
    device: "Windows PC",
    risk_score: 95,
    risk_level: "Blocked",
    flags: ["Velocity rule triggered", "IP mismatch with billing", "Device hygiene poor"]
  },
  {
    id: "TXN-LL891X",
    amount: 350.00,
    currency: "USD",
    merchant: "BestBuy",
    category: "Electronics",
    timestamp: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
    user_id: "usr_812c3",
    ip_address: "172.16.254.1",
    location: "Chicago, IL, US",
    device: "iPad Air",
    risk_score: 45,
    risk_level: "Medium",
    flags: ["VPN detected"]
  }
];

app.get("/api/transactions", (req, res) => {
  const total = mockTransactions.length + 15284;
  const flagged = 142;
  const blocked = 41;
  const safe = total - flagged - blocked;
  const fp = ((flagged + blocked) / total) * 100;
  res.json({
    transactions: mockTransactions,
    stats: {
      totalAnalyzed: total,
      flaggedCount: flagged,
      blockedCount: blocked,
      totalVolume: 1045239.50,
      safeCount: safe,
      fraudPercentage: parseFloat(fp.toFixed(2))
    }
  });
});

app.post("/api/analyze", async (req, res) => {
  if (!ai) {
    return res.status(503).json({ error: "AI API Key not configured" });
  }

  try {
    const { txId } = req.body;
    const tx = mockTransactions.find(t => t.id === txId);
    
    if (!tx) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are a Senior Fraud Data Analyst. Analyze this transaction and explain in a short 2-3 sentence paragraph why it has a risk score of ${tx.risk_score} (Level: ${tx.risk_level}). Mention the flags: ${tx.flags.join(', ') || 'None'}. Keep it highly professional and brief. Data: ${JSON.stringify(tx)}`
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "Failed to analyze transaction" });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
