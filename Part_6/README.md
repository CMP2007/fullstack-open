# Full Stack Open - Part 6 (Advanced State Management)

A repository containing the solutions for Part 6 of the University of Helsinki course. This module showcases different architectural paradigms for state management through parallel, independent projects. It includes initial implementations built exclusively with Redux, alongside separate versions migrated to handle state using Zustand, and projects dedicated to managing server synchronization strictly through TanStack Query (React Query).

## 🛠️ Technologies
* **State Management:** Zustand and Redux Toolkit (implemented in separate, independent projects)
* **Server State & Data Fetching:** TanStack Query (React Query)
* **Frontend Core & Architecture:** React + Vite, React Router (inherited from Part 5 framework)
* **UI Library:** MaterialUI (MUI)
* **Testing Suite:** Vitest, React Testing Library, and Playwright (E2E)

## 📖 About
This repository is part of my learning journey in the Full Stack Open course. In this specific module, the work focuses on mastering advanced state management paradigms within React applications. By developing parallel versions of the same core application, the project demonstrates a deep dive into centralized state architectures—contrasting the structured boilerplate of Redux with the lightweight, store-based simplicity of Zustand. Additionally, separate projects isolate data synchronization using TanStack Query (React Query) to optimize asynchronous server state independently.

> [!NOTE]
> **Practice & Exercises Projects:** 🏛️ State Management Paradigms.
>  This repository uses a structured folder system: the `Practices` folder contains the example projects developed during the course readings, while the `Exercises` folder contains the solutions for this level. Both folders contain multiple independent versions of their respective projects, allowing you to explore each solution implemented cleanly with Redux, Zustand, or TanStack Query.
> The installation and setup processes are identical across both folders.

## 📸 Preview

### Login Screen
![Login Screen](./Exercises/screenshots/screenshotslogin.jpg)

*Initial view where users must authenticate to access the bloglist.*

### Main Application
![Project Preview](./Exercises/screenshots/project-demo.jpg)

*Screenshot of the Bloglist application with the notification system.*

![form Preview](./Exercises/screenshots/project-demo-formBLog.jpg)

*Screenshot of the blog creation form.*

## 📋 Module Objectives / Key Features
* Implementation of predictable state containers using Redux Architecture (actions, reducers, and store dispatching).
* Creation of lightweight, decentralized state stores using Zustand to eliminate boilerplate code.
* Isolation and management of server-state caching, automatic refetching, and mutations using TanStack Query (React Query).
* Separation of concerns by decoupling global UI logic from asynchronous network requests.
* Unit testing of pure reducer functions and state store hooks to ensure predictable application behavior.

## 🎓 Learning Outcomes
* Deep understanding of the differences between rigid, boilerplate-heavy state management (Redux) and flexible, lightweight stores (Zustand).
* Competence in separating Client State (UI transitions, local toggles) from Server State (cached data, loading indicators, server mutations).
* Practical experience migrating legacy state architectures to modern alternatives without disrupting core application logic.
* Mastery of asynchronous data fetching patterns, data synchronization, and background refetching using TanStack Query.
* Ability to design scalable frontend architectures by ensuring components interact with state stores via clean, predictable interfaces.
  
## ✅ Completed Exercises
### Modern Curriculum (Updated Course Material)
Focused on Zustand and TanStack Query implementations.
* [x] 6.1: Unicafe revisited, step 1
* [x] 6.2 - 6.15: Anecdotes, steps 1-14 (State management via Zustand)
* [x] 6.16 - 6.22: React Query, Context API, steps 1-7
### Legacy Curriculum (Original Course Material)
Completed entirely using the Redux ecosystem before the course migration.
* [x] 6.1 - 6.2: Unicafe Revisited, steps 1-2
* [x] 6.3 - 6.13: Anecdotes, steps 1-11 (State management via Redux)
* [x] 6.14 - 6.19: Anecdotes and the Backend, steps 1-6 (Redux asynchronous actions)
* [x] 6.20 - 6.24: React Query, Context API, steps 1-5


