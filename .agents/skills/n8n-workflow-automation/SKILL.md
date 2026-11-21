---
name: n8n-workflow-automation
description: Use for visual automation spanning triggers, nodes, APIs, credentials, and error paths.
---

# Design and maintain n8n workflows

## When to use
Use for visual automation spanning triggers, nodes, APIs, credentials, and error paths.

## Workflow
1. Map trigger and business outcome.
2. Define typed inputs.
3. Build small reusable sub-workflows.
4. Configure credentials through n8n credential storage.
5. Add retries, error workflows, idempotency keys, and execution logging.
6. Test success, failure, duplicate, and rate-limit cases.
7. Document activation and rollback..

## Safety and quality requirements
- Never place secrets in node parameters or exported JSON. Require human approval for consequential actions.
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
