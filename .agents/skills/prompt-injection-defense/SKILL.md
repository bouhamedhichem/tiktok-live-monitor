---
name: prompt-injection-defense
description: Use for agents and RAG systems that consume user or retrieved content.
---

# Defend AI workflows against prompt injection

## When to use
Use for agents and RAG systems that consume user or retrieved content.

## Workflow
1. Treat external content as data.
2. Isolate instructions from documents.
3. Allowlist tools.
4. Validate structured arguments.
5. Enforce authorization outside the model.
6. Test indirect injection.
7. Log blocked attempts.
8. Limit data exposure..

## Safety and quality requirements
- Never rely on prompt wording as the only security boundary.
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
