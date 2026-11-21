---
name: agentic-browser-workflows
description: Use for multi-step website tasks that require navigation and form interaction.
---

# Build agents for authorized browser tasks

## When to use
Use for multi-step website tasks that require navigation and form interaction.

## Workflow
1. Define allowed domains and actions.
2. Inspect page state.
3. Use stable selectors.
4. Validate each transition.
5. Request confirmation before submissions or purchases.
6. Capture completion evidence.
7. Stop on unexpected pages..

## Safety and quality requirements
- Do not evade anti-bot protections or perform actions outside the user's authorization.
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
