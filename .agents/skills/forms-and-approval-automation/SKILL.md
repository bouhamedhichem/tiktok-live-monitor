---
name: forms-and-approval-automation
description: Use for onboarding, requests, and structured submissions.
---

# Automate forms, intake, and approvals

## When to use
Use for onboarding, requests, and structured submissions.

## Workflow
1. Design accessible forms.
2. Validate client and server side.
3. Classify submissions.
4. Route by rules.
5. Notify stakeholders.
6. Track status.
7. Preserve audit history.
8. Test invalid and duplicate submissions..

## Safety and quality requirements
- Collect only necessary fields and enforce role-based access.
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
