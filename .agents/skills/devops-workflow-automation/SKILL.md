---
name: devops-workflow-automation
description: Use for deployment, incident, and infrastructure routines.
---

# Automate DevOps operational workflows

## When to use
Use for deployment, incident, and infrastructure routines.

## Workflow
1. Define environments.
2. Use least-privilege identities.
3. Add policy checks.
4. Require approvals for production.
5. Capture deployment metadata.
6. Verify health.
7. Support rollback.
8. Notify owners..

## Safety and quality requirements
- Never expose deployment secrets or bypass release controls.
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
