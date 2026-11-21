---
name: ai-observability
description: Use for traces across prompts, retrieval, models, and tools.
---

# Observe AI application behavior

## When to use
Use for traces across prompts, retrieval, models, and tools.

## Workflow
1. Trace request lifecycle.
2. Record model and prompt versions.
3. Log tool outcomes.
4. Redact content.
5. Monitor latency, token use, refusal, and errors.
6. Sample quality.
7. Alert on regressions..

## Safety and quality requirements
- Avoid retaining full prompts and outputs unless necessary and authorized.
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
