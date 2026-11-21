---
name: ai-human-in-the-loop
description: Use for high-impact, uncertain, or externally visible AI actions.
---

# Add human approval to AI processes

## When to use
Use for high-impact, uncertain, or externally visible AI actions.

## Workflow
1. Define approval thresholds.
2. Show evidence and proposed action.
3. Support approve, reject, edit, and timeout.
4. Bind approval to exact payload/version.
5. Log actor and time.
6. Revalidate before execution..

## Safety and quality requirements
- Do not treat a generic approval as authorization for changed payloads.
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
