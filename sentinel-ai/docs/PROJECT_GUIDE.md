# SentinelAI engineering guide

## Architecture and trust boundaries
Sensor simulator / future ESP32 gateway -> HTTPS ingestion -> FastAPI validation -> baseline anomaly scoring -> SQL database -> authenticated React console. The ML service is independently deployable. Browser is untrusted; API enforces user auth and organization scoping; ingestion uses a separate shared demo key; database and ML service stay on the private Compose network.

## Milestone 1 acceptance
1. Register an organization.
2. Add machine IDs MOTOR-001, PRESS-002 and PUMP-003.
3. Start `docker compose --profile demo up simulator`.
4. Confirm the dashboard receives readings and charts update.
5. Wait for synthetic fault injection, inspect incidents and resolve one.
6. Create a second organization and verify it cannot see the first organization's machines/incidents.

## Current implementation boundaries
Threshold scoring is transparent demo logic, not an ML-derived failure probability. The ML service provides an Isolation Forest demo model trained from synthetic data using POST /train-demo; no claim of real-world accuracy is appropriate. The simulator is not a physical sensor. The dashboard polls every five seconds; WebSockets are a later milestone.

## Security before production
Rotate all secrets; use a secret manager; enforce HTTPS; replace shared ingest key with per-device identity/rotation/revocation; add refresh-token rotation, MFA, session revocation, granular RBAC, audit events, rate limits, payload limits, DB migrations, encrypted backups, restore drills, ML service auth and signed model artifacts. Complete tenant-isolation, authorization, dependency and penetration testing. Do not expose PostgreSQL. This app is decision support, not an industrial safety controller.

## Roadmap
M2 MQTT, device ACLs, retry/idempotency/dead-letter pipeline, TimescaleDB and migrations.
M3 licensed real dataset, time-aware split, leakage controls, feature windows, anomaly precision/recall and false-positive analysis; supervised failure prediction only with reliable labels; model registry, drift and SHAP for supervised explanations.
M4 realtime WebSockets/SSE, accessible interactive 3D digital twin with 2D fallback, machine drill-down, filters, export, maintenance tasks and audit timeline.
M5 production RBAC/MFA, Playwright/API/load/security tests, observability, backup/restore, runbooks, HTTPS and CI/CD.
