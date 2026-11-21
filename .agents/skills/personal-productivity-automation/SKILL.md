---
name: personal-productivity-automation
description: Use for task capture, reminders, notes, and recurring routines.
---

# Build personal productivity automations

## When to use
Use for task capture, reminders, notes, and recurring routines.

## Workflow
1. Define capture channels.
2. Normalize tasks.
3. Infer dates cautiously.
4. Ask when ambiguous.
5. Deduplicate.
6. Sync with permission.
7. Provide snooze and completion.
8. Make automation reversible..

## Safety and quality requirements
- Do not create calendar events or send messages without the requested permission.
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
