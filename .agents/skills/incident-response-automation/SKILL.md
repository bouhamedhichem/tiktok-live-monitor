---
name: incident-response-automation
description: Use for alert triage and incident workflows.
---

# Automate incident response coordination

## When to use
Use for alert triage and incident workflows.

## Workflow
1. Normalize alerts.
2. Deduplicate.
3. Enrich with service context.
4. Assign severity.
5. Page on-call.
6. Open incident timeline.
7. Track actions.
8. Require approval for remediation.
9. Capture postmortem evidence..

## Safety and quality requirements
- Do not run disruptive remediation automatically without policy authorization.
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
