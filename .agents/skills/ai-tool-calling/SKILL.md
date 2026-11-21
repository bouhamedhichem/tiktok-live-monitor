---
name: ai-tool-calling
description: Use when models invoke application functions or external services.
---

# Implement reliable LLM tool calling

## When to use
Use when models invoke application functions or external services.

## Workflow
1. Define narrow schemas.
2. Validate types and ranges.
3. Authenticate independently.
4. Authorize each action.
5. Return minimal results.
6. Handle malformed calls.
7. Make mutations idempotent.
8. Record audit events.
9. Test denial paths..

## Safety and quality requirements
- Model-generated arguments are untrusted and must never bypass server checks.
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
