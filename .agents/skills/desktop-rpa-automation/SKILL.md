---
name: desktop-rpa-automation
description: Use for approved repetitive desktop tasks across forms and files.
---

# Automate desktop application workflows

## When to use
Use for approved repetitive desktop tasks across forms and files.

## Workflow
1. Document user workflow.
2. Identify stable UI anchors.
3. Handle focus and modal states.
4. Validate every consequential field.
5. Checkpoint progress.
6. Capture errors.
7. Provide stop/resume behavior.
8. Test on a non-production profile..

## Safety and quality requirements
- Do not automate destructive actions without confirmation and recovery.
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
