---
name: queue-and-worker-systems
description: Use for asynchronous jobs and burst handling.
---

# Build background queues and workers

## When to use
Use for asynchronous jobs and burst handling.

## Workflow
1. Define job schema.
2. Choose broker.
3. Configure visibility timeout.
4. Acknowledge after durable completion.
5. Implement idempotency.
6. Bound concurrency.
7. Dead-letter poison jobs.
8. Expose queue health..

## Safety and quality requirements
- Never acknowledge a job before its result is safely persisted.
- Use least privilege and keep credentials in the platform's secret manager.
- Make side effects observable, auditable, and reversible where possible.
- Validate assumptions against the actual platform version and enabled integrations.
- Include a test plan, failure handling, and a concise operator handover.

## Expected deliverables
- Workflow or architecture diagram and a clear trigger-to-outcome description.
- Configuration or implementation steps with explicit dependencies.
- Input/output contracts, permissions, and environment requirements.
- Positive, negative, duplicate, and recovery test cases with results.
- Monitoring, maintenance, rollback, and ownership notes.
