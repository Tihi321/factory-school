import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  BookOpen,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Terminal,
  Zap,
  Layers,
  Flame,
} from 'lucide-react';
import { SYLLABUS_MODULES } from '../data/syllabus';
import { SyllabusLesson } from '../types/curriculum';
import { useFactoryStore } from '../store/useFactoryStore';

export const SyllabusExplorer: React.FC = () => {
  const { completedLessons, toggleLessonCompleted } = useFactoryStore();

  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedLessonIds, setExpandedLessonIds] = useState<Set<string>>(new Set());
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Compute total lessons
  const allLessons = useMemo(() => {
    const list: (SyllabusLesson & { chapterTitle: string; moduleTitle: string })[] = [];
    SYLLABUS_MODULES.forEach((mod) => {
      mod.chapters.forEach((ch) => {
        ch.lessons.forEach((l) => {
          list.push({
            ...l,
            chapterTitle: ch.title,
            moduleTitle: mod.title,
          });
        });
      });
    });
    return list;
  }, []);

  const totalLessonsCount = allLessons.length;
  const masteredLessonsCount = completedLessons.length;
  const progressPercent = Math.min(
    100,
    Math.round((masteredLessonsCount / (totalLessonsCount || 1)) * 100)
  );

  // Copy prompt handler
  const handleCopyPrompt = (lessonId: string, promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPromptId(lessonId);
    setTimeout(() => {
      setCopiedPromptId((curr) => (curr === lessonId ? null : curr));
    }, 2000);
  };

  // Toggle single lesson accordion
  const handleToggleLesson = (lessonId: string) => {
    setExpandedLessonIds((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
  };

  // Expand / collapse all
  const handleExpandAll = () => {
    const allIds = new Set<string>();
    filteredModules.forEach((m) => {
      m.chapters.forEach((c) => {
        c.lessons.forEach((l) => allIds.add(l.id));
      });
    });
    setExpandedLessonIds(allIds);
  };

  const handleCollapseAll = () => {
    setExpandedLessonIds(new Set());
  };

  // Filter modules and lessons
  const filteredModules = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return SYLLABUS_MODULES.map((module) => {
      // If module filter is active, skip other modules
      if (selectedModuleFilter !== 'all' && module.title !== selectedModuleFilter) {
        return null;
      }

      // Filter chapters & lessons
      const filteredChapters = module.chapters
        .map((chapter) => {
          const matchingLessons = chapter.lessons.filter((lesson) => {
            if (!query) return true;
            return (
              lesson.title.toLowerCase().includes(query) ||
              lesson.summary.toLowerCase().includes(query) ||
              lesson.keyTakeaway.toLowerCase().includes(query) ||
              lesson.practicePrompt.toLowerCase().includes(query) ||
              chapter.title.toLowerCase().includes(query)
            );
          });

          if (matchingLessons.length === 0) return null;

          return {
            ...chapter,
            lessons: matchingLessons,
          };
        })
        .filter(Boolean) as typeof module.chapters;

      if (filteredChapters.length === 0) return null;

      return {
        ...module,
        chapters: filteredChapters,
      };
    }).filter(Boolean) as typeof SYLLABUS_MODULES;
  }, [selectedModuleFilter, searchQuery]);

  // Total matching lessons count
  const matchingLessonsCount = useMemo(() => {
    let count = 0;
    filteredModules.forEach((m) => {
      m.chapters.forEach((c) => {
        count += c.lessons.length;
      });
    });
    return count;
  }, [filteredModules]);

  return (
    <div className="w-full flex flex-col space-y-8 pb-16">
      {/* 1. HEADER & PROGRESS SUMMARY BANNER */}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-card via-card to-page p-6 md:p-8 shadow-sm">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-md bg-accent/15 border border-accent/30 text-accent font-mono text-xs font-bold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Cohort Master Syllabus
            </span>
            <span className="text-xs font-mono uppercase tracking-wider text-fg-subtle">
              4 Modules • 26 Chapters • 82 Lessons
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono text-fg-muted">
            <span className="flex items-center gap-1 text-accent font-bold bg-accent/10 px-2.5 py-1 rounded-full border border-accent/30">
              <Sparkles className="w-3.5 h-3.5" />
              +25 XP per Lesson Mastered
            </span>
          </div>
        </div>

        <h1 className="text-2xl md:text-4xl font-serif font-bold text-fg tracking-tight leading-tight mb-2">
          From Intake to The Self-Improving Software Factory
        </h1>

        <p className="text-fg-muted text-sm md:text-base max-w-3xl leading-relaxed mb-6 font-sans">
          The comprehensive engineering curriculum behind the cohort. Study core concepts,
          master architectural invariants, and test production-grade prompts right in your workspace.
        </p>

        {/* PROGRESS BAR */}
        <div className="bg-page border border-line rounded-xl p-4 max-w-3xl space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-fg font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-good" />
              Mastery Progress: {masteredLessonsCount} of {totalLessonsCount} Lessons Mastered
            </span>
            <span className="text-accent font-bold">{progressPercent}% Completed</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-band overflow-hidden border border-line/60">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-accent via-accent-hover to-good"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono text-fg-subtle pt-1">
            <span>+{masteredLessonsCount * 25} XP Earned via Syllabus</span>
            <span>{(totalLessonsCount - masteredLessonsCount) * 25} XP Remaining to Claim</span>
          </div>
        </div>
      </div>

      {/* 2. FILTER CONTROLS & SEARCH BAR */}
      <div className="bg-card border border-line rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* MODULE TABS */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'All Modules' },
            { id: 'Before Day 1', label: 'Before Day 1' },
            { id: 'Week 1', label: 'Week 1' },
            { id: 'Week 2', label: 'Week 2' },
            { id: 'Bonus Content', label: 'Bonus Content' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedModuleFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all whitespace-nowrap ${
                selectedModuleFilter === tab.id
                  ? 'bg-accent text-accent-ink font-bold shadow-sm'
                  : 'bg-page text-fg-muted hover:text-fg hover:bg-band border border-line'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SEARCH INPUT */}
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 text-fg-subtle absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Playwright, System-1, ADR, Slack..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-page border border-line text-xs font-sans text-fg placeholder:text-fg-subtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-fg-subtle hover:text-fg"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={handleExpandAll}
              className="px-2.5 py-2 rounded-xl border border-line bg-page hover:bg-band text-[11px] font-mono text-fg-muted hover:text-fg transition-all"
              title="Expand All"
            >
              Expand
            </button>
            <button
              onClick={handleCollapseAll}
              className="px-2.5 py-2 rounded-xl border border-line bg-page hover:bg-band text-[11px] font-mono text-fg-muted hover:text-fg transition-all"
              title="Collapse All"
            >
              Collapse
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH STATS */}
      {searchQuery && (
        <div className="text-xs font-mono text-fg-muted px-2 flex items-center justify-between">
          <span>
            Found <strong className="text-accent">{matchingLessonsCount}</strong> matching lesson
            {matchingLessonsCount === 1 ? '' : 's'} for &ldquo;{searchQuery}&rdquo;
          </span>
          <button
            onClick={() => setSearchQuery('')}
            className="text-accent hover:underline flex items-center gap-1"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* 3. SYLLABUS MODULES & CHAPTERS ACCORDION */}
      {filteredModules.length === 0 ? (
        <div className="bg-card border border-line rounded-2xl p-12 text-center space-y-3">
          <BookOpen className="w-8 h-8 text-fg-subtle mx-auto" />
          <h3 className="font-serif font-bold text-lg text-fg">No matching lessons found</h3>
          <p className="text-sm text-fg-muted max-w-md mx-auto">
            Try adjusting your search keywords or switch to &ldquo;All Modules&rdquo; to view the
            complete syllabus.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedModuleFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-accent text-accent-ink font-mono text-xs font-bold shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredModules.map((module) => (
            <div key={module.id} className="space-y-4">
              {/* MODULE BANNER HEADER */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 px-1">
                <div className="flex items-center space-x-3">
                  <span className="w-2 h-6 bg-accent rounded-full" />
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-fg">
                      {module.title}
                    </h2>
                    <span className="text-xs font-mono text-fg-muted">{module.subtitle}</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-accent/10 border border-accent/30 text-accent">
                  {module.badge}
                </span>
              </div>

              {/* CHAPTERS GRID */}
              <div className="space-y-6">
                {module.chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="bg-card border border-line rounded-2xl overflow-hidden shadow-sm"
                  >
                    {/* CHAPTER HEADER */}
                    <div className="bg-band/60 p-4 border-b border-line flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Layers className="w-4 h-4 text-accent" />
                          <h3 className="font-serif font-bold text-base text-fg">
                            {chapter.title}
                          </h3>
                        </div>
                        <p className="text-xs text-fg-muted mt-1 font-sans">
                          {chapter.description}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-fg-subtle bg-page px-2.5 py-1 rounded-lg border border-line">
                        {chapter.lessons.length} Lesson{chapter.lessons.length === 1 ? '' : 's'}
                      </span>
                    </div>

                    {/* LESSONS LIST */}
                    <div className="divide-y divide-line/60">
                      {chapter.lessons.map((lesson) => {
                        const isExpanded = expandedLessonIds.has(lesson.id);
                        const isMastered = completedLessons.includes(lesson.id);
                        const isCopied = copiedPromptId === lesson.id;

                        return (
                          <div key={lesson.id} className="transition-colors">
                            {/* LESSON SUMMARY ROW */}
                            <div
                              onClick={() => handleToggleLesson(lesson.id)}
                              className={`p-4 flex items-center justify-between gap-3 cursor-pointer select-none transition-colors ${
                                isExpanded
                                  ? 'bg-page/80'
                                  : 'hover:bg-page/40'
                              }`}
                            >
                              <div className="flex items-center space-x-3.5 min-w-0">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLessonCompleted(lesson.id);
                                  }}
                                  className="shrink-0 transition-transform active:scale-95"
                                  title={
                                    isMastered ? 'Mastered (+25 XP)' : 'Mark Mastered (+25 XP)'
                                  }
                                >
                                  {isMastered ? (
                                    <CheckCircle2 className="w-5 h-5 text-good" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-line-strong hover:text-accent transition-colors" />
                                  )}
                                </button>

                                <div className="min-w-0">
                                  <h4
                                    className={`text-sm font-sans font-medium truncate ${
                                      isMastered
                                        ? 'text-fg font-semibold'
                                        : 'text-fg-body'
                                    }`}
                                  >
                                    {lesson.title}
                                  </h4>
                                </div>
                              </div>

                              <div className="flex items-center space-x-3 shrink-0">
                                <span className="flex items-center gap-1 text-[11px] font-mono text-fg-muted bg-card px-2 py-0.5 rounded border border-line">
                                  <Clock className="w-3 h-3 text-accent" />
                                  {lesson.durationMinutes}m
                                </span>
                                {isMastered && (
                                  <span className="hidden sm:inline-flex text-[10px] font-mono font-bold text-good bg-good/10 px-2 py-0.5 rounded border border-good/30">
                                    Mastered
                                  </span>
                                )}
                                <span className="text-fg-subtle">
                                  {isExpanded ? (
                                    <ChevronUp className="w-4 h-4" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                </span>
                              </div>
                            </div>

                            {/* EXPANDED STUDY GUIDE ACCORDION */}
                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                                  className="overflow-hidden bg-page border-t border-line/60"
                                >
                                  <div className="p-5 md:p-6 space-y-5">
                                    {/* SUMMARY */}
                                    <div>
                                      <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold block mb-1.5">
                                        Core Concept & Deep Summary
                                      </span>
                                      <p className="text-xs md:text-sm text-fg-body leading-relaxed font-sans">
                                        {lesson.summary}
                                      </p>
                                    </div>

                                    {/* KEY TAKEAWAY CALLOUT */}
                                    <div className="p-4 rounded-xl border border-accent/30 bg-accent-wash/30 flex items-start space-x-3">
                                      <Lightbulb className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                                      <div>
                                        <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider block mb-1">
                                          Key Engineering Takeaway
                                        </span>
                                        <p className="text-xs md:text-sm text-fg leading-relaxed">
                                          {lesson.keyTakeaway}
                                        </p>
                                      </div>
                                    </div>

                                    {/* COPYABLE AGENT PRACTICE PROMPT */}
                                    <div className="rounded-xl border border-line bg-card overflow-hidden">
                                      <div className="bg-band px-4 py-2.5 border-b border-line flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                          <Terminal className="w-3.5 h-3.5 text-accent" />
                                          <span className="text-xs font-mono font-bold text-fg">
                                            Agent Practice Prompt & Exercise
                                          </span>
                                        </div>
                                        <button
                                          onClick={() =>
                                            handleCopyPrompt(lesson.id, lesson.practicePrompt)
                                          }
                                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-page hover:bg-band border border-line text-fg hover:text-accent transition-all"
                                        >
                                          {isCopied ? (
                                            <>
                                              <Check className="w-3 h-3 text-good" />
                                              <span className="text-good font-bold">Copied!</span>
                                            </>
                                          ) : (
                                            <>
                                              <Copy className="w-3 h-3" />
                                              <span>Copy Prompt</span>
                                            </>
                                          )}
                                        </button>
                                      </div>
                                      <pre className="p-4 text-xs font-mono text-fg-body bg-page/90 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                                        {lesson.practicePrompt}
                                      </pre>
                                    </div>

                                    {/* MASTERY TOGGLE BUTTON */}
                                    <div className="flex items-center justify-between pt-2">
                                      <button
                                        onClick={() => toggleLessonCompleted(lesson.id)}
                                        className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-sm ${
                                          isMastered
                                            ? 'bg-good/15 hover:bg-good/25 text-good border border-good/40'
                                            : 'bg-accent hover:bg-accent-hover text-accent-ink'
                                        }`}
                                      >
                                        <CheckCircle2 className="w-4 h-4" />
                                        {isMastered
                                          ? 'Lesson Mastered (Click to Undo)'
                                          : 'Mark Lesson Mastered (+25 XP)'}
                                      </button>
                                      <span className="text-[11px] font-mono text-fg-subtle">
                                        Lesson ID: {lesson.id}
                                      </span>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SyllabusExplorer;
