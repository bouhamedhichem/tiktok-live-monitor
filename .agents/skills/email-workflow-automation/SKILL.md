---
name: email-workflow-automation
description: Use for inbox classification, drafting, routing, and reminders.
---

# Automate email triage and follow-up

## When to use
Use for inbox classification, drafting, routing, and reminders.

## Workflow
1. Define labels and priority.
2. Classify with confidence.
3. Extract tasks and dates.
4. Draft replies for review.
5. Deduplicate threads.
6. Preserve sender context.
7. Log actions.
8. Test forwarding and attachment cases..

## Safety and quality requirements
- Do not send, delete, or forward sensitive email without explicit authorization.
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
