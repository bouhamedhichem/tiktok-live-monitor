---
name: workflow-security-review
description: Use before deploying integrations and agents.
---

# Review automation security

## When to use
Use before deploying integrations and agents.

## Workflow
1. Inventory identities and secrets.
2. Inspect scopes.
3. Map trust boundaries.
4. Validate webhook signatures.
5. Review egress.
6. Check data retention.
7. Test authorization and replay.
8. Document threat mitigations..

## Safety and quality requirements
- Do not store secrets in source control, prompts, logs, or exported workflow files.
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
