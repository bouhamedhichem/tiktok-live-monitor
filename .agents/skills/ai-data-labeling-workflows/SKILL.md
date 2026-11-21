---
name: ai-data-labeling-workflows
description: Use for supervised datasets and evaluation labels.
---

# Manage data labeling and review workflows

## When to use
Use for supervised datasets and evaluation labels.

## Workflow
1. Define label schema.
2. Create examples and guidance.
3. Measure annotator agreement.
4. Route ambiguous cases.
5. Version labels.
6. Audit changes.
7. Split train and evaluation sets without leakage..

## Safety and quality requirements
- Do not expose sensitive data to unauthorized annotators.
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
