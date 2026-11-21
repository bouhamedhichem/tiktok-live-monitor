---
name: api-orchestration
description: Use when one user action requires several external or internal APIs.
---

# Coordinate multiple APIs in one workflow

## When to use
Use when one user action requires several external or internal APIs.

## Workflow
1. Map dependencies.
2. Define canonical data model.
3. Sequence dependent calls.
4. Parallelize independent calls.
5. Set timeouts and budgets.
6. Normalize errors.
7. Compensate partial writes.
8. Cache only safe data.
9. Test quota exhaustion and provider outages..

## Safety and quality requirements
- Do not leak provider tokens or silently swallow partial failures.
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
