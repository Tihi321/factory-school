import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Gauge,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Layers,
  FileCode,
  Zap,
  Target,
  FileCheck2,
  Bug,
  Activity,
  Terminal,
  Cpu,
  ShieldAlert,
  GitPullRequest,
  Check,
  Sliders,
  ChevronRight,
  Database
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
    // canvas-confetti fallback
  }
};

/* =========================================================================
   SIMULATOR 01: Attention Budget vs Code Velocity Simulator
   ========================================================================= */
export const Simulator01Shift: React.FC<SimulatorProps> = ({ isCompleted, onComplete }) => {
  type PersonaId = 'proofreader' | 'test_suite' | 'last_to_know' | 'factory_engineer';

  const personas = [
    {
      id: 'proofreader' as PersonaId,
      name: 'The Proofreader',
      role: 'Reads Every Diff Line-by-Line',
      description: 'Assumes human eyes can catch subtle distributed race conditions at line 412. Stares at GitHub PRs all day.',
      risk: 'Diff Fatigue Cliff: Beyond 2 agents, attention slips and bugs pass unnoticed.',
      color: 'border-amber-500/50 text-amber-400'
    },
    {
      id: 'test_suite' as PersonaId,
      name: 'Human Test Suite',
      role: 'Manually Tests Staging URLs',
      description: 'Spends 2 hours per PR clicking through forms and testing edge cases by hand in the browser.',
      risk: 'Severe Bottleneck: High attention burn, cannot scale beyond 1.5 agents.',
      color: 'border-orange-500/50 text-orange-400'
    },
    {
      id: 'last_to_know' as PersonaId,
      name: 'Last to Know',
      role: 'Rubber-Stamps LGTM',
      description: 'Skims PRs in 30 seconds and clicks Approve. Finds out about outages from PagerDuty alerts at 3 AM.',
      risk: 'Silent Bug Disaster: Zero bottleneck, but prod reliability collapses.',
      color: 'border-rose-500/50 text-rose-400'
    },
    {
      id: 'factory_engineer' as PersonaId,
      name: 'Software Factory Engineer',
      role: 'Harness & Invariant Builder',
      description: 'Invests attention into building automated verifiers, System-1 gates, and ADRs. Code velocity scales without human linear fatigue.',
      risk: 'Optimal: Attention shifts from reviewing code to engineering the harness.',
      color: 'border-emerald-500/50 text-emerald-400'
    }
  ];

  const [selectedPersona, setSelectedPersona] = useState<PersonaId>('proofreader');
  const [agentMultiplier, setAgentMultiplier] = useState<number>(4);
  const [dayIndex, setDayIndex] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [hasFinishedRun, setHasFinishedRun] = useState<boolean>(false);

  // Simulation day metrics calculation
  const simulationResults = useMemo(() => {
    const days = [1, 2, 3, 4, 5];
    return days.map((day) => {
      const prsPerAgent = 2.5;
      const totalPrsGenerated = Math.round(agentMultiplier * prsPerAgent * day);

      let attentionHrsPerDay = 0;
      let unreviewedBacklog = 0;
      let prodBugs = 0;
      let systemRulesCreated = 0;

      if (selectedPersona === 'proofreader') {
        attentionHrsPerDay = Math.min(14, 4 + agentMultiplier * 1.1);
        unreviewedBacklog = Math.max(0, Math.round((agentMultiplier - 2) * day * 2.2));
        prodBugs = Math.round(Math.max(0, agentMultiplier * 0.8 * (day > 2 ? 1.5 : 0.8)));
        systemRulesCreated = 0;
      } else if (selectedPersona === 'test_suite') {
        attentionHrsPerDay = Math.min(16, 5 + agentMultiplier * 1.4);
        unreviewedBacklog = Math.max(0, Math.round((agentMultiplier - 1.5) * day * 3.1));
        prodBugs = Math.round(Math.max(0, agentMultiplier * 0.4 * day * 0.6));
        systemRulesCreated = 0;
      } else if (selectedPersona === 'last_to_know') {
        attentionHrsPerDay = 1.2;
        unreviewedBacklog = 0;
        prodBugs = Math.round(agentMultiplier * 1.8 * day);
        systemRulesCreated = 0;
      } else {
        // factory_engineer
        attentionHrsPerDay = Math.min(6.5, 4.5 + Math.log2(agentMultiplier) * 0.5);
        unreviewedBacklog = 0;
        prodBugs = agentMultiplier > 6 ? 1 : 0;
        systemRulesCreated = day * 2;
      }

      return {
        day,
        totalPrsGenerated,
        attentionHrsPerDay: Number(attentionHrsPerDay.toFixed(1)),
        unreviewedBacklog,
        prodBugs,
        systemRulesCreated
      };
    });
  }, [selectedPersona, agentMultiplier]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isSimulating && dayIndex < 5) {
      timer = setTimeout(() => {
        setDayIndex((prev) => prev + 1);
      }, 700);
    } else if (isSimulating && dayIndex >= 5) {
      setIsSimulating(false);
      setHasFinishedRun(true);
      if (selectedPersona === 'factory_engineer') {
        fireConfetti();
        onComplete(120);
      }
    }
    return () => clearTimeout(timer);
  }, [isSimulating, dayIndex, selectedPersona, onComplete]);

  const handleStartSim = () => {
    setDayIndex(0);
    setHasFinishedRun(false);
    setIsSimulating(true);
  };

  const currentMetrics = dayIndex > 0 ? simulationResults[dayIndex - 1] : simulationResults[0];

  return (
    <div className="bg-card border border-line rounded-xl p-5 md:p-7 shadow-sm text-fg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
              Subject 01 Simulator
            </span>
            <span className="text-xs text-fg-muted font-mono">Attention Budget vs Velocity</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-sans mt-1 text-fg">
            The Human Attention Budget Simulator
          </h2>
          <p className="text-sm text-fg-muted mt-1 max-w-2xl">
            Experience why reading PR diffs harder fails as agent output scales from 1x to 10x, and how investing in automated verifiers bends the curve.
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

      {/* Step 1: Persona Picker */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider text-fg-muted flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-accent" /> Step 1: Select Your Engineering Persona
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {personas.map((p) => {
            const isSelected = selectedPersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedPersona(p.id);
                  setDayIndex(0);
                  setHasFinishedRun(false);
                }}
                className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-band border-accent shadow-sm ring-1 ring-accent'
                    : 'bg-card hover:bg-band/50 border-line text-fg-muted'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm text-fg">{p.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-accent" />}
                  </div>
                  <div className="text-xs text-accent font-mono mb-2">{p.role}</div>
                  <p className="text-xs text-fg-body leading-relaxed">{p.description}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-line/60 text-[11px] text-fg-muted font-mono">
                  {p.risk}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Agent Multiplier Slider */}
      <div className="bg-band/40 border border-line rounded-xl p-4 md:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-fg-muted flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-accent" /> Step 2: Parallel Coding Agents Speed
            </label>
            <div className="text-xs text-fg-muted mt-0.5">
              How many autonomous frontier coding agents are concurrently producing code?
            </div>
          </div>
          <span className="text-lg font-bold font-mono text-accent bg-accent/10 px-3 py-1 rounded border border-accent/20">
            {agentMultiplier}x Velocity ({agentMultiplier * 2.5} PRs/day)
          </span>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <span className="text-xs font-mono text-fg-muted">1x (Solo)</span>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={agentMultiplier}
            onChange={(e) => {
              setAgentMultiplier(Number(e.target.value));
              setDayIndex(0);
              setHasFinishedRun(false);
            }}
            className="w-full h-2 bg-line rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <span className="text-xs font-mono text-accent font-bold">10x (Factory)</span>
        </div>
      </div>

      {/* Step 3: Run Simulation Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleStartSim}
          disabled={isSimulating}
          className="px-5 py-2.5 rounded-lg font-medium text-sm bg-accent text-white hover:bg-accent-hover shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {isSimulating ? (
            <>
              <Activity className="w-4 h-4 animate-spin" /> Simulating Day {dayIndex}/5...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" /> Simulate 5-Day Sprint
            </>
          )}
        </button>

        <button
          onClick={() => {
            setDayIndex(0);
            setHasFinishedRun(false);
            setIsSimulating(false);
          }}
          className="px-3.5 py-2.5 rounded-lg text-xs font-mono text-fg-muted hover:text-fg hover:bg-band border border-line transition-all flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>

        {dayIndex > 0 && (
          <div className="text-xs font-mono text-fg-muted flex items-center gap-2">
            <span>Sprint Progress:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((d) => (
                <span
                  key={d}
                  className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                    d <= dayIndex
                      ? 'bg-accent text-white'
                      : 'bg-band text-fg-muted border border-line'
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Live Dashboard Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-line bg-card">
          <div className="text-[11px] font-mono uppercase text-fg-muted flex items-center gap-1 mb-1">
            <Gauge className="w-3.5 h-3.5 text-accent" /> Human Attention Spent
          </div>
          <div className="text-2xl font-bold font-mono text-fg flex items-baseline gap-1">
            {currentMetrics.attentionHrsPerDay}
            <span className="text-xs font-sans text-fg-muted font-normal">hrs/day</span>
          </div>
          <div className="mt-2 text-xs">
            {currentMetrics.attentionHrsPerDay > 8 ? (
              <span className="text-bad font-medium flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Burnout Territory ({currentMetrics.attentionHrsPerDay}h)
              </span>
            ) : (
              <span className="text-good font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Sustainable Budget
              </span>
            )}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-line bg-card">
          <div className="text-[11px] font-mono uppercase text-fg-muted flex items-center gap-1 mb-1">
            <GitPullRequest className="w-3.5 h-3.5 text-amber-400" /> Unreviewed Diff Backlog
          </div>
          <div className="text-2xl font-bold font-mono text-fg flex items-baseline gap-1">
            {currentMetrics.unreviewedBacklog}
            <span className="text-xs font-sans text-fg-muted font-normal">PRs stuck</span>
          </div>
          <div className="mt-2 text-xs">
            {currentMetrics.unreviewedBacklog > 5 ? (
              <span className="text-bad font-medium">Cognitive Diff Backlog Jam</span>
            ) : (
              <span className="text-good font-medium">Clear Pipeline</span>
            )}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-line bg-card">
          <div className="text-[11px] font-mono uppercase text-fg-muted flex items-center gap-1 mb-1">
            <AlertTriangle className="w-3.5 h-3.5 text-bad" /> Silent Prod Bugs
          </div>
          <div className="text-2xl font-bold font-mono text-fg flex items-baseline gap-1">
            {currentMetrics.prodBugs}
            <span className="text-xs font-sans text-fg-muted font-normal">incidents</span>
          </div>
          <div className="mt-2 text-xs">
            {currentMetrics.prodBugs > 2 ? (
              <span className="text-bad font-medium">PagerDuty Alert Spike!</span>
            ) : (
              <span className="text-good font-medium">Zero / Micro incidents</span>
            )}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-line bg-card">
          <div className="text-[11px] font-mono uppercase text-fg-muted flex items-center gap-1 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-good" /> Compounding System Rules
          </div>
          <div className="text-2xl font-bold font-mono text-fg flex items-baseline gap-1">
            {currentMetrics.systemRulesCreated}
            <span className="text-xs font-sans text-fg-muted font-normal">verifiers active</span>
          </div>
          <div className="mt-2 text-xs">
            {currentMetrics.systemRulesCreated > 0 ? (
              <span className="text-good font-medium">Self-Securing Pipeline</span>
            ) : (
              <span className="text-fg-muted font-mono">0 Invariants Encoded</span>
            )}
          </div>
        </div>
      </div>

      {/* Visual Timeline of Flowing PRs */}
      <div className="border border-line rounded-xl p-4 bg-band/20 space-y-3">
        <div className="text-xs font-mono uppercase text-fg-muted flex items-center justify-between">
          <span>Agent Code Pipeline Flow (Day {dayIndex || 1})</span>
          <span className="text-accent">{currentMetrics.totalPrsGenerated} PRs Created</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-card p-3 rounded-lg border border-line">
            <div className="text-xs font-semibold text-fg mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-accent" /> 1. Parallel Generation Stream
            </div>
            <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
              {Array.from({ length: Math.min(5, Math.ceil(agentMultiplier / 2)) }).map((_, i) => (
                <div key={i} className="text-[11px] font-mono bg-band px-2 py-1 rounded border border-line flex items-center justify-between">
                  <span className="truncate">agent-worker-0{i + 1} #feat/sub-{i}</span>
                  <span className="text-good font-bold">+284L</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card p-3 rounded-lg border border-line">
            <div className="text-xs font-semibold text-fg mb-2 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-400" /> 2. Review / Verification Filter
            </div>
            <div className="text-xs text-fg-body space-y-1">
              {selectedPersona === 'proofreader' && (
                <div className="text-amber-400 text-[11px] font-mono">
                  Diff fatigue reading line 340... Eyeballs straining, skimming logic blocks.
                </div>
              )}
              {selectedPersona === 'test_suite' && (
                <div className="text-orange-400 text-[11px] font-mono">
                  Clicking UI staging links manually... 4 PRs queued behind current manual click test.
                </div>
              )}
              {selectedPersona === 'last_to_know' && (
                <div className="text-rose-400 text-[11px] font-mono">
                  LGTM stamped in 12 seconds. Unchecked code merges straight to master.
                </div>
              )}
              {selectedPersona === 'factory_engineer' && (
                <div className="text-emerald-400 text-[11px] font-mono">
                  System-1 Judge & Invariant Verifier ran in 120ms. Zero human diff fatigue.
                </div>
              )}
            </div>
          </div>

          <div className="bg-card p-3 rounded-lg border border-line">
            <div className="text-xs font-semibold text-fg mb-2 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-good" /> 3. Production Outcome
            </div>
            <div className="text-xs space-y-1">
              <div className="text-[11px] font-mono flex justify-between">
                <span className="text-fg-muted">Backlog Jam:</span>
                <span className={currentMetrics.unreviewedBacklog > 0 ? 'text-bad' : 'text-good'}>
                  {currentMetrics.unreviewedBacklog} PRs
                </span>
              </div>
              <div className="text-[11px] font-mono flex justify-between">
                <span className="text-fg-muted">Silent Bugs Slipped:</span>
                <span className={currentMetrics.prodBugs > 0 ? 'text-bad' : 'text-good'}>
                  {currentMetrics.prodBugs} bugs
                </span>
              </div>
              <div className="text-[11px] font-mono flex justify-between">
                <span className="text-fg-muted">Rules Hardened:</span>
                <span className="text-good">+{currentMetrics.systemRulesCreated} rules</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insight / Takeaway Banner */}
      {hasFinishedRun && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border ${
            selectedPersona === 'factory_engineer'
              ? 'bg-good/10 border-good/30 text-fg'
              : 'bg-bad/10 border-bad/30 text-fg'
          }`}
        >
          <div className="flex items-start gap-3">
            {selectedPersona === 'factory_engineer' ? (
              <CheckCircle2 className="w-5 h-5 text-good shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-bad shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-sm font-bold">
                {selectedPersona === 'factory_engineer'
                  ? 'Factory Engineer Mastered: The Curve is Bent!'
                  : 'Diff-Reading Cliff Hit: Reading Harder Failed at 10x Velocity'}
              </div>
              <p className="text-xs text-fg-body mt-1 leading-relaxed">
                {selectedPersona === 'factory_engineer'
                  ? 'By investing your attention budget into automated verifiers, System-1 gates, and ADRs rather than squinting at raw diffs, your system absorbed 10x agent velocity with 0 PR backlogs, 0 burnout, and compounding reliability.'
                  : 'Notice that human attention is strictly bounded to ~6-8 focused hours/day. As agents scale output 10x, human diff reading either explodes into unreviewed backlogs or lets silent production bugs pass through. Switch to "Software Factory Engineer" and rerun to complete this lab!'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

/* =========================================================================
   SIMULATOR 02: Interactive Agent Interview & Rung Picker
   ========================================================================= */
export const Simulator02Alignment: React.FC<SimulatorProps> = ({ isCompleted, onComplete }) => {
  interface QuestionTrap {
    id: number;
    question: string;
    hiddenTrap: string;
    invariantExtracted: string;
    asked: boolean;
  }

  const [questions, setQuestions] = useState<QuestionTrap[]>([
    {
      id: 1,
      question: 'Proration & Mid-Cycle Upgrades: "What happens when a team upgrades from 3 to 15 seats mid-billing cycle?"',
      hiddenTrap: 'Without proration rules, the agent writes a naive charge API call that immediately bills for 15 full seats without crediting the remaining 18 days of the existing 3 seats.',
      invariantExtracted: 'Invariant: Seat additions calculate exact second-level proration credits against existing billing period.',
      asked: false
    },
    {
      id: 2,
      question: 'Seat Downgrades & Lockout: "If an admin downgrades from 10 to 5 seats, who gets locked out and when?"',
      hiddenTrap: 'Agent either silently hard-deletes the oldest 5 users or leaves all 10 active until next month, leaking paid features.',
      invariantExtracted: 'Invariant: Admin must explicitly pick which 5 seats become suspended; suspended seats retain data in read-only mode until cycle end.',
      asked: false
    },
    {
      id: 3,
      question: 'Role Permissions & 3DS Fallbacks: "Can standard Members invite teammates, and what if 3DS payment verification fails?"',
      hiddenTrap: 'Agent naively grants invite authority to all authenticated tokens, creating a privilege escalation vector, and treats pending 3DS as instant success.',
      invariantExtracted: 'Invariant: Only org:admin role can dispatch invites; pending payment holds invites in state: "payment_pending".',
      asked: false
    }
  ]);

  type RungId = 'shed' | 'cabin' | 'skyscraper';
  const [selectedRung, setSelectedRung] = useState<RungId | null>(null);

  const allQuestionsAsked = questions.every((q) => q.asked);

  const handleAskQuestion = (id: number) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, asked: true } : q))
    );
  };

  const handleSelectRung = (rung: RungId) => {
    setSelectedRung(rung);
    if (rung === 'shed' && allQuestionsAsked) {
      fireConfetti();
      onComplete(120);
    }
  };

  return (
    <div className="bg-card border border-line rounded-xl p-5 md:p-7 shadow-sm text-fg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
              Subject 02 Simulator
            </span>
            <span className="text-xs text-fg-muted font-mono">Alignment & Rung Picker</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-sans mt-1 text-fg">
            The Interactive Agent Interview & Scope Rung Picker
          </h2>
          <p className="text-sm text-fg-muted mt-1 max-w-2xl">
            A vague ticket arrives: <span className="font-mono text-accent italic">"Add team billing and seat management to our app."</span> Surface hidden traps with /grill-me questions before writing code!
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

      {/* Step 1: /grill-me Interview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono uppercase tracking-wider text-fg-muted flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-accent" /> Part 1: Surface Unknowns via /grill-me Interview ({questions.filter((q) => q.asked).length}/3 Asked)
          </label>
          <span className="text-xs text-fg-muted font-mono">Click each question to expose the trap</span>
        </div>

        <div className="space-y-3">
          {questions.map((q) => (
            <div
              key={q.id}
              className={`p-4 rounded-xl border transition-all ${
                q.asked
                  ? 'bg-band/40 border-line'
                  : 'bg-card hover:bg-band/20 border-line/80'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-fg flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs flex items-center justify-center shrink-0">
                      {q.id}
                    </span>
                    {q.question}
                  </div>
                </div>
                {!q.asked ? (
                  <button
                    onClick={() => handleAskQuestion(q.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-accent text-white hover:bg-accent-hover transition-colors shrink-0 flex items-center gap-1"
                  >
                    Ask Agent <ArrowRight className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="text-xs font-mono text-good bg-good/10 border border-good/20 px-2 py-1 rounded shrink-0 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Trap Surfaced
                  </span>
                )}
              </div>

              {q.asked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3 pt-3 border-t border-line/60 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs"
                >
                  <div className="bg-bad/10 border border-bad/20 p-2.5 rounded-lg">
                    <div className="font-semibold text-bad flex items-center gap-1 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Hidden Trap in Naive Code:
                    </div>
                    <div className="text-fg-body leading-relaxed">{q.hiddenTrap}</div>
                  </div>
                  <div className="bg-good/10 border border-good/20 p-2.5 rounded-lg">
                    <div className="font-semibold text-good flex items-center gap-1 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Concrete Invariant Added:
                    </div>
                    <div className="text-fg-body font-mono text-[11px] leading-relaxed">
                      {q.invariantExtracted}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 2: Rung Picker */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono uppercase tracking-wider text-fg-muted flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-accent" /> Part 2: Pick the Implementation Rung (Shed to Skyscraper)
          </label>
          <span className="text-xs text-fg-muted font-mono">Which scope validates alignment fastest?</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Rung 1: Shed */}
          <button
            onClick={() => handleSelectRung('shed')}
            className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
              selectedRung === 'shed'
                ? 'bg-good/10 border-good ring-1 ring-good'
                : 'bg-card hover:bg-band/40 border-line'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-good uppercase tracking-wider">
                  Rung 1: The Shed
                </span>
                <span className="text-xs font-mono text-fg-muted">~20 minutes</span>
              </div>
              <h4 className="font-bold text-sm text-fg mb-1">Stripe Customer Portal Link</h4>
              <p className="text-xs text-fg-body leading-relaxed">
                Zero custom frontend billing UI. Store `stripe_customer_id` on org table. Redirect user to Stripe Customer Portal for seat adjustments and invoice downloads.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-line/60 text-[11px] font-mono text-good flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Recommended: Instant feedback loop
            </div>
          </button>

          {/* Rung 2: Cabin */}
          <button
            onClick={() => handleSelectRung('cabin')}
            className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
              selectedRung === 'cabin'
                ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500'
                : 'bg-card hover:bg-band/40 border-line'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Rung 2: The Cabin
                </span>
                <span className="text-xs font-mono text-fg-muted">~2 days</span>
              </div>
              <h4 className="font-bold text-sm text-fg mb-1">Webhook Handler + In-App Seat Counter</h4>
              <p className="text-xs text-fg-body leading-relaxed">
                Custom seat allocation table, webhook listener for `customer.subscription.updated`, and seat badge warning when org exceeds seat limit.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-line/60 text-[11px] font-mono text-amber-400">
              Good for Phase 2 once demand is proven
            </div>
          </button>

          {/* Rung 3: Skyscraper */}
          <button
            onClick={() => handleSelectRung('skyscraper')}
            className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
              selectedRung === 'skyscraper'
                ? 'bg-rose-500/10 border-rose-500 ring-1 ring-rose-500'
                : 'bg-card hover:bg-band/40 border-line'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                  Rung 3: The Skyscraper
                </span>
                <span className="text-xs font-mono text-fg-muted">~2 weeks</span>
              </div>
              <h4 className="font-bold text-sm text-fg mb-1">Bespoke Multi-Currency Ledger</h4>
              <p className="text-xs text-fg-body leading-relaxed">
                Internal double-entry credit ledger, custom invoice PDF generation, automated enterprise dunning retry logic, and custom role permissions editor.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-line/60 text-[11px] font-mono text-rose-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> High Risk: 100k token drift trap
            </div>
          </button>
        </div>
      </div>

      {/* Rung Evaluation Feedback */}
      {selectedRung && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border ${
            selectedRung === 'shed'
              ? 'bg-good/10 border-good/30'
              : selectedRung === 'cabin'
              ? 'bg-amber-500/10 border-amber-500/30'
              : 'bg-bad/10 border-bad/30'
          }`}
        >
          <div className="text-sm font-bold flex items-center gap-2">
            {selectedRung === 'shed' ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-good" />
                <span className="text-good">Optimal Strategy: Build the Shed First!</span>
              </>
            ) : selectedRung === 'cabin' ? (
              <>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400">Moderate Choice: Feasible, but premature</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-bad" />
                <span className="text-bad">The Skyscraper Trap: Premature Spec Drift</span>
              </>
            )}
          </div>
          <p className="text-xs text-fg-body mt-1 leading-relaxed">
            {selectedRung === 'shed'
              ? 'Starting with the 20-minute Shed validates real customer willingness to pay and team seat usage before writing hundreds of lines of code. The /grill-me questions surfaced the invariants that protect the billing boundary.'
              : selectedRung === 'cabin'
              ? 'The Cabin is useful once you have 10 paying customers needing granular seat controls. But launching straight into Cabin without the Shed wastes agent tokens on untested assumptions.'
              : 'Skyscraper before Shed is the #1 failure mode in agentic development. You spend 100,000 tokens building complex custom ledgers only to learn the customer just wanted to click into Stripe! Switch to "Rung 1: The Shed" to complete this lab.'}
          </p>
        </motion.div>
      )}
    </div>
  );
};

/* =========================================================================
   SIMULATOR 03: Checkable Spec Builder & Adversarial Spec Critic
   ========================================================================= */
export const Simulator03Specs: React.FC<SimulatorProps> = ({ isCompleted, onComplete }) => {
  interface InvariantItem {
    id: string;
    title: string;
    code: string;
    selected: boolean;
  }

  interface VerifierItem {
    id: string;
    title: string;
    runner: string;
    selected: boolean;
  }

  const [invariants, setInvariants] = useState<InvariantItem[]>([
    {
      id: 'inv_idempotency',
      title: 'Idempotency Key Requirement',
      code: 'HEADER "Idempotency-Key: uuid" required on POST /api/charge',
      selected: false
    },
    {
      id: 'inv_latency',
      title: 'p95 Concurrency Latency SLA',
      code: 'p95 latency MUST be < 300ms across 50 concurrent payment attempts',
      selected: false
    },
    {
      id: 'inv_row_lock',
      title: 'Atomic Inventory Lock Invariant',
      code: 'BEGIN TRANSACTION; SELECT balance FOR UPDATE; balance >= quantity',
      selected: false
    }
  ]);

  const [verifiers, setVerifiers] = useState<VerifierItem[]>([
    {
      id: 'ver_playwright',
      title: 'Playwright Rapid Double-Click Test',
      runner: 'test/e2e/double-click.spec.ts (Fires 2 clicks within 40ms)',
      selected: false
    },
    {
      id: 'ver_db_unique',
      title: 'Postgres UNIQUE Index Constraint',
      runner: 'db/migrations/004_unique_idempotency_key.sql',
      selected: false
    },
    {
      id: 'ver_k6',
      title: 'k6 Load & Connection Pool Verifier',
      runner: 'scripts/k6-payment-load.js (50 VUs, assert p95 < 300ms)',
      selected: false
    }
  ]);

  interface ExploitResult {
    id: string;
    title: string;
    attackVector: string;
    status: 'pending' | 'breached' | 'blocked';
    remedy: string;
  }

  const [isRunningCritic, setIsRunningCritic] = useState<boolean>(false);
  const [exploits, setExploits] = useState<ExploitResult[]>([
    {
      id: 'exp_double_charge',
      title: 'Exploit 1: Impatient User Double-Click Attack',
      attackVector: 'User clicks "Complete Purchase" twice in 50ms on mobile connection.',
      status: 'pending',
      remedy: 'Requires Idempotency Invariant + Playwright / Postgres Unique Verifier.'
    },
    {
      id: 'exp_db_exhaustion',
      title: 'Exploit 2: Gateway Spike Connection Pool Starvation',
      attackVector: '50 simultaneous requests hit unindexed table, causing thread locks & HTTP 504 timeout leaks.',
      status: 'pending',
      remedy: 'Requires p95 Latency SLA + k6 Load Verifier.'
    },
    {
      id: 'exp_oversell',
      title: 'Exploit 3: Race Condition Inventory Oversell',
      attackVector: 'Two shoppers checkout the last remaining inventory item at the exact same millisecond.',
      status: 'pending',
      remedy: 'Requires Atomic Inventory Row Lock Invariant.'
    }
  ]);

  const toggleInvariant = (id: string) => {
    setInvariants((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i))
    );
  };

  const toggleVerifier = (id: string) => {
    setVerifiers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, selected: !v.selected } : v))
    );
  };

  const checkabilityScore = useMemo(() => {
    const invCount = invariants.filter((i) => i.selected).length;
    const verCount = verifiers.filter((v) => v.selected).length;
    return Math.round(((invCount + verCount) / 6) * 100);
  }, [invariants, verifiers]);

  const runAdversarialCritic = () => {
    setIsRunningCritic(true);
    setTimeout(() => {
      const invMap = Object.fromEntries(invariants.map((i) => [i.id, i.selected]));
      const verMap = Object.fromEntries(verifiers.map((v) => [v.id, v.selected]));

      const e1Blocked = invMap['inv_idempotency'] && (verMap['ver_playwright'] || verMap['ver_db_unique']);
      const e2Blocked = invMap['inv_latency'] && verMap['ver_k6'];
      const e3Blocked = invMap['inv_row_lock'];

      setExploits([
        {
          id: 'exp_double_charge',
          title: 'Exploit 1: Impatient User Double-Click Attack',
          attackVector: 'User clicks "Complete Purchase" twice in 50ms on mobile connection.',
          status: e1Blocked ? 'blocked' : 'breached',
          remedy: 'Requires Idempotency Invariant + Playwright / Postgres Unique Verifier.'
        },
        {
          id: 'exp_db_exhaustion',
          title: 'Exploit 2: Gateway Spike Connection Pool Starvation',
          attackVector: '50 simultaneous requests hit unindexed table, causing thread locks & HTTP 504 timeout leaks.',
          status: e2Blocked ? 'blocked' : 'breached',
          remedy: 'Requires p95 Latency SLA + k6 Load Verifier.'
        },
        {
          id: 'exp_oversell',
          title: 'Exploit 3: Race Condition Inventory Oversell',
          attackVector: 'Two shoppers checkout the last remaining inventory item at the exact same millisecond.',
          status: e3Blocked ? 'blocked' : 'breached',
          remedy: 'Requires Atomic Inventory Row Lock Invariant.'
        }
      ]);
      setIsRunningCritic(false);

      if (e1Blocked && e2Blocked && e3Blocked && checkabilityScore === 100) {
        fireConfetti();
        onComplete(120);
      }
    }, 800);
  };

  return (
    <div className="bg-card border border-line rounded-xl p-5 md:p-7 shadow-sm text-fg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
              Subject 03 Simulator
            </span>
            <span className="text-xs text-fg-muted font-mono">Spec Workbench & Red-Team Critic</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-sans mt-1 text-fg">
            The Checkable Spec Builder & Adversarial Critic
          </h2>
          <p className="text-sm text-fg-muted mt-1 max-w-2xl">
            Prose is an invitation to hallucinate. Turn a vague checkout prompt into an airtight checkable specification backed by executable verifiers.
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

      {/* Side-by-Side: Spec Workbench & Adversarial Critic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Spec Builder (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Prose baseline */}
          <div className="bg-band/40 border border-line rounded-xl p-4">
            <div className="text-xs font-mono uppercase tracking-wider text-fg-muted flex items-center gap-1.5 mb-1.5">
              <FileCode className="w-3.5 h-3.5 text-amber-400" /> Vague Prose Ticket (Initial Request)
            </div>
            <p className="text-xs font-serif italic text-fg-body bg-card p-3 rounded-lg border border-line">
              "Make checkout fast and safe from double-charging. Make sure users don't wait too long and handle errors gracefully."
            </p>
          </div>

          {/* Attach Invariants */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-fg-muted flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" /> Attach Explicit Invariants
              </span>
              <span className="text-[11px] text-accent font-mono">
                {invariants.filter((i) => i.selected).length}/3 active
              </span>
            </label>
            <div className="space-y-2">
              {invariants.map((inv) => (
                <button
                  key={inv.id}
                  onClick={() => toggleInvariant(inv.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all flex items-start gap-3 ${
                    inv.selected
                      ? 'bg-accent/10 border-accent/60 shadow-xs'
                      : 'bg-card hover:bg-band/50 border-line text-fg-muted'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                      inv.selected
                        ? 'bg-accent border-accent text-white'
                        : 'border-line bg-card'
                    }`}
                  >
                    {inv.selected && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-fg">{inv.title}</div>
                    <code className="text-[11px] text-accent font-mono mt-0.5 block">
                      {inv.code}
                    </code>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Attach Verifiers */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-fg-muted flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-good" /> Attach Executable Verifiers
              </span>
              <span className="text-[11px] text-good font-mono">
                {verifiers.filter((v) => v.selected).length}/3 active
              </span>
            </label>
            <div className="space-y-2">
              {verifiers.map((ver) => (
                <button
                  key={ver.id}
                  onClick={() => toggleVerifier(ver.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all flex items-start gap-3 ${
                    ver.selected
                      ? 'bg-good/10 border-good/60 shadow-xs'
                      : 'bg-card hover:bg-band/50 border-line text-fg-muted'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                      ver.selected
                        ? 'bg-good border-good text-white'
                        : 'border-line bg-card'
                    }`}
                  >
                    {ver.selected && <Check className="w-3 h-3" />}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-fg">{ver.title}</div>
                    <code className="text-[11px] text-fg-muted font-mono mt-0.5 block">
                      {ver.runner}
                    </code>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Adversarial Critic & Checkability Meter (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 bg-band/20 border border-line rounded-xl p-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase text-fg-muted flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-bad" /> Red-Team Spec Critic
              </span>
              <span className="text-xs font-mono font-bold text-accent">
                {checkabilityScore}% Checkable
              </span>
            </div>

            {/* Checkability bar */}
            <div className="w-full h-2 bg-line rounded-full overflow-hidden mb-4">
              <div
                className={`h-full transition-all duration-300 ${
                  checkabilityScore === 100
                    ? 'bg-good'
                    : checkabilityScore > 50
                    ? 'bg-accent'
                    : 'bg-amber-400'
                }`}
                style={{ width: `${checkabilityScore}%` }}
              />
            </div>

            <button
              onClick={runAdversarialCritic}
              disabled={isRunningCritic}
              className="w-full py-2.5 rounded-lg font-medium text-xs font-mono bg-bad/90 hover:bg-bad text-white transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isRunningCritic ? (
                <>
                  <Activity className="w-3.5 h-3.5 animate-spin" /> Fuzzing Spec Loopholes...
                </>
              ) : (
                <>
                  <Bug className="w-3.5 h-3.5" /> Run Adversarial Spec Critic
                </>
              )}
            </button>

            {/* Exploit cards */}
            <div className="mt-4 space-y-2.5">
              {exploits.map((exp) => (
                <div
                  key={exp.id}
                  className={`p-3 rounded-lg border text-xs transition-all ${
                    exp.status === 'blocked'
                      ? 'bg-good/10 border-good/40'
                      : exp.status === 'breached'
                      ? 'bg-bad/10 border-bad/40'
                      : 'bg-card border-line'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-fg">{exp.title}</span>
                    {exp.status === 'blocked' && (
                      <span className="text-[10px] font-mono text-good bg-good/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Check className="w-3 h-3" /> Blocked
                      </span>
                    )}
                    {exp.status === 'breached' && (
                      <span className="text-[10px] font-mono text-bad bg-bad/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Breached!
                      </span>
                    )}
                    {exp.status === 'pending' && (
                      <span className="text-[10px] font-mono text-fg-muted">Untested</span>
                    )}
                  </div>
                  <div className="text-[11px] text-fg-body leading-relaxed">{exp.attackVector}</div>
                  {exp.status === 'breached' && (
                    <div className="mt-2 text-[10px] text-bad font-mono bg-bad/10 p-1.5 rounded">
                      ⚠️ {exp.remedy}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-line text-[11px] text-fg-muted font-mono leading-relaxed">
            Attach all 3 Invariants and 3 Verifiers, then run the critic to achieve 100% checkability!
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SIMULATOR 04: Context Layer & Signal-to-Noise Sandbox
   ========================================================================= */
export const Simulator04Codebase: React.FC<SimulatorProps> = ({ isCompleted, onComplete }) => {
  interface CodebaseRule {
    id: string;
    label: string;
    description: string;
    tokenSaving: number;
    signalDelta: number;
    enabled: boolean;
  }

  const [rules, setRules] = useState<CodebaseRule[]>([
    {
      id: 'rule_one_pattern',
      label: 'The One-Pattern Rule',
      description: 'Consolidate 4 competing HTTP clients (axios, got, node-fetch, request) into 1 canonical typed apiClient.',
      tokenSaving: 32000,
      signalDelta: 24,
      enabled: false
    },
    {
      id: 'rule_deep_module',
      label: 'Deep Module Interface',
      description: 'Hide 600 lines of raw HMAC SHA-256 crypto behind a clean 3-line `verifyWebhookSignature(req)` boundary.',
      tokenSaving: 41000,
      signalDelta: 28,
      enabled: false
    },
    {
      id: 'rule_context_hygiene',
      label: 'Living Context Hygiene',
      description: 'Delete 5 stale READMEs and dead specs; add ADR-007 + concise docs/invariants.md.',
      tokenSaving: 28000,
      signalDelta: 20,
      enabled: false
    },
    {
      id: 'rule_complain_early',
      label: 'Complain-Early Agent Directive',
      description: 'Stop agent from writing duct-tape wrappers around broken patterns; instruct it to raise explicit friction issues.',
      tokenSaving: 12000,
      signalDelta: 16,
      enabled: false
    }
  ]);

  const toggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const { signalToNoise, tokensWasted, agentHops } = useMemo(() => {
    const baseSignal = 18;
    const baseTokens = 120000;
    const activeRules = rules.filter((r) => r.enabled);

    const signal = Math.min(
      96,
      baseSignal + activeRules.reduce((acc, curr) => acc + curr.signalDelta, 0)
    );
    const tokens = Math.max(
      4200,
      baseTokens - activeRules.reduce((acc, curr) => acc + curr.tokenSaving, 0)
    );

    let hops = 7;
    if (activeRules.length === 1) hops = 5;
    else if (activeRules.length === 2) hops = 4;
    else if (activeRules.length === 3) hops = 3;
    else if (activeRules.length === 4) hops = 2;

    return { signalToNoise: signal, tokensWasted: tokens, agentHops: hops };
  }, [rules]);

  useEffect(() => {
    if (rules.every((r) => r.enabled) && !isCompleted) {
      fireConfetti();
      onComplete(120);
    }
  }, [rules, isCompleted, onComplete]);

  return (
    <div className="bg-card border border-line rounded-xl p-5 md:p-7 shadow-sm text-fg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
              Subject 04 Simulator
            </span>
            <span className="text-xs text-fg-muted font-mono">Codebase Architecture & Signal-to-Noise</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-sans mt-1 text-fg">
            The Codebase Signal-to-Noise & Context Layer Sandbox
          </h2>
          <p className="text-sm text-fg-muted mt-1 max-w-2xl">
            When a codebase is noisy, agents spend 100k tokens hallucinating between 4 conflicting libraries. Turn on architecture rules and watch context waste drop.
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

      {/* Interactive Architecture Toggles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {rules.map((rule) => (
          <button
            key={rule.id}
            onClick={() => toggleRule(rule.id)}
            className={`p-4 rounded-xl border text-left transition-all flex items-start justify-between gap-3 ${
              rule.enabled
                ? 'bg-band border-accent ring-1 ring-accent'
                : 'bg-card hover:bg-band/30 border-line text-fg-muted'
            }`}
          >
            <div className="space-y-1">
              <div className="text-sm font-semibold text-fg flex items-center gap-2">
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                    rule.enabled
                      ? 'bg-accent border-accent text-white'
                      : 'border-line bg-card'
                  }`}
                >
                  {rule.enabled && <Check className="w-3 h-3" />}
                </div>
                {rule.label}
              </div>
              <p className="text-xs text-fg-body leading-relaxed">{rule.description}</p>
              <div className="flex items-center gap-3 pt-2 text-[11px] font-mono">
                <span className="text-good">+{rule.signalDelta}% Signal</span>
                <span className="text-accent">-{rule.tokenSaving.toLocaleString()} Tokens</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Radar & Metrics Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-band/30 border border-line rounded-xl p-5">
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-fg-muted flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-accent" /> Signal-to-Noise Ratio
          </div>
          <div className="text-3xl font-bold font-mono text-fg flex items-baseline gap-1">
            {signalToNoise}%
          </div>
          <div className="w-full h-2 bg-line rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                signalToNoise > 80 ? 'bg-good' : signalToNoise > 50 ? 'bg-accent' : 'bg-bad'
              }`}
              style={{ width: `${signalToNoise}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-fg-muted block">
            {signalToNoise > 80 ? 'Crisp canonical interfaces' : 'Conflicting patterns & dead docs'}
          </span>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-fg-muted flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-amber-400" /> Context Window Wasted
          </div>
          <div className="text-3xl font-bold font-mono text-fg flex items-baseline gap-1">
            {tokensWasted.toLocaleString()}
            <span className="text-xs font-sans text-fg-muted font-normal">tokens / run</span>
          </div>
          <div className="text-[11px] font-mono text-fg-muted">
            {tokensWasted < 20000 ? (
              <span className="text-good font-semibold">96% Token Cost Savings</span>
            ) : (
              <span className="text-bad">Burning \$0.45/run on duplicate junk</span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono uppercase text-fg-muted flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-good" /> Agent Decision Navigation
          </div>
          <div className="text-3xl font-bold font-mono text-fg flex items-baseline gap-1">
            {agentHops}
            <span className="text-xs font-sans text-fg-muted font-normal">hops to solution</span>
          </div>
          <div className="text-[11px] font-mono text-fg-muted">
            {agentHops === 2 ? (
              <span className="text-good font-semibold">Direct 2-step execution (Zero hallucination)</span>
            ) : (
              <span className="text-bad">{agentHops} erratic trial-and-error hops</span>
            )}
          </div>
        </div>
      </div>

      {/* Visual Navigation Comparison */}
      <div className="p-4 rounded-xl border border-line bg-card space-y-2">
        <div className="text-xs font-mono uppercase text-fg-muted">
          Agent Execution Path Visualization:
        </div>
        <div className="font-mono text-xs p-3 rounded-lg bg-band/60 border border-line overflow-x-auto text-fg-body flex items-center gap-2">
          <span className="px-2 py-1 rounded bg-accent/10 border border-accent/20 text-accent font-semibold">
            Goal: Verify Webhook
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-fg-muted shrink-0" />
          {rules.every((r) => r.enabled) ? (
            <>
              <span className="px-2 py-1 rounded bg-good/10 border border-good/20 text-good font-semibold">
                Read ADR-007
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-fg-muted shrink-0" />
              <span className="px-2 py-1 rounded bg-good/10 border border-good/20 text-good font-semibold">
                Call verifyWebhookSignature() (Pass in 1 Shot)
              </span>
            </>
          ) : (
            <>
              <span className="px-2 py-1 rounded bg-bad/10 border border-bad/20 text-bad">
                Inspect 4 HTTP clients
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-fg-muted shrink-0" />
              <span className="px-2 py-1 rounded bg-bad/10 border border-bad/20 text-bad">
                Hallucinate axios crypto wrapper
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-fg-muted shrink-0" />
              <span className="px-2 py-1 rounded bg-bad/10 border border-bad/20 text-bad">
                Debug conflicting type error...
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   SIMULATOR 05: Loop Graph Builder & Convergence Step-Runner
   ========================================================================= */
export const Simulator05Loops: React.FC<SimulatorProps> = ({ isCompleted, onComplete }) => {
  interface IterationStep {
    iteration: number;
    errorCount: number;
    confidence: number;
    builderAction: string;
    verifierOutput: string;
    status: 'failed' | 'converged';
  }

  const iterations: IterationStep[] = [
    {
      iteration: 1,
      errorCount: 8,
      confidence: 25,
      builderAction: 'Agent converted 12 endpoints to tRPC procedures, but used any types for pagination params.',
      verifierOutput: 'TypeScript compiler failed: 8 type mismatch errors in router contracts. Contract tests: 4/12 failed.',
      status: 'failed'
    },
    {
      iteration: 2,
      errorCount: 3,
      confidence: 60,
      builderAction: 'Agent ingested compiler error trace and generated Zod schemas for user routes.',
      verifierOutput: 'TypeScript compiler passed! Vitest contract tests: 3 endpoints fail null-safety assertion on empty array.',
      status: 'failed'
    },
    {
      iteration: 3,
      errorCount: 1,
      confidence: 85,
      builderAction: 'Agent patched null checks and added boundary fallback.',
      verifierOutput: 'Contract tests: 11/12 passed. 1 edge case fails on negative offset in pagination.',
      status: 'failed'
    },
    {
      iteration: 4,
      errorCount: 0,
      confidence: 100,
      builderAction: 'Agent enforced z.number().int().nonnegative() on offset parameter.',
      verifierOutput: 'All verifiers green! TypeScript: 0 errors. Vitest: 12/12 passed. Converged successfully!',
      status: 'converged'
    }
  ];

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isAutoRunning, setIsAutoRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isAutoRunning && currentStep < 4) {
      timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 900);
    } else if (isAutoRunning && currentStep >= 4) {
      setIsAutoRunning(false);
      fireConfetti();
      onComplete(120);
    }
    return () => clearTimeout(timer);
  }, [isAutoRunning, currentStep, onComplete]);

  const handleStepForward = () => {
    if (currentStep < 4) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (next === 4) {
        fireConfetti();
        onComplete(120);
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsAutoRunning(false);
  };

  const currentIterData = currentStep > 0 ? iterations[currentStep - 1] : null;

  return (
    <div className="bg-card border border-line rounded-xl p-5 md:p-7 shadow-sm text-fg space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-line pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
              Subject 05 Simulator
            </span>
            <span className="text-xs text-fg-muted font-mono">Loop Graph & Convergence Engine</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-sans mt-1 text-fg">
            The Autonomous Builder-Verifier Loop Runner
          </h2>
          <p className="text-sm text-fg-muted mt-1 max-w-2xl">
            Watch an autonomous L4 Worker Loop iterate against back-pressure: Draft Change → Verifier Gate → Error Feedback → Self-Correction → 0 Errors.
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

      {/* Loop Setup Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-band/30 p-4 rounded-xl border border-line text-xs font-mono">
        <div>
          <span className="text-fg-muted uppercase block text-[10px] mb-1">Configured Goal</span>
          <span className="font-semibold text-fg">Migrate 12 REST to typed tRPC</span>
        </div>
        <div>
          <span className="text-fg-muted uppercase block text-[10px] mb-1">Back-Pressure Verifiers</span>
          <span className="font-semibold text-accent">tsc --noEmit + Vitest Contracts</span>
        </div>
        <div>
          <span className="text-fg-muted uppercase block text-[10px] mb-1">Loop Topology</span>
          <span className="font-semibold text-good">L4 Autonomous Self-Correcting</span>
        </div>
      </div>

      {/* Step Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleStepForward}
          disabled={currentStep >= 4 || isAutoRunning}
          className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-accent text-white hover:bg-accent-hover transition-colors flex items-center gap-1.5 disabled:opacity-40"
        >
          <ChevronRight className="w-4 h-4" /> Step Loop ({currentStep}/4)
        </button>

        <button
          onClick={() => {
            if (currentStep >= 4) setCurrentStep(0);
            setIsAutoRunning(true);
          }}
          disabled={isAutoRunning}
          className="px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-good text-white hover:bg-emerald-600 transition-colors flex items-center gap-1.5 disabled:opacity-40"
        >
          {isAutoRunning ? (
            <>
              <Activity className="w-3.5 h-3.5 animate-spin" /> Auto-Running...
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" /> Auto-Run to Convergence
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="px-3 py-2 rounded-lg text-xs font-mono text-fg-muted hover:text-fg hover:bg-band border border-line transition-all flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Visual Pipeline Topology */}
      <div className="p-4 rounded-xl border border-line bg-card">
        <div className="text-xs font-mono uppercase text-fg-muted mb-3 flex items-center gap-2">
          <span>Active Loop Pipeline Graph</span>
          {currentStep > 0 && (
            <span className="text-accent font-bold">Iteration {currentStep}</span>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs font-mono">
          <div
            className={`p-3 rounded-lg border transition-all ${
              currentStep >= 1 ? 'bg-accent/10 border-accent text-accent font-bold' : 'bg-band border-line text-fg-muted'
            }`}
          >
            1. Builder Agent
          </div>
          <div
            className={`p-3 rounded-lg border transition-all ${
              currentStep >= 2 ? 'bg-amber-400/10 border-amber-400 text-amber-400 font-bold' : 'bg-band border-line text-fg-muted'
            }`}
          >
            2. Draft Source Code
          </div>
          <div
            className={`p-3 rounded-lg border transition-all ${
              currentStep >= 3 ? 'bg-rose-400/10 border-rose-400 text-rose-400 font-bold' : 'bg-band border-line text-fg-muted'
            }`}
          >
            3. Verifier Back-Pressure
          </div>
          <div
            className={`p-3 rounded-lg border transition-all ${
              currentStep === 4 ? 'bg-good/10 border-good text-good font-bold' : 'bg-band border-line text-fg-muted'
            }`}
          >
            4. Converged Output
          </div>
        </div>
      </div>

      {/* Step Detail Console */}
      {currentIterData ? (
        <motion.div
          key={currentIterData.iteration}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-xl border border-line bg-band/40 space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-accent font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> Iteration {currentIterData.iteration} Output
            </span>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className={currentIterData.errorCount === 0 ? 'text-good font-bold' : 'text-bad'}>
                {currentIterData.errorCount} Errors Remaining
              </span>
              <span className="text-accent font-bold">{currentIterData.confidence}% Confidence</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="bg-card p-3 rounded-lg border border-line">
              <div className="font-semibold text-fg text-[11px] uppercase font-mono text-fg-muted mb-1">
                Builder Agent Action:
              </div>
              <p className="text-fg-body">{currentIterData.builderAction}</p>
            </div>

            <div
              className={`p-3 rounded-lg border font-mono text-[11px] ${
                currentIterData.errorCount === 0
                  ? 'bg-good/10 border-good/30 text-good'
                  : 'bg-bad/10 border-bad/30 text-bad'
              }`}
            >
              <div className="font-bold mb-1">Verifier Feedback:</div>
              {currentIterData.verifierOutput}
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="p-8 text-center border border-dashed border-line rounded-xl text-xs font-mono text-fg-muted">
          Click "Step Loop" or "Auto-Run to Convergence" to start the L4 Builder-Verifier iteration.
        </div>
      )}
    </div>
  );
};
