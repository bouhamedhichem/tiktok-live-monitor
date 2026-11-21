---
name: llm-evaluation-pipelines
description: Use for model, prompt, and retrieval changes.
---

# Create repeatable LLM evaluation pipelines

## When to use
Use for model, prompt, and retrieval changes.

## Workflow
1. Curate versioned datasets.
2. Define task-specific rubrics.
3. Run deterministic and model-based graders.
4. Measure quality, safety, latency, and cost.
5. Compare baselines.
6. Inspect disagreements.
7. Gate releases..

## Safety and quality requirements
- Keep evaluation data representative and protect sensitive examples.
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
