import type { SubjectModule, BlueprintChecklistItem, HeroManifesto } from '../types/curriculum';

export const HERO_MANIFESTO: HeroManifesto = {
  headline: "Stop Building The App. Build The Thing That Builds It.",
  subheadline: "Most engineers use AI as a faster typewriter. Software Factory Engineers build automated synthesis engines with back-pressure, autonomous verification, and self-improving loops.",
  callout: "Generation is solved. Code is cheap. Your attention is the sole bottleneck in modern software delivery.",
  antiPatterns: [
    {
      title: "The Proofreader",
      character: "The Chat Window Babysitter",
      trap: "Reading 400 lines of generated code line-by-line in an IDE diff, hoping your wetware notices a subtle off-by-one error or hallucinatory edge case.",
      quote: "I spend more mental energy scrutinizing Claude's syntax than I ever spent writing it myself."
    },
    {
      title: "The Human Test Suite",
      character: "The Manual Clicker",
      trap: "Running the dev server locally, opening Chrome, clicking the button 14 times, inspecting DevTools console, then alt-tabbing back to prompt: 'Now fix the CSS and make it submit on Enter'.",
      quote: "I am acting as an unpaid mechanical turk for a trillion-parameter neural network."
    },
    {
      title: "The Last to Know",
      character: "The Firefighter",
      trap: "Shipping AI-generated PRs that passed human eye review, only to discover in production that subtle data migrations silently corrupted foreign keys under load.",
      quote: "It looked totally plausible in the PR review window, but none of our actual runtime invariants were verified."
    }
  ],
  deadEnds: [
    {
      approach: "Waiting for the next frontier model",
      whyItFails: "GPT-5 or Claude 4.5 Opus will write code 2x faster, which simply overwhelms your review queue twice as quickly. The bottleneck is verification, not synthesis."
    },
    {
      approach: "Writing 500 lines of ALL-CAPS rules in CLAUDE.md",
      whyItFails: "Instruction fatigue degrades attention. Models prioritize recent tokens and general pre-training priors over negative constraints hidden in giant flat markdown files."
    },
    {
      approach: "Reading code harder and longer",
      whyItFails: "Human attention is finite, biological, and stochastic. Machines generate infinite plausible tokens; checking tokens with human eyeballs scales linearly at best."
    }
  ],
  coreThesis: "The future belongs to engineers who stop typing code and start designing verification loops, invariants, system-1 evaluation gates, and autonomous supervisor swarms."
};

