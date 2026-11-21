---
name: customer-service-automation
description: Professional guidance for customer service automation systems and applications.
---

# Customer Service Automation

## Workflow
1. Define the user task, acceptable behavior, quality measures, and failure boundaries.
2. Select data sources and models based on task fit, licensing, privacy, latency, and cost.
3. Design narrow interfaces, typed outputs, retrieval grounding, and explicit tool permissions.
4. Validate input and output schemas; treat user, retrieved, and model-generated content as untrusted.
5. Add evaluation datasets for correctness, groundedness, robustness, safety, and subgroup performance.
6. Route low-confidence or high-impact cases to a human; require confirmation for external actions.
7. Trace model, prompt, retrieval, and tool versions while redacting sensitive data.
8. Monitor quality, drift, latency, usage, cost, and incidents; document rollback and limitations.

## Guardrails
- Never treat generated output as verified fact without evidence.
- Keep authorization outside the model and validate every tool call server-side.
- Defend against prompt injection and cross-tenant retrieval leakage.
- Disclose limitations and maintain human oversight for consequential decisions.

## Deliverables
- System design and model/data selection rationale.
- Prompt, retrieval, tool, and evaluation specifications.
- Safety tests, quality report, and monitoring plan.
- Deployment, incident response, and rollback documentation.
