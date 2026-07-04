# Full Stack Open - University of Helsinki (Specialized Track)

A production-grade monorepository containing solutions and architectural deep dives for Parts 5, 6, and 7 of the University of Helsinki's Full Stack Open curriculum. This repository documents a structured transition from component assembly and local state patterns to advanced frontend tooling orchestration, global state management, and robust multi-view single-page architectures (SPAs).

## 🗂️ Monorepo Roadmap & Modules
> [!NOTE]
>Each module folder inside this repository functions as a structured workspace divided into two distinct scopes: `Exercises/` (storing the production-extended implementations like the unified `Blog_app`) and `Practices/` (storing standalone sandbox applications built while reading the curriculum material). Every module features its own explicit directory maps, completion ledgers, and testing guidelines. **Click on the module headers below to explore their dedicated README documents.**

### 📂 [Part 5 — Testing React Apps & Backend Integration](./Part_05)
* Focus: Foundational end-to-end full-stack synchronization. Establishes the core Bloglist application architecture.
* Key Implementations: Token-based authentication, frontend unit/integration testing, and initial backend validation pipelines.
* Core Stack: React, Node.js, Express, MongoDB, Vitest, Playwright.

### 📂 [Part 6 — Advanced State Management & Data Fetching](./Part_06)
* Focus: Optimization of state delivery patterns and server-cache isolation.
* Key Implementations: Migration from standard local React state paradigms into centralized architectures, comparing global state engines, and abstracting server status via dynamic query hooks.
* Core Stack: Redux Toolkit, Zustand, TanStack Query (React Query), Axios.

### 📂 [Part 7 — Advanced Tooling, Routing & Monolith Evolution](./Part_07)
* Focus: Enterprise-level orchestration, compilation internals, and client-side routing.
* Key Implementations: Monolith decomposition via declarative client-side views, complete lightweight state refactoring with Zustand, custom form life-cycle hooks, manual bundling via low-level CLIs, and cross-directory production asset synchronization.
* Core Stack: React Router, Zustand, Material UI (MUI), esbuild, Concurrently.

## 🛠️ Global Technology Blueprint
* **Frontend Core:** React, TypeScript, JavaScript (ES6+)
* **State & Routing:** Zustand, Redux Toolkit, React Router Dom
* **UI & Styling:** Material UI (MUI), Emotion, Traditional CSS
* **Backend & Database:** Node.js, Express, Mongoose, MongoDB Atlas
* **Testing Architecture:** Playwright (E2E), Vitest, React Testing Library, Supertest
* **Tooling & DevOps:** Vite, esbuild, Concurrently, Cross-env, Prettier

## 🚀 Navigation & Getting Started
To explore, run, or test any particular solution or application within this monorepository:

1. Clone the repository to your local machine.
2. Navigate to the specific module folder depending on the architectural pattern you wish to evaluate (cd Part_05, cd Part_06, o cd Part_07).
3. Follow the specialized 🚀 Installation and ⚙️ Environment Configuration guidelines detailed inside that specific directory's README file.

## 🧠 Architectural Evolution & Core Outcomes
* **State Architecture Progression:** Advanced from basic native React state management (`useState`) into centralized paradigms. Explored the structural weight of Redux Toolkit and the Context API during intermediate phases, ultimately refactoring the primary core stack into lightweight, action-driven global stores with **Zustand** to eliminate boilerplate and decouple UI tracking entirely.
* **Testing Resilience:** Developed a strict multi-layered testing mindset, isolating component unit tests (Vitest) from full multi-view user flow regression tests (Playwright) running against dynamic test databases.
* **Tooling Sovereignty:** Gained a deep understanding of frontend asset pipelines, shifting from the high-level abstractions of Vite to low-level compilation mechanics using pure esbuild configurations.

## 🔍 Project Notes
This monorepository stands as a testament to self-taught perseverance, software engineering consistency, and strict compliance with the rigorous academic standards of the University of Helsinki.

---
**Carlos Puche** - Self-Taught Full Stack Developer.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/carlos-puche-0444b53ba/)
