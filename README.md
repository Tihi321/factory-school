# The Software Factory Engineer — Interactive Open Curriculum

> *"Stop building the app. Build the thing that builds it."*

An open, **100% frontend interactive learning platform** inspired by the **Software Factory Engineer** cohort curriculum. It teaches engineers how to transition from writing or proofreading AI code line-by-line to architecting autonomous **Software Factories**: agent-first codebases, deterministic verification loops, fast System-1 judges, parallel bug-bash swarms, merge gates, and self-improving production watchers.

All progress, XP, engineering ranks, quiz scores, and factory blueprints are stored locally in your browser via `localStorage` — **zero backend or database required**.

---

## ✨ Key Features

- **01. The Shift & Interactive Manifesto**:
  - Live interactive **System Feedback Loop** visualization.
  - **Verification Gap Simulator**: Slide generation velocity from `1x` to `50x` to see why manual diff reading collapses and how automated verification loops scale.
  - **4-Persona Switcher**: Compare *The Proofreader*, *The Human Test Suite*, *The Last to Know*, and *The Software Factory Engineer*.
- **02. 10 Core Lifecycle Subjects & Interactive Simulators**:
  1. **The Shift**: *Attention Budget vs. Code Velocity Simulator*
  2. **Intake & Alignment**: *Interactive `/grill-me` Agent Interview & Shed-to-Skyscraper Rung Picker*
  3. **Specifications**: *Executable Spec Builder & Adversarial Red-Team Spec Critic*
  4. **Codebase Design**: *Context Layer & Signal-to-Noise Sandbox*
  5. **Loops & Graphs**: *L4 Worker Loop Builder & Convergence Step-Runner*
  6. **Verification Loops**: *Mock Unit Tests vs. Ephemeral Reality Sandbox (Playwright + DB + Pixel Diff)*
  7. **System One Models**: *Sub-50ms Tool-Call Gate & Diff Risk Classifier*
  8. **Agent Swarms**: *3-Agent Parallel Bug-Bash Swarm Arena (New User, Chaos Fuzzer, Non-Sycophantic Attacker)*
  9. **Merging, Maintenance & Operate**: *Blast-Radius Merge Gate & 2:00 AM Production Dogfooding Watcher*
  10. **The Software Factory**: *6-Stage End-to-End Pipeline & Nightly "Dreaming" Self-Improvement Loop*
- **03. Full 4-Module Cohort Syllabus Explorer**:
  - Browse **4 Modules, 26 Chapters, and 82 Lessons** (*Before Day 1*, *Week 1*, *Week 2*, and *Bonus Content*).
  - Includes searchable study notes, key engineering takeaways, **1-click copyable practice prompts**, and `+25 XP` mastery toggles.
- **04. My Software Factory Blueprint & Certificate**:
  - Check off 12 concrete architectural invariants across your repository and export a ready-to-commit `SOFTWARE_FACTORY_BLUEPRINT.md`.
  - Customize and print/save your **Software Factory Engineer Certificate of Completion**.
- **Steel on Slate Design System**:
  - Instant switching between **Dark Mode** (`#04060a` cool slate + `#d89a3d` warm amber) and **Light Mode**.

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start local dev server (http://localhost:5173)
npm run dev

# Type-check and build static production bundle into ./dist
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Hosting: GitHub Pages vs. Netlify (No Backend Needed)

Because this app is a **100% static frontend SPA** (all state lives in `localStorage` and [`vite.config.ts`](./vite.config.ts) uses `base: './'` for relative asset paths), **you do not need Netlify unless you want its extra features** — **GitHub Pages works out of the box** and serves your site globally over GitHub's Fastly CDN for free!

### Option A: GitHub Pages (Included & Automated)
A GitHub Actions workflow is already configured at [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml):
1. Go to your repository on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.
3. On every push to `master`, GitHub Actions automatically builds `./dist` and publishes it to:
   `https://<your-username>.github.io/factory-school/`

### Option B: Netlify (Zero Config)
If you prefer Netlify's preview deployments or custom domain UI:
- **Build command**: `npm run build`
- **Publish directory**: `dist`
