export interface QuizQuestion {
  id: string;
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ComparisonPair {
  withoutFactory: string;
  withFactory: string;
}

export interface CodeArtifact {
  title: string;
  language: string;
  code: string;
  caption: string;
}

export interface SubjectModule {
  id: number; // 1 to 10
  slug: string;
  numberLabel: string; // "01" to "10"
  title: string;
  subtitle: string;
  kicker: string;
  mantra: string; // Bold quote from the cohort
  readTime: string;
  xpReward: number;
  mentalModel: {
    summary: string;
    keyShift: string;
    pillars: { title: string; detail: string; iconName: string }[];
  };
  deepDive: {
    heading: string;
    paragraphs: string[];
    proTip: string;
    warning?: string;
  }[];
  comparison: ComparisonPair[];
  codeArtifact: CodeArtifact;
  simulatorMeta: {
    title: string;
    objective: string;
    badgeName: string;
  };
  quiz: QuizQuestion[];
}

export interface SyllabusLesson {
  id: string;
  title: string;
  durationMinutes: number;
  isPlanned?: boolean;
  summary: string;
  keyTakeaway: string;
  practicePrompt: string;
}

export interface SyllabusChapter {
  id: string;
  title: string;
  description: string;
  lessons: SyllabusLesson[];
}

export interface SyllabusModule {
  id: string;
  title: string; // "Before Day 1", "Week 1", "Week 2", "Bonus Content"
  subtitle: string;
  badge: string;
  chapters: SyllabusChapter[];
}

export interface BlueprintChecklistItem {
  id: string;
  category: 'Codebase Design' | 'Verification Loops' | 'System-1 & Swarms' | 'Gates & Production Watchers';
  title: string;
  description: string;
  artifactToCreate: string;
}

export interface HeroManifesto {
  headline: string;
  subheadline: string;
  callout: string;
  antiPatterns: {
    title: string;
    character: string;
    trap: string;
    quote: string;
  }[];
  deadEnds: {
    approach: string;
    whyItFails: string;
  }[];
  coreThesis: string;
}
