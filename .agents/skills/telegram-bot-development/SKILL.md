---
name: telegram-bot-development
description: Use for Telegram commands, inline keyboards, notifications, and workflows.
---

# Create Telegram bots and integrations

## When to use
Use for Telegram commands, inline keyboards, notifications, and workflows.

## Workflow
1. Define commands and permissions.
2. Validate update payloads.
3. Store tokens securely.
4. Implement webhook or polling.
5. Manage conversation state.
6. Rate-limit.
7. Handle retries.
8. Test group and private chat behavior..

## Safety and quality requirements
- Never expose bot tokens or execute arbitrary user-provided commands.
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
