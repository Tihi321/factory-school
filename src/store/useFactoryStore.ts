import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import confetti from 'canvas-confetti';

export interface RankInfo {
  level: number;
  title: string;
  minXp: number;
  nextXp: number | null;
  badge: string;
  description: string;
}

export const RANKS: RankInfo[] = [
  {
    level: 1,
    title: 'Level 1: The Proofreader',
    minXp: 0,
    nextXp: 250,
    badge: 'Level 1',
    description: 'Reading every diff by hand. Attention is the bottleneck.',
  },
  {
    level: 2,
    title: 'Level 2: Context Architect',
    minXp: 250,
    nextXp: 650,
    badge: 'Level 2',
    description: "Designing codebases and invariants agents can't get lost in.",
  },
  {
    level: 3,
    title: 'Level 3: Loop Engineer',
    minXp: 650,
    nextXp: 1200,
    badge: 'Level 3',
    description: 'Building verification loops and System-1 gates that touch reality.',
  },
  {
    level: 4,
    title: 'Level 4: Swarm Commander',
    minXp: 1200,
    nextXp: 1800,
    badge: 'Level 4',
    description: 'Orchestrating parallel bug-bash swarms and merge gates.',
  },
  {
    level: 5,
    title: 'Level 5: Software Factory Engineer',
    minXp: 1800,
    nextXp: null,
    badge: 'Level 5',
    description: 'Architect of self-improving systems that build and watch production.',
  },
];

export interface FactoryState {
  xp: number;
  tokensSaved: number; // simulated compute/attention hours or tokens saved
  completedSimulators: number[]; // subject IDs 1..10
  completedQuizzes: Record<number, number>; // subjectId -> score
  completedLessons: string[]; // lesson IDs e.g. "m0-c0-l0"
  checkedBlueprintItems: string[]; // IDs of factory checklist items
  studentName: string;
  theme: 'dark' | 'light';
  activePersonType: 'proofreader' | 'test-suite' | 'last-to-know' | 'factory-engineer';
}

export interface FactoryContextType extends FactoryState {
  completeSimulator: (subjectId: number, bonusXp?: number) => void;
  submitQuizScore: (subjectId: number, score: number, total: number) => void;
  toggleLessonCompleted: (lessonId: string) => void;
  toggleBlueprintItem: (itemId: string) => void;
  setStudentName: (name: string) => void;
  toggleTheme: () => void;
  setActivePersonType: (type: FactoryState['activePersonType']) => void;
  resetProgress: () => void;
  getCurrentRank: () => RankInfo;
  getProgressPercentage: () => number;
}

const STORAGE_KEY = 'software_factory_school_v1';

const DEFAULT_STATE: FactoryState = {
  xp: 0,
  tokensSaved: 0,
  completedSimulators: [],
  completedQuizzes: {},
  completedLessons: [],
  checkedBlueprintItems: [],
  studentName: '',
  theme: 'dark',
  activePersonType: 'proofreader',
};

const FactoryContext = createContext<FactoryContextType | undefined>(undefined);

function getInitialState(): FactoryState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_STATE,
        ...parsed,
      };
    }
  } catch (e) {
    console.error('Failed to parse saved factory state from localStorage', e);
  }
  return DEFAULT_STATE;
}

