import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Bug,
  Activity,
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
  Database,
  Check,
  Flame,
  Radio,
  Eye,
  Server,
  Lock,
  GitMerge,
  Clock,
  Compass,
  Zap,
  RefreshCw,
  Sliders,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SimulatorProps {
  isCompleted: boolean;
  onComplete: (bonusXp?: number) => void;
}

const fireConfetti = () => {
  try {
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#38bdf8', '#34d399', '#f59e0b', '#818cf8']
    });
  } catch (e) {
    // fallback
  }
};

/* =========================================================================
   SIMULATOR 06: Mock Unit Tests vs Reality Sandbox
   ========================================================================= */
export const Simulator06Verification: React.FC<SimulatorProps> = ({ isCompleted, onComplete }) => {
  const [testMode, setTestMode] = useState<'idle' | 'mocked' | 'reality'>('idle');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [realityFixed, setRealityFixed] = useState<boolean>(false);

  // Verifier toggles
  const [verifiers, setVerifiers] = useState({
    playwright: true,
    postgres: true,
    pixelDiff: true
  });

  const runMockedTests = () => {
    setIsRunning(true);
    setTestMode('mocked');
    setTimeout(() => {
      setIsRunning(false);
    }, 600);
  };

  const runRealityLoop = () => {
    setIsRunning(true);
    setTestMode('reality');
    setTimeout(() => {
      setIsRunning(false);
      setRealityFixed(true);
      fireConfetti();
      onComplete(120);
    }, 1200);
  };

  return (
    <div className="bg-card border border-line rounded-xl p-5 md:p-7 shadow-sm text-fg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
              Subject 06 Simulator
            </span>
            <span className="text-xs text-fg-muted font-mono">Verification Touching Reality</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-sans mt-1 text-fg">
            Mocked Unit Tests vs Reality Sandbox
          </h2>
          <p className="text-sm text-fg-muted mt-1 max-w-2xl">
            A candidate PR refactors checkout and renames a DB column. See why 100% green mocked unit tests lie, while headless browser + ephemeral DB catch the real crash.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold font-mono text-good bg-good/10 border border-good/30 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" /> Lab Completed (+120 XP)
            </span>
          ) : (
            <button
              onClick={() => {
                fireConfetti();
                onComplete(120);
              }}
              className="text-xs font-mono font-medium text-accent bg-accent/10 hover:bg-accent/20 border border-accent/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Claim +120 XP
            </button>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={runMockedTests}
          disabled={isRunning}
          className="px-4 py-2.5 rounded-lg text-xs font-mono font-semibold bg-band hover:bg-band/80 text-fg border border-line transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Activity className="w-4 h-4 text-amber-400" /> Run Mocked Unit Tests (0.4s)
        </button>

        <button
          onClick={runRealityLoop}
          disabled={isRunning}
          className="px-4 py-2.5 rounded-lg text-xs font-mono font-semibold bg-accent text-white hover:bg-accent-hover transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Against Reality...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" /> Run Real Verification Loop
            </>
          )}
        </button>

        <button
          onClick={() => {
            setTestMode('idle');
            setRealityFixed(false);
          }}
          className="px-3 py-2 rounded-lg text-xs font-mono text-fg-muted hover:text-fg hover:bg-band border border-line transition-all flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Split Comparison Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Test Results */}
        <div className="space-y-4">
          <div className="border border-line rounded-xl p-4 bg-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-fg-muted flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-accent" /> Test Runner Output
              </span>
              {testMode === 'mocked' && (
                <span className="text-xs font-mono text-good font-bold flex items-center gap-1 bg-good/10 px-2 py-0.5 rounded">
                  <Check className="w-3 h-3" /> 42/42 Passed (0.4s)
                </span>
              )}
              {testMode === 'reality' && (
                <span className={`text-xs font-mono font-bold flex items-center gap-1 px-2 py-0.5 rounded ${realityFixed ? 'text-good bg-good/10' : 'text-bad bg-bad/10'}`}>
                  {realityFixed ? '✓ Verified in Real Sandbox' : '⚠️ Reality Failures Caught'}
                </span>
              )}
            </div>

            {testMode === 'idle' && (
              <div className="p-6 text-center text-xs font-mono text-fg-muted">
                Run mocked unit tests or the real verification loop to inspect results.
              </div>
            )}

            {testMode === 'mocked' && (
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-good/10 border border-good/20 text-good">
                  ✓ checkout.test.ts: renders checkout button (mocked DOM element)
                </div>
                <div className="p-2.5 rounded bg-good/10 border border-good/20 text-good">
                  ✓ user.test.ts: queries customer stripe ID (mocked db.query())
                </div>
                <div className="p-2.5 rounded bg-good/10 border border-good/20 text-good">
                  ✓ payment.test.ts: returns HTTP 200 (mocked stripe webhook)
                </div>
                <div className="text-[11px] text-amber-400 p-2 rounded bg-amber-500/10 border border-amber-500/20 mt-2">
                  ⚠️ Note: Everything passed because all external boundaries (DOM, Postgres, Stripe) were mocked!
                </div>
              </div>
            )}

            {testMode === 'reality' && (
              <div className="space-y-2 text-xs font-mono">
                {realityFixed ? (
                  <>
                    <div className="p-2.5 rounded bg-good/10 border border-good/20 text-good">
                      ✓ Playwright: Headless Chromium clicked button at (x: 420, y: 310) without collision!
                    </div>
                    <div className="p-2.5 rounded bg-good/10 border border-good/20 text-good">
                      ✓ Ephemeral Postgres: Schema migration executed; `customer_id` queried cleanly.
                    </div>
                    <div className="p-2.5 rounded bg-good/10 border border-good/20 text-good">
                      ✓ Pixel-Diff: 0% unexpected layout shift. All real boundaries aligned!
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-2.5 rounded bg-bad/10 border border-bad/20 text-bad">
                      ✕ Playwright: Click intercepted by &lt;div class="cookie-banner z-[9999]"&gt;
                    </div>
                    <div className="p-2.5 rounded bg-bad/10 border border-bad/20 text-bad">
                      ✕ Ephemeral Postgres: column "stripe_id" does not exist in table "users"
                    </div>
                    <div className="text-[11px] text-good p-2 rounded bg-good/10 border border-good/20 mt-2">
                      Auto-feeding error traces back to Builder Agent to regenerate valid fix...
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Verifiers Configuration */}
          <div className="p-4 rounded-xl border border-line bg-band/30 space-y-2">
            <span className="text-xs font-mono uppercase text-fg-muted block mb-1">
              Active Reality Verifiers
            </span>
            <div className="space-y-1.5 text-xs font-mono">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiers.playwright}
                  onChange={(e) => setVerifiers({ ...verifiers, playwright: e.target.checked })}
                  className="rounded text-accent accent-accent"
                />
                <span>Headless Playwright Browser Click (Catches CSS z-index collisions)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiers.postgres}
                  onChange={(e) => setVerifiers({ ...verifiers, postgres: e.target.checked })}
                  className="rounded text-accent accent-accent"
                />
                <span>Ephemeral PostgreSQL Container (Runs real schema migrations)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiers.pixelDiff}
                  onChange={(e) => setVerifiers({ ...verifiers, pixelDiff: e.target.checked })}
                  className="rounded text-accent accent-accent"
                />
                <span>Pixel-Diff Visual Regression (Screenshots component render)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Actual App Reality Preview */}
        <div className="border border-line rounded-xl p-4 bg-band/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase text-fg-muted flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-accent" /> Live Application Reality
              </span>
              <span className="text-[11px] font-mono text-fg-muted">localhost:3000/checkout</span>
            </div>

            {/* Mock browser window */}
            <div className="border border-line rounded-lg overflow-hidden bg-card shadow-sm relative min-h-[220px] p-4 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-fg mb-1">Checkout Summary</div>
                <div className="text-xs text-fg-muted font-mono">Enterprise Tier - $299/mo</div>
              </div>

              {/* Broken overlay preview or fixed button */}
              {testMode === 'mocked' ? (
                <div className="space-y-3 relative">
                  <div className="p-3 bg-bad/10 border border-bad/30 rounded text-xs text-bad">
                    <span className="font-bold">POSTGRES ERROR 500:</span> column "stripe_id" does not exist in table "users". Query crashed on load!
                  </div>
                  <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded text-xs text-amber-300">
                    <span className="font-bold">UI OVERLAY (z-index: 9999):</span> Cookie consent banner intercepts all clicks! Button is unclickable.
                  </div>
                </div>
              ) : realityFixed ? (
                <div className="space-y-3">
                  <div className="p-2.5 bg-good/10 border border-good/20 rounded text-xs text-good font-mono">
                    ✓ DB schema synced to "customer_id"
                  </div>
                  <button className="w-full py-2.5 rounded-lg bg-good text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer">
                    Pay Now ($299.00) — Clickable & Verified
                  </button>
                </div>
              ) : (
                <button className="w-full py-2.5 rounded-lg bg-accent text-white font-semibold text-xs opacity-80 cursor-not-allowed">
                  Pay Now ($299.00) (Untested State)
                </button>
              )}

              <div className="text-[10px] text-fg-muted font-mono text-right mt-2">
                Reality status: {testMode === 'mocked' ? 'CRASHED IN PROD' : realityFixed ? 'HEALTHY' : 'PENDING'}
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-fg-body leading-relaxed bg-card p-3 rounded-lg border border-line">
            <span className="font-semibold text-fg">Core Lesson:</span> Mocked unit tests confirm what you <span className="italic">think</span> your code does; real verifiers confirm what the machine <span className="italic">actually</span> does.
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SIMULATOR 07: System-1 Fast Judge Gate on Every Step
   ========================================================================= */
