---
name: file-management-automation
description: Use for naming, routing, conversion, and archival workflows.
---

# Automate file intake and organization

## When to use
Use for naming, routing, conversion, and archival workflows.

## Workflow
1. Validate file type and size.
2. Scan.
3. Derive safe metadata.
4. Apply deterministic naming.
5. Preserve originals.
6. Route by policy.
7. Log moves.
8. Handle conflicts.
9. Support restore..

## Safety and quality requirements
- Never overwrite or delete source files without explicit policy and backup.
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
