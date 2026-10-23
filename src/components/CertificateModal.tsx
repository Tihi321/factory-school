import React, { useState } from 'react';
import { useFactoryStore } from '../store/useFactoryStore';
import {
  X,
  Printer,
  RotateCcw,
  Shield,
  Award,
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    xp,
    studentName,
    setStudentName,
    completedSimulators,
    completedQuizzes,
    checkedBlueprintItems,
    tokensSaved,
    getCurrentRank,
    resetProgress,
  } = useFactoryStore();

  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const currentRank = getCurrentRank();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirmReset) {
      resetProgress();
      setConfirmReset(false);
      onClose();
    } else {
      setConfirmReset(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative z-10 w-full max-w-3xl rounded-3xl border border-line-strong bg-card p-6 sm:p-10 shadow-2xl overflow-hidden my-8"
      >
        {/* Top Controls: Close button */}
        <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-accent" />
            <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
              Curriculum Credential & Progress Dossier
            </span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-fg-subtle hover:bg-band hover:text-fg transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            THE PRINTABLE CERTIFICATE CARD
        ───────────────────────────────────────────────────────────── */}
        <div
          id="software-factory-certificate"
          className="relative overflow-hidden rounded-2xl border-2 border-accent/40 bg-gradient-to-b from-band via-card to-band p-6 sm:p-10 text-center shadow-inner"
        >
          {/* Subtle Decorative corner borders */}
          <div className="absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-accent" />
          <div className="absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-accent" />
          <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-accent" />
          <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-accent" />

          {/* Golden glow */}
          <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-accent/10 blur-3xl rounded-full" />

          {/* Header Mark */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-accent-line bg-accent-wash text-accent shadow-md">
              <Shield className="h-6 w-6" />
            </div>
            <div className="mt-3 font-mono text-xs font-bold uppercase tracking-widest text-accent">
              Agentic Coding School • Open Curriculum
            </div>
            <div className="mt-1 font-serif text-2xl sm:text-3xl font-bold tracking-tight text-fg">
              Certificate of Factory Engineering
            </div>
            <p className="mt-1 font-mono text-xs text-fg-subtle">
              Autonomous Synthesis • Deterministic Invariants • Closed Verification Loops
            </p>
          </div>

          {/* Student Name Input / Presentation */}
          <div className="relative z-10 my-8">
            <div className="text-xs font-mono uppercase tracking-wider text-fg-subtle">
              This credential certifies that
            </div>
            <div className="mt-2 inline-block max-w-md w-full border-b-2 border-accent/60 pb-1">
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter Your Full Name"
                className="w-full bg-transparent text-center font-serif text-2xl sm:text-3xl font-bold text-accent placeholder:text-fg-subtle/40 focus:outline-none"
              />
            </div>
            <div className="mt-2 text-xs text-fg-muted italic">
              has completed interactive open curriculum labs and demonstrated mastery of software factory invariants.
            </div>
          </div>

          {/* Credential Metrics Grid */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 border-y border-line py-4 text-center">
            <div>
              <div className="font-mono text-[10px] uppercase text-fg-subtle">Attained Rank</div>
              <div className="font-serif text-sm font-bold text-fg mt-0.5">
                {currentRank.title.replace(/^Level \d+: /, '')}
              </div>
              <div className="font-mono text-[10px] text-accent font-semibold">L{currentRank.level}</div>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase text-fg-subtle">Total Experience</div>
              <div className="font-mono text-sm font-bold text-fg mt-0.5">{xp} XP</div>
              <div className="font-mono text-[10px] text-accent font-semibold">Points Verified</div>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase text-fg-subtle">Simulators Passed</div>
              <div className="font-mono text-sm font-bold text-fg mt-0.5">
                {completedSimulators.length} / 10
              </div>
              <div className="font-mono text-[10px] text-good font-semibold">Interactive Labs</div>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase text-fg-subtle">Invariants Live</div>
              <div className="font-mono text-sm font-bold text-fg mt-0.5">
                {checkedBlueprintItems.length} / 12
              </div>
              <div className="font-mono text-[10px] text-good font-semibold">Blueprint Checklist</div>
            </div>
          </div>

          {/* Footer Signatures */}
          <div className="relative z-10 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-fg-subtle">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-accent" />
              <span>Conferred: {currentDate}</span>
            </div>

            <div className="text-center sm:text-right">
              <div className="font-serif italic text-fg text-sm">Agentic Coding School Verification Node</div>
              <div className="text-[10px] text-fg-subtle">SHA-256 Verified Local Ledger</div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            MODAL ACTION BUTTONS
        ───────────────────────────────────────────────────────────── */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Reset progress with double-confirmation */}
          <div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-xl border border-bad/30 bg-bad/10 px-3 py-2 text-xs font-mono text-bad hover:bg-bad/20 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{confirmReset ? 'Click Again to Confirm Reset' : 'Reset Local Progress'}</span>
            </button>
            {confirmReset && (
              <span className="block mt-1 font-mono text-[10px] text-bad">
                Clears all XP, lab completions, and quizzes in localStorage.
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-accent-ink hover:bg-accent-hover transition shadow-md"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-xl border border-line bg-band px-4 py-2.5 text-xs font-medium text-fg hover:border-line-strong transition"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
