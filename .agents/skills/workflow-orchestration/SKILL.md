---
name: workflow-orchestration
description: Use when a process spans services, queues, people, or long-running tasks.
---

# Architect end-to-end workflow orchestration

## When to use
Use when a process spans services, queues, people, or long-running tasks.

## Workflow
1. Model states and transitions.
2. Define ownership and SLAs.
3. Identify compensation steps.
4. Select orchestration versus choreography.
5. Persist state.
6. Make handlers idempotent.
7. Add timeout, retry, dead-letter, and audit behavior.
8. Test partial failures..

## Safety and quality requirements
- Never treat retries as a substitute for idempotency. Keep irreversible steps behind approvals.
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
