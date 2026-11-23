# Portfolio applications

This branch contains three separate portfolio applications inside the existing repository. The original TikTok Live Monitor remains in its own root-level `backend/` and `frontend/` directories.

## Applications

| App | Source / Vercel root | What works now | Data boundary |
|---|---|---|---|
| NexusERP | `apps/nexus-erp` | Overview, revenue charts, customer search/add, orders table, CSV export, inventory and analytics views | Customer list persists in browser localStorage. Other KPIs and order/inventory rows are demo fixtures. |
| QuantVision AI | `apps/quantvision-ai` | Commodity selection, chart periods, watchlist management, paper buy/sell orders, portfolio view, CSV export | Watchlist and paper orders persist in browser localStorage. Market quotes and indicators are illustrative, not live. |
| SentinelAI | `sentinel-ai/frontend` + `sentinel-ai/backend` | Organization registration/login, tenant-scoped machine registry, sensor ingestion, overview, telemetry chart, incident creation/list/resolve, health/readiness | PostgreSQL is configured through environment variables; local Docker Compose includes Postgres. Scoring is a transparent baseline heuristic; optional ML service uses synthetic demo data. |

## Local setup

### NexusERP
```bash
cd apps/nexus-erp
npm install
npm run dev
npm run build
```

### QuantVision AI
```bash
cd apps/quantvision-ai
npm install
npm run dev
npm run build
```

### SentinelAI
```bash
cd sentinel-ai
cp .env.example .env
# Replace JWT_SECRET and SENTINEL_INGEST_API_KEY with random values.
docker compose up --build
```
Open the console at `http://localhost:5173`, API docs at `http://localhost:8000/docs`, and ML health at `http://localhost:8001/health`. Register an organization, add machine IDs `MOTOR-001`, `PRESS-002`, and `PUMP-003`, then start the demo simulator with `docker compose --profile demo up simulator`.

## Build checks

GitHub Actions:
- `.github/workflows/portfolio-apps.yml` builds both Vite apps.
- `sentinel-ai/.github/workflows/quality.yml` builds the SentinelAI frontend and runs backend scoring tests.

## Production-readiness notes

These are portfolio-grade demo applications, not yet audited enterprise production systems. NexusERP and QuantVision still need real authenticated backend services and shared persistence. QuantVision needs a licensed market-data provider, model training/evaluation and broker integration only if real trading is ever intended. SentinelAI needs per-device ingestion credentials, refresh-token/session management, DB migrations, rate limiting, audit logs, backup/restore, stronger tenant isolation tests, ML validation on real labeled data and operational monitoring. Never use the ML demo for safety-critical decisions or treat its scores as calibrated failure probabilities.
