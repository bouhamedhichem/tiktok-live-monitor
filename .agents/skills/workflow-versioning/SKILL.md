---
name: workflow-versioning
description: Use for change control and rollback of automation definitions.
---

# Version and release automation workflows

## When to use
Use for change control and rollback of automation definitions.

## Workflow
1. Store export or source in version control.
2. Document dependencies.
3. Compare diffs.
4. Use dev/staging/prod environments.
5. Migrate credentials separately.
6. Require review.
7. Tag releases.
8. Test rollback..

## Safety and quality requirements
- Do not commit credential values in workflow exports.
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
