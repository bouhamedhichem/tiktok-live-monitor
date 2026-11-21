---
name: workflow-architecture-patterns
description: Use when choosing between scripts, queues, schedulers, orchestration, and agents.
---

# Select workflow architecture patterns

## When to use
Use when choosing between scripts, queues, schedulers, orchestration, and agents.

## Workflow
1. Compare statefulness, duration, retries, consistency, human steps, scale, cost, and operability.
2. Select simplest viable pattern.
3. Document trade-offs.
4. Define migration path..

## Safety and quality requirements
- Do not use an autonomous agent when deterministic code is safer and simpler.
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
