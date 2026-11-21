---
name: llm-guardrails-and-safety
description: Use for input/output policy, sensitive data, and action controls.
---

# Implement AI application guardrails

## When to use
Use for input/output policy, sensitive data, and action controls.

## Workflow
1. Classify input risks.
2. Define allowed task boundaries.
3. Validate output schema.
4. Apply policy checks.
5. Restrict tools.
6. Add safe fallback.
7. Red-team.
8. Monitor false positives and misses..

## Safety and quality requirements
- Guardrails supplement application authorization; they do not replace it.
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
