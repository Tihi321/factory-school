import type { SyllabusModule } from '../types/curriculum';

export const SYLLABUS_MODULES: SyllabusModule[] = [
  {
    id: "module-0",
    title: "Before Day 1",
    subtitle: "Foundations, Mindsets, and Agent-Ergonomic Environments",
    badge: "Prerequisites",
    chapters: [
      {
        id: "m0-c1",
        title: "Getting Started",
        description: "Set up your agent environment, understand headless execution, and transition your mental model from interactive chat to synthesis engines.",
        lessons: [
          {
            id: "m0-l1",
            title: "Course Prerequisites & Setup",
            durationMinutes: 20,
            summary: "Configure your local terminal, Git worktree workflow, Node.js toolchains, and API keys for both frontier reasoning models and sub-second System-1 models.",
            keyTakeaway: "A pristine, reproducible local environment with strict command-line verifiers is the bedrock upon which all autonomous agent loops depend.",
            practicePrompt: "Verify your environment by running a headless CLI prompt that checks Node.js version, TypeScript compilation, and git status without human intervention."
          },
          {
            id: "m0-l2",
            title: "Thinking in Factories vs Prompts",
            durationMinutes: 25,
            summary: "Explore the core dichotomy: Interactive prompting treats AI as a faster typewriter; Software Factory engineering treats AI as an autonomous compiler directed by invariants.",
            keyTakeaway: "Stop asking 'What prompt will make Claude write this app?' and start asking 'What verification harness will reject the app until it is correct?'",
            practicePrompt: "Write down the last 3 bugs you fixed with AI. For each, describe the automated test that could have caught it before you had to look at it."
          },
          {
            id: "m0-l3",
            title: "Your First Headless Agent Loop",
            durationMinutes: 30,
            summary: "Run a simple terminal-based loop where an agent attempts a failing TypeScript exercise and iteratively reads compiler output until zero errors remain.",
            keyTakeaway: "Autonomous convergence happens when the agent's action loop is directly coupled to deterministic compiler back-pressure.",
            practicePrompt: "Execute a headless loop on an intentional type error in a scratch file. Observe how feeding stderr back to the model resolves the issue without human intervention."
          }
        ]
      },
      {
        id: "m0-c2",
        title: "Important SWE Ideas",
        description: "Revisiting foundational software engineering principles that take on 10x importance when collaborating with AI agents.",
        lessons: [
          {
            id: "m0-l4",
            title: "Deep vs Shallow Modules (Ousterhout's Philosophy)",
            durationMinutes: 30,
            summary: "John Ousterhout's definition of deep modules: small, simple interfaces that conceal deep, powerful implementations. Learn why shallow 5-line wrappers cripple agent context windows.",
            keyTakeaway: "Deep modules maximize the signal-to-noise ratio of every token an agent consumes from your codebase.",
            practicePrompt: "Identify a shallow layer in your current codebase (e.g., an unnecessary service that only forwards calls to a repository) and refactor it into a deep module."
          },
          {
            id: "m0-l5",
            title: "Leaky Abstractions in Generated Code",
            durationMinutes: 25,
            summary: "AI agents frequently introduce leaky abstractions when trying to reconcile mismatched APIs. Learn how to identify and seal these leaks before they contaminate architecture.",
            keyTakeaway: "An abstraction is leaky if the caller must understand its internal plumbing to use it safely. Agents amplify leaks across subsequent iterations.",
            practicePrompt: "Inspect an agent-generated API client. Identify whether HTTP status codes or vendor-specific exceptions leak past the boundary into domain code."
          },
          {
            id: "m0-l6",
            title: "Invariants and Pre/Post-Conditions",
            durationMinutes: 35,
            summary: "How Bertrand Meyer's Design by Contract provides the exact theoretical framework needed for autonomous agent verification.",
            keyTakeaway: "Invariants are state assertions that must hold true at every boundary. If you cannot state the invariant in code, an agent cannot reliably build it.",
            practicePrompt: "Write a 5-clause invariant specification for a shopping cart checkout operation, covering stock deduction, payment auth, and order status transitions."
          }
        ]
      },
      {
        id: "m0-c3",
        title: "Agent-First Codebases",
        description: "Designing repository layouts, naming conventions, and documentation specifically optimized for autonomous agent navigation.",
        lessons: [
          {
            id: "m0-l7",
            title: "The One-Pattern Rule",
            durationMinutes: 30,
            summary: "Why having multiple competing idioms for database queries or form handling in the same codebase causes catastrophic hallucination loops in agents.",
            keyTakeaway: "One repo, one pattern. Standardize ruthlessly on a single idiom for routing, validation, database access, and error handling.",
            practicePrompt: "Audit your codebase for pattern fragmentation: count how many different HTTP request libraries or form validation methods are currently coexisting."
          },
          {
            id: "m0-l8",
            title: "Directory Topologies Agents Excel At",
            durationMinutes: 25,
            summary: "Compare horizontal layer topologies (controllers/, services/, models/) against vertical domain slice topologies (modules/billing/, modules/auth/).",
            keyTakeaway: "Vertical feature slices colocate related code, schemas, and tests, allowing an agent to grasp the entire operational context in a single directory read.",
            practicePrompt: "Restructure a horizontal multi-folder feature into a single vertical slice folder with colocated route, schema, query, and test files."
          },
          {
            id: "m0-l9",
            title: "Deleting Dead READMEs & Tribal Knowledge",
            durationMinutes: 20,
            summary: "Outdated documentation is poison for agents. Learn why deleting dead docs and establishing an automated Invariant Layer beats keeping stale READMEs.",
            keyTakeaway: "If documentation cannot be verified by an automated linter or test runner, treat it as liability and candidate for deletion.",
            practicePrompt: "Scan your repository's README.md: delete any dead setup command or out-of-date Docker flag that fails when executed in an empty shell."
          }
        ]
      },
      {
        id: "m0-c4",
        title: "Techniques for Agents",
        description: "Mastering the mechanical prompting, structured schema output, and protocol techniques required for resilient agent interaction.",
        lessons: [
          {
            id: "m0-l10",
            title: "Stop Giving Claude Examples",
            durationMinutes: 30,
            summary: "Few-shot examples cause agents to anchor on accidental legacy complexity. Learn how to specify behavioral invariants and boundaries instead.",
            keyTakeaway: "Give rules and invariants, not past code examples. Examples transmit historical tech debt into fresh implementations.",
            practicePrompt: "Take a prompt where you previously pasted 80 lines of an example component. Rewrite it using 5 declarative rules and a strict JSON/Zod schema."
          },
          {
            id: "m0-l11",
            title: "Prompting with Typed JSON Schemas",
            durationMinutes: 25,
            summary: "Using Zod, TypeBox, or JSON Schema to enforce strictly typed outputs from LLMs, eliminating parsing errors and non-deterministic text responses.",
            keyTakeaway: "Typed schema responses turn probabilistic LLM token streams into reliable, strongly typed inputs for downstream execution scripts.",
            practicePrompt: "Build a Zod schema for a code review report (riskScore, violations array, allowMerge boolean) and invoke generateObject to verify type safety."
          },
          {
            id: "m0-l12",
            title: "Model Context Protocol (MCP) Foundations",
            durationMinutes: 35,
            summary: "An introduction to Anthropic's Model Context Protocol (MCP): connecting agents directly to databases, browsers, file systems, and production APIs.",
            keyTakeaway: "MCP bridges the LLM's reasoning engine to physical, deterministic tools and runtime state.",
            practicePrompt: "Configure an MCP SQLite server in your editor and have an agent execute queries directly against a local database to verify table structures."
          }
        ]
      },
      {
        id: "m0-c5",
        title: "Creating Slack Agents",
        description: "Build asynchronous conversational agents that live inside team chat, turning Slack into an intake and notification hub.",
        lessons: [
          {
            id: "m0-l13",
            title: "Building Socket Mode Slack Bots",
            durationMinutes: 35,
            summary: "Set up a Node.js/TypeScript Slack bot using Bolt and Socket Mode, avoiding public webhook URL requirements for local development.",
            keyTakeaway: "Socket Mode enables secure, firewall-friendly two-way communication between Slack and your local or cloud factory workers.",
            practicePrompt: "Spin up a basic Slack Bolt bot that listens for a mention and replies with the current git status of a local repository."
          },
          {
            id: "m0-l14",
            title: "Designing Conversational Intake Triggers",
            durationMinutes: 30,
            summary: "How to parse incoming Slack messages, extract intent, and format interactive modal intake forms for structured scoping.",
            keyTakeaway: "Never let Slack prompts trigger blind code execution; route them into an intake modal that captures blast radius and invariants.",
            practicePrompt: "Create a Slack slash command (/factory-task) that opens a modal requesting task title, target repo, and invariant criteria."
          },
          {
            id: "m0-l15",
            title: "Agent Event Loop Architecture",
            durationMinutes: 35,
            summary: "Decouple Slack's 3-second HTTP response deadline from long-running agent execution tasks using event queues (e.g. BullMQ or Inngest).",
            keyTakeaway: "Always acknowledge Slack events immediately within 3000ms, then delegate actual loop work to background task workers.",
            practicePrompt: "Implement an asynchronous worker queue that receives a Slack event, acknowledges receipt instantly, and streams progress updates back into the thread."
          }
        ]
      },
      {
        id: "m0-c6",
        title: "Using Slack Agents",
        description: "Operational patterns for steering, inspecting, and collaborating with autonomous agents directly in Slack channels.",
        lessons: [
          {
            id: "m0-l16",
            title: "Dispatched Asynchronous Coding Tasks",
            durationMinutes: 25,
            summary: "Dispatching multi-hour tasks from Slack and receiving rich block-kit milestone updates as the agent iterates through tests.",
            keyTakeaway: "Slack turns into a mission control channel: you dispatch tasks and inspect intermediate test progress without keeping a browser open.",
            practicePrompt: "Dispatch a refactoring task from a Slack thread and configure the worker to post a test progress bar on every loop iteration."
          },
          {
            id: "m0-l17",
            title: "Thread-Bound Context and Status Broadcasts",
            durationMinutes: 25,
            summary: "Keeping all agent tool logs, git diffs, and verification reports contained strictly within Slack threads to maintain channel hygiene.",
            keyTakeaway: "Thread containment prevents channel notification pollution while preserving a permanent audit trail of every agent decision.",
            practicePrompt: "Configure your Slack bot to post top-level notifications only on 'TASK_START' and 'TASK_COMPLETE', reserving all detailed logs for the thread."
          },
          {
            id: "m0-l18",
            title: "Human Gate Approvals in Slack",
            durationMinutes: 30,
            summary: "Placing interactive Slack buttons ('Approve PR', 'Reject & Provide Feedback') at critical blast-radius transition points.",
            keyTakeaway: "Human-in-the-loop governance is frictionless when approval gates meet engineers in the messaging app they already inhabit.",
            practicePrompt: "Create an interactive Slack message with 'Approve Auto-Merge' and 'Request Revision' buttons that unpause a waiting CI pipeline."
          }
        ]
      },
      {
        id: "m0-c7",
        title: "Useful Tools",
        description: "Essential utilities, AST search engines, browser automation drivers, and sandboxing infrastructure for the modern factory engineer.",
        lessons: [
          {
            id: "m0-l19",
            title: "Playwright MCP for Live Browser Control",
            durationMinutes: 35,
            summary: "Enabling agents to launch headless Chromium, navigate local web apps, inspect accessibility trees, and capture snapshot screenshots.",
            keyTakeaway: "Playwright gives agents physical eyes and fingers in the browser, transforming abstract UI assertions into empirical facts.",
            practicePrompt: "Write an MCP tool handler that lets an agent fill out a login form in headless Chromium and assert the presence of an avatar element."
          },
          {
            id: "m0-l20",
            title: "Ast-Grep and Semantic Code Search",
            durationMinutes: 30,
            summary: "Replacing blunt regex search with structural AST queries (ast-grep) to allow agents to find function signatures and call sites across 100,000 lines of code.",
            keyTakeaway: "AST-grep understands syntax trees; it finds all usages of a pattern without false positives from comments or variable renames.",
            practicePrompt: "Run an ast-grep query that finds all asynchronous functions in your repository that lack a try-catch block."
          },
          {
            id: "m0-l21",
            title: "Docker & Ephemeral Environments",
            durationMinutes: 35,
            summary: "Isolating agent file modifications and test runs inside throwaway Docker containers or testcontainers to prevent host system pollution.",
            keyTakeaway: "Autonomous loops must run in disposable environments where destructive failures or database wipes carry zero permanent blast radius.",
            practicePrompt: "Configure a Dockerfile for your test runner and launch an agent task entirely inside a containerized sandbox with a mounted volume."
          }
        ]
      }
    ]
  },
  {
    id: "module-1",
    title: "Week 1",
    subtitle: "From Intake to a Running Loop",
    badge: "The Intake & Loop Engine",
    chapters: [
      {
        id: "m1-c1",
        title: "Alignment",
        description: "Triage inbound tasks, interview the unknowns out before coding, and establish clear architectural boundaries.",
        lessons: [
          {
            id: "m1-l1",
            title: "The Feed, Triage, and The Human Gate",
            durationMinutes: 30,
            summary: "How to organize inbound engineering work into a structured feed and triage tasks by uncertainty and blast radius before touching code.",
            keyTakeaway: "The Human Gate at the intake stage saves 10x the effort of a human review gate at the PR stage.",
            practicePrompt: "Categorize your backlog of 5 upcoming tickets into 'Shed' (direct loop), 'House' (spec required), and 'Skyscraper' (adversarial gates required)."
          },
          {
            id: "m1-l2",
            title: "The Intake Interview: /grill-me Deep Dive",
            durationMinutes: 35,
            summary: "Designing the adversarial intake interview prompt where an agent interrogates the engineer to uncover hidden assumptions and unstated constraints.",
            keyTakeaway: "If the agent doesn't ask you uncomfortable questions about edge cases during intake, it will make those choices for you during synthesis.",
            practicePrompt: "Prompt an agent with a vague 1-line feature request: 'Add rate limiting to our API'. Instruct it: 'Ask me 5 hard multiple-choice questions about trade-offs before writing code.'"
          },
          {
            id: "m1-l3",
            title: "Picking Rungs: From Shed to Skyscraper",
            durationMinutes: 30,
            summary: "A framework for matching agent autonomy to task criticality: Sheds (scripts/internal tooling), Houses (standard features), and Skyscrapers (billing/auth/core DB).",
            keyTakeaway: "Calibrate process to blast radius. Over-specifying a Shed wastes time; under-specifying a Skyscraper causes outages.",
            practicePrompt: "Define the specific checklist of verification gates required for a Skyscraper task in your primary production service."
          },
          {
            id: "m1-l4",
            title: "Glossaries and Domain Vocabulary",
            durationMinutes: 25,
            summary: "Creating concise domain glossaries that define the precise nouns and verbs of your business domain to eliminate semantic confusion in prompts.",
            keyTakeaway: "Domain ambiguity in prompts creates architectural incoherence in code. A 20-word glossary prevents 200 lines of refactoring.",
            practicePrompt: "Write a 1-page domain glossary for your company's core entities (e.g. Workspace vs Organization vs Account) and inject it into your agent system prompt."
          }
        ]
      },
      {
        id: "m1-c2",
        title: "Specifications",
        description: "Transform fuzzy human aspirations into machine-checkable invariant sets with designated automated verifiers.",
        lessons: [
          {
            id: "m1-l5",
            title: "Should You Spec At All? (The Spec Decision Tree)",
            durationMinutes: 25,
            summary: "A pragmatic decision tree to determine when to skip formal specifications entirely and when to invest in exhaustive invariant modeling.",
            keyTakeaway: "Never write a spec for something you can prototype in 5 minutes in a nukable scratch environment.",
            practicePrompt: "Apply the Spec Decision Tree to your current project's open issues: classify which need formal checkable specs and which can be run straight in a loop."
          },
          {
            id: "m1-l6",
            title: "Writing Machine-Checkable Invariants",
            durationMinutes: 35,
            summary: "Constructing invariant matrices where every single requirement is paired with an executable command (test, typecheck, SQL query).",
            keyTakeaway: "If an invariant cannot be checked by an automated shell command, it belongs in product documentation, not in an agent spec.",
            practicePrompt: "Convert a paragraph of prose product requirements into a 4-row Invariant Table with explicit Verifier commands."
          },
          {
            id: "m1-l7",
            title: "Adversarial Spec Review & Edge-Case Mining",
            durationMinutes: 30,
            summary: "Using a dedicated Red-Team agent to stress-test your specification for race conditions, network failures, and boundary anomalies.",
            keyTakeaway: "Fixing a flaw in the spec takes 30 seconds; fixing a flaw in generated architecture takes 3 hours.",
            practicePrompt: "Pass your completed spec to an agent prompted as 'The Malicious SRE' and ask it to find 3 ways this design will fail under peak load."
          },
          {
            id: "m1-l8",
            title: "The Idea-to-Spec Pipeline in Nukable Sandboxes",
            durationMinutes: 35,
            summary: "How to rapidly explore novel third-party APIs by generating throwaway spikes in disposable scratch accounts before locking down the final spec.",
            keyTakeaway: "Ground your specifications in empirical runtime facts discovered during scratch spikes, not in theoretical documentation.",
            practicePrompt: "Run a 15-minute throwaway spike script against an unfamiliar external API to discover its undocumented rate limit headers, then record them in your spec."
          }
        ]
      },
      {
        id: "m1-c3",
        title: "Context Engineering",
        description: "Curating high-density architectural context, structuring repository docs, and maximizing agent signal-to-noise ratio.",
        lessons: [
          {
            id: "m1-l9",
            title: "The Context Layer: docs/invariants/ and ADRs",
            durationMinutes: 30,
            summary: "Setting up a dedicated `docs/invariants/` directory containing unshakeable architectural decisions and operational boundaries for agents.",
            keyTakeaway: "Your context layer is the boundary fence: keep it short, dense, and strictly enforced by automated linters.",
            practicePrompt: "Create a `docs/invariants/architecture.md` file listing the 5 non-negotiable architectural rules of your backend service."
          },
          {
            id: "m1-l10",
            title: "Progressive Disclosure Over Dump-All Context",
            durationMinutes: 30,
            summary: "Why dumping 50,000 tokens of codebase context into an initial prompt degrades reasoning, and how to use progressive disclosure to feed context on demand.",
            keyTakeaway: "Attention degrades with token bloat. Feed agents high-level index maps first; let them request deep file contents only as needed.",
            practicePrompt: "Refactor a bloated prompt script to provide only an index of exported function names, instructing the agent to read file contents selectively."
          },
          {
            id: "m1-l11",
            title: "Signal-to-Noise: Why Grep Beats Long Prompts",
            durationMinutes: 25,
            summary: "Equipping agents with fast ripgrep and ast-grep tools so they can query reality dynamically instead of relying on hallucinated memory.",
            keyTakeaway: "Dynamic search tools in the agent's hands beat static context stuffing in the system prompt every single time.",
            practicePrompt: "Compare an agent answering a question about imports using static context vs letting it run `rg --type ts 'from \"@/core\"'` live."
          }
        ]
      },
      {
        id: "m1-c4",
        title: "Introduction to Loops & Graphs",
        description: "The core mechanics of autonomous loops: state observation, action dispatch, independent verification, and convergence.",
        lessons: [
          {
            id: "m1-l12",
            title: "The Four Primitives of an Autonomous Loop",
            durationMinutes: 30,
            summary: "Deep dive into the 4 primitives: State Observation, Plan/Act Mutation, Verification Pulse, and Convergence Gate.",
            keyTakeaway: "Every autonomous coding engine is an implementation of these four primitives running in a deterministic cycle.",
            practicePrompt: "Map out the four primitives for a task that adds a new database migration and generates TypeScript schema types."
          },
          {
            id: "m1-l13",
            title: "Builder-Verifier Topology",
            durationMinutes: 35,
            summary: "Architecting loops where the Builder agent and the Verifier agent run as isolated nodes with distinct system prompts and tool access.",
            keyTakeaway: "The Builder must be creative and adaptive; the Verifier must be rigid and adversarial. Never combine both into a single agent prompt.",
            practicePrompt: "Write two distinct system prompts: one for a Builder trying to solve a bug, and one for a Verifier trying to write tests that expose the bug."
          },
          {
            id: "m1-l14",
            title: "Setting Up Headless Mode CLI Runners",
            durationMinutes: 30,
            summary: "Creating CLI scripts that execute agent loops in detached background processes, freeing your terminal and attention.",
            keyTakeaway: "If you have to keep your IDE chat open to watch the agent type, you are still operating in typewriter mode.",
            practicePrompt: "Wrap an agent invocation script in a Node.js CLI with `--headless` and `--max-iterations=6` flags."
          }
        ]
      },
      {
        id: "m1-c5",
        title: "Toolbox for Loops",
        description: "Equipping your loops with deterministic back-pressure instruments, live monitoring, and strict budgetary guardrails.",
        lessons: [
          {
            id: "m1-l15",
            title: "Designing Back-Pressure: Typecheck, Lint, and Unit Tests",
            durationMinutes: 35,
            summary: "Structuring back-pressure feedback loops: formatting compiler diagnostics and test assertion failures into actionable context messages.",
            keyTakeaway: "Back-pressure transforms raw failure into guided convergence. Clean error formatting accelerates agent self-correction by 3x.",
            practicePrompt: "Write a TypeScript function that parses `tsc --noEmit` stdout and converts compiler error lines into structured JSON for an agent."
          },
          {
            id: "m1-l16",
            title: "The Monitor Tool: Watching Agents in Real Time",
            durationMinutes: 25,
            summary: "Building live telemetry dashboards and terminal progress bars that stream agent tool calls, file diffs, and verification outcomes.",
            keyTakeaway: "Observability without intervention: observe your factory in real time without interfering with its convergence path.",
            practicePrompt: "Implement a lightweight console logger that displays a live spinner and token consumption counter during an active loop."
          },
          {
            id: "m1-l17",
            title: "Cost and Iteration Guardrails (/loop and /goal)",
            durationMinutes: 25,
            summary: "Implementing strict circuit breakers: maximum token spend, maximum iterations, and dead-loop detection to prevent runaway costs.",
            keyTakeaway: "Always enforce a hard budget. An agent that cannot converge within 8 iterations needs re-alignment, not another 50 iterations.",
            practicePrompt: "Configure a circuit breaker in your loop runner that aborts the task if total token cost exceeds $1.50 or iterations reach 8."
          }
        ]
      },
      {
        id: "m1-c6",
        title: "Loops & Graphs Continued",
        description: "Advanced loop topologies: L4 worker execution, L5 discovery loops, and self-steering autoresearch experiments.",
        lessons: [
          {
            id: "m1-l18",
            title: "L4 Worker Loops vs L5 Discovery Loops",
            durationMinutes: 35,
            summary: "Distinguishing between deterministic implementation loops (L4) and hypothesis-driven research/optimization loops (L5).",
            keyTakeaway: "L4 loops converge toward an existing target; L5 loops explore an unknown fitness landscape to discover superior solutions.",
            practicePrompt: "Design an L5 discovery loop prompt that benchmarks three different SQL indexing strategies on a sample dataset and selects the fastest."
          },
          {
            id: "m1-l19",
            title: "Autoresearch and Self-Steering Experiments",
            durationMinutes: 40,
            summary: "How to configure agents that generate hypotheses, run automated benchmark experiments, record metrics, and discard losing branches.",
            keyTakeaway: "Autoresearch turns your agent into an autonomous lab scientist running controlled code experiments while you sleep.",
            practicePrompt: "Set up a script where an agent modifies a computational algorithm, runs a microbenchmark, and keeps the change only if latency improves."
          },
          {
            id: "m1-l20",
            title: "Handling Deadlocks and Agent Stalls",
            durationMinutes: 30,
            summary: "Detecting when an agent is repeating the exact same failed edit or circling in a reasoning loop, and deploying automated escape strategies.",
            keyTakeaway: "Detect repetition cycles by hashing git diffs across iterations. If diff hash repeats, force a strategy pivot or escalate to human.",
            practicePrompt: "Write a loop guard that calculates SHA-256 hashes of recent diffs and terminates the loop if the same diff is attempted twice."
          }
        ]
      }
    ]
  },
  {
    id: "module-2",
    title: "Week 2",
    subtitle: "From Verification to the Software Factory",
    badge: "The Factory & Operations",
    chapters: [
      {
        id: "m2-c1",
        title: "Implementing",
        description: "Autonomous code implementation strategies, test-driven subagent workflows, and blast-radius management.",
        lessons: [
          {
            id: "m2-l1",
            title: "Red-Green-Refactor with Subagents",
            durationMinutes: 35,
            summary: "Deploying a Verifier subagent to write a failing test (RED), a Generator subagent to make it pass (GREEN), and a Refactor subagent to polish (REFACTOR).",
            keyTakeaway: "TDD was made for agents. The RED phase proves the test is capable of failing; the GREEN phase proves the agent solved the requirement.",
            practicePrompt: "Orchestrate a 3-agent TDD sequence to implement a Luhn algorithm credit card validator without human intervention."
          },
          {
            id: "m2-l2",
            title: "Writing Code Behind Feature Flags",
            durationMinutes: 25,
            summary: "Ensuring all agent-generated features are wrapped in runtime feature flags to decouple deployment from operational release.",
            keyTakeaway: "Feature flags reduce the blast radius of autonomous merges to zero until traffic is intentionally routed.",
            practicePrompt: "Prompt an agent to wrap a new payment route in an environment feature flag with an automated fallback to the legacy handler."
          },
          {
            id: "m2-l3",
            title: "Blast Radius Management and Blast-Radius Proportional Verification",
            durationMinutes: 30,
            summary: "Calibrating verification rigour according to the blast radius of the modified files (UI style tweaks vs database transaction logic).",
            keyTakeaway: "Do not run 45 minutes of load tests for a button color change; do not settle for a lint check on a database migration.",
            practicePrompt: "Write a classification function that maps modified file paths to verification profiles: 'LOW_RISK', 'MEDIUM_RISK', 'CRITICAL_RISK'."
          }
        ]
      },
      {
        id: "m2-c2",
        title: "Understanding Output",
        description: "Evaluating agent diffs, running sub-second System-1 pre-flight checks, and generating 30-second human comprehension gates.",
        lessons: [
          {
            id: "m2-l4",
            title: "Semantic Git Diffs and Risk Profiling",
            durationMinutes: 30,
            summary: "Analyzing git diffs structurally: counting added/removed lines, tracking deleted assertions, and identifying dangerous AST modifications.",
            keyTakeaway: "A diff that deletes 40 lines of test assertions is a critical red flag, regardless of what the agent claims in its summary.",
            practicePrompt: "Run a git diff analysis script that flags any PR where the ratio of test changes to application code changes is below 0.5."
          },
          {
            id: "m2-l5",
            title: "System-1 Pre-Flight Gate Models",
            durationMinutes: 35,
            summary: "Placing ultra-fast, cheap models (Gemini Flash, Claude Haiku) as pre-write interceptors on every tool call and git commit.",
            keyTakeaway: "Sub-second System-1 models catch 90% of careless regressions for pennies, keeping frontier models focused on hard problems.",
            practicePrompt: "Implement an MCP pre-tool-call hook that evaluates whether a proposed `write_file` call overwrites a protected invariant document."
          },
          {
            id: "m2-l6",
            title: "Generating 30-Second Human Comprehension Summaries",
            durationMinutes: 25,
            summary: "Prompting agents to generate high-signal, bulleted architectural delta summaries that allow a human lead to comprehend a 400-line PR in 30 seconds.",
            keyTakeaway: "The comprehension summary is the bridge between autonomous synthesis and human strategic oversight.",
            practicePrompt: "Prompt an agent to inspect its own git diff and produce a 3-bullet summary: 'Architectural Decisions Made', 'Invariants Verified', 'Residual Risks'."
          }
        ]
      },
      {
        id: "m2-c3",
        title: "Verification",
        description: "The core verification apparatus: adversarial test generation, real-world runtime oracles, and property-based fuzzing.",
        lessons: [
          {
            id: "m2-l7",
            title: "Why the Generator Must Never Grade Itself",
            durationMinutes: 30,
            summary: "The cognitive trap of LLM sycophancy. Why asking an agent 'Is your code correct?' produces cheerful hallucinations, and how to mandate independent oracles.",
            keyTakeaway: "Self-grading is an illusion. The generator is an untrusted builder; verification must come from independent deterministic checks.",
            practicePrompt: "Take a flawed function, ask the generating model if it has bugs (observe sycophancy), then run an independent adversarial test agent against it."
          },
          {
            id: "m2-l8",
            title: "Real Verifiers Touch Reality: Ephemeral DBs and Browser DOM",
            durationMinutes: 40,
            summary: "Connecting verifiers to live, deterministic reality: headless Playwright browsers, real SQLite/Postgres instances, and network sockets.",
            keyTakeaway: "Mocks lie; reality doesn't. If your test passes because of a mocked database response, you have tested your mock, not your system.",
            practicePrompt: "Replace a mocked database unit test with an integration test running against an ephemeral SQLite database in memory."
          },
          {
            id: "m2-l9",
            title: "Property-Based Testing for AI-Generated Edge Cases",
            durationMinutes: 35,
            summary: "Using fast-check or Hypothesis to generate 1,000 synthetic boundary inputs per second to uncover edge-case failures in agent-written functions.",
            keyTakeaway: "Property tests explore combinatorial state spaces that neither human engineers nor LLM prompts ever think to check.",
            practicePrompt: "Write a fast-check property test for an agent-generated JSON parser, asserting that `parse(serialize(x))` always deeply equals `x`."
          },
          {
            id: "m2-l10",
            title: "Sycophantic Attacker Suites",
            durationMinutes: 35,
            summary: "Building automated test suites designed specifically to catch LLMs 'cheating'—e.g. hardcoding answers, mocking away failing assertions, or deleting tests.",
            keyTakeaway: "Test your tests. Sycophantic attacker suites ensure that your verifiers cannot be bypassed by clever agent shortcuts.",
            practicePrompt: "Write a CI assertion that fails if any PR reduces total test count or modifies any file under `tests/invariants/`."
          }
        ]
      },
      {
        id: "m2-c4",
        title: "Merging",
        description: "Transforming PR reviews from line-by-line proofreading into automated auto-merge policies and seam partitioning.",
        lessons: [
          {
            id: "m2-l11",
            title: "Review is the Residual: The New PR Standard",
            durationMinutes: 30,
            summary: "The philosophical reallocation of human time: if a machine could have verified it, a human should never review it.",
            keyTakeaway: "Human review is the residual. Your attention is reserved exclusively for strategy, business alignment, and system architecture.",
            practicePrompt: "Review a recent PR from your team: highlight every comment that could have been made by an automated linter or invariant check."
          },
          {
            id: "m2-l12",
            title: "Automated Auto-Merge Policies for Low-Risk Diffs",
            durationMinutes: 30,
            summary: "Implementing GitHub Actions or GitLab CI rules that merge low-blast-radius PRs automatically when all invariant verifiers pass.",
            keyTakeaway: "Auto-merge unlocks 10x delivery cadence by removing the human scheduling bottleneck from routine, low-risk engineering tasks.",
            practicePrompt: "Draft a GitHub Actions auto-merge workflow configuration that triggers on PRs with < 200 lines changed and 100% green tests."
          },
          {
            id: "m2-l13",
            title: "Seam Partitioning to Eliminate Merge Conflicts",
            durationMinutes: 35,
            summary: "Techniques for partitioning parallel agent tasks across module seams and interface boundaries so multiple agents can merge without collisions.",
            keyTakeaway: "Partition by interface seams. When contracts are defined before work begins, parallel branches merge cleanly without conflict.",
            practicePrompt: "Split a full-stack feature task into two independent PR specifications (API Contract vs Frontend Consumer) that can merge in any order."
          }
        ]
      },
      {
        id: "m2-c5",
        title: "Maintenance",
        description: "Continuous codebase health: automated dependency sweepers, instrumenting before deleting, and managing technical debt.",
        lessons: [
          {
            id: "m2-l14",
            title: "Codebase Entropy and Continuous Sweepers",
            durationMinutes: 30,
            summary: "Running recurring background agent crons that sweep for dead code, unused dependencies, and formatting deviations.",
            keyTakeaway: "Prevent entropy continuously with tiny background sweeper agents rather than massive annual refactoring marathons.",
            practicePrompt: "Write a sweeper agent script that runs `knip` or `ts-prune`, verifies dead exports, and opens a targeted cleanup PR."
          },
          {
            id: "m2-l15",
            title: "Instrument Before You Delete",
            durationMinutes: 25,
            summary: "The golden rule of refactoring: never delete a legacy codepath until an agent has added runtime telemetry proving zero production traffic for 14 days.",
            keyTakeaway: "Telemetry precedes deletion. Instrument, observe, prove zero traffic, then let an agent delete the dead code safely.",
            practicePrompt: "Prompt an agent to add a lightweight telemetry counter to a suspected dead endpoint before scheduling its deprecation."
          },
          {
            id: "m2-l16",
            title: "Safe Deprecation Cycles with Agent Assistance",
            durationMinutes: 30,
            summary: "Using agents to systematically migrate callers from deprecated APIs to modern replacements across dozens of internal repositories.",
            keyTakeaway: "Agents make large-scale API migrations painless by handling the mechanical search-and-replace across hundreds of call sites.",
            practicePrompt: "Deploy an agent to migrate 5 deprecated function calls in a test project to a new signature, verifying all tests remain green."
          }
        ]
      },
      {
        id: "m2-c6",
        title: "Operate",
        description: "Connecting autonomous agents directly to production telemetry, error monitoring, and automated incident response.",
        lessons: [
          {
            id: "m2-l17",
            title: "24/7 Production Watcher Agents",
            durationMinutes: 35,
            summary: "Deploying background agent daemons that ingest real-time error logs and telemetry, detecting regressions before customers notice.",
            keyTakeaway: "Production watchers close the loop between runtime reality and development synthesis, acting as automated first responders.",
            practicePrompt: "Configure a webhook receiver that forwards Sentry error alerts to an agent runner with reproduction instructions."
          },
          {
            id: "m2-l18",
            title: "Telemetry Integration: Sentry & Microsoft Clarity MCP",
            durationMinutes: 35,
            summary: "Giving agents direct read access to production session replays and stack traces via Model Context Protocol tools.",
            keyTakeaway: "When an agent can inspect the exact browser session replay where a user experienced a bug, root-cause diagnosis takes seconds.",
            practicePrompt: "Simulate an MCP tool response containing a production stack trace and prompt an agent to locate the offending line in your repository."
          },
          {
            id: "m2-l19",
            title: "Autonomous Root Cause Analysis and Hotfix PRs",
            durationMinutes: 40,
            summary: "The full operational pipeline: error alert -> agent reproduction test -> isolated branch fix -> green verification -> draft hotfix PR.",
            keyTakeaway: "The fastest incident recovery is automated: an agent reproduces the bug in a new test and proves the fix with green back-pressure.",
            practicePrompt: "Provide an agent with a failing production error log and challenge it to write a failing regression test before writing the bug fix."
          }
        ]
      },
      {
        id: "m2-c7",
        title: "Governance",
        description: "Scorers, earned autonomy tiers, preventing verifier decay, and building institutional trust in autonomous systems.",
        lessons: [
          {
            id: "m2-l20",
            title: "Earned Autonomy: Calibrated Trust Levels",
            durationMinutes: 30,
            summary: "Structuring multi-tier permission models where agents graduate from read-only sandboxes to auto-merge privileges based on historical accuracy.",
            keyTakeaway: "Autonomy is not all-or-nothing. Grant permissions proportionally to verified historical track record.",
            practicePrompt: "Define an Earned Autonomy rubric with 3 tiers: Tier 1 (Sandbox), Tier 2 (PR Draft), Tier 3 (Auto-Merge Eligible)."
          },
          {
            id: "m2-l21",
            title: "Scorer Agents: Grading the Generators",
            durationMinutes: 35,
            summary: "Deploying meta-evaluator agents that audit generator performance across time: tracking iteration efficiency, token cost, and regression rates.",
            keyTakeaway: "Scorers keep your factory accountable, providing objective quantitative metrics on which prompt and model variants perform best.",
            practicePrompt: "Build a simple Scorer prompt that takes a completed task log and outputs a score from 1-100 on code cleanliness and invariant adherence."
          },
          {
            id: "m2-l22",
            title: "Detecting Verifier Rot and Chaos Testing the Tests",
            durationMinutes: 30,
            summary: "Injecting intentional faults into your codebase (mutation testing) to prove that your automated verifiers actually catch bugs.",
            keyTakeaway: "A verifier that never fails is suspicious. Regularly test your verification suite with synthetic bugs to prove it catches regressions.",
            practicePrompt: "Introduce a deliberate inversion of an if-statement in your core service and verify that your test suite catches it."
          }
        ]
      },
      {
        id: "m2-c8",
        title: "The Software Factory",
        description: "The holistic synthesis engine: Producer/Consumer architecture, the self-improvement loop, and offline dreaming.",
        lessons: [
          {
            id: "m2-l23",
            title: "Producers and Consumers Architecture",
            durationMinutes: 35,
            summary: "Structuring an entire engineering organization around Producer agents (generating feature proposals and code) and Consumer agents (verifying, testing, deploying).",
            keyTakeaway: "Separating producers from consumers creates an internal market of ideas governed by strict verification currency.",
            practicePrompt: "Diagram the flow of a feature request through your team's Producer and Consumer agent nodes from idea to production."
          },
          {
            id: "m2-l24",
            title: "Pickup Gates and Merge Gates",
            durationMinutes: 30,
            summary: "The two essential governance membranes: Pickup Gate (is this task well-specified enough to start?) and Merge Gate (did it prove all invariants?).",
            keyTakeaway: "Strong gates at both ends allow maximum autonomous freedom in the middle.",
            practicePrompt: "Write a pre-commit pickup check that verifies whether an issue description has an Invariant Table before assigning it to an agent worker."
          },
          {
            id: "m2-l25",
            title: "The Self-Improvement Loop: Fix the System Once",
            durationMinutes: 35,
            summary: "The core motto of the Factory Engineer: when an agent makes a mistake, never just fix the code. Fix the invariant harness, prompt rubric, or lint gate forever.",
            keyTakeaway: "Fixing application code solves one bug; fixing the factory solves that bug across every current and future project.",
            practicePrompt: "Identify a mistake an agent made today. Write an ESLint rule or invariant check that prevents any agent from ever making it again."
          },
          {
            id: "m2-l26",
            title: "Dreaming: Offline Session Mining and Invariant Synthesis",
            durationMinutes: 40,
            summary: "Running nightly offline routines that analyze all completed loops, extract recurring failure patterns, and synthesize new permanent skills.",
            keyTakeaway: "Dreaming turns the factory into a learning organism that wakes up smarter every morning.",
            practicePrompt: "Write a script that reads 5 past conversation logs and summarizes the top 3 friction points where the agent needed human guidance."
          }
        ]
      },
      {
        id: "m2-c9",
        title: "Proactive Agents",
        description: "Moving from reactive request-driven agents to proactive agents that autonomously discover work, optimize, and pre-empt issues.",
        lessons: [
          {
            id: "m2-l27",
            title: "Background Crons and Routine Sweepers",
            durationMinutes: 30,
            summary: "Configuring scheduled agent crons that run during low-traffic windows to audit security advisories, benchmark query times, and format code.",
            keyTakeaway: "Proactive agents work while you sleep, ensuring the codebase is cleaner in the morning than you left it in the evening.",
            practicePrompt: "Set up a GitHub Actions cron job that runs once a night to audit dependencies for security vulnerabilities and draft update PRs."
          },
          {
            id: "m2-l28",
            title: "Autonomous Dependency Upgrades with Proof of Green",
            durationMinutes: 35,
            summary: "Beyond Dependabot: agents that bump library versions, fix breaking API changes in your code, run the full test suite, and present a proven PR.",
            keyTakeaway: "Do not just notify humans of updates; let agents perform the upgrade refactor and prove compatibility before pinging you.",
            practicePrompt: "Prompt an agent to bump a minor dependency version, inspect breaking changes in the changelog, and update call sites until tests pass."
          },
          {
            id: "m2-l29",
            title: "Pre-Mortem Generators for Architectural RFCs",
            durationMinutes: 35,
            summary: "Using agents to conduct automated pre-mortems on engineering proposals: simulating worst-case scenarios, load spikes, and partial outages.",
            keyTakeaway: "A pre-mortem agent challenges your architectural optimism before a single dollar is spent on implementation.",
            practicePrompt: "Submit an architectural proposal to an agent with the prompt: 'Assume this system catastrophically failed in production 6 months from now. Write the post-mortem.'"
          }
        ]
      }
    ]
  },
  {
    id: "module-3",
    title: "Bonus Content",
    subtitle: "Advanced Frontiers, Reverse Engineering, and Organizational Scale",
    badge: "Mastery & Scale",
    chapters: [
      {
        id: "m3-c1",
        title: "Design",
        description: "Generative UI systems, visual regression diffing, and automated aesthetic linting.",
        lessons: [
          {
            id: "m3-l1",
            title: "Agentic UI Prototyping with Generative Design Systems",
            durationMinutes: 30,
            summary: "Building reactive UI components using shared design tokens and Tailwind primitives, generating 4 design variations in parallel.",
            keyTakeaway: "UI design exploration is parallelizable. Generate 4 divergent variants simultaneously, then select and refine the winner.",
            practicePrompt: "Prompt an agent to generate 3 distinct layouts for a pricing table component using the same underlying pricing data."
          },
          {
            id: "m3-l2",
            title: "Visual Regression Diffing with Playwright",
            durationMinutes: 35,
            summary: "Configuring Playwright pixel-diff assertions to catch unintended CSS shifts and responsive layout breaks during agent refactoring.",
            keyTakeaway: "Pixel diffing is the visual equivalent of compiler typechecking: deterministic proof that aesthetics did not regress.",
            practicePrompt: "Set up a Playwright visual comparison test that captures a component snapshot and fails if pixel difference exceeds 1%."
          },
          {
            id: "m3-l3",
            title: "System-1 Copy & Design Token Linters",
            durationMinutes: 25,
            summary: "Deploying fast sub-second models to enforce voice and tone standards, button label clarity, and spacing token compliance.",
            keyTakeaway: "Automate design review: System-1 models catch off-brand copy and rogue hex codes before human designers ever see the PR.",
            practicePrompt: "Create a System-1 linter prompt that verifies all button labels in a diff start with an imperative verb."
          }
        ]
      },
      {
        id: "m3-c2",
        title: "Reverse Engineering",
        description: "Extracting verified specs from undocumented legacy monoliths and generating resilient test nets.",
        lessons: [
          {
            id: "m3-l4",
            title: "Extracting Invariant Specs from Undocumented Legacy Code",
            durationMinutes: 40,
            summary: "Techniques for pointing agents at a 10-year-old spaghetti function to reverse-engineer its actual runtime contracts and invariants.",
            keyTakeaway: "Before refactoring legacy code, have an agent extract its invariants into a test harness. The tests become your safety net.",
            practicePrompt: "Feed a complex legacy function to an agent and ask it to output a comprehensive table of implied input/output invariants."
          },
          {
            id: "m3-l5",
            title: "Decompiling and Analyzing Monolith Dependencies",
            durationMinutes: 35,
            summary: "Mapping hidden circular dependencies and database coupling across large codebases using AST analyzers and agent graph synthesis.",
            keyTakeaway: "Agents excel at mapping graph topologies across thousands of files, finding clean seams where monoliths can be divided.",
            practicePrompt: "Use an agent to analyze your project's import graph and identify the top 3 most tightly coupled circular dependencies."
          },
          {
            id: "m3-l6",
            title: "Drafting Automated Test Suites for Untested Codebases",
            durationMinutes: 35,
            summary: "How to safely bootstrap characterization tests around legacy untested code without accidentally codifying existing bugs.",
            keyTakeaway: "Characterization tests pin down current behavior so future refactoring agents have deterministic back-pressure.",
            practicePrompt: "Instruct an agent to write characterization tests for an untested utility function, recording its current outputs for 10 boundary inputs."
          }
        ]
      },
      {
        id: "m3-c3",
        title: "Measuring Tools and Cost",
        description: "Unit economics, iteration convergence tracking, and benchmarking model efficiency.",
        lessons: [
          {
            id: "m3-l7",
            title: "Token Unit Economics: Cost Per Shipped PR",
            durationMinutes: 30,
            summary: "Calculating the full unit economics of agentic engineering: token spend, compute costs, and human review minutes per delivered feature.",
            keyTakeaway: "Track dollars per converged PR. High-performing factories drive cost per shipped feature down while volume multiplies.",
            practicePrompt: "Calculate the total API cost and developer minutes spent on your last 3 agentic coding sessions."
          },
          {
            id: "m3-l8",
            title: "Measuring Iteration Convergence Velocity",
            durationMinutes: 25,
            summary: "Metrics that matter: Mean Iterations to Green (MITG), human intervention rate, and regression frequency within 14 days.",
            keyTakeaway: "MITG is the true benchmark of factory health: if an agent takes > 6 iterations to converge, your invariants are ambiguous.",
            practicePrompt: "Record the iteration count across 5 consecutive agent tasks and calculate your project's current MITG."
          },
          {
            id: "m3-l9",
            title: "Benchmarking Frontier vs System-1 Evaluation Models",
            durationMinutes: 30,
            summary: "Designing controlled A/B evaluation harnesses to compare cost-efficiency and error-detection accuracy across different model tiers.",
            keyTakeaway: "Use the cheapest model that reliably passes the eval. Upgrading models should be an empirical decision driven by benchmark data.",
            practicePrompt: "Run a test suite of 20 lint checks against both Claude Sonnet and Gemini Flash; measure cost delta vs detection accuracy."
          }
        ]
      },
      {
        id: "m3-c4",
        title: "Thinking Bigger with Agents",
        description: "The multi-year trajectory: organization-wide factory topologies, distributed synthesizers, and the career of the Factory Engineer.",
        lessons: [
          {
            id: "m3-l10",
            title: "Organization-Wide Factory Topologies",
            durationMinutes: 35,
            summary: "Scaling factory architecture across multiple engineering teams: shared invariant registries, company-wide tool repositories, and central evaluators.",
            keyTakeaway: "The highest-leverage engineering teams don't build software directly; they build the factory infrastructure for the whole organization.",
            practicePrompt: "Draft an organizational RFC proposing a shared invariant repository for all frontend and backend services."
          },
          {
            id: "m3-l11",
            title: "Multi-Repo Swarms and Distributed Synthesizers",
            durationMinutes: 40,
            summary: "Coordinating multi-agent operations across distributed microservices, synchronizing API contract changes and client SDK generations simultaneously.",
            keyTakeaway: "Distributed swarms allow atomic multi-repository upgrades, eliminating weeks of cross-team coordination meetings.",
            practicePrompt: "Design an agent workflow that updates a backend protobuf schema, regenerates client libraries, and opens coordinated PRs across 2 repos."
          },
          {
            id: "m3-l12",
            title: "The Future of the Software Factory Engineer",
            durationMinutes: 30,
            summary: "The career trajectory of the Software Factory Engineer: transitioning from code crafter to system architect, verifier designer, and synthesis director.",
            keyTakeaway: "Your value is no longer your typing speed or syntax memory. Your value is your ability to formulate problems, define invariants, and govern autonomous engines.",
            practicePrompt: "Write a personal 12-month engineering roadmap: identify 3 skills to automate away and 3 invariant/verification skills to master."
          }
        ]
      }
    ]
  }
];
