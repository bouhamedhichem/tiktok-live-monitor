---
name: llm-cost-and-latency-optimization
description: Use for production AI services.
---

# Optimize LLM cost and response time

## When to use
Use for production AI services.

## Workflow
1. Instrument tokens and latency.
2. Route by task complexity.
3. Cache safe deterministic outputs.
4. Stream where useful.
5. Batch offline tasks.
6. Cap context.
7. Set budgets.
8. Compare quality after each optimization..

## Safety and quality requirements
- Do not sacrifice grounding, privacy, or critical accuracy for speed.
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
