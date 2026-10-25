# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

Three independent services in one repo. No root orchestration — each runs separately.

```
frontend/  Next.js 15 (App Router, React 19, Tailwind 4)  → port 3000
backend/   Express + Sequelize (PostgreSQL)               → port 5001
ml/        FastAPI + scikit-learn                          → port 8000
```

Data flow for predictions: frontend → backend `/api/prediction` → backend calls ML `http://127.0.0.1:8000/predict` (hardcoded in `controllers/summaryController.js`) → linear regression per category → backend layers budget-overrun warning on top → frontend `PredictionCard`.

All three must run for full functionality. ML down → backend returns 503 on prediction only; rest of app works.

## Run

```bash
# backend (port from .env, currently 5001)
cd backend && npm run dev          # nodemon
npx sequelize-cli db:migrate       # apply migrations before first run

# ml
cd ml && pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# frontend
cd frontend && npm run dev         # turbopack
npm run build && npm run start
npm run lint
```

No test suite exists (`backend` test script is a stub). `backend/test-*.js` are throwaway scratch files, not tests.

## Backend conventions

- **Pattern**: `routes/ → controllers/ → models/`. Routes mounted in `index.js` under `/api/*`.
- **Models**: Sequelize factory style — `module.exports = (sequelize, DataTypes) => {...}`. Registered + associated in `models/index.js`. Add new models there.
- **DB config is split and inconsistent**:
  - `models/index.js` reads `config/config.json` `development` block (hardcoded creds: `postgres`/`root1234`/`ml_budget`).
  - `db.js` reads `.env` (`DB_*` vars) but is **not** the source used by models — `models/index.js` ignores it.
  - `config.json` `test`/`production` blocks point at MySQL and are wrong/unused. Only `development` is live.
- **Auth**: JWT via `middleware/authMiddleware.js`. Expects `Authorization: Bearer <token>`. Sets `req.user = { id, email }`. Protected controllers read `req.user.id`.
- **Recurring transactions**: `utils/recurringCron.js` clones recurring income/expense ~monthly. Triggered per-user (lazy), not a real cron daemon.
- **Schema changes go through migrations** (`migrations/`, sequelize-cli). No `sequelize.sync()` — DB built from migrations only.

## Route mount mismatch (known issue)

Backend mounts auth at `/api/auth` (`/api/auth/login`, `/api/auth/register`) but frontend calls `/api/login` and `/api/register` directly. Summary endpoints mounted bare under `/api` (`/api/summary`, `/api/prediction`). When wiring auth, verify which path the frontend actually hits before assuming.

## Frontend conventions

- **API base URL hardcoded** as `http://localhost:5001` in every component/page — no env var, no axios instance. Changing backend port means editing every call site.
- **Auth**: JWT stored in `localStorage.token` after login, manually attached as `Authorization` header per request. No interceptor.
- Pages under `src/app/*` (App Router). Shared UI in `src/components/`. `ThemeContext` for theming. Charts via `recharts`.

## Konteks Tambahan
Baca ~/Documents/Nexus/CLAUDE.md dan folder terkait di 01-Projects/ atau 02-Areas/ untuk konteks personal & riwayat kerja. Kalau note project ini belum ada di Nexus, buatkan.
