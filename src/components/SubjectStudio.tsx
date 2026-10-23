import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  AlertTriangle,
  Lightbulb,
  Cpu,
  ShieldAlert,
  Repeat,
  HelpCircle,
  Sliders,
  TrendingUp,
  FileCheck,
  Crosshair,
  Layers,
  Compass,
  FolderGit2,
  GitFork,
  Terminal,
  RefreshCw,
  ShieldCheck,
  Database,
  Gauge,
  CheckSquare,
  Network,
  Shuffle,
  GitMerge,
  EyeOff,
  FileSpreadsheet,
  Activity,
  Moon,
  ChevronRight,
  Play,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { SUBJECTS } from '../data/subjects';
import { SubjectModule } from '../types/curriculum';
import { useFactoryStore } from '../store/useFactoryStore';
import SubjectSimulator from './simulators/SubjectSimulator';

export interface SubjectStudioProps {
  selectedSubjectId: number;
  onSelectSubject: (id: number) => void;
}

type TabMode = 'all' | 'concept' | 'simulator' | 'quiz';

// Dynamic icon resolver with safe fallback
const getPillarIcon = (name: string) => {
  const iconProps = { className: "w-5 h-5 text-accent" };
  switch (name) {
    case 'Cpu': return <Cpu {...iconProps} />;
    case 'ShieldAlert': return <ShieldAlert {...iconProps} />;
    case 'Repeat': return <Repeat {...iconProps} />;
    case 'HelpCircle': return <HelpCircle {...iconProps} />;
    case 'Sliders': return <Sliders {...iconProps} />;
    case 'TrendingUp': return <TrendingUp {...iconProps} />;
    case 'FileCheck': return <FileCheck {...iconProps} />;
    case 'CheckCircle2': return <CheckCircle2 {...iconProps} />;
    case 'Crosshair': return <Crosshair {...iconProps} />;
    case 'Layers': return <Layers {...iconProps} />;
    case 'Compass': return <Compass {...iconProps} />;
    case 'FolderGit2': return <FolderGit2 {...iconProps} />;
    case 'GitFork': return <GitFork {...iconProps} />;
    case 'Terminal': return <Terminal {...iconProps} />;
    case 'RefreshCw': return <RefreshCw {...iconProps} />;
    case 'ShieldCheck': return <ShieldCheck {...iconProps} />;
    case 'Database': return <Database {...iconProps} />;
    case 'Gauge': return <Gauge {...iconProps} />;
    case 'CheckSquare': return <CheckSquare {...iconProps} />;
    case 'Sparkles': return <Sparkles {...iconProps} />;
    case 'Network': return <Network {...iconProps} />;
    case 'Shuffle': return <Shuffle {...iconProps} />;
    case 'GitMerge': return <GitMerge {...iconProps} />;
    case 'EyeOff': return <EyeOff {...iconProps} />;
    case 'FileSpreadsheet': return <FileSpreadsheet {...iconProps} />;
    case 'Activity': return <Activity {...iconProps} />;
    case 'Award': return <Award {...iconProps} />;
    case 'Moon': return <Moon {...iconProps} />;
    default: return <Sparkles {...iconProps} />;
  }
};

