---
name: event-driven-architecture
description: Use for asynchronous integration using events, brokers, and consumers.
---

# Design event-driven systems

## When to use
Use for asynchronous integration using events, brokers, and consumers.

## Workflow
1. Define event names and schemas.
2. Distinguish commands from facts.
3. Choose delivery semantics.
4. Add schema versioning.
5. Design consumer idempotency.
6. Handle ordering and replay.
7. Use dead-letter queues.
8. Trace event causality.
9. Test outages and duplicate delivery..

## Safety and quality requirements
- Do not claim exactly-once delivery without a precise system guarantee.
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
