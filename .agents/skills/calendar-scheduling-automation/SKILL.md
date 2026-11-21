---
name: calendar-scheduling-automation
description: Use for meeting suggestions, booking, reminders, and rescheduling.
---

# Automate scheduling and calendar coordination

## When to use
Use for meeting suggestions, booking, reminders, and rescheduling.

## Workflow
1. Resolve timezone.
2. Check availability.
3. Propose options.
4. Account for buffers.
5. Create events only after confirmation.
6. Include attendees and conferencing details.
7. Handle conflicts and cancellations..

## Safety and quality requirements
- Do not expose private event details to unauthorized participants.
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
