import React, { useState } from 'react';
import { HERO_MANIFESTO, SUBJECTS } from '../data/subjects';
import { useFactoryStore } from '../store/useFactoryStore';
import {
  ArrowRight,
  Shield,
  Zap,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  ChevronRight,
  Sparkles,
  GitBranch,
  RefreshCw,
  Eye,
  FileCode2,
  Terminal,
  Activity,
  Layers,
  FlaskConical,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export interface HeroManifestoProps {
  onSelectSubject: (subjectId: number) => void;
  onNavigateTab: (tab: 'overview' | 'subjects' | 'syllabus' | 'blueprint') => void;
}

export const HeroManifesto: React.FC<HeroManifestoProps> = ({
  onSelectSubject,
  onNavigateTab,
}) => {
  const {
    activePersonType,
    setActivePersonType,
    completedSimulators,
    completedQuizzes,
  } = useFactoryStore();

  // State for the interactive Verification Gap curve slider
  const [generationScale, setGenerationScale] = useState<number>(10); // 1x to 50x multiplier
  const [selectedDeadEndIndex, setSelectedDeadEndIndex] = useState<number | null>(0);
  const [activeLoopNode, setActiveLoopNode] = useState<string>('factory');

  // Math for the Verification Gap simulator
  const baseLines = 400;
  const linesGenerated = baseLines * generationScale;
  const humanReviewCapacity = 300; // max rigorous diff lines per day without hallucinating
  const reviewTimeWithoutFactoryHours = Number((linesGenerated / 300 * 1.5).toFixed(1));
  const reviewTimeWithFactoryHours = Number((0.2 + (linesGenerated / 20000)).toFixed(2));
  const isDrowning = linesGenerated > humanReviewCapacity * 2;

  // Personas mapping
  const personas = [
    {
      id: 'proofreader' as const,
      name: 'The Proofreader',
      subtitle: 'The Chat Window Babysitter',
      quote: 'I spend more mental energy scrutinizing Claude’s syntax than I ever spent writing it myself.',
      trap: 'Reading 400 lines of generated code line-by-line in an IDE diff, hoping your biological wetware catches every off-by-one error.',
      withoutFactory: 'Human reads 600 lines of AI diff line-by-line. Misses an edge case. PR merged. Production breaks.',
      withFactory: 'Deterministic Playwright & property-based tests reject the diff automatically before any human looks at it.',
      keyShift: 'From biological diff reading → to executable invariant specifications.',
      badgeColor: 'border-bad/40 text-bad bg-bad/10',
    },
    {
      id: 'test-suite' as const,
      name: 'The Human Test Suite',
      subtitle: 'The Manual Clicker',
      quote: 'I am acting as an unpaid mechanical turk for a trillion-parameter neural network.',
      trap: 'Running the dev server locally, opening Chrome, clicking the button 14 times, then alt-tabbing to prompt fixes.',
      withoutFactory: 'Manual browser clicks for every single tweak. Takes 25 minutes of context-switching per iteration.',
      withFactory: 'Headless ephemeral container runs full user flow assertions in 3 seconds, feeding JSON back to the agent.',
      keyShift: 'From manual browser clicking → to headless verification harnesses with back-pressure.',
      badgeColor: 'border-bad/40 text-bad bg-bad/10',
    },
    {
      id: 'last-to-know' as const,
      name: 'The Last to Know',
      subtitle: 'The Firefighter',
      quote: 'It looked totally plausible in the PR review window, but none of our runtime invariants were verified.',
      trap: 'Shipping AI-generated PRs that passed human eye review, only to discover in production that foreign keys silently corrupted.',
      withoutFactory: 'Plausible code passes visual code review. Silent database corruption discovered 3 weeks later.',
      withFactory: 'Ephemeral database container migration tests run on every branch, proving invariant compliance.',
      keyShift: 'From plausible syntax → to runtime invariant verification.',
      badgeColor: 'border-bad/40 text-bad bg-bad/10',
    },
    {
      id: 'factory-engineer' as const,
      name: 'The Software Factory Engineer',
      subtitle: 'The Systems Architect',
      quote: 'Stop building the app. Build the machine that builds the app.',
      trap: 'None. You write verification loops, System-1 judges, and invariants. The agents do the heavy lifting safely.',
      withoutFactory: 'Attention bottlenecked, 1 PR/day, fearful of breaking changes, exhausted by diff reviews.',
      withFactory: 'Runs 12 parallel bug-bash swarms in isolated git worktrees overnight. Merges green branches automatically.',
      keyShift: 'Mastery of the Software Factory lifecycle.',
      badgeColor: 'border-good/40 text-good bg-good/10',
    },
  ];

  const currentPersona = personas.find((p) => p.id === activePersonType) || personas[0];

  return (
    <div className="space-y-16 pb-20">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: EDITORIAL HERO & SYSTEM LOOP
      ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-card via-card/80 to-bg p-6 sm:p-10 lg:p-14 shadow-2xl">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-good/5 blur-3xl" />

        <div className="relative z-10 max-w-4xl">
          {/* Kicker */}
          <div className="inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-wash px-3 py-1 font-mono text-xs font-semibold text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            <span>THE SOFTWARE FACTORY ENGINEER • INTERACTIVE OPEN CURRICULUM</span>
          </div>

          {/* Headline */}
          <h1 className="mt-5 font-serif text-3xl font-bold tracking-tight text-fg sm:text-5xl lg:text-6xl sm:leading-[1.12]">
            Stop building the app.{' '}
            <span className="italic text-accent underline decoration-accent-line decoration-wavy underline-offset-8">
              Build the thing that builds it.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base text-fg-body sm:text-lg leading-relaxed max-w-2xl">
            Raw code generation has become a commodity with near-zero marginal cost.
            When generation is free, <strong>your attention and verification capacity</strong> become
            the sole bottlenecks in software delivery.
          </p>

          <p className="mt-2 text-sm text-fg-muted font-mono">
            Codebase Design • Verification Loops • System-1 Evaluators • Swarms • Production Watchers
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onSelectSubject(1)}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-accent-ink hover:bg-accent-hover transition shadow-lg shadow-accent/20"
            >
              <span>Start Subject 01: The Shift</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => onNavigateTab('subjects')}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-band px-4 py-3 text-sm font-medium text-fg hover:border-line-strong hover:bg-card transition"
            >
              <FlaskConical className="h-4 w-4 text-accent" />
              <span>Explore 10 Interactive Simulators</span>
            </button>

            <button
              onClick={() => onNavigateTab('blueprint')}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-band px-4 py-3 text-sm font-medium text-fg-muted hover:text-fg hover:border-line-strong transition"
            >
              <Layers className="h-4 w-4" />
              <span>Factory Blueprint (12 Invariants)</span>
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            THE INTERACTIVE SYSTEM LOOP FLOWCHART
        ───────────────────────────────────────────────────────────── */}
        <div className="mt-12 rounded-2xl border border-line bg-band/70 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-line pb-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Autonomous Software Factory Architecture
              </div>
              <div className="font-serif text-lg font-bold text-fg">
                The Closed Verification Feedback Loop
              </div>
            </div>
            <div className="font-mono text-xs text-fg-subtle">
              Click any node to inspect system role
            </div>
          </div>

          {/* Diagram Nodes */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 relative">
            {/* Node 1: You */}
            <div
              onClick={() => setActiveLoopNode('human')}
              className={clsx(
                'cursor-pointer rounded-xl border p-4 transition-all',
                activeLoopNode === 'human'
                  ? 'border-accent bg-accent-wash shadow-md shadow-accent/10'
                  : 'border-line bg-card hover:border-line-strong'
              )}
            >
              <div className="flex items-center justify-between text-xs font-mono text-accent">
                <span>STAGE 01</span>
                <span>ARCHITECT</span>
              </div>
              <div className="mt-2 font-serif text-base font-bold text-fg">You (The Engineer)</div>
              <p className="mt-1 text-xs text-fg-muted">
                Formulates specifications, sets invariants, and crafts verification harnesses.
              </p>
              <div className="mt-3 flex items-center text-[11px] font-mono text-accent font-semibold">
                <span>Outputs: Spec & Invariants →</span>
              </div>
            </div>

            {/* Node 2: The Agentic Factory */}
            <div
              onClick={() => setActiveLoopNode('factory')}
              className={clsx(
                'cursor-pointer rounded-xl border p-4 transition-all',
                activeLoopNode === 'factory'
                  ? 'border-accent bg-accent-wash shadow-md shadow-accent/10'
                  : 'border-line bg-card hover:border-line-strong'
              )}
            >
              <div className="flex items-center justify-between text-xs font-mono text-accent">
                <span>STAGE 02</span>
                <span>FACTORY MEMBRANE</span>
              </div>
              <div className="mt-2 font-serif text-base font-bold text-fg">The Factory Membrane</div>
              <p className="mt-1 text-xs text-fg-muted">
                Back-pressure verifiers, System-1 gates, isolated worktrees, and lint/type harnesses.
              </p>
              <div className="mt-3 flex items-center text-[11px] font-mono text-accent font-semibold">
                <span>Dispatches: Synthesis Swarms →</span>
              </div>
            </div>

            {/* Node 3: Synthesis & Verification */}
            <div
              onClick={() => setActiveLoopNode('synthesis')}
              className={clsx(
                'cursor-pointer rounded-xl border p-4 transition-all',
                activeLoopNode === 'synthesis'
                  ? 'border-accent bg-accent-wash shadow-md shadow-accent/10'
                  : 'border-line bg-card hover:border-line-strong'
              )}
            >
              <div className="flex items-center justify-between text-xs font-mono text-accent">
                <span>STAGE 03</span>
                <span>CONVERGENCE</span>
              </div>
              <div className="mt-2 font-serif text-base font-bold text-fg">Synthesis & Verifiers</div>
              <p className="mt-1 text-xs text-fg-muted">
                Generates diffs, runs headless tests, consumes error diagnostics, and self-repairs.
              </p>
              <div className="mt-3 flex items-center text-[11px] font-mono text-accent font-semibold">
                <span>Yields: Invariant-Proven PRs →</span>
              </div>
            </div>

            {/* Node 4: Production Watchers */}
            <div
              onClick={() => setActiveLoopNode('watchers')}
              className={clsx(
                'cursor-pointer rounded-xl border p-4 transition-all',
                activeLoopNode === 'watchers'
                  ? 'border-accent bg-accent-wash shadow-md shadow-accent/10'
                  : 'border-line bg-card hover:border-line-strong'
              )}
            >
              <div className="flex items-center justify-between text-xs font-mono text-accent">
                <span>STAGE 04</span>
                <span>AUTONOMOUS OPS</span>
              </div>
              <div className="mt-2 font-serif text-base font-bold text-fg">Production Watchers</div>
              <p className="mt-1 text-xs text-fg-muted">
                Telemetry sentinels, automatic repro generators, dreaming runs, self-healing branches.
              </p>
              <div className="mt-3 flex items-center text-[11px] font-mono text-accent font-semibold">
                <span>Closes Loop back to You ↺</span>
              </div>
            </div>
          </div>

          {/* Node Detail Callout */}
          <div className="mt-4 rounded-xl border border-line bg-card p-3 text-xs font-mono text-fg-body flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
              <span>
                <strong>System Invariant:</strong> High back-pressure allows 50 tasks to safely converge overnight without human eyeball exhaustion.
              </span>
            </span>
            <span className="text-accent font-bold hidden sm:inline">Zero Blind Diff Reading</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: "CODE IS CHEAP NOW" VERIFICATION GAP CURVE
      ───────────────────────────────────────────────────────────── */}
      <section className="rounded-3xl border border-line bg-card p-6 sm:p-10">
        <div className="max-w-3xl">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-accent flex items-center gap-2">
            <Sliders className="h-4 w-4" />
            Interactive Leverage Simulator
          </div>
          <h2 className="mt-2 font-serif text-2xl font-bold text-fg sm:text-3xl">
            Code is cheap now. Your attention is not.
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            Move the slider below to simulate what happens when AI generation scales from casual
            prompting to 20,000 lines/day in your engineering organization.
          </p>
        </div>

        {/* Interactive Slider */}
        <div className="mt-8 rounded-2xl border border-line bg-band p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-fg-subtle uppercase">
                AI Generation Scale
              </div>
              <div className="font-serif text-xl font-bold text-fg">
                {linesGenerated.toLocaleString()} lines of diffs / day
              </div>
              <div className="text-xs text-fg-muted">
                (~{generationScale} parallel tasks dispatched by agents)
              </div>
            </div>

            <div className="w-full sm:w-72">
              <input
                type="range"
                min="1"
                max="50"
                value={generationScale}
                onChange={(e) => setGenerationScale(Number(e.target.value))}
                className="w-full accent-accent h-2 bg-line rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-fg-subtle mt-1">
                <span>1x (400 lines)</span>
                <span>25x (10k lines)</span>
                <span>50x (20k lines)</span>
              </div>
            </div>
          </div>

          {/* Comparative Metrics Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* The Proofreader Method */}
            <div
              className={clsx(
                'rounded-xl border p-5 transition',
                isDrowning
                  ? 'border-bad/40 bg-bad/5 text-fg'
                  : 'border-line bg-card'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-bad flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  Method A: Human Eyeball Review
                </span>
                <span className="rounded bg-bad/20 px-2 py-0.5 font-mono text-[10px] font-bold text-bad">
                  {isDrowning ? 'ATTENTION COLLAPSE' : 'STRUGGLING'}
                </span>
              </div>
              <div className="mt-3 font-serif text-2xl font-bold text-fg">
                ~{reviewTimeWithoutFactoryHours} hours / day
              </div>
              <p className="mt-1 text-xs text-fg-muted">
                Time required for a human engineer to read and scrutinize every diff line by hand.
              </p>
              <div className="mt-4 border-t border-line pt-3 text-xs text-bad/90 font-mono">
                {isDrowning
                  ? '⚠️ FATAL: Exceeds total waking hours. Review quality decays to near zero; bugs silently escape.'
                  : '⚠️ Saps cognitive energy away from architecture and product vision.'}
              </div>
            </div>

            {/* The Software Factory Method */}
            <div className="rounded-xl border border-good/40 bg-good/5 p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-good flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" />
                  Method B: Software Factory Membrane
                </span>
                <span className="rounded bg-good/20 px-2 py-0.5 font-mono text-[10px] font-bold text-good">
                  DETERMINISTIC
                </span>
              </div>
              <div className="mt-3 font-serif text-2xl font-bold text-fg">
                ~{reviewTimeWithFactoryHours} hours / day
              </div>
              <p className="mt-1 text-xs text-fg-muted">
                Human only reads a 30-second architectural impact summary once all verifiers and System-1 gates turn green.
              </p>
              <div className="mt-4 border-t border-line pt-3 text-xs text-good font-mono">
                ⚡ LEVERAGE: Invariant verifiers, headless browsers & Playwright containers absorb 99.4% of the diff load.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: "WHICH ENGINEER ARE YOU RIGHT NOW?" PERSONA SWITCHER
      ───────────────────────────────────────────────────────────── */}
      <section className="rounded-3xl border border-line bg-card p-6 sm:p-10">
        <div className="max-w-3xl">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
            Anti-Pattern Diagnostic
          </div>
          <h2 className="mt-2 font-serif text-2xl font-bold text-fg sm:text-3xl">
            Which engineer are you right now?
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            Select a persona below to see how the Software Factory breaks the cycle of prompt babysitting.
          </p>
        </div>

        {/* Persona Selectors */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {personas.map((persona) => {
            const isSelected = activePersonType === persona.id;
            return (
              <button
                key={persona.id}
                onClick={() => setActivePersonType(persona.id)}
                className={clsx(
                  'rounded-xl border p-4 text-left transition-all',
                  isSelected
                    ? 'border-accent bg-accent-wash shadow-md shadow-accent/10 ring-1 ring-accent'
                    : 'border-line bg-band hover:border-line-strong hover:bg-card'
                )}
              >
                <div
                  className={clsx(
                    'inline-block rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase',
                    persona.badgeColor
                  )}
                >
                  {persona.name}
                </div>
                <div className="mt-2 text-sm font-semibold text-fg">{persona.subtitle}</div>
                <div className="mt-1 text-xs text-fg-subtle line-clamp-2">
                  {persona.quote}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Persona Deep-Dive Card */}
        <div className="mt-6 rounded-2xl border border-line bg-band p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left: The Trap & Character */}
            <div className="lg:w-1/2 space-y-4">
              <div>
                <span className="font-mono text-xs uppercase text-accent font-semibold">
                  Selected Profile
                </span>
                <h3 className="font-serif text-xl font-bold text-fg">
                  {currentPersona.name} ({currentPersona.subtitle})
                </h3>
              </div>

              <blockquote className="rounded-xl border-l-2 border-accent bg-card p-3 font-serif italic text-sm text-fg-body">
                "{currentPersona.quote}"
              </blockquote>

              <div>
                <div className="font-mono text-xs uppercase text-bad font-semibold">
                  The Subtle Trap:
                </div>
                <p className="mt-1 text-xs text-fg-muted leading-relaxed">
                  {currentPersona.trap}
                </p>
              </div>

              <div className="rounded-xl border border-line bg-card p-3">
                <div className="font-mono text-xs uppercase text-accent font-semibold">
                  The Key Shift Required:
                </div>
                <p className="mt-1 text-xs text-fg font-medium">
                  {currentPersona.keyShift}
                </p>
              </div>
            </div>

            {/* Right: Without vs With Factory */}
            <div className="lg:w-1/2 flex flex-col justify-between space-y-3">
              <div className="rounded-xl border border-bad/30 bg-bad/5 p-4">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-bad uppercase">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Without Software Factory:
                </div>
                <p className="mt-2 text-xs text-fg-body leading-relaxed">
                  {currentPersona.withoutFactory}
                </p>
              </div>

              <div className="rounded-xl border border-good/30 bg-good/5 p-4">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-good uppercase">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  With Software Factory:
                </div>
                <p className="mt-2 text-xs text-fg-body leading-relaxed">
                  {currentPersona.withFactory}
                </p>
              </div>

              <button
                onClick={() => onSelectSubject(1)}
                className="w-full rounded-xl bg-accent px-4 py-2.5 text-xs font-bold text-accent-ink hover:bg-accent-hover transition flex items-center justify-center gap-2"
              >
                <span>Fix This Anti-Pattern in Subject 01</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: "WHAT DOESN'T FIX IT" DEAD ENDS
      ───────────────────────────────────────────────────────────── */}
      <section className="rounded-3xl border border-line bg-card p-6 sm:p-10">
        <div className="max-w-3xl">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-bad">
            False Solutions
          </div>
          <h2 className="mt-2 font-serif text-2xl font-bold text-fg sm:text-3xl">
            What doesn't fix it
          </h2>
          <p className="mt-2 text-sm text-fg-muted">
            Teams waste months attempting these three intuitive workarounds before realizing the bottleneck
            is structural architecture, not prompting style.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {HERO_MANIFESTO.deadEnds.map((deadEnd, index) => {
            const isSelected = selectedDeadEndIndex === index;
            return (
              <div
                key={index}
                onClick={() => setSelectedDeadEndIndex(index)}
                className={clsx(
                  'cursor-pointer rounded-2xl border p-5 transition-all',
                  isSelected
                    ? 'border-accent bg-accent-wash shadow-lg'
                    : 'border-line bg-band hover:border-line-strong hover:bg-card'
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-bad">
                    DEAD END 0{index + 1}
                  </span>
                  <span className="text-[10px] font-mono text-fg-subtle">
                    {isSelected ? 'ACTIVE' : 'CLICK TO EXPAND'}
                  </span>
                </div>
                <h4 className="mt-2 font-serif text-base font-bold text-fg">
                  "{deadEnd.approach}"
                </h4>
                <p className="mt-2 text-xs text-fg-muted leading-relaxed">
                  {deadEnd.whyItFails}
                </p>
                <div className="mt-4 border-t border-line pt-2 text-[11px] font-mono text-accent">
                  {index === 0 && '→ Solution: Verification back-pressure'}
                  {index === 1 && '→ Solution: Invariant context directory & schemas'}
                  {index === 2 && '→ Solution: Headless automated verifiers'}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: THE 10-STAGE LIFECYCLE MAP
      ───────────────────────────────────────────────────────────── */}
      <section className="rounded-3xl border border-line bg-card p-6 sm:p-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Complete Open Curriculum
            </div>
            <h2 className="mt-2 font-serif text-2xl font-bold text-fg sm:text-3xl">
              The 10-Stage Software Factory Lifecycle
            </h2>
            <p className="mt-2 text-sm text-fg-muted max-w-2xl">
              Each stage provides deep mental models, real-world comparison diffs, declarative TypeScript
              artifacts, and an interactive browser simulation lab.
            </p>
          </div>

          <div className="font-mono text-xs text-accent">
            {completedSimulators.length} of 10 Labs Completed
          </div>
        </div>

        {/* 10 Subjects Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {SUBJECTS.map((subject) => {
            const isSimulatorCompleted = completedSimulators.includes(subject.id);
            const quizScore = completedQuizzes[subject.id] || 0;
            const isQuizPassed = quizScore > 0;

            return (
              <div
                key={subject.id}
                className={clsx(
                  'group rounded-2xl border p-5 transition-all hover:border-accent-line hover:shadow-lg',
                  isSimulatorCompleted
                    ? 'border-good/40 bg-good/5'
                    : 'border-line bg-band'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-card font-mono text-xs font-bold text-accent border border-line">
                      {subject.numberLabel}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                      {subject.kicker}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {isSimulatorCompleted && (
                      <span className="flex items-center gap-1 rounded bg-good/20 px-2 py-0.5 text-[10px] font-mono font-bold text-good">
                        <CheckCircle2 className="h-3 w-3" />
                        LAB DONE
                      </span>
                    )}
                    {isQuizPassed && (
                      <span className="rounded bg-accent/20 px-2 py-0.5 text-[10px] font-mono font-bold text-accent">
                        QUIZ {quizScore}/3
                      </span>
                    )}
                    <span className="font-mono text-xs font-bold text-accent">
                      +{subject.xpReward} XP
                    </span>
                  </div>
                </div>

                <h3 className="mt-3 font-serif text-lg font-bold text-fg group-hover:text-accent transition">
                  {subject.title}
                </h3>

                <p className="mt-1 text-xs text-fg-muted leading-relaxed line-clamp-2">
                  {subject.subtitle}
                </p>

                <div className="mt-3 rounded-lg border border-line bg-card/60 p-2.5 text-xs italic text-fg-body font-serif">
                  "{subject.mantra}"
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                  <span className="font-mono text-[11px] text-fg-subtle">
                    {subject.readTime} • {subject.simulatorMeta.title}
                  </span>

                  <button
                    onClick={() => onSelectSubject(subject.id)}
                    className="flex items-center gap-1 rounded-lg bg-card px-3 py-1.5 text-xs font-semibold text-fg hover:text-accent hover:border-accent-line border border-line transition"
                  >
                    <span>Launch Subject Lab</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