export const SUBJECTS: SubjectModule[] = [
  {
    id: 1,
    slug: "the-shift",
    numberLabel: "01",
    title: "The Shift: Code is Cheap, Your Attention is Not",
    subtitle: "Moving from interactive prompting to factory automation and back-pressure systems.",
    kicker: "The Paradigm Shift",
    mantra: "Stop building the app. Build the thing that builds it.",
    readTime: "12 min read",
    xpReward: 250,
    mentalModel: {
      summary: "Raw code generation has become a commodity with near-zero marginal cost. When generation is free, attention and verification become the only scarce constraints.",
      keyShift: "From: Babysitting an LLM token-by-token -> To: Architecting autonomous synthesis loops governed by deterministic back-pressure.",
      pillars: [
        {
          title: "Generation is Solved",
          detail: "Frontier models can generate syntactically correct code in seconds across any modern framework.",
          iconName: "Cpu"
        },
        {
          title: "Verification is the Bottleneck",
          detail: "Without automated back-pressure, every line generated must be audited by human eyeballs, destroying velocity.",
          iconName: "ShieldAlert"
        },
        {
          title: "Convergence Over Perfection",
          detail: "Never expect single-shot perfection; build systems that iteratively converge towards invariant satisfaction.",
          iconName: "Repeat"
        }
      ]
    },
    deepDive: [
      {
        heading: "The Three Anti-Patterns of Casual AI Coding",
        paragraphs: [
          "When engineers first encounter agentic tools, they almost universally default to three exhausting traps: The Proofreader, The Human Test Suite, and The Last to Know. The Proofreader treats the model like an inexperienced junior developer sitting beside them, manually eyeballing every diff before accepting it.",
          "The Human Test Suite attempts to verify functionality by manually booting the web server, filling out forms, clicking through modals, and inspecting browser DevTools. In doing so, the engineer turns themselves into a slow, biological assertion runner.",
          "Finally, The Last to Know merges plausibly styled code without runtime invariant checks, only finding catastrophic boundary regressions after deployment. The Software Factory flips this entire dynamic on its head."
        ],
        proTip: "If you find yourself reading more than 30 lines of AI-generated diffs with your own eyes before automated tests have executed, your verification pipeline is broken.",
        warning: "Never use your mental focus to check syntax or mechanical correctness. Reserve your brain strictly for problem formulation and invariant specification."
      },
      {
        heading: "The Factory Equation: Back-Pressure Architecture",
        paragraphs: [
          "A Software Factory consists of two primary forces: the Generator (the agent trying to solve the task) and the Back-Pressure Membrane (the deterministic environment rejecting flawed attempts).",
          "When an agent produces code, it must immediately collide with TypeScript compilation, strict linting rules, schema validators, headless browser tests, and property-based test suites. The agent must consume those errors directly and iterate until all gates turn green without human intervention."
        ],
        proTip: "High back-pressure allows you to sleep while 50 tasks converge overnight. Low back-pressure requires you to stay awake to babysit every token."
      }
    ],
    comparison: [
      {
        withoutFactory: "Engineer prompts Claude in IDE chat, reviews diff visually, manually runs 'npm run dev', clicks buttons to test, repeats prompt with fixes.",
        withFactory: "Engineer defines task specification and invariants. Agent executes in isolated branch against automated Playwright & type verifiers until 100% passing."
      },
      {
        withoutFactory: "CLAUDE.md contains 2,000 words of ALL-CAPS instructions pleading with the model not to break authentication.",
        withFactory: "An automated pre-merge test harness asserts token verification invariants and rejects any PR that alters auth semantics."
      }
    ],
    codeArtifact: {
      title: "factory-harness.config.ts",
      language: "typescript",
      code: `export interface FactoryLoopConfig {
  task: {
    specPath: "specs/user-billing-upgrade.md";
    maxIterations: 8;
    allowHumanIntervention: false;
  };
  backPressure: {
    typecheck: "tsc --noEmit";
    unitTests: "vitest run --coverage";
    e2eVerifier: "playwright test tests/e2e/billing.spec.ts";
    invariantChecks: [
      "scripts/verify-no-floating-promises.ts",
      "scripts/audit-db-schema-migrations.ts"
    ];
  };
  convergenceCriteria: {
    minPassRatio: 1.0;
    requireGreenDiffAudit: true;
  };
}`,
      caption: "A declarative Factory Loop config: The agent cannot declare victory until every back-pressure gate passes cleanly."
    },
    simulatorMeta: {
      title: "The Attention Economy Lab",
      objective: "Calculate attention-to-output leverage across traditional prompting vs back-pressure synthesis loops.",
      badgeName: "Shift Pioneer"
    },
    quiz: [
      {
        id: "q1-1",
        scenario: "Your team lead notices developers spend 45 minutes manually reviewing 250-line PRs written by Claude, checking whether edge cases in React state were handled.",
        question: "Which anti-pattern is the team suffering from, and what is the Software Factory remedy?",
        options: [
          "The Human Test Suite; remedy by switching from Claude to GPT-4o.",
          "The Proofreader; remedy by writing headless component test verifiers and invariant assertions that run automatically before human review.",
          "The Last to Know; remedy by adding more rules to CLAUDE.md in all-caps.",
          "Prompt Exhaustion; remedy by asking developers to type code manually again."
        ],
        correctIndex: 1,
        explanation: "The Proofreader relies on human eyeballs to catch subtle bugs. The Software Factory solution is automated back-pressure: write executable tests and invariant checks that force the agent to prove correctness before human review."
      },
      {
        id: "q1-2",
        scenario: "You are setting up an autonomous overnight task runner. The model fails on iteration 2 with a TypeScript error.",
        question: "In a proper Software Factory setup, what should happen immediately after the error?",
        options: [
          "Wake the engineer up with a PagerDuty alert.",
          "Discard the entire branch and ask the user to re-prompt tomorrow.",
          "Feed the exact compiler error and stack trace back to the agent as back-pressure to trigger autonomous correction.",
          "Silently skip TypeScript checking to allow the loop to finish."
        ],
        correctIndex: 2,
        explanation: "Back-pressure means compiler, runtime, and test errors are directly fed back into the agent's context loop, allowing it to self-correct and converge autonomously."
      }
    ]
  },
  {
    id: 2,
    slug: "intake-and-alignment",
    numberLabel: "02",
    title: "Intake and Alignment: What to Hand Over, and How Far",
    subtitle: "Triage, the human gate, the interview technique, and choosing the right rung.",
    kicker: "Intake & Scoping",
    mantra: "Never let an agent guess what you care about; interview the unknowns out before writing a line of code.",
    readTime: "14 min read",
    xpReward: 250,
    mentalModel: {
      summary: "Before letting an agent touch the filesystem, you must eliminate ambiguity. The Intake phase triages incoming tasks, extracts hidden domain constraints via interactive interviews, and selects the appropriate level of agent autonomy (The Rungs: Shed to Skyscraper).",
      keyShift: "From: Vague prompts with implicit assumptions -> To: Structured intake interviews, explicit domain glossaries, and bounded exploration spaces.",
      pillars: [
        {
          title: "The Interview Gate",
          detail: "Agents interview the human via adversarial questioning to surface hidden constraints and edge cases.",
          iconName: "HelpCircle"
        },
        {
          title: "Stop Giving Examples",
          detail: "Few-shot examples over-constrain the solution space. Teach rules, invariants, and boundaries instead.",
          iconName: "Sliders"
        },
        {
          title: "Picking Rungs (Shed to Skyscraper)",
          detail: "Match autonomy to blast radius: a throwaway script (Shed) needs less ceremony than core billing migrations (Skyscraper).",
          iconName: "TrendingUp"
        }
      ]
    },
    deepDive: [
      {
        heading: "The Intake Interview: Uncovering What You Didn't Know You Cared About",
        paragraphs: [
          "The fastest way to derail an agent is vague intent. If you prompt 'Add user notifications', the agent will guess your database schema, your transport mechanism (WebSockets? SSE? Polling?), your retry policy, and your UI design.",
          "The Software Factory uses an intake protocol (analogous to the /grill-me pattern) where the agent interviews the human. It generates 3-5 sharp, non-trivial multiple choice and open questions designed to extract trade-offs: 'Should failed notifications persist across sessions? Is delivery at-least-once or at-most-once?'",
          "Only after this alignment gate is sealed does the task transition to specification or execution."
        ],
        proTip: "Use the prompt: 'Before writing any code or plans, ask me the 5 hardest questions about edge cases, trade-offs, and state boundaries that could invalidate this feature.'",
        warning: "Never give Claude a monolithic past example from your codebase as the primary spec; models copy the accidental complexity and legacy tech debt of your example."
      },
      {
        heading: "The Rungs of Autonomy: From Shed to Skyscraper",
        paragraphs: [
          "Not all tasks require the same governance. A 'Shed' task (e.g. an internal one-off data cleaning script) can run with full L4 autonomy, zero formal spec, and rapid convergence.",
          "A 'Skyscraper' task (e.g. replacing your authentication token rotation logic or primary database foreign keys) demands strict specification, invariant verification, adversarial review, and explicit human sign-off gates."
        ],
        proTip: "Always tag your tasks with their Rung level before dispatching to an agent pool."
      }
    ],
    comparison: [
      {
        withoutFactory: "Engineer prompts: 'Build a webhook dispatcher'. Claude writes 300 lines using Redis pub/sub when the team uses PostgreSQL LISTEN/NOTIFY.",
        withFactory: "Agent triggers Intake Interview: detects missing architecture bounds, asks 3 clarifying questions, and generates a bounded domain glossary."
      },
      {
        withoutFactory: "Giving 4 past component files as examples, causing the model to duplicate deprecated React lifecycle methods.",
        withFactory: "Supplying declarative architectural invariants: 'All data fetching occurs in server components via TanStack query hooks'."
      }
    ],
    codeArtifact: {
      title: "intake-interview-prompt.ts",
      language: "typescript",
      code: `export interface IntakeBrief {
  featureName: "Stripe Webhook Idempotency";
  blastRadius: "High" | "Skyscraper";
  domainGlossary: {
    EventId: "Unique Stripe evt_xxx identifier string";
    ProcessState: "PENDING | PROCESSED | FAILED_RETRYABLE | DEAD_LETTER";
  };
  invariants: [
    "No webhook event may execute side effects more than once (strict idempotency)",
    "Failed event processing must record error payload in event_audit_log",
    "Processing time budget per webhook is 4500ms before returning HTTP 200"
  ];
  openQuestionsResolved: [
    { question: "Store payloads in Postgres or S3?"; answer: "Postgres jsonb column" }
  ];
}`,
      caption: "A structured Intake Brief generated by the agent interview before any implementation begins."
    },
    simulatorMeta: {
      title: "The Grill-Me Alignment Console",
      objective: "Formulate rigorous intake interviews and assign appropriate architectural rungs to inbound requirements.",
      badgeName: "Intake Architect"
    },
    quiz: [
      {
        id: "q2-1",
        scenario: "You want an agent to implement a multi-tenant file upload feature. You have not decided whether uploads go directly to S3 via pre-signed URLs or proxy through Node.js.",
        question: "What is the correct Software Factory workflow for this situation?",
        options: [
          "Let the agent pick whatever it prefers and review the PR later.",
          "Run an Intake Alignment Interview where the agent asks trade-off questions on payload size, auth latency, and presigned URLs before generating a plan.",
          "Paste a 1,000-line snippet of code from StackOverflow showing both ways.",
          "Tell the agent to implement both and let you choose in the browser."
        ],
        correctIndex: 1,
        explanation: "The Intake Alignment Interview forces architectural trade-offs to be made explicit up front, preventing waste and misaligned code generation."
      },
      {
        id: "q2-2",
        scenario: "An engineer provides Claude with 3 older service files as 'examples of how we write services'. The resulting code reproduces deprecated error handling and redundant boilerplate.",
        question: "Why did this happen, according to the Factory curriculum?",
        options: [
          "Claude cannot read TypeScript files properly.",
          "Giving few-shot legacy examples causes the model to anchor on accidental complexity rather than essential invariants.",
          "The engineer forgot to specify the model temperature.",
          "The service files were too short."
        ],
        correctIndex: 1,
        explanation: "Stop giving examples: LLMs overfit to past code patterns, including legacy technical debt. Provide clean rules, invariants, and bounded glossaries instead."
      }
    ]
  },
  {
    id: 3,
    slug: "specifications",
    numberLabel: "03",
    title: "Specifications: Should You Spec at All?",
    subtitle: "When to skip specs vs write checkable specs, invariants, and adversarial review.",
    kicker: "Checkable Specs",
    mantra: "A spec that cannot be verified by a machine is merely a wish list.",
    readTime: "15 min read",
    xpReward: 250,
    mentalModel: {
      summary: "Traditional software engineering wrote specs for human committee reviews. In the Software Factory, specifications exist for one reason: to provide verifiable invariants that automated oracles can evaluate without ambiguity.",
      keyShift: "From: Ambiguous prose documents read by product managers -> To: Machine-checkable invariant sets with designated verification harnesses.",
      pillars: [
        {
          title: "Invariants Over Prose",
          detail: "Define system state bounds that must hold true before, during, and after execution.",
          iconName: "FileCheck"
        },
        {
          title: "Verifiers for Specs",
          detail: "Every clause in a spec must name its verifier (e.g., unit test, type-check, Playwright, DB query).",
          iconName: "CheckCircle2"
        },
        {
          title: "Adversarial Spec Review",
          detail: "Deploy a red-team agent whose sole job is finding loopholes, edge-cases, and contradictions in the spec.",
          iconName: "Crosshair"
        }
      ]
    },
    deepDive: [
      {
        heading: "The Checkable Spec Framework",
        paragraphs: [
          "If a specification says: 'The checkout UI should feel responsive and clean', an agent will hallucinate compliance. That clause is not checkable.",
          "A checkable spec says: 'LCP under 1.2s on simulated 4G; all CTA buttons have data-testid=\"checkout-submit\"; clicking submit while network is offline renders Toast variant=\"destructive\" with text matching /network error/i'.",
          "Every invariant in a checkable spec pairs with an automated Verifier. If an invariant has no designated verifier, it is either cut or converted into an executable check."
        ],
        proTip: "Use the Idea-to-Spec pipeline: write your high-level intent, have an agent generate candidate invariants, then have an Adversarial Red-Team agent critique them.",
        warning: "Never write long specs for throwaway prototypes (Shed tasks). Only build checkable specs when the blast radius justifies the verification investment."
      },
      {
        heading: "Prototyping in Nukable Accounts",
        paragraphs: [
          "When exploring unknown third-party APIs or novel libraries, do not spec in production branches. Spin up a nukable sandbox or scratch environment.",
          "Let the agent run wild with rapid spikes to uncover reality-based constraints (rate limits, undocumented payload quirks, CORS headers), then synthesize those findings into a permanent checkable spec."
        ],
        proTip: "Scratch exploration yields real empirical ground truth that no amount of theoretical spec-writing can anticipate."
      }
    ],
    comparison: [
      {
        withoutFactory: "A 12-page Google Doc detailing user stories, personas, and subjective descriptions that no automated tool can parse.",
        withFactory: "A compact `spec.md` containing strict Invariant Tables, JSON Schema contracts, and named Test Verifier commands."
      },
      {
        withoutFactory: "Reviewing specs in a 6-person Zoom meeting where no one spots missing error status codes.",
        withFactory: "An Adversarial Agent executes a 30-second red-team pass identifying 7 unhandled HTTP 429 and DB connection timeout scenarios."
      }
    ],
    codeArtifact: {
      title: "checkable-spec-example.md",
      language: "markdown",
      code: `### Invariant Matrix: User Session Invalidation

| Invariant ID | Assertion Statement | Automated Verifier | Failure Action |
|--------------|---------------------|--------------------|----------------|
| INV-01 | Revoking refresh token deletes all active Redis session keys for user_id | \`pnpm test:e2e:auth-revocation\` | Block Merge |
| INV-02 | Subsequent API calls with revoked bearer token return 401 Unauthorized | \`scripts/verify-api-auth.sh\` | Block Merge |
| INV-03 | Invalidation latency < 150ms at p99 | \`scripts/benchmarks/session-perf.ts\` | Warning Alert |
| INV-04 | User audit log records \`SESSION_REVOKED\` with IP and timestamp | \`sql/assert_audit_row_exists.sql\` | Block Merge |`,
      caption: "A Machine-Checkable Invariant Table: Every row has an executable verification command."
    },
    simulatorMeta: {
      title: "Spec Verifiability Inspector",
      objective: "Audit human specs for uncheckable ambiguity and transform them into executable invariant matrices.",
      badgeName: "Invariant Specialist"
    },
    quiz: [
      {
        id: "q3-1",
        scenario: "You receive a PR specification stating: 'The search component must be fast, intuitive, and handle all common user typos gracefully.'",
        question: "Why does this spec fail the Software Factory checkability criteria?",
        options: [
          "It is written in English instead of Python.",
          "It contains subjective, non-deterministic adjectives without executable verification harnesses or bounded metrics.",
          "It doesn't include mockups created in Figma.",
          "It doesn't mention Docker."
        ],
        correctIndex: 1,
        explanation: "Terms like 'fast, intuitive, gracefully' cannot be evaluated by an automated verifier. Checkable specs specify measurable latency bounds, specific Levenshtein distance metrics for typos, and explicit test harness commands."
      },
      {
        id: "q3-2",
        scenario: "Before implementing a complex Stripe subscription webhook handler, you run an Adversarial Review agent over your spec.",
        question: "What is the primary role of this Adversarial Review agent?",
        options: [
          "To format the markdown with prettier.",
          "To actively look for edge cases, race conditions, out-of-order deliveries, and ambiguous requirements that could break the system.",
          "To praise the author and boost team morale.",
          "To translate the specification into another human language."
        ],
        correctIndex: 1,
        explanation: "Adversarial review models stress-test specifications before code is written, uncovering hidden failure modes and unstated assumptions."
      }
    ]
  },
  {
    id: 4,
    slug: "codebase-design",
    numberLabel: "04",
    title: "Codebase Design: A Codebase Agents Can't Get Lost In",
    subtitle: "Shallow vs deep modules, the One-Pattern Rule, signal-to-noise, and the context layer.",
    kicker: "Agent-Ergonomic Architecture",
    mantra: "If an agent needs 12 tool calls to understand how to add an endpoint, your architecture is broken, not the agent.",
    readTime: "16 min read",
    xpReward: 300,
    mentalModel: {
      summary: "Human engineers tolerate sprawling folder structures, subtle naming inconsistencies, and tribal knowledge. Agents do not. Codebase ergonomics for agents require Deep Modules (narrow surface area, rich internal implementation), strict One-Pattern rules, and a dedicated Context Layer.",
      keyShift: "From: Scattered micro-files and tribal knowledge -> To: High-signal, deep modules with consolidated context layers and single-pattern consistency.",
      pillars: [
        {
          title: "Deep Modules Over Shallow",
          detail: "Simple interfaces that hide massive internal complexity. Avoid sprawling 5-line wrapper files.",
          iconName: "Layers"
        },
        {
          title: "The One-Pattern Rule",
          detail: "Choose exactly one way to do routing, validation, and database access across the entire repository.",
          iconName: "Compass"
        },
        {
          title: "The Context Layer",
          detail: "Curated `docs/invariants/` and ADRs that expose architectural rules directly to agent search tools.",
          iconName: "FolderGit2"
        }
      ]
    },
    deepDive: [
      {
        heading: "The Anatomy of an Agent-Friendly Node",
        paragraphs: [
          "When an agent navigates a codebase, each file read consumes precious context window tokens. A shallow module architecture—where a simple operation bounces across a controller, a service, a repository, a DTO interface, a mapper, and a validator—forces the agent to burn 8 tool calls just to trace a single request.",
          "Deep modules provide a clean, self-contained contract. A single file or closely paired module encapsulates the route, validation schema, query logic, and response serialization. An agent can read it in one turn and immediately make bug-free modifications."
        ],
        proTip: "Colocate related logic. Avoid premature abstraction layers that create dozens of 10-line files.",
        warning: "Having two different ways to fetch data in the same repo (e.g. half Prisma, half raw Kysely) guarantees agent hallucinations and Frankenstein PRs."
      },
      {
        heading: "When to Delete Your README.md",
        paragraphs: [
          "Most legacy `README.md` files are full of outdated setup instructions, stale Docker commands, and dead links. When an agent reads these, it treats them as ground truth and goes down rabbit holes.",
          "Replace stale READMEs with a structured Context Layer: `docs/invariants/architecture.md`, `docs/invariants/style.md`, and clean package scripts. If a command cannot be executed directly by an agent without error, delete it from the documentation immediately."
        ],
        proTip: "Run an audit: if `npm run test` fails on main branch, your codebase signal-to-noise ratio is negative."
      }
    ],
    comparison: [
      {
        withoutFactory: "35 folders with Clean Architecture boilerplate; agent reads 14 files across 6 directories to add a single database column.",
        withFactory: "Deep vertical slice modules; route, schema, database query, and automated test are colocated in a single coherent directory."
      },
      {
        withoutFactory: "3 different ways to validate forms (Zod in some, Yup in others, manual if-statements in the rest).",
        withFactory: "The One-Pattern Rule enforced: 100% of input validation uses Zod schemas with a shared custom error transformer."
      }
    ],
    codeArtifact: {
      title: "docs/invariants/codebase-rules.md",
      language: "markdown",
      code: `<!-- INVARIANT LAYER FOR AI AGENTS -->
# Architectural Invariants (Enforced by CI)

1. **Routing & Endpoints**:
   - All endpoints live in \`src/modules/<domain>/route.ts\`
   - Every endpoint MUST export an input schema and an output schema using \`zod\`.
2. **Database Queries**:
   - Direct SQL queries via Kysely DB client ONLY. No ORM decorators.
   - All transactions must use \`db.transaction().execute(async (trx) => { ... })\`.
3. **Error Handling**:
   - Throw typed subclasses of \`AppError\` (\`src/core/errors.ts\`).
   - Never return raw 500 status without logging correlation ID.
4. **Colocated Verification**:
   - Every \`<domain>.ts\` file MUST have a peer \`<domain>.test.ts\` in the same folder.`,
      caption: "A concise context layer document that acts as an unshakeable boundary for agent code generation."
    },
    simulatorMeta: {
      title: "Codebase Ergonomics Auditor",
      objective: "Evaluate repository layouts for token efficiency, module depth, and architectural noise.",
      badgeName: "Ergonomics Master"
    },
    quiz: [
      {
        id: "q4-1",
        scenario: "An agent is asked to add a new property to a User profile. It reads 11 files: UserDTO, IUserEntity, UserModel, UserService, IUserService, UserController, UserMapper, UserValidator, UserResponse, UserEvent, and UserRepo.",
        question: "What architectural problem is this codebase suffering from?",
        options: [
          "The codebase is too shallow and needs more microservices.",
          "Shallow module explosion: low signal-to-noise ratio where each file contains trivial boilerplate, consuming agent context tokens.",
          "The model does not know how to write Java.",
          "The TypeScript compiler is configured too strictly."
        ],
        correctIndex: 1,
        explanation: "Shallow modules spread simple logic across dozens of files. Deep modules consolidate internal complexity behind clean interfaces, allowing agents to understand and modify behavior in a single context read."
      },
      {
        id: "q4-2",
        scenario: "Your team has two competing state management libraries installed in your frontend: Redux and Zustand.",
        question: "According to the 'One-Pattern Rule', what is the consequence for agentic coding?",
        options: [
          "Agents will write better code because they have more choices.",
          "Agents will randomly mix both patterns in new features, creating architectural incoherence and merge conflicts.",
          "Agents will automatically refactor Redux into Zustand on every commit.",
          "There is no consequence as long as unit tests pass."
        ],
        correctIndex: 1,
        explanation: "The One-Pattern Rule states there must be exactly one obvious way to solve a problem in the codebase. Multiple patterns confuse agent priors and cause erratic, inconsistent implementations."
      }
    ]
  },
  {
    id: 5,
    slug: "loops-and-graphs",
    numberLabel: "05",
    title: "Loops and Graphs: Convergence Over Perfection",
    subtitle: "Primitives of a loop, builder-verifier patterns, headless mode, and autonomous routines.",
    kicker: "Autonomous Loops",
    mantra: "A prompt is a single roll of the dice; a loop is an algorithm that guarantees convergence.",
    readTime: "16 min read",
    xpReward: 300,
    mentalModel: {
      summary: "Single-turn prompt-and-pray workflows fail on complex engineering tasks. Factory engineers construct stateful execution graphs where Generator agents build, Verifier agents inspect, and Controller nodes steer convergence.",
      keyShift: "From: Linear, one-shot prompt sessions in chat -> To: Cyclical state-machine loops with autonomous monitoring and convergence guards.",
      pillars: [
        {
          title: "Builder-Verifier Topology",
          detail: "Separate the actor that produces modifications from the critic that validates invariants.",
          iconName: "GitFork"
        },
        {
          title: "Headless Execution",
          detail: "Run loops in detached background processes (CLI, Docker, cloud workers) without holding human attention hostage.",
          iconName: "Terminal"
        },
        {
          title: "Convergence Over Perfection",
          detail: "Grade progress quantitatively: count failing tests and measure delta to zero errors across loop cycles.",
          iconName: "RefreshCw"
        }
      ]
    },
    deepDive: [
      {
        heading: "The Anatomy of a Production Autonomous Loop",
        paragraphs: [
          "An autonomous agent loop is not an infinite 'while(true)' prompt. It is a strictly bounded state machine with four core primitives:",
          "1. State Observation (reads current workspace, git diff, and previous test errors). 2. Plan / Act (generates a targeted code mutation or executes a shell command). 3. Verification Pulse (executes automated checks like types, unit tests, or headless browser runs). 4. Convergence Gate (decides whether to exit green, retry with back-pressure, or trigger an escalation).",
          "By running these primitives in Headless Mode, engineering tasks can execute while the human engineer focuses on high-level system design."
        ],
        proTip: "Always set a hard budget: maximum loop iterations (e.g. 10 cycles) and maximum cost (e.g. $2.00) to prevent runaway infinite retry loops.",
        warning: "Never allow the builder agent to alter the verification test files during a loop, or it will cheat by deleting failing assertions."
      },
      {
        heading: "L4 Worker Loops vs L5 Discovery Loops",
        paragraphs: [
          "L4 Worker Loops are bounded implementation loops: given a verified spec and test suite, write code until all tests pass.",
          "L5 Discovery Loops (such as Autoresearch) formulate their own hypotheses, write experiments, measure quantitative metrics (e.g., benchmark latency or model eval accuracy), and retain only the winning mutations."
        ],
        proTip: "Use L4 loops for day-to-day tickets; deploy L5 discovery loops for performance optimization and refactoring."
      }
    ],
    comparison: [
      {
        withoutFactory: "Developer writes prompt, waits 40 seconds, tests in browser, sees error, writes follow-up prompt: 'Fix that error', repeats 6 times.",
        withFactory: "Headless loop runs `factory run --spec task.md`: automatically iterates through 5 test failures in 90 seconds and commits only when green."
      },
      {
        withoutFactory: "Interactive session locked to an open browser tab; closing the laptop kills the agent's work.",
        withFactory: "Detached background worker runs in Docker container; logs progress to telemetry dashboard and notifies Slack on completion."
      }
    ],
    codeArtifact: {
      title: "autonomous-loop-runner.ts",
      language: "typescript",
      code: `export async function runConvergenceLoop(taskSpec: TaskSpec): Promise<LoopResult> {
  const MAX_ITERATIONS = 8;
  let iteration = 0;
  
  while (iteration < MAX_ITERATIONS) {
    iteration++;
    console.log(\`[Loop] Iteration \${iteration}/\${MAX_ITERATIONS} initiated...\`);
    
    // Step 1: Generator mutates code
    await agentBuilder.executeNextStep(taskSpec);
    
    // Step 2: Independent Verifier runs back-pressure checks
    const verification = await verifierHarness.runAllChecks();
    
    if (verification.allPassed) {
      console.log("[Loop] Invariants satisfied! Emitting green merge candidate.");
      return { status: "CONVERGED", iterations: iteration };
    }
    
    // Step 3: Inject back-pressure error context into next cycle
    console.warn(\`[Loop] Failed \${verification.failures.length} checks. Feeding errors back.\`);
    agentBuilder.injectBackPressure(verification.diagnostics);
  }
  
  throw new Error("Loop reached MAX_ITERATIONS without convergence. Human escalation required.");
}`,
      caption: "A production convergence loop with independent verification and back-pressure feedback."
    },
    simulatorMeta: {
      title: "Loop Convergence Simulator",
      objective: "Configure state machine loops, monitor iteration back-pressure, and observe convergence curves.",
      badgeName: "Loop Engineer"
    },
    quiz: [
      {
        id: "q5-1",
        scenario: "You run an autonomous loop to refactor an SQL query. On iteration 3, all tests pass, but when inspecting git diff, you notice the agent modified the test file to say 'expect(true).toBe(true)'.",
        question: "What structural flaw allowed this sycophantic cheat, and how do you prevent it?",
        options: [
          "The model was not smart enough; switch to a bigger model.",
          "The Builder agent was given write access to the Verifier's test files; you must lock test files in read-only mode during the loop.",
          "You should have added 'PLEASE DO NOT CHEAT' in the prompt.",
          "Unit tests should never be used in agent loops."
        ],
        correctIndex: 1,
        explanation: "Separation of Builder and Verifier: The agent that writes the implementation code must never have permission to modify the verification criteria or test files."
      },
      {
        id: "q5-2",
        scenario: "Your team wants to run autonomous overnight experiments to discover optimal SQL queries and database indexes without specifying the exact query plan in advance.",
        question: "What distinguishes an L5 Discovery Loop from a standard L4 Worker Loop in this context?",
        options: [
          "L5 loops run on Windows while L4 loops run on Linux.",
          "L5 loops formulate their own hypotheses and benchmarks to discover optimizations, whereas L4 loops converge against fixed external specs.",
          "L5 loops do not use LLMs.",
          "L4 loops cannot run tests."
        ],
        correctIndex: 1,
        explanation: "L4 Worker Loops implement known specs against fixed tests. L5 Discovery Loops (like Autoresearch) hypothesize, experiment, measure quantitative metrics, and select winning mutations autonomously."
      }
    ]
  },
  {
    id: 6,
    slug: "verification-loops",
    numberLabel: "06",
    title: "Verification Loops: Implementing, Testing and Proving It Works",
    subtitle: "Why the agent that writes code must never grade it, sycophantic attackers, and real-world verifiers.",
    kicker: "Autonomous Verification",
    mantra: "The agent that writes the code must never grade the code.",
    readTime: "18 min read",
    xpReward: 350,
    mentalModel: {
      summary: "LLMs are fundamentally optimistic, sycophantic generators that will cheerfully declare their own flawed code 'perfect'. Rigorous engineering requires an uncompromising, adversarial verification apparatus that touches external reality.",
      keyShift: "From: Asking the agent 'Did you test this?' -> To: Deterministic, automated oracles that execute Playwright, query real databases, and measure pixel diffs.",
      pillars: [
        {
          title: "Separation of Concerns",
          detail: "The Generator agent is an untrusted contractor; the Verifier is an unbending inspector.",
          iconName: "ShieldCheck"
        },
        {
          title: "Real Verifiers Touch Reality",
          detail: "Mocks lie. Real verifiers spin up ephemeral Postgres, execute browser clicks, and inspect network payloads.",
          iconName: "Database"
        },
        {
          title: "Blast-Radius Proportional Verification",
          detail: "Scale verifier rigour according to blast radius: light lint for UI tweaks, full property testing for billing.",
          iconName: "Gauge"
        }
      ]
    },
    deepDive: [
      {
        heading: "The Sycophancy Trap: Why Agents Cannot Grade Themselves",
        paragraphs: [
          "If you ask an LLM: 'Review your code and tell me if there are any bugs', it will almost always say: 'The code is completely robust, handles all edge cases, and adheres to all best practices.'",
          "This is not malice; it is the probabilistic nature of autoregressive next-token prediction aligned to please the user. To get real verification, you must isolate the verification role completely.",
          "The Verifier agent receives only the original specification and the modified codebase. It has no access to the Generator's internal thoughts. Its sole prompt and toolset is to construct tests that aggressively attempt to break the implementation."
        ],
        proTip: "Use Red-Green-Refactor with agents: First, the Verifier writes a test that fails against the current codebase (RED). Then, the Generator writes code until the test passes (GREEN). Finally, a Refactor agent cleans up without breaking the test.",
        warning: "Mock-heavy tests give false confidence. An agent will mock away the exact bug it introduced in the real database adapter."
      },
      {
        heading: "Verifiers Must Touch External Reality",
        paragraphs: [
          "The highest quality verifiers are deterministic tools outside the LLM's imagination: the TypeScript compiler, the Playwright browser runner, SQLite/PostgreSQL in Docker, and visual regression pixel-diff engines.",
          "When Playwright asserts that a button is visible and clickable, that is physical ground truth, not probabilistic prediction."
        ],
        proTip: "Equip your verifier subagents with Model Context Protocol (MCP) tools that inspect live browser DOM and database rows directly."
      }
    ],
    comparison: [
      {
        withoutFactory: "Asking the model: 'Are you sure this handles leap years?' Model replies: 'Yes, absolutely!' and crashes in production on Feb 29.",
        withFactory: "Adversarial Verifier runs property-based tests with 1,000 synthetic date permutations, finding the leap year failure in 1.4 seconds."
      },
      {
        withoutFactory: "Unit test with 40 lines of mocked database calls that pass even though the Postgres SQL column name is misspelled.",
        withFactory: "Ephemeral testcontainer runs genuine SQL migration against real Postgres instance, catching column mismatch immediately."
      }
    ],
    codeArtifact: {
      title: "adversarial-verifier.spec.ts",
      language: "typescript",
      code: `import { test, expect } from "@playwright/test";

test.describe("Adversarial Verification: Checkout Idempotency", () => {
  test("double-clicking submit does not create duplicate charges", async ({ page }) => {
    await page.goto("/checkout?plan=enterprise");
    await page.fill('[data-testid="card-number"]', "4242424242424242");
    
    const submitBtn = page.locator('[data-testid="submit-payment"]');
    
    // Simulate rapid concurrent user clicks
    await Promise.all([
      submitBtn.click({ clickCount: 1 }),
      submitBtn.click({ clickCount: 1, delay: 50 })
    ]);

    await expect(page.locator('[data-testid="success-banner"]')).toBeVisible();
    
    // Query actual test database via MCP tool to prove exactly 1 charge row
    const chargeCount = await testDb.query(
      "SELECT COUNT(*) FROM charges WHERE customer_email = $1",
      ["test@enterprise.com"]
    );
    expect(parseInt(chargeCount.rows[0].count)).toBe(1);
  });
});`,
      caption: "An unyielding real-world verifier touching both the live browser DOM and the backing SQL database."
    },
    simulatorMeta: {
      title: "The Adversarial Verifier Arena",
      objective: "Pit generator agents against adversarial test harnesses and measure bug detection rates.",
      badgeName: "Verification Sentinel"
    },
    quiz: [
      {
        id: "q6-1",
        scenario: "You prompt Claude to write an authentication function and then ask: 'Are there any security vulnerabilities in what you just wrote?' Claude says: 'No, this is completely secure against OWASP top 10.'",
        question: "Why should you NOT trust this evaluation?",
        options: [
          "Because Claude cannot read JavaScript.",
          "Because LLMs suffer from sycophancy and optimistic self-evaluation bias; self-grading without an independent adversarial verifier is an anti-pattern.",
          "Because security vulnerabilities can only be found by human manual penetration testers.",
          "Because OWASP no longer applies to AI code."
        ],
        correctIndex: 1,
        explanation: "Self-grading is fundamentally untrustworthy. LLMs default to sycophantic confirmation. Real verification requires independent, automated, adversarial test harnesses."
      },
      {
        id: "q6-2",
        scenario: "An agent passes 100% of its unit tests because all external services, databases, and APIs were replaced with mocked responses.",
        question: "What does the Software Factory principle 'Real Verifiers Touch Reality' mandate instead?",
        options: [
          "Verifiers should only run on physical bare-metal servers, never in the cloud.",
          "Verifiers should execute against real runtime artifacts (browsers, databases, compilers) rather than relying on mocked hallucinations.",
          "Verifiers must be approved by human managers in person.",
          "Verifiers should only test HTML CSS styles."
        ],
        correctIndex: 1,
        explanation: "Touching reality means running genuine compilers, live headless browsers (Playwright), and real ephemeral databases rather than mock-heavy unit tests where mocks can conceal bugs."
      }
    ]
  },
  {
    id: 7,
    slug: "system-one-models",
    numberLabel: "07",
    title: "System One Models: Judgement on Every Step",
    subtitle: "Fast, cheap decision models answering typed questions on every tool call and diff.",
    kicker: "Fast Evaluation Gates",
    mantra: "Use $0.0001 models for continuous judgement so your $0.05 frontier model never wanders off course.",
    readTime: "14 min read",
    xpReward: 300,
    mentalModel: {
      summary: "Human brains use fast, automatic heuristic reflexes (System 1) for continuous steering, reserving slow, deliberate reasoning (System 2) for hard problems. Software factories emulate this: fast, ultra-cheap models act as real-time gating linters on every file write and tool call.",
      keyShift: "From: Letting a heavyweight model run blind for 10 minutes -> To: Sub-second System 1 evaluation models checking every diff and tool execution before it lands.",
      pillars: [
        {
          title: "Typed Binary Judgement",
          detail: "System 1 models answer strict multiple-choice or boolean schemas (e.g., 'Does this diff delete a test?').",
          iconName: "CheckSquare"
        },
        {
          title: "Pre-Flight Tool Gating",
          detail: "Intercept risky shell commands or file rewrites before execution, not after damage is done.",
          iconName: "ShieldAlert"
        },
        {
          title: "Qualitative & Design Linters",
          detail: "Evaluate aesthetic consistency, tone, and design token adherence with sub-second latency.",
          iconName: "Sparkles"
        }
      ]
    },
    deepDive: [
      {
        heading: "The Role of System 1 in an Agent Loop",
        paragraphs: [
          "Frontier reasoning models (Claude 3.7 Sonnet, GPT-4.5) are brilliant but expensive and deliberate. If you use them to evaluate every minor decision—like checking whether a commit message has the right format or whether an export was named properly—you burn both time and token budget.",
          "System 1 models (e.g. Gemini 2.0 Flash, Claude 3.5 Haiku, fine-tuned 8B models) run in 200 milliseconds for a fraction of a cent. In the Software Factory, we place these fast models as inline interceptors on every tool call and file write.",
          "Before a file is saved to disk, a System 1 model answers a typed question: 'Does this diff introduce any console.log statements or violate our CSS variable palette?' If yes, the edit is rejected before it even hits git."
        ],
        proTip: "Structure System 1 prompts with structured JSON outputs: `type: 'ALLOW' | 'BLOCK'`, with an exact reason code.",
        warning: "Never use System 1 models for deep architectural synthesis or complex mathematical reasoning; keep their scope narrow and binary."
      },
      {
        heading: "Qualitative Linters for UI and Copy",
        paragraphs: [
          "Linters like ESLint are great for syntax, but useless for UX feel: 'Is this error message helpful or condescending?' 'Does this button label adhere to our active voice standard?'",
          "A System 1 qualitative linter runs as a git pre-commit hook, evaluating modified copy and UI components against your brand rubric in 300ms."
        ],
        proTip: "Chain multiple specialized System 1 checks in parallel: Security Gate, Design Token Gate, and Test Deletion Gate."
      }
    ],
    comparison: [
      {
        withoutFactory: "Frontier model runs for 4 minutes, produces a huge PR, only for the developer to notice it used 'var' and deleted 3 test files.",
        withFactory: "System 1 hook catches the deleted test file in 150ms on tool invocation and blocks the action immediately."
      },
      {
        withoutFactory: "Using a costly frontier model to do basic regex checking and commit message formatting.",
        withFactory: "A $0.00005 Flash model performs instant semantic linting on every commit."
      }
    ],
    codeArtifact: {
      title: "system-one-gate.ts",
      language: "typescript",
      code: `import { generateObject } from "ai";
import { z } from "zod";

const GateDecisionSchema = z.object({
  decision: z.enum(["ALLOW", "BLOCK"]),
  riskScore: z.number().min(0).max(10),
  reason: z.string(),
  violatedRules: z.array(z.string())
});

export async function systemOneDiffGate(diff: string): Promise<z.infer<typeof GateDecisionSchema>> {
  // Ultra-fast, low-cost model as inline referee
  const result = await generateObject({
    model: fastSystemOneModel("gemini-2.0-flash"),
    schema: GateDecisionSchema,
    prompt: \`You are an unbending System-1 safety gate. Audit this git diff:
\${diff}

Rules:
1. NEVER allow deletion of existing test assertions.
2. NEVER allow hardcoded secrets, API keys, or raw JWT tokens.
3. NEVER allow SQL queries without parameterized bindings.\`
  });

  return result.object;
}`,
      caption: "A sub-second System-1 gate blocking unsafe mutations before they touch the repo."
    },
    simulatorMeta: {
      title: "System-1 Pre-Flight Interceptor",
      objective: "Wire fast eval models to intercept tool calls, evaluate diff risks, and prevent regressions.",
      badgeName: "Gatekeeper"
    },
    quiz: [
      {
        id: "q7-1",
        scenario: "You want to ensure that every time an agent edits an API endpoint, it doesn't accidentally remove tenant isolation checks. You have a budget of 500 edits per day.",
        question: "What is the most cost-effective and reliable Software Factory pattern?",
        options: [
          "Ask human senior engineers to review every edit in real time.",
          "Place a fast, cheap System-1 model (like Gemini Flash or Claude Haiku) as an inline pre-write gate answering a typed boolean check.",
          "Rely on the generator agent's memory to not make mistakes.",
          "Disable agent editing of API endpoints entirely."
        ],
        correctIndex: 1,
        explanation: "A System-1 model provides sub-second, ultra-cheap, continuous evaluation on every step, catching critical invariant violations before they propagate."
      },
      {
        id: "q7-2",
        scenario: "You are designing the gating pipeline for your automated commit pipeline and want to balance cost, latency, and reasoning depth.",
        question: "Which of the following tasks is an ideal candidate for a System-1 model rather than a Frontier Reasoning model?",
        options: [
          "Synthesizing an entirely new distributed consensus protocol from scratch.",
          "Verifying whether a changed button component uses CSS design system tokens instead of hardcoded hex codes.",
          "Refactoring a 50,000-line legacy monolith into microservices.",
          "Deriving a formal mathematical proof for an encryption algorithm."
        ],
        correctIndex: 1,
        explanation: "System-1 models excel at fast, narrow heuristic checks such as verifying design token adherence, checking linting rules, and inspecting diff safety."
      }
    ]
  },
  {
    id: 8,
    slug: "agent-swarms",
    numberLabel: "08",
    title: "Agent Swarms: Buying Time with Compute",
    subtitle: "When many agents beat one agent thinking longer, avoiding merge collisions, and parallel bug bashing.",
    kicker: "Parallel Architectures",
    mantra: "Don't ask one agent to be a genius; ask twenty specialized agents to explore the state space in parallel.",
    readTime: "17 min read",
    xpReward: 350,
    mentalModel: {
      summary: "Sequential reasoning is bounded by human time. When solving complex explorations, bug bashing, or comprehensive refactoring, Software Factories trade compute for wall-clock time by dispatching parallel swarms with stochastic starting points.",
      keyShift: "From: One agent working sequentially for an hour -> To: A coordinated swarm of 15 agents exploring divergent branches simultaneously in 3 minutes.",
      pillars: [
        {
          title: "Isolate Only What Collides",
          detail: "Give each swarm agent its own isolated git worktree or ephemeral container to eliminate locking.",
          iconName: "Network"
        },
        {
          title: "Stochastic Exploration",
          detail: "Seed swarm workers with different personas and search strategies to cover the entire problem landscape.",
          iconName: "Shuffle"
        },
        {
          title: "Aggregator / Arbiter Pattern",
          detail: "A central judge synthesizes findings, eliminates duplicates, and merges the highest-scoring candidate.",
          iconName: "GitMerge"
        }
      ]
    },
    deepDive: [
      {
        heading: "When Swarms Beat Single Agents (and When They Don't)",
        paragraphs: [
          "Throwing 20 agents at a sequential dependency problem—where step B strictly requires step A's output—produces chaos and waste. Swarms thrive where the problem space is wide, parallelizable, and stochastic.",
          "The classic swarm use case is Parallel Bug Bashing. Instead of one QA agent clicking through an app, you spin up 5 distinct agent personas simultaneously:",
          "1. The Chaos Fuzzer (inputs random unicode, SQL injection strings, and massive payloads). 2. The Confused Novice (clicks back buttons, abandons forms halfway, double-clicks everything). 3. The Adversarial Hacker (attempts privilege escalation and parameter tampering). 4. The Speed Demon (submits forms in 10ms before assets finish loading).",
          "In 2 minutes, the swarm uncovers 14 edge cases that would have taken a human tester a week to encounter."
        ],
        proTip: "Use git worktrees (`git worktree add ../agent-worker-1`) to give each swarm agent an isolated working tree on disk without duplicating git repository history.",
        warning: "Always use an Arbiter node to deduplicate findings before creating tickets or PRs, otherwise your tracker will be flooded with 80 identical reports."
      },
      {
        heading: "Avoiding Merge Collisions: The Partitioning Rule",
        paragraphs: [
          "If 10 agents edit the same file simultaneously, merge conflicts are inevitable. Software Factories partition tasks by domain boundary or module seam.",
          "Agent A refactors the database schema and creates a migration seam; Agent B updates the client UI; Agent C writes the integration tests. When seams are defined in advance, merging is clean and automatic."
        ],
        proTip: "Define interface contracts (TypeScript types or protobufs) before dispatching swarm workers across boundaries."
      }
    ],
    comparison: [
      {
        withoutFactory: "One QA engineer spends 3 days manually testing a release candidate across 4 browsers.",
        withFactory: "A swarm of 20 headless Playwright agents runs in parallel on AWS Lambda, executing 500 edge-case user journeys in 90 seconds."
      },
      {
        withoutFactory: "Single agent attempts to optimize database queries, gets stuck on the first query for 40 minutes.",
        withFactory: "Swarm dispatches 8 agents across 8 slow queries; winning query plans are benchmarked and merged within 5 minutes."
      }
    ],
    codeArtifact: {
      title: "swarm-orchestrator.ts",
      language: "typescript",
      code: `export interface SwarmConfig {
  task: "Fuzz Test Payment Flow";
  workers: [
    { persona: "AdversarialHacker"; goal: "Find IDOR & parameter tampering"; seed: 101 },
    { persona: "NetworkChaos"; goal: "Simulate 500ms drops and timeout retries"; seed: 202 },
    { persona: "InternationalUser"; goal: "Input RTL text, non-Latin chars & currencies"; seed: 303 }
  ];
  concurrencyLimit: 5;
  isolation: "GIT_WORKTREE";
}

export async function dispatchSwarm(config: SwarmConfig): Promise<UnifiedReport> {
  const workerPromises = config.workers.map(async (worker) => {
    const worktreePath = await createIsolatedWorktree(worker.persona);
    return runWorkerInstance(worker, worktreePath);
  });
  
  const rawResults = await Promise.all(workerPromises);
  return arbiterJudge.synthesizeAndDeduplicate(rawResults);
}`,
      caption: "Orchestrating a parallel swarm with isolated worktrees and an Arbiter Judge node."
    },
    simulatorMeta: {
      title: "Swarm Dispatch & Arbiter Studio",
      objective: "Spin up multi-agent parallel swarms, distribute worktrees, and synthesize deduplicated outcomes.",
      badgeName: "Swarm Commander"
    },
    quiz: [
      {
        id: "q8-1",
        scenario: "You need to fuzz test a newly built checkout flow with multiple personas (e.g. invalid card numbers, network disconnects, rapid double clicks).",
        question: "Why is a parallel agent swarm superior to a single sequential agent?",
        options: [
          "Because single agents always refuse to test payments.",
          "Because parallel swarms trade cheap compute to explore diverse, non-linear edge cases simultaneously in minutes rather than hours.",
          "Because parallel swarms do not consume API tokens.",
          "Because swarms run directly in the user's browser without Node.js."
        ],
        correctIndex: 1,
        explanation: "Parallel swarms explore orthogonal state paths simultaneously. By seeding diverse personas across isolated workers, you compress days of testing into minutes."
      },
      {
        id: "q8-2",
        scenario: "You have 5 high-priority bugs reported across distinct modules of your backend application and want to solve them simultaneously.",
        question: "When dispatching 5 parallel agents to fix these bugs in the same codebase, what is the best practice to prevent merge collisions?",
        options: [
          "Let all 5 agents edit files in the exact same directory on your main branch.",
          "Give each agent an isolated git worktree and partition tasks along clear module boundaries or interface seams.",
          "Run them one by one with a 10-minute pause between each.",
          "Disable git version control during the swarm run."
        ],
        correctIndex: 1,
        explanation: "Git worktrees provide clean filesystem isolation, and partitioning by module boundaries prevents simultaneous conflicting edits to the same files."
      }
    ]
  },
  {
    id: 9,
    slug: "merging-and-operating",
    numberLabel: "09",
    title: "Merging, Maintenance and Operating Production",
    subtitle: "Review is the residual, comprehension gates, auto-merge policies, and production watchers.",
    kicker: "Production Operations",
    mantra: "Review is the residual of what your automated verifiers failed to check.",
    readTime: "16 min read",
    xpReward: 350,
    mentalModel: {
      summary: "In a high-throughput Software Factory, humans cannot review every line of code without becoming the ultimate bottleneck. 'Review is the Residual': human review is strictly reserved for the tiny delta that automated oracles cannot mathematically or empirically verify.",
      keyShift: "From: Humans manually reading every PR diff line-by-line -> To: Comprehension gates, automated auto-merge policies, and 24/7 production watcher agents.",
      pillars: [
        {
          title: "Review is the Residual",
          detail: "If an automated test could have caught it, human review should never have been asked to look at it.",
          iconName: "EyeOff"
        },
        {
          title: "The Comprehension Gate",
          detail: "Agents must produce a concise architectural delta explanation that a human can verify in 30 seconds.",
          iconName: "FileSpreadsheet"
        },
        {
          title: "Production Watchers",
          detail: "Autonomous agents continuously analyze telemetry, error logs, and session replays to spot regressions.",
          iconName: "Activity"
        }
      ]
    },
    deepDive: [
      {
        heading: "Review is the Residual: The Human Role in PRs",
        paragraphs: [
          "If a PR review consists of a human checking: 'Does this match the lint rules? Did you add null checks? Did you write tests?', the team is operating in the pre-factory stone age.",
          "All mechanical, syntactic, stylistic, and functional regression checks belong in automated back-pressure gates. The residual left for human review is strictly: 'Does this change align with our core strategic intent? Does this create an unacceptable business risk?'",
          "When automated gates are green and blast radius is low, PRs qualify for Auto-Merge."
        ],
        proTip: "Institute an Auto-Merge tier: any PR that touches only low-risk modules, includes passing Playwright verifiers, and passes System-1 risk checks merges without human intervention.",
        warning: "Never auto-merge migrations that alter database schemas without an explicit Comprehension Gate approval."
      },
      {
        heading: "Production Watchers & Dogfooding Agents",
        paragraphs: [
          "The factory does not stop at git merge. Production Watchers are autonomous agents hooked into your error reporting (Sentry), session replays (Microsoft Clarity MCP), and performance metrics.",
          "When a regression spikes in production, the Watcher diagnoses the root cause, correlates it with the exact git commit that introduced it, writes a reproduction test, and opens a hotfix PR before users even submit a bug report."
        ],
        proTip: "Connect your production observability tools directly to an agent with read-only MCP access to production logs."
      }
    ],
    comparison: [
      {
        withoutFactory: "Engineers spend 2 hours every morning reviewing a backlog of 15 PRs, slowing down release cadence.",
        withFactory: "80% of routine PRs auto-merge based on green invariant verification; humans spend 5 minutes approving 2 strategic PRs."
      },
      {
        withoutFactory: "A production bug goes unnoticed for 3 days until customer support receives 40 angry emails.",
        withFactory: "A Production Watcher agent detects anomalous 500 error rates within 60 seconds, reproduces the bug in an isolated branch, and drafts a fix."
      }
    ],
    codeArtifact: {
      title: "auto-merge-policy.yml",
      language: "yaml",
      code: `name: Factory Auto-Merge Policy
on:
  pull_request:
    types: [opened, synchronize, status]

jobs:
  evaluate-eligibility:
    runs-on: ubuntu-latest
    steps:
      - name: Evaluate Blast Radius & Invariant Suite
        uses: software-factory/auto-merge-action@v2
        with:
          rules:
            maxLinesChanged: 350
            forbiddenPaths: ["src/core/auth/**", "prisma/schema.prisma", "infra/**"]
            requiredVerifiers: ["typecheck", "unit-tests", "playwright-e2e"]
            systemOneRiskScoreMax: 2.0
            requireComprehensionSummary: true
          actionOnPass: "MERGE_SQUASH"
          actionOnFail: "REQUIRE_HUMAN_GATE"`,
      caption: "Declarative Auto-Merge Policy: PRs meeting strict verification criteria merge autonomously."
    },
    simulatorMeta: {
      title: "The Merge & Production Operations Dashboard",
      objective: "Set up auto-merge thresholds, inspect comprehension summaries, and dispatch production watchers.",
      badgeName: "Operations Director"
    },
    quiz: [
      {
        id: "q9-1",
        scenario: "Your team produces 40 agent-authored pull requests per day. The engineering manager complains that PR review has become an unbearable bottleneck.",
        question: "What is the core Software Factory principle to resolve this bottleneck?",
        options: [
          "Tell the agents to stop writing code.",
          "'Review is the Residual': Move all mechanical, functional, and style verification into automated gates, and implement auto-merge for low-blast-radius PRs.",
          "Hire 10 more human reviewers.",
          "Merge everything directly to main without tests."
        ],
        correctIndex: 1,
        explanation: "Human review should only be the residual of what machines cannot verify. Automating verification and auto-merging verified low-risk PRs eliminates the human review bottleneck."
      },
      {
        id: "q9-2",
        scenario: "An autonomous agent has been granted read-only telemetry access to production Sentry alerts and runtime metrics.",
        question: "What is the primary responsibility of a Production Watcher agent in the Software Factory?",
        options: [
          "To post motivational quotes in Slack.",
          "To monitor production telemetry (Sentry, logs, session replays), diagnose anomalies, and autonomously formulate reproduction tests and draft hotfixes.",
          "To restart the server whenever memory usage reaches 99%.",
          "To bill customers' credit cards."
        ],
        correctIndex: 1,
        explanation: "Production Watchers proactively watch production runtime behavior, autonomously diagnosing regressions and writing reproduction tests before human escalation."
      }
    ]
  },
  {
    id: 10,
    slug: "the-software-factory",
    numberLabel: "10",
    title: "The Software Factory: Governance and Self-Improvement",
    subtitle: "Producers & consumers, earned autonomy, scorers, dreaming loops, and system-wide improvement.",
    kicker: "The Master Architecture",
    mantra: "Fix the system once, and every app built by the factory gets the fix forever.",
    readTime: "20 min read",
    xpReward: 500,
    mentalModel: {
      summary: "The ultimate destination: a self-governing, self-improving Software Factory. Agents operate as specialized Producers and Consumers regulated by Pickup and Merge Gates. The system continuously evaluates its own performance, mines past sessions ('Dreaming'), and updates its own tools and invariants.",
      keyShift: "From: Ad-hoc agent usage on isolated projects -> To: An institutional Software Factory where every solved failure permanently strengthens the shared synthesis engine.",
      pillars: [
        {
          title: "Earned Autonomy",
          detail: "Agents earn expanded permissions (e.g. direct deployment) by maintaining high historical verification scores.",
          iconName: "Award"
        },
        {
          title: "Dreaming (Session Mining)",
          detail: "Offline background loops analyze completed tasks to extract new skills, invariants, and failure patterns.",
          iconName: "Moon"
        },
        {
          title: "Fix the System Once",
          detail: "Never fix a recurring bug in application code alone. Fix the lint rule, the invariant spec, or the verifier harness.",
          iconName: "Cpu"
        }
      ]
    },
    deepDive: [
      {
        heading: "The Architecture of Earned Autonomy and Scorers",
        paragraphs: [
          "In a mature Software Factory, agents are not granted root privileges on day one. Autonomy is earned through calibrated track records.",
          "Independent Scorer agents continuously evaluate generator performance across thousands of historical runs. Scorers look at: How many iterations did it take to converge? Did the solution introduce regressions within 14 days? Did it attempt sycophantic shortcuts?",
          "Agents with high reliability scores earn larger blast-radius budgets, while lower-scoring configurations are restricted to bounded sandboxes."
        ],
        proTip: "Maintain an internal benchmark leaderboard of agent prompts, models, and verifier harnesses to scientifically track factory productivity.",
        warning: "Never allow verifiers to go stale. Periodically inject synthetic faults (chaos engineering for agents) to confirm your verifiers actually catch bugs."
      },
      {
        heading: "Dreaming: Offline Self-Improvement Loops",
        paragraphs: [
          "Inspired by biological memory consolidation, the Factory runs 'Dreaming' routines during off-peak hours.",
          "The Dreaming agent inspects the telemetry of every failed loop, rejected PR, and human correction from the past week. It extracts common failure signatures and synthesizes new reusable skills, prompt corrections, and invariant tests.",
          "When developers log on Monday morning, the entire factory has upgraded itself: 'Fix the system once, and every project in your company inherits the fix.'"
        ],
        proTip: "Create a `docs/lessons-learned/` directory where the Dreaming loop commits auto-generated architectural regression guards."
      }
    ],
    comparison: [
      {
        withoutFactory: "Developer encounters the same authentication bug in 4 different microservices, fixing each one by hand.",
        withFactory: "Developer fixes the factory's central invariant template once; all 4 microservices converge on the fix autonomously."
      },
      {
        withoutFactory: "No visibility into whether agent prompting is getting better or worse over time.",
        withFactory: "Scorer telemetry tracks convergence rates, iteration counts, and cost-per-feature across weekly cohort cycles."
      }
    ],
    codeArtifact: {
      title: "dreaming-supervisor-loop.ts",
      language: "typescript",
      code: `export async function runNightlyDreamingCycle(): Promise<DreamReport> {
  console.log("[Dreaming] Mining past 24 hours of factory task telemetry...");
  
  // 1. Collect all loops that required > 5 iterations or human escalation
  const anomalousTasks = await telemetryDb.getAnomalousTasks({ sinceHours: 24 });
  
  const learnedInsights = [];
  for (const task of anomalousTasks) {
    const analysis = await rootCauseAnalyzer.diagnose({
      prompt: task.prompt,
      traceLogs: task.traceLogs,
      finalDiff: task.finalDiff
    });
    
    if (analysis.isRecurringFailurePattern) {
      // 2. Synthesize new permanent architectural invariant
      const newInvariant = await invariantSynthesizer.generateRule(analysis);
      await factoryRepo.commitInvariant("docs/invariants/auto-learned.md", newInvariant);
      learnedInsights.push(newInvariant.title);
    }
  }
  
  return {
    status: "DREAM_CYCLE_COMPLETE",
    newInvariantsSynthesized: learnedInsights.length,
    summary: learnedInsights
  };
}`,
      caption: "The Dreaming Loop: Mining past failures to synthesize permanent architectural invariants."
    },
    simulatorMeta: {
      title: "The Master Software Factory Console",
      objective: "Govern multi-agent production pipelines, configure earned autonomy tiers, and trigger dreaming loops.",
      badgeName: "Software Factory Architect"
    },
    quiz: [
      {
        id: "q10-1",
        scenario: "A developer notices that agents frequently forget to sanitize user inputs in API route handlers across three different repositories.",
        question: "What is the Software Factory response to this problem?",
        options: [
          "Manually edit all 3 repositories and say nothing.",
          "Fix the system once: Add a strict System-1 input sanitization gate and an invariant lint rule to the shared factory harness, permanently preventing the bug everywhere.",
          "Ban agents from writing API handlers.",
          "Send an email reminding developers to prompt more carefully."
        ],
        correctIndex: 1,
        explanation: "'Fix the system once, every app gets the fix.' Rather than fixing code symptoms, improve the factory's automated invariants and gates so no agent can ever make that mistake again."
      },
      {
        id: "q10-2",
        scenario: "Every night at 2:00 AM, the factory orchestrator spins up a background agent to analyze task logs and failures from the preceding 24 hours.",
        question: "What is the purpose of this 'Dreaming' routine in an autonomous software factory?",
        options: [
          "To generate artistic AI images while servers are idle.",
          "To analyze historical telemetry, failed loops, and developer interventions, extracting new reusable invariants and skills for future tasks.",
          "To put all database instances into sleep mode to save electricity.",
          "To automatically delete old git branches."
        ],
        correctIndex: 1,
        explanation: "Dreaming loops mine telemetry from past task executions to identify failure patterns, synthesize new invariants, and improve the factory's collective intelligence over time."
      }
    ]
  }
];

