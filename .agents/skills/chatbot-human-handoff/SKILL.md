---
name: chatbot-human-handoff
description: Use when a bot cannot resolve a request or a person asks for help.
---

# Implement chatbot-to-human escalation

## When to use
Use when a bot cannot resolve a request or a person asks for help.

## Workflow
1. Define escalation triggers.
2. Collect minimal context.
3. Summarize prior steps.
4. Pass identifiers securely.
5. Show queue status.
6. Preserve transcript access controls.
7. Support agent takeover and return.
8. Measure handoff quality..

## Safety and quality requirements
- Never trap users in a bot loop or claim a human has joined before confirmed.
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
