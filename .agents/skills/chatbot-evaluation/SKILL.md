---
name: chatbot-evaluation
description: Use for regression tests and quality measurement across conversation datasets.
---

# Evaluate chatbot quality and reliability

## When to use
Use for regression tests and quality measurement across conversation datasets.

## Workflow
1. Build representative test set.
2. Define correctness, groundedness, safety, latency, and escalation metrics.
3. Score turn and conversation outcomes.
4. Include adversarial cases.
5. Compare versions.
6. Review failures.
7. Gate releases on thresholds..

## Safety and quality requirements
- Do not optimize only for user satisfaction or one aggregate score.
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
