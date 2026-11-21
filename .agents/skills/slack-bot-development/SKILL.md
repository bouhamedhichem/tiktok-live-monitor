---
name: slack-bot-development
description: Use for Slack commands, events, interactive messages, and internal automation.
---

# Build Slack apps and workflow bots

## When to use
Use for Slack commands, events, interactive messages, and internal automation.

## Workflow
1. Define scopes.
2. Verify request signatures.
3. Handle retries.
4. Acknowledge promptly.
5. Use modal and block actions.
6. Store installation per workspace.
7. Enforce user and channel authorization.
8. Test event duplication..

## Safety and quality requirements
- Keep tokens in secret storage and isolate workspace data.
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