## 🧠 Overcome Challenges
* **Shifting to Global State Paradigms:** Overcoming the steep learning curve of transitioning from React's native hooks (useState, useContext) to dedicated state managers, understanding how to lift state outside the component tree and manage a single source of truth properly.
* **State Paradigm Shifting:** Adapting to the architectural differences between Redux's strict dispatch/reducer flow and Zustand's direct action-driven store mutations.
* **Asynchronous Action Management:** Migrating from Redux Thunk asynchronous patterns to TanStack Query (React Query) declarative server mutations, successfully decoupling API calls from local client stores.
* **Cache Synchronization & Invalidation:** Handling query invalidations with TanStack Query to ensure the UI updates instantly after mutations without creating unnecessary network overhead or infinite re-fetching loops.
* **Testing Global Stores:** Writing reliable unit tests with Vitest to verify that store states mutate predictably when actions are executed, without persisting state residue across different test files.

## 📂 Project Structure
```text
.
├── Exercises/                       # # Course required exercises
│   ├── query-anecdotes/             # Legacy: Server-state using TanStack Query
│   ├── redux-anecdotes/             # Legacy: State management via Redux Toolkit
│   ├── unicafe-redux/               # Legacy: Pure Redux state architecture
│   └── zustand-exercises/           # Modern: New updated curriculum projects
│       ├── unicafe-zustand/         # State management via Zustand
│       ├── zustand-anecdotes/       # Store architecture using Zustand
│       └── zustand-query-anecdotes/ # # Server-state management using TanStack Query
├── Practices/                       # Theory follow-up projects (Notes app & counters)
│   ├── count-redux/                 # Legacy: Counter example using Redux
│   ├── hook-counter/                # Legacy: Counter using native React patterns
│   ├── query-notes/                 # Legacy: Server-state notes using TanStack Query
│   ├── Redux-notas/                 # Legacy: Notes application using Redux
│   └── zustand-practices/           # Modern: New updated curriculum projects
│       ├── count-zustand/           # Counter example using Zustand
│       ├── zustand-notas/           # Notes application using Zustand stores
│       └── zustand-query-notes/     # # Server-state management using TanStack Query
├── screenshots/                     # Application behavior captures
├── .gitignore                       # Global git ignore configuration
└── README.md                        # Project documentation
```

## 🚀 Installation
Since each project in this module is a self-contained Frontend application that relies on a simulated REST API, you need to run both the development server and the mock backend  `json-server` simultaneously.
```bash
# 1. Navigate to the desired project directory (e.g., query-anecdotes)
cd Part_06/Exercises/query-anecdotes

# 2. Install dependencies for that specific project
npm install

# 3. Start the mock backend server (json-server)
npm run server

# 4. In a separate terminal tab/window, start the Vite frontend development server
npm run dev
```
### General Workflow for Any Project
The installation and execution process is identical across all directories within both `Exercises`/ and `Practices`/. To test any implementation:

* cd into the specific project folder.
* Run `npm install` to populate `node_modules`.
* Execute `npm run server` to initialize the database mock (usually running on `http://localhost:3001`).
* Execute `npm run dev` to launch the React application interface.

## 🧪 Testing Suite
This project implements a comprehensive testing strategy across the entire stack.

### 1. Frontend: Unit & Integration Tests
Powered by Vitest and React Testing Library.

```bash
cd Part_05/Exercises/Blog_app/frontend
npm run test
npm run coverage # For coverage report
```
### 2. Backend: Integration Tests
Verifies API endpoints and database logic using the native Node.js test runner and Supertest.

```bash
cd Part_05/Exercises/Blog_app/backend
npm run test
```

### 3. End-to-End (E2E) Tests
Utilizing Playwright for full user flow simulation, ensuring authentication and core features work seamlessly together.

> [!IMPORTANT]
> Prerequisites: The backend must be running in test mode (npm run start:test) and the frontend in dev mode (npm run dev) before executing E2E tests.

```bash
cd Part_05/Exercises/Blog_app/E2E-Test
npm run test        # Headless mode
npm run interfaz    # Interactive UI mode
```

## ⚙️ Environment Configuration
This project requires a MongoDB database and JWT secret.

1. Create a .env file in Part_05/Exercises/Blog_app/backend/.

2. Define variables:

```env
MONGODB_URI=your_mongodb_connection_string
TEST_MONGODB_URI=your_test_mongodb_connection_string
PORT=3003
SECRET=your_jwt_secret_phrase
```

> [!TIP]
> Using a separate TEST_MONGODB_URI is crucial. The test suite resets the database state before each execution to ensure reliability.

## 🔍 Project Notes
This repository strictly follows the University of Helsinki conventions, including the use of npm for dependency management and testing scripts. The primary focus is the transition toward Test-Driven Development (TDD) and improving frontend architecture.

---
**Carlos Puche** - Self-Taught Full Stack Developer.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/carlos-puche-0444b53ba/)
