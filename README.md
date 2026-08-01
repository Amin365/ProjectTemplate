# ProjectTemplate

This repository is a full-stack project template built for role-based web applications with:

- **Backend:** Node.js + Express + Sequelize (MySQL)
- **Frontend:** React + Vite + Redux Toolkit + React Query
- **Testing:** Vitest (backend + frontend)

It is designed so developers can reuse common patterns (auth, permissions, notifications, admin tooling, reusable UI building blocks) instead of starting from scratch.

## Repository Structure

```text
ProjectTemplate/
├─ backend/                     # Express API, data models, middleware, migrations
│  ├─ config/                   # DB connection
│  ├─ controller/               # Business logic for each feature
│  ├─ middleware/               # Auth, RBAC, validation, security policy, caching
│  ├─ migrations/               # Ordered DB migrations (001, 002, ...)
│  ├─ models/                   # Sequelize models + associations
│  ├─ routers/                  # Feature route modules
│  ├─ schemas/                  # Zod validation schemas
│  ├─ seeds/                    # Default data seeding
│  └─ utility/                  # Shared backend utilities
├─ frontend/                    # React application
│  ├─ public/                   # Static assets + service worker
│  └─ src/
│     ├─ app/                   # Store, slices, API client
│     ├─ components/            # UI/features (admin, users, members, notifications, shared)
│     ├─ hooks/                 # Reusable React hooks
│     ├─ lib/                   # Route/nav/permission helpers
│     ├─ pages/                 # Route-level screens
│     └─ __tests__/             # Frontend tests
├─ TESTING.md                   # Detailed testing guide
├─ package.json                 # Root scripts for full project
└─ vitest.backend.config.js     # Backend test configuration
```

## Core Backend Setup

Main server entry: `backend/index.js`

Included by default:

- Security middleware: `helmet`, xss sanitizer, `hpp`, cookie parsing, compression
- **Deny-by-default API policy** (`backend/middleware/securityPolicy.js`)
- JWT-based auth + refresh flow
- Role and permission guards
- Notification + announcement endpoints
- Admin governance endpoints (audit log, system health)
- DB sync + migration support on startup

## Core Frontend Setup

Main app entry: `frontend/src/main.jsx`

Included by default:

- React Router app shell
- Redux store with persisted auth state
- React Query for server-state data fetching
- Theme provider and toast system
- PWA service worker registration
- Lazy-loaded route modules

## Generic Reusable Components

This template already includes reusable cross-feature building blocks:

- `frontend/src/components/shared/Forms/Formgenerator.jsx`  
  Config-driven form engine with wizard/panel/dialog/drawer modes, validation, draft persistence, and unsaved-change protection.

- `frontend/src/components/shared/Tables/Datatable.jsx`  
  Reusable data table with server-side search/sort/filter, URL-synced state, pagination, export, bulk actions, and saved views.

- `frontend/src/hooks/usePermission.js`  
  Standardized permission/role checks for gated UI rendering.

- `frontend/src/components/ui/*`  
  Shared UI primitives (Shadcn/Radix style) to keep visual consistency.

## Getting Started

### 1) Install dependencies

From repository root:

```bash
npm install
npm install --prefix frontend
```

### 2) Configure environment

Create backend environment config at:

```text
backend/.env
```

Minimum required secrets (enforced by startup validation):

- `JWT_SECRET`
- `REFRESH_SECRET`

Also configure your database values:

- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`

### 3) Run in development

```bash
npm run dev
```

This starts:

- backend server (`nodemon backend/index.js`)
- frontend dev server (`vite`, via `frontend`)

## Scripts

From repository root:

- `npm run dev` → run backend + frontend together
- `npm run server` → backend only
- `npm run client` → frontend only
- `npm test` → run backend and frontend tests
- `npm run test:backend` → backend tests only
- `npm run test:frontend` → frontend tests only
- `npm run build` → install + build frontend bundle

For detailed test usage, see [`TESTING.md`](./TESTING.md).

## Why Use This Template

Use this template when you need:

- secure default API behavior
- built-in role/permission architecture
- reusable generic forms and tables
- notification + admin observability modules
- fast onboarding with a clear full-stack structure
