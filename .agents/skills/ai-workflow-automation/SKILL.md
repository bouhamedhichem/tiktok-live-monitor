---
name: ai-workflow-automation
description: Use when classification, extraction, drafting, or reasoning improves a workflow.
---

# Add AI steps to business workflows

## When to use
Use when classification, extraction, drafting, or reasoning improves a workflow.

## Workflow
1. Keep deterministic steps outside the model.
2. Define narrow AI task and JSON schema.
3. Validate outputs.
4. Add confidence thresholds.
5. Route uncertain cases to people.
6. Log model/version.
7. Evaluate representative cases.
8. Measure latency and cost..

## Safety and quality requirements
- Treat model output as untrusted. Never let it directly authorize payments, account changes, or deletion.
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
