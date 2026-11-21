---
name: discord-bot-development
description: Use for moderation, community tools, notifications, and interactive commands.
---

# Build Discord bots and server utilities

## When to use
Use for moderation, community tools, notifications, and interactive commands.

## Workflow
1. Define guild scopes and intents.
2. Request least privilege.
3. Implement slash commands.
4. Validate roles.
5. Handle interactions within deadlines.
6. Queue long jobs.
7. Log moderation actions.
8. Test permission edge cases..

## Safety and quality requirements
- Avoid collecting message content unnecessarily. Provide transparent moderation behavior.
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
