import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FactoryProvider,
  useFactoryStore
} from './store/useFactoryStore';
import { HeaderHUD, ActiveTab } from './components/HeaderHUD';
import { HeroManifesto } from './components/HeroManifesto';
import { SubjectStudio } from './components/SubjectStudio';
import { SyllabusExplorer } from './components/SyllabusExplorer';
import { BlueprintBuilder } from './components/BlueprintBuilder';
import { CertificateModal } from './components/CertificateModal';
import { SUBJECTS } from './data/subjects';
import {
  CheckCircle2,
  Sparkles,
  Award,
  Sun,
  Moon,
  Zap,
  RotateCcw,
  Layers,
  ChevronRight,
  ShieldCheck,
  Terminal,
  Cpu,
  ArrowUp,
  ExternalLink,
  BookOpen,
  CheckSquare
} from 'lucide-react';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>(1);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const {
    xp,
    theme,
    toggleTheme,
    completedSimulators,
    completedLessons,
    checkedBlueprintItems,
    getCurrentRank,
    getProgressPercentage
  } = useFactoryStore();

  const currentRank = getCurrentRank();
  const progressPct = getProgressPercentage();

  // Scroll listener for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSubject = (subjectId: number) => {
    setSelectedSubjectId(subjectId);
    setActiveTab('subjects');
    scrollToTop();
  };

  return (
    <div className="min-h-screen bg-page text-fg flex flex-col font-sans transition-colors duration-200">
      {/* Sticky Global Header HUD */}
      <HeaderHUD
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          scrollToTop();
        }}
        onOpenCertificate={() => setIsCertificateOpen(true)}
      />

      {/* Floating 10-Subject Quick-Jump Rail (Desktop & Mobile) */}
      <div className="bg-band/40 border-b border-line px-3 py-2 text-xs font-mono backdrop-blur-md sticky top-[65px] z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-fg-muted uppercase text-[11px] font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-accent" />
              <span className="hidden sm:inline">10 Subjects:</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
            {SUBJECTS.map((s) => {
              const isSelected = activeTab === 'subjects' && selectedSubjectId === s.id;
              const isDone = completedSimulators.includes(s.id);

              return (
                <button
                  key={s.id}
                  onClick={() => handleSelectSubject(s.id)}
                  title={`${s.numberLabel}. ${s.title}`}
                  className={`px-2 py-1 rounded-md text-[11px] font-mono transition-all flex items-center gap-1 shrink-0 border ${
                    isSelected
                      ? 'bg-accent text-accent-ink border-accent shadow-xs font-bold ring-1 ring-accent'
                      : isDone
                      ? 'bg-good/10 text-good border-good/30 hover:bg-good/20'
                      : 'bg-card text-fg-muted border-line hover:border-line-strong hover:text-fg'
                  }`}
                >
                  <span>{s.numberLabel}</span>
                  {isDone && <CheckCircle2 className="w-3 h-3 text-good shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0 text-[11px]">
            <span className="text-fg-muted">XP:</span>
            <span className="font-bold text-accent">{xp.toLocaleString()}</span>
            <span className="text-line-strong">•</span>
            <span className="text-good font-semibold">
              {completedSimulators.length}/10 Labs
            </span>
          </div>
        </div>
      </div>

      {/* Main Tab View Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <HeroManifesto
                onSelectSubject={handleSelectSubject}
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  scrollToTop();
                }}
              />
            </motion.div>
          )}

          {activeTab === 'subjects' && (
            <motion.div
              key={`subjects-${selectedSubjectId}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <SubjectStudio
                selectedSubjectId={selectedSubjectId}
                onSelectSubject={(id) => {
                  setSelectedSubjectId(id);
                  scrollToTop();
                }}
              />
            </motion.div>
          )}

          {activeTab === 'syllabus' && (
            <motion.div
              key="syllabus"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <SyllabusExplorer />
            </motion.div>
          )}

          {activeTab === 'blueprint' && (
            <motion.div
              key="blueprint"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
            >
              <BlueprintBuilder />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Steel on Slate Footer */}
      <footer className="bg-band/50 border-t border-line mt-16 py-12 px-4 sm:px-6 lg:px-8 text-fg">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Top Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Brand & Manifesto Column (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold font-sans text-base text-fg">
                    The Software Factory Engineer
                  </h3>
                  <div className="text-xs font-mono text-accent">
                    Open Interactive Curriculum
                  </div>
                </div>
              </div>

              <p className="text-xs text-fg-body leading-relaxed max-w-sm">
                Code generation is solved. Your human attention is the sole bottleneck.
                Shift from babysitting an LLM token-by-token to architecting autonomous
                loops governed by deterministic back-pressure and reality verifiers.
              </p>

              <div className="inline-block p-2.5 rounded-lg bg-card border border-line text-xs font-serif italic text-fg-muted">
                "Stop building the app. Build the thing that builds it."
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1.5 rounded-lg border border-line bg-card hover:bg-band text-xs font-mono flex items-center gap-2 transition-colors text-fg"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-amber-400" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-accent" /> Dark Mode
                    </>
                  )}
                </button>

                <button
                  onClick={() => setIsCertificateOpen(true)}
                  className="px-3 py-1.5 rounded-lg border border-accent/30 bg-accent/10 hover:bg-accent/20 text-xs font-mono font-semibold text-accent flex items-center gap-1.5 transition-colors"
                >
                  <Award className="w-3.5 h-3.5" /> Certificate
                </button>
              </div>
            </div>

            {/* 10 Core Lifecycle Subjects Quick-Jump (4 cols) */}
            <div className="md:col-span-4 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-fg-muted font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-accent" /> 10 Core Subjects
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-mono">
                {SUBJECTS.map((subj) => (
                  <li key={subj.id}>
                    <button
                      onClick={() => handleSelectSubject(subj.id)}
                      className="text-left w-full hover:text-accent transition-colors flex items-center gap-1.5 text-fg-muted truncate"
                    >
                      <span className="text-accent font-bold">{subj.numberLabel}.</span>
                      <span className="truncate">{subj.title.split(':')[0]}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Live Progress Summary (3 cols) */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-fg-muted font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-good" /> Your Progress
              </div>

              <div className="p-3.5 rounded-xl border border-line bg-card space-y-2.5">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="font-bold text-fg truncate">{currentRank.title}</span>
                    <span className="text-accent font-bold">{xp} XP</span>
                  </div>
                  <div className="w-full h-1.5 bg-line rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-mono text-fg-muted">
                  <div>
                    <span className="block text-fg font-bold">
                      {completedSimulators.length}/10
                    </span>
                    <span>Simulators</span>
                  </div>
                  <div>
                    <span className="block text-fg font-bold">
                      {completedLessons.length}
                    </span>
                    <span>Lessons Done</span>
                  </div>
                  <div>
                    <span className="block text-fg font-bold">
                      {checkedBlueprintItems.length}
                    </span>
                    <span>Blueprint Items</span>
                  </div>
                  <div>
                    <span className="block text-good font-bold">
                      {progressPct}%
                    </span>
                    <span>Mastery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-line/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-fg-muted font-mono">
            <div>
              Open Interactive Learning Edition inspired by The Software Factory Engineer cohort.
            </div>
            <div className="flex items-center gap-4">
              <span>100% Frontend • LocalStorage Stored</span>
              <span>•</span>
              <span>Production Ready</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-2.5 rounded-full bg-accent text-white shadow-lg hover:bg-accent-hover transition-all z-40 flex items-center justify-center ring-2 ring-page"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Graduation Certificate & Reset Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <FactoryProvider>
      <AppContent />
    </FactoryProvider>
  );
};

export default App;
