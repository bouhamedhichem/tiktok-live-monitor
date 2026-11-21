---
name: backend-api-engineering
description: Design and implement secure, reliable REST APIs and backend services with validation, authentication, authorization, and observability.
---
# Backend API Engineering
1. Inspect language, framework, routes, middleware, deployment model, and existing API conventions.
2. Define resources, schemas, status codes, pagination, filtering, versioning, and error format.
3. Validate all inputs server-side and normalize errors without leaking secrets or stack traces.
4. Enforce authentication and resource-level authorization on every protected operation.
5. Use transactions for multi-step writes, idempotency for retryable operations, and rate limits where appropriate.
6. Add structured logs, request IDs, health/readiness endpoints, and metrics without logging sensitive data.
7. Document endpoints and test success, validation, authorization, concurrency, and failure paths.
Never expose credentials or trust client-side authorization. Report tests actually run.
