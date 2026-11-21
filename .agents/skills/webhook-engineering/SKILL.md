---
name: webhook-engineering
description: Use for receiving or sending webhooks between services.
---

# Build secure webhook integrations

## When to use
Use for receiving or sending webhooks between services.

## Workflow
1. Specify event contract.
2. Verify signatures and timestamps.
3. Reject replay.
4. Acknowledge quickly.
5. Enqueue long work.
6. Persist delivery IDs.
7. Implement retry/backoff.
8. Expose delivery logs.
9. Test invalid signatures, duplicates, and out-of-order events..

## Safety and quality requirements
- Never trust webhook payloads or expose signing secrets.
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