export const SubjectStudio: React.FC<SubjectStudioProps> = ({
  selectedSubjectId,
  onSelectSubject,
}) => {
  const {
    completedSimulators,
    completeSimulator,
    completedQuizzes,
    submitQuizScore,
  } = useFactoryStore();

  const [activeTab, setActiveTab] = useState<TabMode>('all');
  const [copiedCode, setCopiedCode] = useState(false);

  // Active Subject
  const currentSubject: SubjectModule = useMemo(() => {
    return SUBJECTS.find((s) => s.id === selectedSubjectId) || SUBJECTS[0];
  }, [selectedSubjectId]);

  // Quiz state for active subject: questionId -> selectedOptionIndex
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Reset quiz state when switching subject
  const handleSelectSubject = (id: number) => {
    onSelectSubject(id);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setCopiedCode(false);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return; // locked once checked
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    currentSubject.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });
    setQuizSubmitted(true);
    submitQuizScore(currentSubject.id, correct, currentSubject.quiz.length);
  };

  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setQuizSubmitted(false);
  };

  // Nav helpers
  const currentIndex = SUBJECTS.findIndex((s) => s.id === currentSubject.id);
  const prevSubject = currentIndex > 0 ? SUBJECTS[currentIndex - 1] : null;
  const nextSubject = currentIndex < SUBJECTS.length - 1 ? SUBJECTS[currentIndex + 1] : null;

  // Simulator status
  const isSimulatorDone = completedSimulators.includes(currentSubject.id);
  const quizScore = completedQuizzes[currentSubject.id];
  const isQuizDone = typeof quizScore === 'number' && quizScore > 0;
  const isSubjectMastered = isSimulatorDone && isQuizDone;

  return (
    <div className="w-full flex flex-col space-y-8 pb-16">
      {/* 1. TOP HORIZONTAL LIFECYCLE RAIL */}
      <div className="bg-card border border-line rounded-2xl p-3 shadow-sm backdrop-blur-sm">
        <div className="flex items-center justify-between pb-2 px-2 border-b border-line/60 mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-accent font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              10 Core Lifecycle Subjects
            </span>
          </div>
          <div className="text-xs font-mono text-fg-muted">
            <span className="text-fg font-bold">{completedSimulators.length}/10</span> Labs •{' '}
            <span className="text-fg font-bold">{Object.keys(completedQuizzes).length}/10</span> Quizzes
          </div>
        </div>

        <div className="grid grid-cols-5 md:grid-cols-10 gap-1.5 overflow-x-auto py-1">
          {SUBJECTS.map((s) => {
            const isSelected = s.id === currentSubject.id;
            const simDone = completedSimulators.includes(s.id);
            const qDone = typeof completedQuizzes[s.id] === 'number' && completedQuizzes[s.id] > 0;
            const fullyDone = simDone && qDone;
            const partiallyDone = simDone || qDone;

            return (
              <button
                key={s.id}
                onClick={() => handleSelectSubject(s.id)}
                className={`relative group flex flex-col items-center justify-center py-2 px-1.5 rounded-xl transition-all duration-200 text-left border ${
                  isSelected
                    ? 'bg-accent/10 border-accent text-accent shadow-sm ring-1 ring-accent/30'
                    : fullyDone
                    ? 'bg-good/5 border-good/40 text-good hover:border-good/60'
                    : partiallyDone
                    ? 'bg-card border-line-strong hover:border-accent/40 text-fg'
                    : 'bg-page/60 border-line hover:border-line-strong text-fg-muted hover:text-fg'
                }`}
              >
                <div className="flex items-center justify-between w-full px-1">
                  <span className="text-[10px] font-mono font-bold tracking-tight">
                    {s.numberLabel}
                  </span>
                  {fullyDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-good" />
                  ) : partiallyDone ? (
                    <span className="w-2 h-2 rounded-full bg-accent" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-line-strong" />
                  )}
                </div>
                <span className="text-[11px] font-medium truncate w-full px-1 mt-1 text-center font-sans group-hover:text-fg">
                  {s.slug.split('-')[0].toUpperCase()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SUBJECT HEADER BANNER */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-card via-card to-page p-6 md:p-8 shadow-sm">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-md bg-accent/15 border border-accent/30 text-accent font-mono text-xs font-bold">
              Subject {currentSubject.numberLabel}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-fg-subtle">
              {currentSubject.kicker}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-fg-muted bg-card px-2.5 py-1 rounded-full border border-line">
              <Clock className="w-3.5 h-3.5 text-accent" />
              {currentSubject.readTime}
            </span>
            <span className="flex items-center gap-1.5 text-accent font-bold bg-accent/10 px-2.5 py-1 rounded-full border border-accent/30">
              <Sparkles className="w-3.5 h-3.5" />
              +{currentSubject.xpReward} XP
            </span>
            {isSubjectMastered && (
              <span className="flex items-center gap-1 text-good font-bold bg-good/10 px-2.5 py-1 rounded-full border border-good/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mastered
              </span>
            )}
          </div>
        </div>

        <h1 className="text-2xl md:text-4xl font-serif font-bold text-fg tracking-tight leading-tight mb-3">
          {currentSubject.title}
        </h1>

        <p className="text-fg-muted text-base md:text-lg max-w-3xl leading-relaxed mb-6 font-sans">
          {currentSubject.subtitle}
        </p>

        {/* MANTRA QUOTE BLOCK */}
        <div className="border-l-4 border-accent bg-accent-wash/30 p-4 rounded-r-xl max-w-3xl">
          <p className="text-sm md:text-base font-serif italic text-fg font-medium">
            &ldquo;{currentSubject.mantra}&rdquo;
          </p>
          <span className="text-[11px] font-mono text-accent mt-1 block">
            — The Software Factory Engineer Cohort Principle
          </span>
        </div>

        {/* SECTION NAVIGATION TABS */}
        <div className="flex items-center space-x-2 mt-8 pt-4 border-t border-line overflow-x-auto">
          {[
            { id: 'all', label: 'All Sections' },
            { id: 'concept', label: 'Concept & Mental Model' },
            { id: 'simulator', label: 'Interactive Simulator Lab' },
            { id: 'quiz', label: 'Scenario Quiz' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabMode)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-accent text-accent-ink font-semibold shadow-sm'
                  : 'bg-card text-fg-muted hover:text-fg hover:bg-page border border-line'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. MENTAL MODEL & 3 PILLARS SECTION */}
      {(activeTab === 'all' || activeTab === 'concept') && (
        <section className="space-y-6">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-5 bg-accent rounded-full" />
            <h2 className="text-lg md:text-xl font-serif font-bold text-fg">
              Mental Model & Architectural Shift
            </h2>
          </div>

          {/* KEY SHIFT BANNER */}
          <div className="rounded-2xl border border-line bg-card p-6 shadow-sm">
            <div className="text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-2">
              The Paradigm Shift
            </div>
            <p className="text-sm md:text-base font-mono text-fg leading-relaxed bg-page p-4 rounded-xl border border-line">
              {currentSubject.mentalModel.keyShift}
            </p>
            <p className="text-sm text-fg-muted mt-4 leading-relaxed font-sans">
              {currentSubject.mentalModel.summary}
            </p>
          </div>

          {/* 3 PILLARS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentSubject.mentalModel.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-card border border-line rounded-2xl p-5 hover:border-accent/40 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                    {getPillarIcon(pillar.iconName)}
                  </div>
                  <h3 className="font-serif font-bold text-base text-fg mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs md:text-sm text-fg-muted leading-relaxed font-sans">
                    {pillar.detail}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-line/60 flex items-center text-[11px] font-mono text-fg-subtle">
                  <span>Pillar {idx + 1} of 3</span>
                </div>
              </div>
            ))}
          </div>

          {/* DEEP DIVE EDITORIAL SECTIONS */}
          <div className="space-y-6 mt-6">
            {currentSubject.deepDive.map((section, idx) => (
              <div
                key={idx}
                className="bg-card border border-line rounded-2xl p-6 md:p-8 space-y-4"
              >
                <h3 className="text-lg md:text-xl font-serif font-bold text-fg flex items-center gap-2">
                  <span className="text-accent font-mono text-sm">#{idx + 1}</span>
                  {section.heading}
                </h3>

                <div className="space-y-3 text-fg-body text-sm md:text-base leading-relaxed font-sans">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* PRO TIP CALLOUT */}
                <div className="mt-4 p-4 rounded-xl border border-accent/30 bg-accent-wash/30 flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider block mb-1">
                      Factory Pro-Tip
                    </span>
                    <p className="text-xs md:text-sm text-fg leading-relaxed">
                      {section.proTip}
                    </p>
                  </div>
                </div>

                {/* OPTIONAL WARNING CALLOUT */}
                {section.warning && (
                  <div className="mt-3 p-4 rounded-xl border border-bad/30 bg-bad/10 flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-bad shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-mono font-bold text-bad uppercase tracking-wider block mb-1">
                        Failure Mode to Avoid
                      </span>
                      <p className="text-xs md:text-sm text-fg leading-relaxed">
                        {section.warning}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* WITHOUT VS WITH COMPARISON */}
          <div className="bg-card border border-line rounded-2xl p-6 md:p-8 space-y-4">
            <h3 className="text-lg font-serif font-bold text-fg mb-4">
              Real-World Contrast: Traditional Prompts vs. The Software Factory
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentSubject.comparison.map((pair, idx) => (
                <React.Fragment key={idx}>
                  <div className="rounded-xl border border-bad/30 bg-bad/5 p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase font-bold text-bad flex items-center gap-1.5 mb-2">
                        <span className="w-2 h-2 rounded-full bg-bad" />
                        Without the Factory (Ad-Hoc Trap)
                      </span>
                      <p className="text-xs md:text-sm text-fg-body leading-relaxed font-sans">
                        {pair.withoutFactory}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-good/30 bg-good/5 p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-mono uppercase font-bold text-good flex items-center gap-1.5 mb-2">
                        <span className="w-2 h-2 rounded-full bg-good" />
                        With the Software Factory
                      </span>
                      <p className="text-xs md:text-sm text-fg-body leading-relaxed font-sans">
                        {pair.withFactory}
                      </p>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* PRODUCTION CODE ARTIFACT */}
          <div className="bg-card border border-line rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-band px-4 py-3 border-b border-line flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-accent" />
                <span className="font-mono text-xs font-bold text-fg">
                  {currentSubject.codeArtifact.title}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-card text-fg-muted border border-line">
                  {currentSubject.codeArtifact.language}
                </span>
              </div>
              <button
                onClick={() => handleCopyCode(currentSubject.codeArtifact.code)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-medium bg-card hover:bg-page border border-line text-fg hover:text-accent transition-all"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-good" />
                    <span className="text-good font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 md:p-6 overflow-x-auto text-xs md:text-sm font-mono text-fg-body bg-page leading-relaxed">
              <code>{currentSubject.codeArtifact.code}</code>
            </pre>
            <div className="px-4 py-2.5 bg-band/40 border-t border-line text-xs font-mono text-fg-muted italic">
              {currentSubject.codeArtifact.caption}
            </div>
          </div>
        </section>
      )}

      {/* 4. EMBEDDED INTERACTIVE SIMULATOR LAB */}
      {(activeTab === 'all' || activeTab === 'simulator') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-5 bg-accent rounded-full" />
              <h2 className="text-lg md:text-xl font-serif font-bold text-fg">
                Interactive Simulator Lab
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-fg-muted">
                Objective:{' '}
                <span className="text-fg font-medium">
                  {currentSubject.simulatorMeta.objective}
                </span>
              </span>
            </div>
          </div>

          <div className="border border-line rounded-2xl overflow-hidden bg-card shadow-sm">
            <div className="bg-band p-4 border-b border-line flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold block">
                  Hands-On Interactive Environment
                </span>
                <h3 className="font-serif font-bold text-base text-fg">
                  {currentSubject.simulatorMeta.title}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono border border-line bg-page text-fg-muted">
                  Badge: <strong className="text-accent">{currentSubject.simulatorMeta.badgeName}</strong>
                </span>
                {isSimulatorDone ? (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-good/15 border border-good/40 text-good">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Passed (+120 XP)
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-fg-subtle border border-line bg-page">
                    <Zap className="w-3.5 h-3.5 text-accent" />
                    Pending Completion
                  </span>
                )}
              </div>
            </div>

            <div className="p-4 md:p-6 bg-page">
              <SubjectSimulator
                subjectId={currentSubject.id}
                isCompleted={isSimulatorDone}
                onComplete={(bonusXp) => completeSimulator(currentSubject.id, bonusXp)}
              />
            </div>
          </div>
        </section>
      )}

      {/* 5. INTERACTIVE SCENARIO QUIZ */}
      {(activeTab === 'all' || activeTab === 'quiz') && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-5 bg-accent rounded-full" />
              <h2 className="text-lg md:text-xl font-serif font-bold text-fg">
                Scenario Knowledge Quiz
              </h2>
            </div>
            {isQuizDone && (
              <span className="flex items-center gap-1 text-xs font-mono font-bold text-good bg-good/10 px-3 py-1 rounded-full border border-good/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Score: {quizScore}/{currentSubject.quiz.length}
              </span>
            )}
          </div>

          <div className="space-y-6">
            {currentSubject.quiz.map((q, qIndex) => {
              const selectedOpt = selectedAnswers[q.id];
              const isAnswered = typeof selectedOpt === 'number';
              const isCorrect = isAnswered && selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="bg-card border border-line rounded-2xl p-6 md:p-8 space-y-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                      Question {qIndex + 1} of {currentSubject.quiz.length}
                    </span>
                    {quizSubmitted && (
                      <span
                        className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                          isCorrect
                            ? 'bg-good/15 text-good border border-good/30'
                            : 'bg-bad/15 text-bad border border-bad/30'
                        }`}
                      >
                        {isCorrect ? 'Correct (+80 XP)' : 'Incorrect'}
                      </span>
                    )}
                  </div>

                  {/* SCENARIO BOX */}
                  <div className="bg-page border border-line rounded-xl p-4 text-xs md:text-sm text-fg-muted font-sans leading-relaxed">
                    <strong className="text-fg block font-serif mb-1">Scenario:</strong>
                    {q.scenario}
                  </div>

                  <h3 className="font-serif font-bold text-base md:text-lg text-fg">
                    {q.question}
                  </h3>

                  {/* OPTIONS */}
                  <div className="space-y-2.5 pt-2">
                    {q.options.map((opt, optIdx) => {
                      const isThisSelected = selectedOpt === optIdx;
                      let optionClasses =
                        'border-line bg-page text-fg-body hover:border-line-strong hover:bg-card';

                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          optionClasses =
                            'border-good bg-good/10 text-good font-semibold ring-1 ring-good/40';
                        } else if (isThisSelected && !isCorrect) {
                          optionClasses =
                            'border-bad bg-bad/10 text-bad font-semibold ring-1 ring-bad/40';
                        } else {
                          optionClasses = 'border-line/40 bg-page/40 text-fg-subtle opacity-70';
                        }
                      } else if (isThisSelected) {
                        optionClasses =
                          'border-accent bg-accent/10 text-accent font-semibold ring-1 ring-accent/30';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs md:text-sm transition-all duration-150 flex items-start space-x-3 ${optionClasses}`}
                        >
                          <span
                            className={`w-5 h-5 rounded-full border text-[11px] font-mono flex items-center justify-center shrink-0 mt-0.5 ${
                              isThisSelected
                                ? 'border-accent bg-accent text-accent-ink font-bold'
                                : 'border-line text-fg-muted'
                            }`}
                          >
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* EXPLANATION REVEAL */}
                  {quizSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 rounded-xl bg-band border border-line text-xs md:text-sm leading-relaxed"
                    >
                      <strong className="text-fg block font-mono text-xs uppercase tracking-wider mb-1">
                        Explanation:
                      </strong>
                      <p className="text-fg-muted">{q.explanation}</p>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* QUIZ SUBMIT BUTTON */}
          <div className="flex items-center justify-between pt-4">
            {!quizSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length < currentSubject.quiz.length}
                className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-accent-ink font-mono font-bold text-sm shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Submit Answers & Claim XP
              </button>
            ) : (
              <button
                onClick={handleRetakeQuiz}
                className="px-5 py-2.5 rounded-xl border border-line bg-card hover:bg-page text-fg font-mono text-xs font-semibold transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Quiz
              </button>
            )}

            <span className="text-xs font-mono text-fg-muted">
              {Object.keys(selectedAnswers).length} of {currentSubject.quiz.length} answered
            </span>
          </div>
        </section>
      )}

      {/* 6. BOTTOM PREV / NEXT NAVIGATION */}
      <div className="pt-8 border-t border-line flex items-center justify-between">
        {prevSubject ? (
          <button
            onClick={() => handleSelectSubject(prevSubject.id)}
            className="group flex items-center space-x-3 px-4 py-3 rounded-xl border border-line bg-card hover:bg-page text-left transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-fg-muted group-hover:text-accent group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="text-[10px] font-mono text-fg-subtle uppercase block">
                Previous Subject
              </span>
              <span className="text-xs md:text-sm font-serif font-bold text-fg group-hover:text-accent">
                {prevSubject.numberLabel} • {prevSubject.title.split(':')[0]}
              </span>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextSubject ? (
          <button
            onClick={() => handleSelectSubject(nextSubject.id)}
            className="group flex items-center space-x-3 px-4 py-3 rounded-xl border border-accent/40 bg-accent/5 hover:bg-accent/15 text-right transition-all"
          >
            <div>
              <span className="text-[10px] font-mono text-accent uppercase block">
                Next Subject
              </span>
              <span className="text-xs md:text-sm font-serif font-bold text-fg group-hover:text-accent">
                {nextSubject.numberLabel} • {nextSubject.title.split(':')[0]}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default SubjectStudio;