export const Simulator07SystemOne: React.FC<SimulatorProps> = ({ isCompleted, onComplete }) => {
  interface AgentStep {
    id: number;
    tool: string;
    action: string;
    isDangerous: boolean;
    judgeCategory: 'secret' | 'ast_security' | 'safe';
    blockedReason?: string;
  }

  const stepsStream: AgentStep[] = [
    {
      id: 1,
      tool: 'bash: rm -rf migrations/* && touch migrations/init.sql',
      action: 'Destructive wipe of database migration history',
      isDangerous: true,
      judgeCategory: 'secret',
      blockedReason: 'Destructive Shield: Deleting historical migration files violates schema invariant!'
    },
    {
      id: 2,
      tool: 'edit: query = "SELECT * FROM users WHERE id = \'" + req.query.id + "\'"',
      action: 'Raw SQL string concatenation from unvalidated user request',
      isDangerous: true,
      judgeCategory: 'ast_security',
      blockedReason: 'AST Security Judge: Raw SQL string interpolation detected. Parameterized query required!'
    },
    {
      id: 3,
      tool: 'edit: const client = apiClient.create({ timeout: 5000 })',
      action: 'Canonical refactor matching ADR-003 pattern',
      isDangerous: false,
      judgeCategory: 'safe'
    },
    {
      id: 4,
      tool: 'edit: const STRIPE_SECRET = "sk_live_9482948291048102"',
      action: 'Hardcoded live production secret token in client-side file',
      isDangerous: true,
      judgeCategory: 'secret',
      blockedReason: 'Secret Gate: High-entropy live secret key pattern matched! Immediate token block.'
    },
    {
      id: 5,
      tool: 'edit: export const schema = z.object({ email: z.string().email() })',
      action: 'Zod input validation added to route payload',
      isDangerous: false,
      judgeCategory: 'safe'
    }
  ];

  const [activeJudges, setActiveJudges] = useState({
    secretShield: true,
    astSecurity: true,
    sycophancy: true
  });

  const [processedSteps, setProcessedSteps] = useState<AgentStep[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [stats, setStats] = useState({ latencyMs: 0, costUsd: 0, blockedCount: 0 });

  const startStreaming = () => {
    setProcessedSteps([]);
    setIsStreaming(true);
    let currentIdx = 0;

    const interval = setInterval(() => {
      if (currentIdx < stepsStream.length) {
        const step = stepsStream[currentIdx];
        setProcessedSteps((prev) => [...prev, step]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
        setStats({
          latencyMs: 142,
          costUsd: 0.0005,
          blockedCount: 3
        });
        fireConfetti();
        onComplete(120);
      }
    }, 600);
  };

  return (
    <div className="bg-card border border-line rounded-xl p-5 md:p-7 shadow-sm text-fg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
              Subject 07 Simulator
            </span>
            <span className="text-xs text-fg-muted font-mono">System-1 Fast Judge Reflex Gates</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-sans mt-1 text-fg">
            The System-1 Fast Judge Gate on Every Step
          </h2>
          <p className="text-sm text-fg-muted mt-1 max-w-2xl">
            Frontier LLMs are slow (4,000ms, $0.03) and prone to sycophancy. Intercept dangerous commands in 35ms for $0.0001 with lightweight typed micro-judges.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold font-mono text-good bg-good/10 border border-good/30 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" /> Lab Completed (+120 XP)
            </span>
          ) : (
            <button
              onClick={() => {
                fireConfetti();
                onComplete(120);
              }}
              className="text-xs font-mono font-medium text-accent bg-accent/10 hover:bg-accent/20 border border-accent/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Claim +120 XP
            </button>
          )}
        </div>
      </div>

      {/* Micro-Judge Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl border border-line bg-card flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-fg">Secret & Destructive Shield</div>
            <div className="text-[11px] text-fg-muted font-mono">18ms • Blocks keys & rm -rf</div>
          </div>
          <input
            type="checkbox"
            checked={activeJudges.secretShield}
            onChange={(e) => setActiveJudges({ ...activeJudges, secretShield: e.target.checked })}
            className="accent-accent"
          />
        </div>

        <div className="p-3.5 rounded-xl border border-line bg-card flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-fg">AST Security & SQLi Judge</div>
            <div className="text-[11px] text-fg-muted font-mono">35ms • Catches unescaped queries</div>
          </div>
          <input
            type="checkbox"
            checked={activeJudges.astSecurity}
            onChange={(e) => setActiveJudges({ ...activeJudges, astSecurity: e.target.checked })}
            className="accent-accent"
          />
        </div>

        <div className="p-3.5 rounded-xl border border-line bg-card flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-fg">Sycophancy & Hallucination Filter</div>
            <div className="text-[11px] text-fg-muted font-mono">42ms • Flags hollow apologies</div>
          </div>
          <input
            type="checkbox"
            checked={activeJudges.sycophancy}
            onChange={(e) => setActiveJudges({ ...activeJudges, sycophancy: e.target.checked })}
            className="accent-accent"
          />
        </div>
      </div>

      {/* Stream Action Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={startStreaming}
          disabled={isStreaming}
          className="px-5 py-2.5 rounded-lg text-xs font-mono font-semibold bg-accent text-white hover:bg-accent-hover transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          {isStreaming ? (
            <>
              <Activity className="w-4 h-4 animate-spin" /> Intercepting Tool Stream...
            </>
          ) : (
            <>
              <Radio className="w-4 h-4" /> Stream Agent Steps (5 Actions)
            </>
          )}
        </button>

        <button
          onClick={() => {
            setProcessedSteps([]);
            setStats({ latencyMs: 0, costUsd: 0, blockedCount: 0 });
          }}
          className="px-3 py-2 rounded-lg text-xs font-mono text-fg-muted hover:text-fg hover:bg-band border border-line transition-all flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Clear
        </button>
      </div>

      {/* Live Stream Terminal */}
      <div className="border border-line rounded-xl bg-card overflow-hidden">
        <div className="bg-band/50 px-4 py-2.5 border-b border-line flex items-center justify-between text-xs font-mono text-fg-muted">
          <span>Incoming Agent Tool-Execution Stream</span>
          <span>{processedSteps.length}/5 Processed</span>
        </div>

        <div className="p-4 space-y-2.5 max-h-80 overflow-y-auto">
          {processedSteps.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-fg-muted">
              Click "Stream Agent Steps" to watch the System-1 judge inspect tool calls in real time.
            </div>
          ) : (
            processedSteps.map((step) => {
              const isBlocked = step.isDangerous;
              return (
                <div
                  key={step.id}
                  className={`p-3 rounded-lg border text-xs font-mono transition-all ${
                    isBlocked
                      ? 'bg-bad/10 border-bad/30'
                      : 'bg-good/10 border-good/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-fg truncate">{step.tool}</span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1 ${
                        isBlocked ? 'bg-bad/20 text-bad' : 'bg-good/20 text-good'
                      }`}
                    >
                      {isBlocked ? (
                        <>
                          <ShieldAlert className="w-3 h-3" /> BLOCKED (32ms)
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-3 h-3" /> APPROVED (18ms)
                        </>
                      )}
                    </span>
                  </div>
                  <div className="text-[11px] text-fg-muted">{step.action}</div>
                  {isBlocked && (
                    <div className="mt-2 text-[11px] text-bad font-semibold">
                      🛡️ {step.blockedReason}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Performance & Cost Comparison Card */}
      {stats.latencyMs > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-band/30 p-4 rounded-xl border border-line text-xs font-mono">
          <div>
            <span className="text-fg-muted uppercase text-[10px] block">Total Intercept Latency</span>
            <span className="text-base font-bold text-good">{stats.latencyMs} ms</span>
            <span className="text-[10px] text-fg-muted block">vs 22,000ms human delay</span>
          </div>
          <div>
            <span className="text-fg-muted uppercase text-[10px] block">Compute Cost</span>
            <span className="text-base font-bold text-accent">${stats.costUsd}</span>
            <span className="text-[10px] text-fg-muted block">vs $0.35 frontier tokens</span>
          </div>
          <div>
            <span className="text-fg-muted uppercase text-[10px] block">Threats Intercepted</span>
            <span className="text-base font-bold text-bad">{stats.blockedCount} Critical</span>
            <span className="text-[10px] text-fg-muted block">0 reached master branch</span>
          </div>
          <div>
            <span className="text-fg-muted uppercase text-[10px] block">Human Intervention</span>
            <span className="text-base font-bold text-good">0 Hours Spent</span>
            <span className="text-[10px] text-fg-muted block">Reflexes handled in runtime</span>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   SIMULATOR 08: Parallel Bug-Bash Swarm Arena
   ========================================================================= */
export const Simulator08Swarms: React.FC<SimulatorProps> = ({ isCompleted, onComplete }) => {
  interface SwarmAgent {
    id: string;
    name: string;
    persona: string;
    focus: string;
    discoveredBug?: {
      title: string;
      severity: 'Critical' | 'High' | 'Medium';
      repro: string;
    };
  }

  const swarmAgents: SwarmAgent[] = [
    {
      id: 'agent_confused',
      name: 'Agent A: The Confused Persona',
      persona: 'Simulates non-technical user pressing back/forward mid-wizard.',
      focus: 'Browser navigation, stale session state, empty inputs',
      discoveredBug: {
        title: 'Wizard state dropped on browser back button',
        severity: 'Medium',
        repro: 'User clicks Step 3 -> Back to Step 2 -> Form resets to empty, throwing infinite loading spinner.'
      }
    },
    {
      id: 'agent_fuzzer',
      name: 'Agent B: The Chaos Fuzzer',
      persona: 'Injects Unicode, null bytes, negative seats, and 10MB payloads.',
      focus: 'Boundary testing, overflow, unhandled types',
      discoveredBug: {
        title: 'Negative seat quantity allows user credit exploit',
        severity: 'Critical',
        repro: 'POST /api/seats with payload { quantity: -5 } credits user balance by $150!'
      }
    },
    {
      id: 'agent_redteam',
      name: 'Agent C: Non-Sycophantic Attacker',
      persona: 'Explicitly prompted NOT to agree with the author. Hunts IDOR & auth leaks.',
      focus: 'Multi-tenant isolation, role privilege escalation',
      discoveredBug: {
        title: 'Member role can read Org Admin API keys via metadata endpoint',
        severity: 'High',
        repro: 'GET /api/org/metadata includes sanitized_keys array that leaks live Stripe pubkey + webhook secret!'
      }
    }
  ];

  const [isSwarming, setIsSwarming] = useState<boolean>(false);
  const [hasFinishedSwarm, setHasFinishedSwarm] = useState<boolean>(false);
  const [testsSynthesized, setTestsSynthesized] = useState<boolean>(false);

  const launchSwarm = () => {
    setIsSwarming(true);
    setHasFinishedSwarm(false);
    setTestsSynthesized(false);

    setTimeout(() => {
      setIsSwarming(false);
      setHasFinishedSwarm(true);
    }, 1200);
  };

  const handleSynthesizeTests = () => {
    setTestsSynthesized(true);
    fireConfetti();
    onComplete(120);
  };

  return (
    <div className="bg-card border border-line rounded-xl p-5 md:p-7 shadow-sm text-fg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
              Subject 08 Simulator
            </span>
            <span className="text-xs text-fg-muted font-mono">Parallel Adversarial Swarms</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-sans mt-1 text-fg">
            The Parallel Bug-Bash Swarm Arena
          </h2>
          <p className="text-sm text-fg-muted mt-1 max-w-2xl">
            Before a complex PR reaches you, dispatch 3 specialized adversarial agents in parallel to fuzz, stress-test, and attack the feature branch.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold font-mono text-good bg-good/10 border border-good/30 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" /> Lab Completed (+120 XP)
            </span>
          ) : (
            <button
              onClick={() => {
                fireConfetti();
                onComplete(120);
              }}
              className="text-xs font-mono font-medium text-accent bg-accent/10 hover:bg-accent/20 border border-accent/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Claim +120 XP
            </button>
          )}
        </div>
      </div>

      {/* Launch Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={launchSwarm}
          disabled={isSwarming}
          className="px-5 py-2.5 rounded-lg text-xs font-mono font-semibold bg-accent text-white hover:bg-accent-hover transition-all flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          {isSwarming ? (
            <>
              <Activity className="w-4 h-4 animate-spin" /> Swarm Attacking PR in Parallel...
            </>
          ) : (
            <>
              <Flame className="w-4 h-4 text-amber-300" /> Launch 3-Agent Bug-Bash Swarm
            </>
          )}
        </button>

        {hasFinishedSwarm && !testsSynthesized && (
          <button
            onClick={handleSynthesizeTests}
            className="px-4 py-2.5 rounded-lg text-xs font-mono font-semibold bg-good text-white hover:bg-emerald-600 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4" /> Auto-Synthesize Regression Tests
          </button>
        )}

        <button
          onClick={() => {
            setIsSwarming(false);
            setHasFinishedSwarm(false);
            setTestsSynthesized(false);
          }}
          className="px-3 py-2 rounded-lg text-xs font-mono text-fg-muted hover:text-fg hover:bg-band border border-line transition-all flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* 3 Parallel Swarm Lanes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {swarmAgents.map((agent) => (
          <div
            key={agent.id}
            className="bg-card border border-line rounded-xl p-4 flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="text-xs font-bold text-fg mb-1">{agent.name}</div>
              <p className="text-xs text-fg-muted leading-relaxed mb-2">{agent.persona}</p>
              <div className="text-[11px] font-mono text-accent bg-accent/10 p-2 rounded border border-accent/20">
                Focus: {agent.focus}
              </div>
            </div>

            {/* Execution / Bug Discovery State */}
            <div>
              {isSwarming && (
                <div className="p-3 bg-band/50 rounded-lg border border-line text-xs font-mono text-fg-muted flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 animate-spin text-accent" /> Running fuzz loops...
                </div>
              )}

              {hasFinishedSwarm && agent.discoveredBug && (
                <div className="p-3 rounded-lg border bg-bad/10 border-bad/30 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-bad">
                      Bug Discovered!
                    </span>
                    <span className="text-[10px] font-mono bg-bad/20 text-bad px-1.5 py-0.5 rounded font-bold">
                      {agent.discoveredBug.severity}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-fg">{agent.discoveredBug.title}</div>
                  <div className="text-[11px] text-fg-body font-mono leading-relaxed">
                    {agent.discoveredBug.repro}
                  </div>
                </div>
              )}

              {!isSwarming && !hasFinishedSwarm && (
                <div className="p-3 border border-dashed border-line rounded-lg text-[11px] font-mono text-fg-muted text-center">
                  Standby. Ready to swarm.
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Auto-Synthesized Regression Tests Outcome */}
      {testsSynthesized && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl border bg-good/10 border-good/30 space-y-2"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-good">
            <CheckCircle2 className="w-4 h-4" /> 3 Executable Regression Tests Generated!
          </div>
          <div className="space-y-1 text-xs font-mono text-fg-body">
            <div>✓ test/e2e/wizard-back.spec.ts: asserts form state persists on POPSTATE</div>
            <div>✓ test/contracts/negative-seats.test.ts: asserts 400 Bad Request on quantity &lt; 0</div>
            <div>✓ test/security/idor-metadata.test.ts: asserts stripped payload for member role</div>
          </div>
          <p className="text-xs text-fg-muted pt-1">
            The candidate PR is now fortified and battle-tested before the human engineer even looks at it.
          </p>
        </motion.div>
      )}
    </div>
  );
};

/* =========================================================================
   SIMULATOR 09: Merge Gate & Production Dogfooding Watcher
   ========================================================================= */
export const Simulator09Operate: React.FC<SimulatorProps> = ({ isCompleted, onComplete }) => {
  interface PRItem {
    id: number;
    title: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    recommendedGate: 'Auto-Merge' | 'Migration Flag' | 'Human Comprehension';
    routedGate?: string;
  }

  const [prs, setPrs] = useState<PRItem[]>([
    {
      id: 101,
      title: 'Fix button padding & typo in landing page FAQ',
      riskLevel: 'Low',
      recommendedGate: 'Auto-Merge'
    },
    {
      id: 102,
      title: 'Add user_tenants table and foreign key indexing',
      riskLevel: 'Medium',
      recommendedGate: 'Migration Flag'
    },
    {
      id: 103,
      title: 'Rewrite subscription invoice calculation engine',
      riskLevel: 'High',
      recommendedGate: 'Human Comprehension'
    }
  ]);

  const [watcherTriggered, setWatcherTriggered] = useState<boolean>(false);
  const [watcherStep, setWatcherStep] = useState<number>(0);

  const handleRoutePR = (prId: number, gate: string) => {
    setPrs((prev) =>
      prev.map((pr) => (pr.id === prId ? { ...pr, routedGate: gate } : pr))
    );
  };

  const simulate2AMIncident = () => {
    setWatcherTriggered(true);
    setWatcherStep(1);

    setTimeout(() => setWatcherStep(2), 800);
    setTimeout(() => setWatcherStep(3), 1600);
    setTimeout(() => {
      setWatcherStep(4);
      fireConfetti();
      onComplete(120);
    }, 2400);
  };

  const allPrsRoutedCorrectly = prs.every(
    (pr) => pr.routedGate === pr.recommendedGate
  );

  return (
    <div className="bg-card border border-line rounded-xl p-5 md:p-7 shadow-sm text-fg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
              Subject 09 Simulator
            </span>
            <span className="text-xs text-fg-muted font-mono">Merge Gate & Dogfooding Watcher</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-sans mt-1 text-fg">
            The Blast-Radius Merge Gate & 2:00 AM Watcher
          </h2>
          <p className="text-sm text-fg-muted mt-1 max-w-2xl">
            Not all PRs require human review. Route changes based on blast radius, and let scheduled dogfooding watchers catch silent third-party API breaks at 2:00 AM.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold font-mono text-good bg-good/10 border border-good/30 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" /> Lab Completed (+120 XP)
            </span>
          ) : (
            <button
              onClick={() => {
                fireConfetti();
                onComplete(120);
              }}
              className="text-xs font-mono font-medium text-accent bg-accent/10 hover:bg-accent/20 border border-accent/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Claim +120 XP
            </button>
          )}
        </div>
      </div>

      {/* Part A: Blast-Radius Merge Gate */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider text-fg-muted flex items-center gap-1.5">
          <GitMerge className="w-3.5 h-3.5 text-accent" /> Part A: Blast-Radius PR Routing Triage
        </label>

        <div className="space-y-2.5">
          {prs.map((pr) => (
            <div
              key={pr.id}
              className="p-3.5 rounded-xl border border-line bg-card flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-accent">PR #{pr.id}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      pr.riskLevel === 'Low'
                        ? 'bg-good/10 text-good'
                        : pr.riskLevel === 'Medium'
                        ? 'bg-amber-400/10 text-amber-400'
                        : 'bg-bad/10 text-bad'
                    }`}
                  >
                    Risk: {pr.riskLevel}
                  </span>
                </div>
                <div className="text-xs font-medium text-fg">{pr.title}</div>
              </div>

              {/* Routing Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleRoutePR(pr.id, 'Auto-Merge')}
                  className={`px-2.5 py-1.5 rounded text-xs font-mono transition-all border ${
                    pr.routedGate === 'Auto-Merge'
                      ? 'bg-good text-white border-good font-bold'
                      : 'bg-band border-line text-fg-muted hover:text-fg'
                  }`}
                >
                  Auto-Merge
                </button>
                <button
                  onClick={() => handleRoutePR(pr.id, 'Migration Flag')}
                  className={`px-2.5 py-1.5 rounded text-xs font-mono transition-all border ${
                    pr.routedGate === 'Migration Flag'
                      ? 'bg-amber-500 text-white border-amber-500 font-bold'
                      : 'bg-band border-line text-fg-muted hover:text-fg'
                  }`}
                >
                  Migration Seam
                </button>
                <button
                  onClick={() => handleRoutePR(pr.id, 'Human Comprehension')}
                  className={`px-2.5 py-1.5 rounded text-xs font-mono transition-all border ${
                    pr.routedGate === 'Human Comprehension'
                      ? 'bg-accent text-white border-accent font-bold'
                      : 'bg-band border-line text-fg-muted hover:text-fg'
                  }`}
                >
                  Human Gate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part B: 2:00 AM Production Watcher */}
      <div className="border border-line rounded-xl p-4 bg-band/20 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-fg-muted flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Part B: 2:00 AM Silent API Break Simulation
            </label>
            <p className="text-xs text-fg-muted mt-0.5">
              Simulate Stripe silently changing a webhook field at 2:00 AM while engineers are asleep.
            </p>
          </div>
          <button
            onClick={simulate2AMIncident}
            disabled={watcherTriggered && watcherStep < 4}
            className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-bad text-white hover:bg-rose-600 transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5" /> Simulate 2:00 AM Break
          </button>
        </div>

        {/* Watcher Lifecycle Steps */}
        {watcherTriggered && (
          <div className="space-y-2 pt-2">
            <div className={`p-2.5 rounded-lg border text-xs font-mono ${watcherStep >= 1 ? 'bg-bad/10 border-bad/30 text-bad font-semibold' : 'bg-card border-line text-fg-muted'}`}>
              02:02 AM: Stripe changes `data.object.plan` to `data.object.price`. Standard webhook throws silent 500.
            </div>
            <div className={`p-2.5 rounded-lg border text-xs font-mono ${watcherStep >= 2 ? 'bg-amber-400/10 border-amber-400/30 text-amber-400 font-semibold' : 'bg-card border-line text-fg-muted'}`}>
              02:05 AM: Scheduled Synthetic Dogfooding Agent triggers fake checkout; detects anomaly within 45s.
            </div>
            <div className={`p-2.5 rounded-lg border text-xs font-mono ${watcherStep >= 3 ? 'bg-accent/10 border-accent/30 text-accent font-semibold' : 'bg-card border-line text-fg-muted'}`}>
              02:06 AM: Clarity Watcher flips feature flag `ENABLE_NEW_BILLING` to fallback mode; isolates blast radius.
            </div>
            <div className={`p-2.5 rounded-lg border text-xs font-mono ${watcherStep >= 4 ? 'bg-good/10 border-good/30 text-good font-semibold' : 'bg-card border-line text-fg-muted'}`}>
              02:08 AM: Automated Fix PR #104 opened with full reproduction trace. Zero customer tickets filed!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   SIMULATOR 10: The Self-Improving Software Factory Pipeline
   ========================================================================= */
export const Simulator10Factory: React.FC<SimulatorProps> = ({ isCompleted, onComplete }) => {
  const [autonomyScore, setAutonomyScore] = useState<number>(64.2);
  const [edgeCaseInjected, setEdgeCaseInjected] = useState<boolean>(false);
  const [isSystemFixed, setIsSystemFixed] = useState<boolean>(false);

  const stages = [
    { num: 1, name: 'Spec & Intake', detail: 'Grill ticket for invariants' },
    { num: 2, name: 'L4 Builder Loop', detail: 'Autonomous code generator' },
    { num: 3, name: 'Reality Verifier', detail: 'Postgres & Playwright check' },
    { num: 4, name: 'Bug-Bash Swarm', detail: '3 adversarial fuzzers' },
    { num: 5, name: 'Merge Gate', detail: 'Blast-radius triage' },
    { num: 6, name: 'Prod Watcher', detail: '24/7 dogfooder & scorer' }
  ];

  const handleInjectEdgeCase = () => {
    setEdgeCaseInjected(true);
    setIsSystemFixed(false);
  };

  const handleFixSystem = () => {
    setIsSystemFixed(true);
    setAutonomyScore(99.4);
    fireConfetti();
    onComplete(120);
  };

  return (
    <div className="bg-card border border-line rounded-xl p-5 md:p-7 shadow-sm text-fg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
              Subject 10 Simulator
            </span>
            <span className="text-xs text-fg-muted font-mono">Capstone Factory Architecture</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-sans mt-1 text-fg">
            The Self-Improving Software Factory Pipeline
          </h2>
          <p className="text-sm text-fg-muted mt-1 max-w-2xl">
            When a novel production edge-case hits, ordinary teams patch the app code. A Software Factory fixes the system by encoding invariants, upgrading verifiers, and re-grading the pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isCompleted ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold font-mono text-good bg-good/10 border border-good/30 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4" /> Lab Completed (+120 XP)
            </span>
          ) : (
            <button
              onClick={() => {
                fireConfetti();
                onComplete(120);
              }}
              className="text-xs font-mono font-medium text-accent bg-accent/10 hover:bg-accent/20 border border-accent/30 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Claim +120 XP
            </button>
          )}
        </div>
      </div>

      {/* 6-Stage Factory Flow Visual */}
      <div className="border border-line rounded-xl p-4 bg-band/20 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-fg-muted">
          <span>Complete 6-Stage Software Factory Architecture</span>
          <span className="font-bold text-accent">Autonomy Score: {autonomyScore}%</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {stages.map((stg) => (
            <div
              key={stg.num}
              className={`p-3 rounded-lg border text-center transition-all ${
                isSystemFixed
                  ? 'bg-good/10 border-good/40 text-good'
                  : 'bg-card border-line text-fg'
              }`}
            >
              <div className="text-[10px] font-mono uppercase text-fg-muted">Stage 0{stg.num}</div>
              <div className="text-xs font-bold mt-0.5">{stg.name}</div>
              <div className="text-[10px] text-fg-muted mt-1">{stg.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Production Experiment */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleInjectEdgeCase}
            className="px-4 py-2.5 rounded-lg text-xs font-mono font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <AlertTriangle className="w-3.5 h-3.5" /> Inject Novel Production Edge-Case
          </button>

          {edgeCaseInjected && !isSystemFixed && (
            <button
              onClick={handleFixSystem}
              className="px-4 py-2.5 rounded-lg text-xs font-mono font-semibold bg-good text-white hover:bg-emerald-600 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Fix the System (Upgrade Pipeline)
            </button>
          )}

          <button
            onClick={() => {
              setAutonomyScore(64.2);
              setEdgeCaseInjected(false);
              setIsSystemFixed(false);
            }}
            className="px-3 py-2 rounded-lg text-xs font-mono text-fg-muted hover:text-fg hover:bg-band border border-line transition-all flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>

        {/* Edge Case Details */}
        {edgeCaseInjected && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl border text-xs ${
              isSystemFixed
                ? 'bg-good/10 border-good/30'
                : 'bg-amber-500/10 border-amber-500/30'
            }`}
          >
            <div className="font-bold text-sm mb-1 text-fg">
              {isSystemFixed
                ? 'System Upgraded: Invariant Feedback Arc Completed!'
                : 'Edge-Case Caught in Production: User in GMT+13 timezone during DST switchover'}
            </div>
            <p className="text-fg-body leading-relaxed">
              {isSystemFixed
                ? 'The feedback arc traveled backwards from Stage 6 into Stage 1 (Added UTC invariant), Stage 3 (Added Timezone Matrix verifier), and Stage 4 (Swarm fuzzer trained on DST offsets). The factory is permanently immune to this class of bugs!'
                : 'Stage 6 Prod Watcher caught the timestamp math error. If you only patch the application code with an "if" statement, your Autonomy Score remains 64.2%. Click "Fix the System" to upgrade the factory harness itself!'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
