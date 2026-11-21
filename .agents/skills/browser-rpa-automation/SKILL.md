---
name: browser-rpa-automation
description: Use for authorized UI automation where no stable API exists.
---

# Automate browser-based repetitive tasks

## When to use
Use for authorized UI automation where no stable API exists.

## Workflow
1. Confirm permission and terms.
2. Prefer APIs first.
3. Map page states.
4. Use robust locators.
5. Wait for semantic conditions.
6. Handle dialogs and navigation.
7. Capture audit evidence.
8. Add safe retries.
9. Test layout changes and session expiry..

## Safety and quality requirements
- Never bypass access controls, CAPTCHAs, paywalls, or user-intent safeguards.
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
