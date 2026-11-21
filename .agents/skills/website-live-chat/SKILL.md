---
name: website-live-chat
description: Use for embedded support chat and agent handoff.
---

# Implement website live chat experiences

## When to use
Use for embedded support chat and agent handoff.

## Workflow
1. Design launcher and accessible chat panel.
2. Support responsive layout.
3. Persist only necessary state.
4. Connect authenticated sessions.
5. Stream messages safely.
6. Add typing and delivery states.
7. Implement handoff.
8. Test keyboard and mobile flows..

## Safety and quality requirements
- Escape rendered content and protect session tokens.
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
