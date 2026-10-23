import React, { useState, useRef, useEffect } from 'react';
import { useFactoryStore, RANKS } from '../store/useFactoryStore';
import {
  Award,
  Sun,
  Moon,
  Zap,
  ChevronDown,
  Clock,
  Sparkles,
  Layers,
  FlaskConical,
  BookOpen,
  CheckSquare,
  Shield,
  HelpCircle,
} from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export type ActiveTab = 'overview' | 'subjects' | 'syllabus' | 'blueprint';

export interface HeaderHUDProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCertificate: () => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  activeTab,
  setActiveTab,
  onOpenCertificate,
}) => {
  const {
    xp,
    tokensSaved,
    completedSimulators,
    completedLessons,
    checkedBlueprintItems,
    theme,
    toggleTheme,
    getCurrentRank,
    getProgressPercentage,
  } = useFactoryStore();

  const [showRankDropdown, setShowRankDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentRank = getCurrentRank();
  const progressPct = getProgressPercentage();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowRankDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format tokens saved into human readable number
  const formattedTokens = new Intl.NumberFormat('en-US').format(tokensSaved);

  // Tabs definition
  const tabs: {
    id: ActiveTab;
    label: string;
    sublabel: string;
    badge?: string;
    icon: React.ElementType;
  }[] = [
    {
      id: 'overview',
      label: '01. The Shift',
      sublabel: 'Manifesto & Systems',
      icon: Layers,
    },
    {
      id: 'subjects',
      label: '02. 10 Interactive Labs',
      sublabel: 'Simulators & Practice',
      badge: `${completedSimulators.length}/10`,
      icon: FlaskConical,
    },
    {
      id: 'syllabus',
      label: '03. Full Syllabus',
      sublabel: 'Curriculum & Lessons',
      badge: `${completedLessons.length} read`,
      icon: BookOpen,
    },
    {
      id: 'blueprint',
      label: '04. Factory Blueprint',
      sublabel: 'Production Checklist',
      badge: `${checkedBlueprintItems.length}/12`,
      icon: CheckSquare,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-bg/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent-line bg-accent-wash text-accent shadow-sm">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold tracking-wider text-fg uppercase">
                Agentic Coding School
              </span>
              <span className="flex items-center gap-1 rounded-full border border-accent/30 bg-accent-wash px-2 py-0.5 text-[10px] font-medium text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                100% Free & Local
              </span>
            </div>
            <div className="font-serif text-sm font-semibold tracking-tight text-fg-body">
              The Software Factory Engineer
            </div>
          </div>
        </div>

        {/* Center: Navigation Pills */}
        <nav className="hidden lg:flex items-center gap-1 rounded-xl border border-line bg-card/60 p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                  isActive
                    ? 'text-accent font-semibold shadow-sm'
                    : 'text-fg-muted hover:text-fg hover:bg-line/40'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-lg border border-accent-line bg-accent-wash"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className={clsx('h-3.5 w-3.5', isActive ? 'text-accent' : 'text-fg-subtle')} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span
                      className={clsx(
                        'rounded-full px-1.5 py-0.2 text-[10px] font-mono',
                        isActive
                          ? 'bg-accent/20 text-accent font-bold'
                          : 'bg-band text-fg-subtle'
                      )}
                    >
                      {tab.badge}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right: HUD Progress & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Rank & XP Pill with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowRankDropdown(!showRankDropdown)}
              className="flex items-center gap-2 rounded-lg border border-line bg-card px-2.5 py-1.5 text-xs text-fg hover:border-line-strong transition"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded bg-accent/20 text-accent font-mono text-[10px] font-bold">
                L{currentRank.level}
              </div>
              <div className="text-left hidden sm:block">
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-fg">
                  <span>{currentRank.title.replace(/^Level \d+: /, '')}</span>
                  <span className="text-accent">{xp} XP</span>
                </div>
                {/* Mini progress bar */}
                <div className="mt-0.5 h-1 w-24 overflow-hidden rounded-full bg-band">
                  <div
                    className="h-full bg-accent transition-all duration-300"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-fg-subtle" />
            </button>

            {/* Rank Details Popover */}
            <AnimatePresence>
              {showRankDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 rounded-xl border border-line-strong bg-card p-4 shadow-2xl z-50"
                >
                  <div className="border-b border-line pb-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                        Factory Engineer Rank
                      </span>
                      <span className="font-mono text-xs font-bold text-accent">{xp} XP</span>
                    </div>
                    <div className="mt-1 text-sm font-semibold text-fg">
                      {currentRank.title}
                    </div>
                    <p className="mt-0.5 text-xs text-fg-muted">{currentRank.description}</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-fg-subtle font-mono">
                      <span>Progress to Level 5</span>
                      <span>{progressPct}%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-band">
                      <div
                        className="h-full bg-accent transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Simulated Compute/Attention Saved */}
                  <div className="my-3 flex items-center justify-between rounded-lg border border-line bg-band px-3 py-2 text-xs">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-accent" />
                      <span className="text-fg-body">Tokens/Attention Saved:</span>
                    </div>
                    <span className="font-mono font-bold text-accent">~{formattedTokens}</span>
                  </div>

                  {/* All 5 Ranks preview */}
                  <div className="space-y-1.5 text-xs">
                    <div className="font-mono text-[10px] uppercase text-fg-subtle">
                      Rank Ladder:
                    </div>
                    {RANKS.map((r) => {
                      const isReached = xp >= r.minXp;
                      const isCurrent = currentRank.level === r.level;
                      return (
                        <div
                          key={r.level}
                          className={clsx(
                            'flex items-center justify-between rounded px-2 py-1 text-[11px]',
                            isCurrent
                              ? 'bg-accent/10 border border-accent/30 font-semibold text-accent'
                              : isReached
                              ? 'text-fg-muted'
                              : 'text-fg-subtle opacity-60'
                          )}
                        >
                          <span className="flex items-center gap-1.5">
                            <span className="font-mono">L{r.level}</span>
                            <span>{r.title.replace(/^Level \d+: /, '')}</span>
                          </span>
                          <span className="font-mono text-[10px]">
                            {r.minXp} XP {r.nextXp ? `– ${r.nextXp} XP` : '+'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Certificate Button */}
          <button
            onClick={onOpenCertificate}
            title="View Certificate of Completion"
            className="flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent-wash px-2.5 py-1.5 text-xs font-medium text-accent hover:bg-accent/20 hover:border-accent transition"
          >
            <Award className="h-4 w-4" />
            <span className="hidden md:inline font-mono">Certificate</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-card text-fg-muted hover:text-fg hover:border-line-strong transition"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Tab Navigation Strip */}
      <div className="flex lg:hidden overflow-x-auto border-t border-line px-2 py-1.5 gap-1 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium transition',
                isActive
                  ? 'border border-accent-line bg-accent-wash text-accent'
                  : 'text-fg-muted hover:bg-line/40'
              )}
            >
              <Icon className="h-3 w-3" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] font-mono text-accent">({tab.badge})</span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
