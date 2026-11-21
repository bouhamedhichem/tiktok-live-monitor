---
name: workflow-testing
description: Use for regression coverage of multi-step workflows.
---

# Test automation workflows end to end

## When to use
Use for regression coverage of multi-step workflows.

## Workflow
1. Create fixtures.
2. Test happy and failure paths.
3. Simulate timeouts and rate limits.
4. Assert side effects.
5. Test replay and duplicates.
6. Isolate test accounts.
7. Validate alerting.
8. Run before activation..

## Safety and quality requirements
- Never test destructive workflows against production data.
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
