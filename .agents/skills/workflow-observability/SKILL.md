---
name: workflow-observability
description: Use for traces, logs, metrics, alerts, and operational dashboards.
---

# Monitor automation and workflow health

## When to use
Use for traces, logs, metrics, alerts, and operational dashboards.

## Workflow
1. Define workflow/run identifiers.
2. Capture stage timings.
3. Track success, retries, and failures.
4. Correlate external requests.
5. Redact secrets.
6. Set actionable alerts.
7. Build runbooks.
8. Test alert delivery..

## Safety and quality requirements
- Avoid logging tokens, full sensitive payloads, or unnecessary personal data.
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
