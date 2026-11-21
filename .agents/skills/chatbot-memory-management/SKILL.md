---
name: chatbot-memory-management
description: Use when a chatbot needs continuity across sessions.
---

# Design safe conversational memory

## When to use
Use when a chatbot needs continuity across sessions.

## Workflow
1. Separate session context from durable memory.
2. Define consent and retention.
3. Store concise user-approved facts.
4. Support review and correction.
5. Enforce tenant boundaries.
6. Expire stale data.
7. Test deletion propagation..

## Safety and quality requirements
- Do not infer sensitive traits or retain secrets in memory.
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
