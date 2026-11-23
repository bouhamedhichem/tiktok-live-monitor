# SentinelAI — Industrial Intelligence

An isolated industrial monitoring and predictive-maintenance workspace. All files live under `sentinel-ai/`; TikTok Live Monitor source files are untouched.

## Run locally with Docker
```bash
cd sentinel-ai
cp .env.example .env
docker compose up --build
```
Console http://localhost:5173 · API docs http://localhost:8000/docs · ML health http://localhost:8001/health

Create an organization in the console. Register machines with external IDs `MOTOR-001`, `PRESS-002`, `PUMP-003`. Then run `docker compose --profile demo up simulator`.

## What's included
- FastAPI + SQLAlchemy API, Argon2 password hashing, JWT auth, tenant-scoped machine and incident resources, readiness endpoint and API documentation.
- React + TypeScript dashboard, charting, fleet status and incident resolution.
- Sensor simulator with occasional synthetic fault injection.
- Separate Isolation Forest inference service and model training endpoint.
- Docker Compose and project security/roadmap documentation in `docs/PROJECT_GUIDE.md`.

## Important limits
The API currently scores telemetry using transparent baseline thresholds. The ML service falls back to a heuristic until a model is trained. The included training data is synthetic. These are demo foundations, not validated industrial failure predictions. This is decision-support software, not a safety controller. Review the project guide before deployment.
