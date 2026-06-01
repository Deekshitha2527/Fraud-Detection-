import React, { useState } from 'react';
import { BookOpen, Map, Settings, Code, FileText, Briefcase, GraduationCap, Users, LayoutDashboard, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('overview');

  const navItems = [
    { id: 'overview', icon: <BookOpen className="w-4 h-4" />, label: '1. Project Overview' },
    { id: 'workflow', icon: <Map className="w-4 h-4" />, label: '2. Project Workflow' },
    { id: 'features', icon: <LayoutDashboard className="w-4 h-4" />, label: '3. Features Used' },
    { id: 'tech', icon: <Code className="w-4 h-4" />, label: '4. Technologies Used' },
    { id: 'code', icon: <FileText className="w-4 h-4" />, label: '5. Code Explanation' },
    { id: 'architecture', icon: <Settings className="w-4 h-4" />, label: '6. System Architecture' },
    { id: 'ml', icon: <Briefcase className="w-4 h-4" />, label: '7. Machine Learning & AI' },
    { id: 'usecases', icon: <Users className="w-4 h-4" />, label: '8. Real-World Use Cases' },
    { id: 'proscons', icon: <Settings className="w-4 h-4" />, label: '9. Advantages & Limitations' },
    { id: 'future', icon: <Briefcase className="w-4 h-4" />, label: '10. Future Enhancements' },
    { id: 'viva', icon: <GraduationCap className="w-4 h-4" />, label: '11. Viva Questions' },
    { id: 'script', icon: <BookOpen className="w-4 h-4" />, label: '12. Teacher Script' },
    { id: 'resume', icon: <FileText className="w-4 h-4" />, label: '13. Resume & LinkedIn' },
    { id: 'interview', icon: <Briefcase className="w-4 h-4" />, label: '14. Interview Prep' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Table of Contents sidebar */}
      <div className="w-full md:w-64 shrink-0">
        <div className="sticky top-24 bg-white dark:bg-[#111623] border border-slate-200 dark:border-white/5 rounded-2xl p-4 shadow-sm h-[calc(100vh-120px)] overflow-y-auto">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Documentation</h3>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left",
                  activeSection === item.id
                    ? "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 font-medium"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"
                )}
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-white dark:bg-[#111623] border border-slate-200 dark:border-white/5 rounded-2xl p-6 md:p-10 shadow-sm min-h-[calc(100vh-120px)]">
        
        {/* 1. Overview */}
        {activeSection === 'overview' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">1. Project Overview</h1>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">What is the purpose of this project?</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                FraudGuard is an AI-powered fraud detection and monitoring dashboard designed to analyze financial transactions in real-time. The core purpose is to identify anomalous patterns, calculate risk scores securely without human intervention, and provide explainable AI insights into why a specific transaction was flagged.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">What problem does it solve?</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                Modern financial institutions process millions of transactions per second. Traditional rule-based engines produce high false-positive rates and lack contextual understanding. This project solves the problem by combining a strict heuristic rules engine with a Generative AI assistant to provide human-readable, context-aware analyses, significantly reducing Analyst investigation time.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Who are the target users?</h3>
              <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1">
                <li><strong>Fraud Analysts:</strong> To manually investigate suspicious activity and generate reports.</li>
                <li><strong>Risk Managers:</strong> To view high-level analytics, trends, and risk distribution metrics.</li>
                <li><strong>Customer Support:</strong> To quickly explain to a customer why their transaction was blocked.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Why is this project useful?</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                It bridges the gap between binary "Fraud / Not Fraud" predictions and decision support systems. By providing a scale out of 100, contextual flags, and PDF exports, it acts as a complete platform rather than just a machine learning script.
              </p>
            </div>
          </div>
        )}

        {/* 2. Workflow */}
        {activeSection === 'workflow' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">2. Project Workflow</h1>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Step-by-step Execution</h3>
              <ol className="list-decimal pl-5 text-slate-700 dark:text-slate-300 space-y-3">
                <li><strong>Authentication:</strong> The user opens the web application and is greeted by an Admin login page. Once authenticated, a secure session is stored.</li>
                <li><strong>Data Retrieval:</strong> The React frontend makes a REST API request to the Express backend to fetch the latest telemetry data and mock transactions.</li>
                <li><strong>Dashboard Rendering:</strong> The Live Overview renders real-time KPI metrics, charting the ratio of total transactions to malicious attempts.</li>
                <li><strong>Live Feed Simulation:</strong> The system continuously simulates incoming transactions every 15 seconds, dynamically updating the risk meters on the UI.</li>
                <li><strong>Deep AI Analysis:</strong> When an analyst selects a transaction and clicks "Ask AI", the backend formats the transaction details and sends a prompt to the Gemini LLM. The AI responds with a conversational risk assessment.</li>
                <li><strong>Reporting:</strong> The user can utilize the Manual Analysis tool to input edge-case transactions, dynamically process heuristics, and generate downloadable PDF reports.</li>
              </ol>
            </div>
          </div>
        )}

        {/* 3. Features */}
        {activeSection === 'features' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">3. Core Features</h1>
            
            <div className="space-y-4">
              <FeatureCard 
                title="Live Telemetry Monitoring" 
                purpose="Display transactions in real-time."
                works="Uses React state to map an array of transactions, simulating new arrivals via intervals."
                benefits="Allows analysts to see threats as they happen rather than waiting for batches."
              />
              <FeatureCard 
                title="Gemini AI Fraud Assistant" 
                purpose="To contextualize risk scores in human language."
                works="Passes transaction JSON to a Server-Side Gemini prompt, requesting a data analyst perspective."
                benefits="Reduces the subjective guesswork of interpreting raw flags and scores."
              />
              <FeatureCard 
                title="Manual Rules Engine" 
                purpose="Allow edge-case analysis independent of live feeds."
                works="A complex React form triggers an algorithmic weight evaluation (e.g. amounts > $5000 = +30 points, night time = +10)."
                benefits="Interactivity. The analyst feels in control of the evaluation."
              />
              <FeatureCard 
                title="PDF & CSV Export Pipeline" 
                purpose="To allow reporting and archiving."
                works="Uses `jsPDF` to draw text strings dynamically onto a PDF canvas, and browser Blob APIs for CSV downloads."
                benefits="Turns the application from a 'viewer' into an enterprise utility tool."
              />
            </div>
          </div>
        )}

        {/* 4. Technologies */}
        {activeSection === 'tech' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">4. Technologies Used</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TechCard name="React 18" role="Frontend Library" desc="Component-based UI rendering. Chosen for its massive ecosystem and state management capabilities." />
              <TechCard name="Tailwind CSS" role="Styling Engine" desc="Utility-first styling for rapid, consistent, responsive design without writing custom CSS files." />
              <TechCard name="Node.js & Express" role="Backend API" desc="Serves API routes and securely handles the Gemini secret keys so they are not exposed to the browser." />
              <TechCard name="Google Gemini API" role="AI / LLM" desc="Provides the Generative AI text reasoning for transaction explanations and contextual awareness." />
              <TechCard name="Recharts" role="Data Visualization" desc="A composable charting library built on React components for rendering SVGs." />
              <TechCard name="jsPDF" role="Reporting" desc="Client-side PDF generation library for exporting reports without server overhead." />
            </div>
          </div>
        )}

        {/* 5. Code Explanation */}
        {activeSection === 'code' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">5. Code Explanation</h1>
            
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Folder Structure</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><code>/src/main.tsx</code> - The React application entry point. Wraps Auth and Theme contexts.</li>
                <li><code>/src/components/</code> - Modular UI files (Overview, Analytics, History, ManualAnalysis).</li>
                <li><code>/server.ts</code> - The Express backend. Handles API proxies and Vite development middleware.</li>
                <li><code>/src/AuthContext.tsx</code> - Manages user login state globally.</li>
                <li><code>/src/types.ts</code> - TypeScript interfaces ensuring strict data structure compliance.</li>
              </ul>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-4">Important Functions</h3>
              <p><strong><code>handleAnalyze()</code> (in ManualAnalysis):</strong> The core heuristic engine. It takes form input and applies cumulative scoring. Eg: <code>if (amount &gt; 5000) score += 30;</code>.</p>
              <p><strong><code>analyzeWithAI()</code>:</strong> Sends a POST request to <code>/api/analyze</code>. The server then securely calls the Gemini SDK using <code>process.env.GEMINI_API_KEY</code> and returns the text generation.</p>
            </div>
          </div>
        )}

        {/* 6. Architecture */}
        {activeSection === 'architecture' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">6. System Architecture</h1>
            
            <div className="bg-slate-50 dark:bg-black/20 p-6 rounded-xl border border-slate-200 dark:border-white/5 font-mono text-xs overflow-x-auto whitespace-pre">
{`+----------------+       +------------------+       +-------------------------+
|                |       |                  |       |  Gemini AI API          |
|  User Browser  | <---> |  Express Server  | <---> |  (LLM Prompting)        |
|  (React/Vite)  | JSON  |  (Node.js)       | SDK   |                         |
|                |       |                  |       +-------------------------+
+-------+--------+       +--------+---------+
        |                         |
        v                         v
+----------------+       +-------------------------+
| Local State    |       | In-Memory Data Store    |
| (React Hooks)  |       | (Mocked Transactions)   |
+----------------+       +-------------------------+`}
            </div>
            
            <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-2 mt-4">
              <li><strong>Frontend:</strong> Captures user events, renders charts, and manages session state.</li>
              <li><strong>Backend Proxy:</strong> Serves as a gateway. It protects API keys and simulates database persistence.</li>
              <li><strong>LLM Inference:</strong> The Gemini model acts as an advanced processor, synthesizing raw data into insights.</li>
            </ul>
          </div>
        )}

        {/* 7. ML & AI Details */}
        {activeSection === 'ml' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">7. Machine Learning & AI Details</h1>
            
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              This project utilizes a hybrid approach: a <strong>Deterministic Heuristic Engine</strong> combined with a <strong>Large Language Model (LLM)</strong>.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">1. Heuristic Engine (Simulated ML)</h3>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              In the Manual Analysis tab, algorithmic weights are applied based on historical fraud indicators (Amount, Velocity, Location, Device). This mirrors a simplified Decision Tree or Random Forest classification model without compiling an actual dataset.
            </p>

            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">2. Generative AI Processing</h3>
            <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1">
              <li><strong>Model:</strong> Google Gemini (via <code>@google/genai</code> SDK).</li>
              <li><strong>Features Used for Prediction:</strong> Transaction amount, timestamps, location metadata, device ID strings, and flagged heuristics.</li>
              <li><strong>Advantages:</strong> Provides human context. A standard ML model returns `0.92`. The LLM returns "High risk due to IP mismatch with billing address."</li>
              <li><strong>Limitations:</strong> LLMs can hallucinate if prompted poorly, and inference takes 1-3 seconds, which is slower than a Random Forest inference time of ~10ms.</li>
            </ul>
          </div>
        )}

        {/* 8. Use Cases */}
        {activeSection === 'usecases' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">8. Real-World Use Cases</h1>
            
            <ol className="list-decimal pl-5 text-slate-700 dark:text-slate-300 space-y-2">
              <li><strong>Banking Transactions:</strong> Monitoring credit card swipes for abnormal geolocation jumps.</li>
              <li><strong>E-commerce Checkout:</strong> Flagging suspicious bulk purchases of digital gift cards.</li>
              <li><strong>Crypto Exchanges:</strong> Holding large BTC withdrawals to unverified wallets for manual review.</li>
              <li><strong>Insurance Claims:</strong> Detecting duplicate or anomalous hospital bills.</li>
              <li><strong>Loan Application Fraud:</strong> Checking velocity of repeated applications with slightly altered PII.</li>
              <li><strong>Peer-to-Peer Payments:</strong> Monitoring Venmo/CashApp transfers for money muling networks.</li>
              <li><strong>Gaming Accounts:</strong> Detecting account-takeover (ATO) behavior via device changes.</li>
              <li><strong>Tax Return Fraud:</strong> Flagging returns filed from known anonymizer VPNs.</li>
              <li><strong>Telecom Fraud:</strong> Detecting SIM swap attacks before transferring numbers.</li>
              <li><strong>Healthcare Fraud:</strong> Identifying irregular prescription refill frequencies.</li>
            </ol>
          </div>
        )}

        {/* 9. Pros & Cons */}
        {activeSection === 'proscons' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">9. Advantages & Limitations</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-2"><ShieldCheck className="w-5 h-5"/> Advantages</h3>
                <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-2">
                  <li><strong>Explainability:</strong> Traditional ML is a "black box". This dashboard provides total transparency into why a score was generated.</li>
                  <li><strong>Responsive UI:</strong> Built on React Desktop-First principles, ensuring smooth data rendering without page reloads.</li>
                  <li><strong>Full-Stack Secure:</strong> API keys are held securely on the Node.js server.</li>
                  <li><strong>Reporting:</strong> Instant PDF and CSV exports for offline auditing.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-rose-600 dark:text-rose-400 mb-3 flex items-center gap-2"><ShieldAlert className="w-5 h-5"/> Limitations</h3>
                <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-2">
                  <li><strong>Static Datastore:</strong> Currently reliant on mocked memory arrays. It lacks a persistent SQL/NoSQL database like PostgreSQL.</li>
                  <li><strong>LLM Latency:</strong> Generating the "Assistant" summary relies on API response times.</li>
                  <li><strong>Heuristic Simplicity:</strong> The Manual engine uses fixed rules. A real production engine would use an XGBoost model trained on historical arrays.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 10. Future */}
        {activeSection === 'future' && (
          <div className="space-y-6 animate-in fade-in duration-300">
             <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">10. Future Enhancements</h1>
             <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-3">
               <li><strong>Database Integration (MongoDB/PostgreSQL):</strong> To persistently store millions of historical transactions.</li>
               <li><strong>Real Machine Learning Model integration:</strong> Implement a Python microservice serving an XGBoost or Random Forest model via FastAPI to replace the static rules engine.</li>
               <li><strong>Graph Network Visualization:</strong> Use D3.js to map connections between fraudulent IPs and multiple user accounts.</li>
               <li><strong>Multi-Factor Authentication (MFA):</strong> Enforce OTPs or Authenticator apps on the admin login page.</li>
               <li><strong>WebSockets:</strong> Replace the standard REST polling interval with live WebSocket connections for true sub-second millisecond telemetry.</li>
             </ul>
          </div>
        )}

        {/* 11. Viva Questions */}
        {activeSection === 'viva' && (
           <div className="space-y-6 animate-in fade-in duration-300">
             <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">11. Viva Questions & Answers</h1>
             
             <div className="space-y-6">
               <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Basic</h3>
               <div className="space-y-4">
                 <QACard q="1. What is the fundamental difference between your app and standard fraud software?" a="Explainability. Instead of just returning 'Yes' or 'No', my app provides a risk score out of 100, lists specific flagged factors, and uses AI to summarize the risk contextually." />
                 <QACard q="2. Which frontend framework did you use and why?" a="React.js with Vite. It allows for modular components, fast rendering, and dynamic state management which is crucial for live telemetry dashboards." />
                 <QACard q="3. How is the dashboard styled?" a="Tailwind CSS. It provides utility-first classes allowing for rapid, consistent UI development and dark-mode support without writing lengthy CSS files." />
               </div>

               <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Intermediate</h3>
               <div className="space-y-4">
                 <QACard q="4. How do you generate the PDF reports?" a="I implemented a client-side library called jsPDF. When the button is clicked, it initializes a canvas, formats text strings using X/Y coordinates based on the selected transaction state, and prompts a browser download." />
                 <QACard q="5. If I refresh the page, does the data stay?" a="In the current prototype architecture, the Node.js server holds mock data in memory. Restarting the server resets it. In production, we would mount PostgreSQL." />
                 <QACard q="6. How is the Gemini AI integrated?" a="The React frontend makes a POST request to an Express.js backend endpoint. The backend holds the secret API key, makes the secure call to Google's server, and relays the response. This prevents key leaks." />
               </div>

               <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">Advanced</h3>
               <div className="space-y-4">
                 <QACard q="7. How does your manual rules engine calculate scores?" a="It uses a deterministic additive weighting system. It checks conditions (e.g., amount > 1000, new device) and increments a base score. The final score is constrained between 0-100 using Math.min/max, establishing the risk tier." />
                 <QACard q="8. How would you handle a massive scale of 10,000 transactions per second?" a="The current Node.js monolithic setup would bottleneck. I would implement an event-driven architecture using Apache Kafka to queue transactions, process them via distributed worker nodes, and push results to the UI via WebSockets." />
               </div>
             </div>
           </div>
        )}

        {/* 12. Script */}
        {activeSection === 'script' && (
           <div className="space-y-6 animate-in fade-in duration-300">
             <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">12. Teacher Presentation Script</h1>
             
             <div className="p-6 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed italic">
                "Good Morning Respected Teachers/Professors. I am here to present my project: FraudGuard, an advanced AI-powered Fraud Detection System. 
                <br/><br/>
                The primary problem in financial security today isn't just catching fraud, it's understanding *why* a transaction was flagged so analysts can make confident decisions. Traditional binary classifiers produce high false-positive rates that disrupt genuine customers. 
                <br/><br/>
                To solve this, I developed a Full-Stack application using React and Node.js. My system acts as a decision support platform. If we look at the Live Dashboard, we can monitor incoming telemetry. The system provisions a Risk Score out of 100 rather than a simple true/false. 
                <br/><br/>
                The core innovation is our AI Analysis panel. I integrated the Gemini Generative AI model on the backend. When an analyst is unsure, they can query the AI, which interprets the heuristics and provides a human-readable explanation of the threat vector. 
                <br/><br/>
                Furthermore, I have implemented a Manual Analysis Rules engine for edge-case simulations, complex Recharts visualizations for risk distribution, and the ability to export any investigation as a professional PDF or CSV report. Thank you, I am open to any questions."
             </div>
           </div>
        )}

        {/* 13. Resume */}
        {activeSection === 'resume' && (
           <div className="space-y-6 animate-in fade-in duration-300">
             <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">13. Resume & LinkedIn</h1>
             
             <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-4">5 ATS-Friendly Resume Points</h3>
             <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-2">
               <li>Engineered a full-stack fraud detection dashboard using <strong>React, Node.js, and Tailwind CSS</strong>, simulating real-time transaction telemetry.</li>
               <li>Integrated <strong>Google Gemini AI APIs</strong> to provide contextual, natural language explanations for complex algorithmic risk flags, reducing theoretical analyst review time.</li>
               <li>Developed a heuristic rules engine capable of parsing transaction amounts, geolocations, and velocities to generate weighted risk scores (0-100).</li>
               <li>Implemented client-side reporting architecture utilizing <strong>jsPDF and CSV Blob exports</strong> for enterprise-grade historical auditing.</li>
               <li>Architected responsive data visualizations using <strong>Recharts</strong>, mapping fraud distribution and volume trends securely behind a custom authentication context.</li>
             </ul>

             <h3 className="text-lg font-semibold text-slate-900 dark:text-white mt-8">LinkedIn Post Idea</h3>
             <div className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-700 dark:text-slate-300 whitespace-pre-line text-sm">
                Excited to showcase my latest project: FraudGuard! 🚀🛡️

                Building a machine learning model is one thing, but making it usable for human analysts is another challenge entirely. I built a full-stack dashboard that bridges that gap.

                Key Features:
                ✅ Real-time Transaction Telemetry
                ✅ Heuristic Rules Engine (0-100 Risk Scoring)
                ✅ Gemini AI Integration for contextual explanations
                ✅ PDF & CSV Export pipelines

                Tech Stack: React, Tailwind, Node.js, Express, Recharts.

                Check out the UI below! Always learning and building. 💻📈
                #React #WebDevelopment #AI #FraudDetection #SoftwareEngineering
             </div>
           </div>
        )}

        {/* 14. Interview */}
        {activeSection === 'interview' && (
           <div className="space-y-6 animate-in fade-in duration-300">
             <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-4">14. Interview Preparation</h1>
             
             <div className="space-y-4">
               <h3 className="text-lg font-semibold text-slate-900 dark:text-white">What was the hardest challenge you faced?</h3>
               <p className="text-slate-700 dark:text-slate-300">
                 <em>How to answer confidently:</em> "The hardest part was securing the AI API keys. Initially, one might put the key in the React frontend, but I quickly realized that exposes secrets via the browser network tab. I had to architect a Node.js Express backend proxy to ensure the key remained strictly server-side."
               </p>

               <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Scenario: The dashboard is loading too slowly with millions of records. Fix it.</h3>
               <p className="text-slate-700 dark:text-slate-300">
                 <em>How to answer confidently:</em> "In React, rendering thousands of DOM rows crashes the browser. I would implement <strong>Virtualization (using libraries like react-window)</strong> so only the visible rows are rendered in the HTML. On the backend, I would implement <strong>Pagination</strong> and SQL indexing so we only fetch 50 records per page."
               </p>

               <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Is your Risk Engine Machine Learning or Rules-Based?</h3>
               <p className="text-slate-700 dark:text-slate-300">
                 <em>How to answer confidently:</em> "Currently, the manual tool utilizes a Deterministic Rules-Based Heuristic engine for consistent prototyping. However, the system architecture treats it as a microservice. In the future, this function can be seamlessly swapped out for a Python-based XGBoost inference endpoint without rewriting the frontend."
               </p>
             </div>
           </div>
        )}

      </div>
    </div>
  );
}

function FeatureCard({title, purpose, works, benefits}: {title: string, purpose: string, works: string, benefits: string}) {
  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20">
      <h4 className="font-bold text-slate-900 dark:text-white text-base mb-2">{title}</h4>
      <div className="text-sm space-y-1 text-slate-700 dark:text-slate-300">
        <p><strong className="text-slate-900 dark:text-slate-200">Purpose:</strong> {purpose}</p>
        <p><strong className="text-slate-900 dark:text-slate-200">How it works:</strong> {works}</p>
        <p><strong className="text-emerald-600 dark:text-emerald-400">Benefit:</strong> {benefits}</p>
      </div>
    </div>
  )
}

function TechCard({name, role, desc}: {name: string, role: string, desc: string}) {
  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5">
      <h4 className="font-bold text-blue-600 dark:text-blue-400 text-base">{name}</h4>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2 mt-1">{role}</p>
      <p className="text-sm text-slate-700 dark:text-slate-300">{desc}</p>
    </div>
  )
}

function QACard({q, a}: {q: string, a: string}) {
  return (
    <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border-l-2 border-rose-500">
      <p className="font-semibold text-slate-900 dark:text-white mb-2">{q}</p>
      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{a}</p>
    </div>
  )
}