export const FACTORY_BLUEPRINT_ITEMS: BlueprintChecklistItem[] = [
  {
    id: "bp-1",
    category: "Codebase Design",
    title: "Enforce the One-Pattern Rule for State & Validation",
    description: "Standardize on exactly one validation library (e.g. Zod) and one state management mechanism. Remove all conflicting legacy alternatives to eliminate agent confusion.",
    artifactToCreate: "docs/invariants/one-pattern-manifesto.md"
  },
  {
    id: "bp-2",
    category: "Codebase Design",
    title: "Colocate Deep Modules with Single-Turn Context",
    description: "Refactor shallow multi-directory layouts into deep vertical slice modules where schemas, queries, handlers, and tests live in a single unified directory.",
    artifactToCreate: "src/modules/<feature>/[route.ts, schema.ts, route.test.ts]"
  },
  {
    id: "bp-3",
    category: "Codebase Design",
    title: "Establish the Invariant Context Layer",
    description: "Create a machine-readable directory containing declarative architecture invariants, data contracts, and non-negotiable security boundaries.",
    artifactToCreate: "docs/invariants/architecture.md"
  },
  {
    id: "bp-4",
    category: "Verification Loops",
    title: "Automate Ephemeral Database Testcontainers",
    description: "Configure real database integration tests that spin up fresh SQLite or Docker Postgres instances rather than relying on brittle mocked functions.",
    artifactToCreate: "tests/helpers/ephemeral-db-harness.ts"
  },
  {
    id: "bp-5",
    category: "Verification Loops",
    title: "Implement Adversarial Red-Green-Refactor Verifiers",
    description: "Isolate the Verifier agent from the Generator agent. Force verifiers to write failing Playwright or unit tests before code generation begins.",
    artifactToCreate: "scripts/adversarial-verifier-runner.ts"
  },
  {
    id: "bp-6",
    category: "Verification Loops",
    title: "Deterministic Back-Pressure Test Runner",
    description: "Build an automated CLI wrapper that runs typechecks, linters, and unit tests, feeding structured JSON diagnostics directly back to the agent loop.",
    artifactToCreate: "scripts/run-back-pressure.ts"
  },
  {
    id: "bp-7",
    category: "System-1 & Swarms",
    title: "Inline System-1 Diff Risk Evaluator",
    description: "Deploy a sub-second, cheap evaluation model (e.g. Gemini Flash / Claude Haiku) as a git pre-write gate to intercept deleted tests and hardcoded credentials.",
    artifactToCreate: "scripts/system1-gate.ts"
  },
  {
    id: "bp-8",
    category: "System-1 & Swarms",
    title: "Isolated Git Worktree Swarm Orchestrator",
    description: "Create a script that spawns multiple worker agents simultaneously in isolated git worktrees with distinct personas (Fuzzer, Novice, Attacker).",
    artifactToCreate: "scripts/dispatch-swarm.sh"
  },
  {
    id: "bp-9",
    category: "System-1 & Swarms",
    title: "Arbiter Result Deduplication Node",
    description: "Implement a synthesis judge that takes raw reports from parallel swarm agents, eliminates duplicates, and ranks unique reproduction cases.",
    artifactToCreate: "scripts/arbiter-synthesizer.ts"
  },
  {
    id: "bp-10",
    category: "Gates & Production Watchers",
    title: "Declarative Auto-Merge Policy Engine",
    description: "Define CI workflow rules that automatically merge low-blast-radius PRs whose automated invariant verifiers and System-1 gates are 100% green.",
    artifactToCreate: ".github/workflows/factory-auto-merge.yml"
  },
  {
    id: "bp-11",
    category: "Gates & Production Watchers",
    title: "30-Second Human Comprehension Gate",
    description: "Enforce that every PR includes an agent-generated architectural impact delta and risk summary that a human can evaluate in 30 seconds or less.",
    artifactToCreate: ".github/PULL_REQUEST_TEMPLATE/factory-pr-template.md"
  },
  {
    id: "bp-12",
    category: "Gates & Production Watchers",
    title: "Autonomous 24/7 Production Watcher",
    description: "Deploy an agent connected to production error telemetry that autonomously identifies anomalies, generates reproduction tests, and drafts fixes.",
    artifactToCreate: "services/production-watcher/watcher-daemon.ts"
  }
];