export const FactoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<FactoryState>(getInitialState);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save factory state to localStorage', e);
    }
  }, [state]);

  // Sync theme attribute to document element
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (state.theme === 'light') {
        document.documentElement.setAttribute('data-aes-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-aes-theme', 'dark');
      }
    }
  }, [state.theme]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#d89a3d', '#34d399', '#ffffff', '#e1b067'],
      });
    } catch {
      // ignore
    }
  };

  const completeSimulator = (subjectId: number, bonusXp = 0) => {
    setState((prev) => {
      const alreadyCompleted = prev.completedSimulators.includes(subjectId);
      const earnedXp = alreadyCompleted ? bonusXp : 120 + bonusXp;
      const tokensToAdd = alreadyCompleted ? 5000 : 45000;

      if (!alreadyCompleted) {
        triggerCelebration();
      }

      return {
        ...prev,
        xp: prev.xp + earnedXp,
        tokensSaved: prev.tokensSaved + tokensToAdd,
        completedSimulators: alreadyCompleted
          ? prev.completedSimulators
          : [...prev.completedSimulators, subjectId],
      };
    });
  };

  const submitQuizScore = (subjectId: number, score: number, _total: number) => {
    setState((prev) => {
      const prevScore = prev.completedQuizzes[subjectId] || 0;
      const improvement = Math.max(0, score - prevScore);
      const gainedXp = improvement * 80;
      const gainedTokens = improvement * 18000;

      if (gainedXp > 0) {
        triggerCelebration();
      }

      return {
        ...prev,
        xp: prev.xp + gainedXp,
        tokensSaved: prev.tokensSaved + gainedTokens,
        completedQuizzes: {
          ...prev.completedQuizzes,
          [subjectId]: Math.max(prevScore, score),
        },
      };
    });
  };

  const toggleLessonCompleted = (lessonId: string) => {
    setState((prev) => {
      const isCompleted = prev.completedLessons.includes(lessonId);
      const updatedLessons = isCompleted
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      const xpDelta = isCompleted ? -25 : 25;
      const tokensDelta = isCompleted ? -5000 : 5000;

      return {
        ...prev,
        completedLessons: updatedLessons,
        xp: Math.max(0, prev.xp + xpDelta),
        tokensSaved: Math.max(0, prev.tokensSaved + tokensDelta),
      };
    });
  };

  const toggleBlueprintItem = (itemId: string) => {
    setState((prev) => {
      const isChecked = prev.checkedBlueprintItems.includes(itemId);
      const updatedItems = isChecked
        ? prev.checkedBlueprintItems.filter((id) => id !== itemId)
        : [...prev.checkedBlueprintItems, itemId];
      const xpDelta = isChecked ? -30 : 30;
      const tokensDelta = isChecked ? -8000 : 8000;

      if (!isChecked) {
        triggerCelebration();
      }

      return {
        ...prev,
        checkedBlueprintItems: updatedItems,
        xp: Math.max(0, prev.xp + xpDelta),
        tokensSaved: Math.max(0, prev.tokensSaved + tokensDelta),
      };
    });
  };

  const setStudentName = (name: string) => {
    setState((prev) => ({ ...prev, studentName: name }));
  };

  const toggleTheme = () => {
    setState((prev) => {
      const nextTheme = prev.theme === 'dark' ? 'light' : 'dark';
      return { ...prev, theme: nextTheme };
    });
  };

  const setActivePersonType = (type: FactoryState['activePersonType']) => {
    setState((prev) => ({ ...prev, activePersonType: type }));
  };

  const resetProgress = () => {
    setState({
      ...DEFAULT_STATE,
      theme: state.theme,
    });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Failed to remove localStorage item', e);
    }
  };

  const getCurrentRank = (): RankInfo => {
    const currentXp = state.xp;
    for (let i = RANKS.length - 1; i >= 0; i--) {
      if (currentXp >= RANKS[i].minXp) {
        return RANKS[i];
      }
    }
    return RANKS[0];
  };

  const getProgressPercentage = (): number => {
    const maxTargetXp = 1800;
    return Math.min(100, Math.round((state.xp / maxTargetXp) * 100));
  };

  const value = useMemo<FactoryContextType>(
    () => ({
      ...state,
      completeSimulator,
      submitQuizScore,
      toggleLessonCompleted,
      toggleBlueprintItem,
      setStudentName,
      toggleTheme,
      setActivePersonType,
      resetProgress,
      getCurrentRank,
      getProgressPercentage,
    }),
    [state]
  );

  return React.createElement(FactoryContext.Provider, { value }, children);
};

export function useFactoryStore(): FactoryContextType {
  const context = useContext(FactoryContext);
  if (!context) {
    throw new Error('useFactoryStore must be used within a FactoryProvider');
  }
  return context;
}
