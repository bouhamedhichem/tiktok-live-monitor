---
name: whatsapp-business-automation
description: Use for consent-based customer notifications and support flows.
---

# Design WhatsApp Business messaging workflows

## When to use
Use for consent-based customer notifications and support flows.

## Workflow
1. Confirm approved provider and templates.
2. Capture opt-in.
3. Design session and template paths.
4. Validate phone identifiers.
5. Handle delivery receipts.
6. Provide opt-out.
7. Rate-limit and audit messages..

## Safety and quality requirements
- Do not send unsolicited bulk messages or evade platform policies.
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
