---
name: workflow-documentation
description: Use for operational runbooks and maintainers.
---

# Document workflows for handover

## When to use
Use for operational runbooks and maintainers.

## Workflow
1. Describe purpose, owner, trigger, inputs, outputs, dependencies, permissions, SLAs, failure modes, retry rules, alert routes, manual recovery, and rollback.
2. Include a flow diagram and test evidence..

## Safety and quality requirements
- Keep docs aligned with the deployed version.
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
